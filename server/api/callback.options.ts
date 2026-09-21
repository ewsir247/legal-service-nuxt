// CORS preflight for POST /api/callback.
import { getAllowedOrigin } from '../utils/callbackSecurity'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const allowedOrigin = getAllowedOrigin(config)

  setResponseStatus(event, 204)
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  })
  return null
})
