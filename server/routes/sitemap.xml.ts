// Minimal static sitemap for the site's real routes (see app/pages/*.vue).
// Uses the configured siteUrl so it never hardcodes a domain.
const ROUTES = ['/', '/about', '/reviews', '/articles', '/privacy']

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/+$/, '')

  const urls = ROUTES.map((route) => {
    const loc = siteUrl + (route === '/' ? '/' : route)
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
