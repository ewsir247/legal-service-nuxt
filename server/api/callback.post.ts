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
 * Env vars (see .env / nuxt.config.ts runtimeConfig):
 *   BITRIX_WEBHOOK_URL     required — e.g. https://your-portal.bitrix24.ru/rest/1/xxxx/
 *   BITRIX_ENTITY          optional — "lead" (default) | "deal"
 *   BITRIX_SOURCE_ID       optional — Bitrix source code, default "WEB"
 *   BITRIX_ASSIGNED_BY_ID  optional — numeric user id to assign the lead to
 *   ALLOWED_ORIGIN         optional — site origin for CORS, default "*"
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const allowedOrigin = config.allowedOrigin || '*'

  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  if (!config.bitrixWebhookUrl) {
    setResponseStatus(event, 500)
    return { ok: false, error: 'Server is not configured. Missing BITRIX_WEBHOOK_URL.' }
  }

  let data: Record<string, unknown>
  try {
    data = await readBody(event)
  } catch {
    setResponseStatus(event, 400)
    return { ok: false, error: 'Invalid request body.' }
  }

  const name = String(data?.name ?? '').trim().slice(0, 100)
  const phone = String(data?.phone ?? '').trim().slice(0, 40)
  const page = String(data?.page ?? '').trim().slice(0, 300)
  const comment = String(data?.comment ?? '').trim().slice(0, 500)

  // Server-side validation (client validates too, but never trust the client)
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) {
    setResponseStatus(event, 422)
    return { ok: false, error: 'Укажите корректный номер телефона.' }
  }

  // Honeypot: hidden field filled => bot. Silently pretend success.
  if (data?.website) {
    return { ok: true }
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

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let result: Record<string, unknown> = {}
    try {
      result = await resp.json()
    } catch {
      setResponseStatus(event, 502)
      return { ok: false, error: 'Некорректный ответ CRM. Попробуйте позже.' }
    }

    if (!resp.ok || result.error) {
      // Do NOT leak internal error details to the browser.
      console.error('Bitrix error:', result.error, result.error_description)
      setResponseStatus(event, 502)
      return { ok: false, error: 'Не удалось создать заявку. Попробуйте позже.' }
    }

    return { ok: true, id: result.result }
  } catch (e) {
    console.error('Bitrix request failed:', e instanceof Error ? e.message : e)
    setResponseStatus(event, 503)
    return { ok: false, error: 'Сервис временно недоступен. Попробуйте позже.' }
  }
})
