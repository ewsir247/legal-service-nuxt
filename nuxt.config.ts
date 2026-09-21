// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-20',
  ssr: true,
  devtools: { enabled: false },

  css: ['~/assets/style.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Легал Сервис — юридические услуги, экспертиза и оценка в Краснодаре',
      meta: [
        { name: 'theme-color', content: '#203363' },
      ],
      link: [
        // TODO: these are the full-size logo, not real resized favicons.
        // No image-resize tool (sharp/ImageMagick) is available in this
        // environment to generate proper 16x16 / 32x32 / 180x180 PNGs.
        // Replace with actually-resized favicon-16x16.png, favicon-32x32.png
        // and apple-touch-icon.png (180x180) when available.
        { rel: 'icon', href: '/images/logo.png', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/images/logo.png', sizes: '180x180' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
        { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css', rel: 'stylesheet' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap&subset=cyrillic', rel: 'stylesheet' },
      ],
      // Bootstrap JS bundle (Modal/Carousel/Collapse/etc.) removed — grep confirms
      // no `data-bs-*` attributes or `bootstrap.*`/`window.bootstrap` calls anywhere
      // in app/ or server/. Only Bootstrap's CSS grid/card/utility classes are used,
      // and that stylesheet above is untouched.
    },
  },

  runtimeConfig: {
    bitrixWebhookUrl: process.env.BITRIX_WEBHOOK_URL || '',
    bitrixEntity: process.env.BITRIX_ENTITY || 'lead',
    bitrixSourceId: process.env.BITRIX_SOURCE_ID || 'WEB',
    bitrixAssignedById: process.env.BITRIX_ASSIGNED_BY_ID || '',
    // Never falls back to '*' — see server/utils/callbackSecurity.ts.
    allowedOrigin: process.env.ALLOWED_ORIGIN || 'https://legal-service-nuxt.pages.dev',
    turnstileSecretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://legal-service-nuxt.pages.dev',
      siteName: 'Легал Сервис',
      dgisApiKey: process.env.NUXT_PUBLIC_2GIS_API_KEY || '',
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
    },
  },

  nitro: {
    preset: 'cloudflare-pages',
  },

  // Cloudflare Pages' static `public/_headers` file only applies to requests
  // served directly as static assets (e.g. /_nuxt/*.js, excluded from the
  // worker via _routes.json). Every other route — SSR HTML pages, /api/*,
  // the 404/500 error pages — is handled entirely by the Nitro worker and
  // never touches Cloudflare's static header matching, so it would otherwise
  // ship with none of the security headers below. Keep these in sync with
  // public/_headers (same values) so both code paths agree.
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        // 'unsafe-inline' on script-src is required because Nuxt SSR emits an
        // inline hydration/state <script> on every page (content varies per
        // request/build, so a fixed hash/nonce isn't practical here without
        // adding nonce plumbing). Without it the hydration script is blocked
        // by the browser, client JS never boots, and every .reveal element
        // (opacity:0 until IntersectionObserver adds .is-visible) stays
        // permanently invisible — this exact regression happened 2026-09-21
        // when SSR pages first started actually receiving this CSP.
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://mapgl.2gis.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://mapgl.2gis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.openstreetmap.org https://*.2gis.com https://*.maps.2gis.com; connect-src 'self' https://*.2gis.com https://*.maps.2gis.com https://challenges.cloudflare.com; frame-src https://www.openstreetmap.org https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      },
    },
  },
})
