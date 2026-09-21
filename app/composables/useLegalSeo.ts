// Per-page SEO, ported from src/seo.js: title, description, canonical, OG,
// twitter card and JSON-LD (LegalService + WebPage).

export function deriveDescription(html: string): string {
  const text = (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= 158) return text
  const cut = text.slice(0, 158)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

interface LegalSeoOptions {
  title: string
  description: string
  path: string
}

export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'ООО «Легал Сервис»',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/logo.png`,
    telephone: '+7 (861) 290-11-55',
    email: 'legal-23@yandex.ru',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Краснодар',
      streetAddress: 'ул. Дзержинского, 8/1',
      addressCountry: 'RU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 45.0573012, longitude: 38.9794533 },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '₽₽',
    sameAs: ['https://vk.com/legal23ru'],
  }
}

export function webPageJsonLd(siteName: string, title: string, url: string, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title || siteName,
    url,
    inLanguage: 'ru-RU',
    isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
  }
}

export function useLegalSeo({ title, description, path }: LegalSeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl.replace(/\/+$/, '')
  const siteName = config.public.siteName
  const url = siteUrl + (path === '/' ? '/' : path)
  const image = `${siteUrl}/images/logo.png`

  useSeoMeta({
    title,
    description,
    robots: 'index, follow',
    ogType: 'website',
    ogSiteName: siteName,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    ogLocale: 'ru_RU',
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(organizationJsonLd(siteUrl)),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(webPageJsonLd(siteName, title, url, siteUrl)),
      },
    ],
  })
}
