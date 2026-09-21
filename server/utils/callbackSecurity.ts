// Shared security helpers for /api/callback (CORS origin allowlisting, Cloudflare
// KV-backed rate limiting / idempotency, Turnstile verification).
//
// Everything here degrades gracefully when optional infrastructure (KV binding,
// Turnstile keys) isn't configured yet — same pattern as BITRIX_WEBHOOK_URL /
// NUXT_PUBLIC_2GIS_API_KEY elsewhere in this project: log a warning and skip
// the check rather than breaking the form.

// The project's current production Cloudflare Pages URL. Used only as a
// fallback when ALLOWED_ORIGIN isn't set — never a wildcard.
export const DEFAULT_SITE_ORIGIN = 'https://legal-service-nuxt.pages.dev'

const DEV_ORIGINS = ['http://localhost:3000', 'http://localhost:3010']

/** The single origin value sent back in Access-Control-Allow-Origin. Never '*'. */
export function getAllowedOrigin(config: { allowedOrigin?: string }): string {
  return config.allowedOrigin || DEFAULT_SITE_ORIGIN
}

/** Full allowlist used to validate the request's Origin header. */
export function getAllowedOriginsList(config: { allowedOrigin?: string }): string[] {
  const list = [getAllowedOrigin(config)]
  if (import.meta.dev) list.push(...DEV_ORIGINS)
  return list
}

export function isOriginAllowed(origin: string | null | undefined, config: { allowedOrigin?: string }): boolean {
  if (!origin) return false
  return getAllowedOriginsList(config).includes(origin)
}

// ---- Minimal Cloudflare KV namespace shape (avoids depending on @cloudflare/workers-types) ----
export interface KVNamespaceLike {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

export function getRateLimitKv(event: any): KVNamespaceLike | undefined {
  const kv = event?.context?.cloudflare?.env?.RATE_LIMIT_KV
  if (!kv) {
    console.warn('RATE_LIMIT_KV binding is not configured — skipping rate limit / idempotency checks.')
    return undefined
  }
  return kv
}

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_SECONDS = 600 // 10 minutes

/** Returns true when the request should be allowed, false when the limit was exceeded. */
export async function checkRateLimit(kv: KVNamespaceLike | undefined, ip: string): Promise<boolean> {
  if (!kv || !ip) return true
  const key = `ratelimit:${ip}`
  try {
    const current = await kv.get(key)
    const count = current ? parseInt(current, 10) || 0 : 0
    if (count >= RATE_LIMIT_MAX) return false
    await kv.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS })
    return true
  } catch (e) {
    console.error('Rate limit check failed:', e instanceof Error ? e.message : e)
    return true // fail open — never block legitimate traffic over infra hiccups
  }
}

const IDEMPOTENCY_TTL_SECONDS = 300 // 5 minutes

/** Returns the cached response body if this idempotency key was already processed. */
export async function getIdempotentResult(kv: KVNamespaceLike | undefined, key: string): Promise<unknown | null> {
  if (!kv || !key) return null
  try {
    const cached = await kv.get(`idem:${key}`)
    return cached ? JSON.parse(cached) : null
  } catch (e) {
    console.error('Idempotency lookup failed:', e instanceof Error ? e.message : e)
    return null
  }
}

export async function storeIdempotentResult(kv: KVNamespaceLike | undefined, key: string, result: unknown): Promise<void> {
  if (!kv || !key) return
  try {
    await kv.put(`idem:${key}`, JSON.stringify(result), { expirationTtl: IDEMPOTENCY_TTL_SECONDS })
  } catch (e) {
    console.error('Idempotency store failed:', e instanceof Error ? e.message : e)
  }
}

/** Verifies a Cloudflare Turnstile token server-side. */
export async function verifyTurnstile(secret: string, token: string, remoteIp: string): Promise<boolean> {
  if (!secret) return true // graceful degradation — no secret configured yet
  if (!token) return false

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, response: token, remoteip: remoteIp }),
        signal: controller.signal,
      })
      const result = await resp.json().catch(() => ({ success: false }))
      return !!result.success
    } finally {
      clearTimeout(timeout)
    }
  } catch (e) {
    console.error('Turnstile verification failed:', e instanceof Error ? e.message : e)
    return false
  }
}
