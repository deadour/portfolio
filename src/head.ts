import { content, type Lang } from './content'
import { site } from './data/site'
import { pathFor, routes, type Route } from './route'

// Builds the <head> tags of each route at build time (see vite.config.ts), so search engines
// and link previews get the right language, title and description without running JavaScript.

const ORIGIN = `https://${site.domain}`
const LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_AR' }
const NOSCRIPT: Record<Lang, string> = {
  en: 'This site needs JavaScript. You can find my work at',
  es: 'Este sitio necesita JavaScript. Podés ver mi trabajo en',
}

const attr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const url = (route: Route) => ORIGIN + pathFor(route.lang)

function person() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: `${ORIGIN}/`,
    image: ORIGIN + site.portrait,
    jobTitle: 'Software & Data Engineer',
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Resistencia', addressRegion: 'Chaco', addressCountry: 'AR' },
    worksFor: { '@type': 'Organization', name: 'BIAMAQ', url: 'https://biamaq.com.ar' },
    sameAs: [site.github, site.linkedin].filter(Boolean),
  }
  // "<" can't appear raw inside a <script>.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function head(route: Route) {
  const meta = content[route.lang].meta
  const alternates = routes
  const other = alternates.find((r) => r.lang !== route.lang)
  const image = `${ORIGIN}/og.png`
  const tags = [
    `<title>${attr(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    `<link rel="canonical" href="${url(route)}" />`,
    ...alternates.map((r) => `<link rel="alternate" hreflang="${r.lang}" href="${url(r)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url({ lang: 'en' })}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(site.name)}" />`,
    `<meta property="og:url" content="${url(route)}" />`,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:locale" content="${LOCALE[route.lang]}" />`,
    ...(other ? [`<meta property="og:locale:alternate" content="${LOCALE[other.lang]}" />`] : []),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attr(`${site.name} — Software & Data Engineer`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    person(),
  ]
  return tags.join('\n    ')
}

// Fills the <!--head--> and <!--noscript--> regions of index.html and sets <html lang>.
// The markers stay in the output, so a page can be rendered again from another one.
export function renderPage(html: string, route: Route) {
  const noscript = `${site.name} — Software &amp; Data Engineer. ${NOSCRIPT[route.lang]} <a href="${site.github}">github.com/deadour</a>.`
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${route.lang}"`)
    .replace(/<!--head-->[\s\S]*?<!--\/head-->/, `<!--head-->\n    ${head(route)}\n    <!--/head-->`)
    .replace(/<!--noscript-->[\s\S]*?<!--\/noscript-->/, `<!--noscript-->${noscript}<!--/noscript-->`)
}
