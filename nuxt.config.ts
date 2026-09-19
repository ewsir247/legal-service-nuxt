// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
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
        { rel: 'icon', href: '/images/logo.png', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/images/logo.png' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
        { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css', rel: 'stylesheet' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap&subset=cyrillic', rel: 'stylesheet' },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js', body: true },
      ],
    },
  },

  runtimeConfig: {
    bitrixWebhookUrl: process.env.BITRIX_WEBHOOK_URL || '',
    bitrixEntity: process.env.BITRIX_ENTITY || 'lead',
    bitrixSourceId: process.env.BITRIX_SOURCE_ID || 'WEB',
    bitrixAssignedById: process.env.BITRIX_ASSIGNED_BY_ID || '',
    allowedOrigin: process.env.ALLOWED_ORIGIN || '*',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://ewsir.space',
      siteName: 'Легал Сервис',
      dgisApiKey: process.env.NUXT_PUBLIC_2GIS_API_KEY || '',
    },
  },

  nitro: {
    preset: 'cloudflare-pages',
  },
})
