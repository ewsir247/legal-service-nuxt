// CORS preflight for POST /api/callback.
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const allowedOrigin = config.allowedOrigin || '*'

  setResponseStatus(event, 204)
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  })
  return null
})
