/**
 * POST /api/callback — Nuxt server route (Nitro).
 *
 * Ported 1:1 from the old Cloudflare Pages Function (functions/api/callback.js):
 * receives a callback request from the site's form/widget and creates a Lead
 * (or Deal) in Bitrix24 CRM via an incoming webhook.
 *
 * The webhook URL is a SECRET: anyone holding it can read and write your CRM.
 * It is read from runtime config (env var BITRIX_WEBHOOK_URL) and never
 * reaches the browser bundle.
 *
 * Env vars (see .env.example / nuxt.config.ts runtimeConfig):
 *   BITRIX_WEBHOOK_URL       required — e.g. https://your-portal.bitrix24.ru/rest/1/xxxx/
 *   BITRIX_ENTITY            optional — "lead" (default) | "deal"
 *   BITRIX_SOURCE_ID         optional — Bitrix source code, default "WEB"
 *   BITRIX_ASSIGNED_BY_ID    optional — numeric user id to assign the lead to
 *   ALLOWED_ORIGIN           optional — site origin for CORS, defaults to the
 *                            project's production Cloudflare Pages URL
 *   NUXT_TURNSTILE_SECRET_KEY  optional — Cloudflare Turnstile secret key
 *
 * Security notes:
 *   - CORS never allows '*'. See server/utils/callbackSecurity.ts.
 *   - Origin is also checked server-side (CORS headers alone don't stop
 *     direct server-to-server POSTs).
 *   - Rate limiting + idempotency use an optional Cloudflare KV binding
 *     (RATE_LIMIT_KV) and no-op gracefully when it isn't configured.
 *   - PII (name/phone/comment/page) is never logged.
 */

import { callbackSchema, isValidPhone } from '../../shared/utils/callback'
import {
  getAllowedOrigin,
  isOriginAllowed,
  getRateLimitKv,
  checkRateLimit,
  getIdempotentResult,
  storeIdempotentResult,
  verifyTurnstile,
} from '../utils/callbackSecurity'

const MAX_BODY_BYTES = 10 * 1024 // 10KB is ample for name + phone + comment
const BITRIX_TIMEOUT_MS = 8000

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const allowedOrigin = getAllowedOrigin(config)

  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  })

  // --- Origin check (CORS headers don't block direct server-to-server POSTs) ---
  const requestOrigin = getHeader(event, 'origin')
  if (!import.meta.dev && requestOrigin && !isOriginAllowed(requestOrigin, config)) {
    setResponseStatus(event, 403)
    return { ok: false, error: 'Запрос отклонён.' }
  }

  // --- Body size guard (before parsing) ---
  const contentLength = Number(getHeader(event, 'content-length') || 0)
  if (contentLength && contentLength > MAX_BODY_BYTES) {
    setResponseStatus(event, 413)
    return { ok: false, error: 'Слишком большой запрос.' }
  }

  // --- Content-Type guard ---
  const contentType = getHeader(event, 'content-type') || ''
  if (!contentType.includes('application/json')) {
    setResponseStatus(event, 415)
    return { ok: false, error: 'Неверный формат запроса.' }
  }

  if (!config.bitrixWebhookUrl) {
    setResponseStatus(event, 500)
    return { ok: false, error: 'Server is not configured. Missing BITRIX_WEBHOOK_URL.' }
  }

  let rawBody: unknown
  try {
    rawBody = await readBody(event)
  } catch {
    setResponseStatus(event, 400)
    return { ok: false, error: 'Invalid request body.' }
  }

  const parsed = callbackSchema.safeParse(rawBody)
  if (!parsed.success) {
    setResponseStatus(event, 422)
    const phoneIssue = parsed.error.issues.find((i) => i.path[0] === 'phone')
    return { ok: false, error: phoneIssue?.message || 'Проверьте правильность заполнения формы.' }
  }
  const data = parsed.data

  // Honeypot: hidden field filled => bot. Silently pretend success.
  if (data.website) {
    return { ok: true }
  }

  const ip = getHeader(event, 'cf-connecting-ip') || getRequestIP(event) || ''
  const kv = getRateLimitKv(event)

  // --- Idempotency: return cached result for a repeated submit of the same request ---
  if (data.idempotencyKey) {
    const cached = await getIdempotentResult(kv, data.idempotencyKey)
    if (cached) return cached
  }

  // --- Rate limiting ---
  const withinLimit = await checkRateLimit(kv, ip)
  if (!withinLimit) {
    setResponseStatus(event, 429)
    return { ok: false, error: 'Слишком много попыток. Попробуйте позже.' }
  }

  // --- Turnstile bot check (only enforced once a secret key is configured) ---
  if (config.turnstileSecretKey) {
    const passed = await verifyTurnstile(config.turnstileSecretKey, data.turnstileToken, ip)
    if (!passed) {
      setResponseStatus(event, 403)
      return { ok: false, error: 'Проверка безопасности не пройдена.' }
    }
  }

  const name = data.name.trim().slice(0, 100)
  const phone = data.phone.trim().slice(0, 40)
  const page = data.page.trim().slice(0, 300)
  const comment = data.comment.trim().slice(0, 500)

  if (!isValidPhone(phone)) {
    setResponseStatus(event, 422)
    return { ok: false, error: 'Укажите корректный номер телефона.' }
  }

  const entity = String(config.bitrixEntity || 'lead').toLowerCase() === 'deal' ? 'deal' : 'lead'
  const method = entity === 'deal' ? 'crm.deal.add' : 'crm.lead.add'

  // Normalize webhook base (ensure exactly one trailing slash)
  const base = config.bitrixWebhookUrl.trim().replace(/\/+$/, '') + '/'
  const endpoint = `${base}${method}.json`

  // Build a readable comment block
  const commentLines: string[] = []
  if (comment) commentLines.push(`Комментарий: ${comment}`)
  if (page) commentLines.push(`Страница: ${page}`)
  commentLines.push(`Получено: ${new Date().toISOString()}`)
  const commentsText = commentLines.join('\n')

  const fields: Record<string, unknown> = {
    TITLE: `Обратный звонок с сайта${name ? ` — ${name}` : ''}`,
    COMMENTS: commentsText,
    SOURCE_ID: config.bitrixSourceId || 'WEB',
    OPENED: 'Y',
    // Structured phone so Bitrix can click-to-call
    PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
  }

  if (config.bitrixAssignedById) {
    fields.ASSIGNED_BY_ID = config.bitrixAssignedById
  }

  if (entity === 'lead') {
    if (name) {
      const parts = name.split(/\s+/)
      fields.NAME = parts[0]
      if (parts.length > 1) fields.LAST_NAME = parts.slice(1).join(' ')
    }
    fields.SOURCE_DESCRIPTION = page || 'Форма обратного звонка'
  }

  const payload = {
    fields,
    params: { REGISTER_SONET_EVENT: 'Y' },
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), BITRIX_TIMEOUT_MS)

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    let result: Record<string, unknown> = {}
    try {
      result = await resp.json()
    } catch {
      setResponseStatus(event, 502)
      return { ok: false, error: 'Некорректный ответ CRM. Попробуйте позже.' }
    }

    if (!resp.ok || result.error) {
      // Do NOT leak internal error details (or any PII) to the browser.
      console.error('Bitrix error:', result.error, result.error_description)
      setResponseStatus(event, 502)
      return { ok: false, error: 'Не удалось создать заявку. Попробуйте позже.' }
    }

    // Do not leak the internal Bitrix lead/deal id to the client.
    const success = { ok: true }
    if (data.idempotencyKey) await storeIdempotentResult(kv, data.idempotencyKey, success)
    return success
  } catch (e) {
    const isAbort = e instanceof Error && e.name === 'AbortError'
    console.error('Bitrix request failed:', isAbort ? 'timeout' : e instanceof Error ? e.message : e)
    setResponseStatus(event, 503)
    return { ok: false, error: 'Сервис временно недоступен. Попробуйте позже.' }
  } finally {
    clearTimeout(timeoutId)
  }
})
