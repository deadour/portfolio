import { defaultLang, type Lang } from './content'

// The site has two pages in two languages. The URL decides both, so a link can open the
// Spanish version directly. Shared by the app and the build (see vite.config.ts).
export type Page = 'home' | 'services'
export type Route = { lang: Lang; page: Page }

const PATHS: Record<Lang, Record<Page, string>> = {
  en: { home: '/', services: '/services' },
  es: { home: '/es/', services: '/es/servicios' },
}

export const routes: Route[] = [
  { lang: 'en', page: 'home' },
  { lang: 'es', page: 'home' },
  { lang: 'en', page: 'services' },
  { lang: 'es', page: 'services' },
]

export function pathFor(lang: Lang, page: Page) {
  return PATHS[lang][page]
}

// Tolerates a missing or extra trailing slash and a trailing .html. Unknown paths fall back to the English home.
export function parseRoute(pathname: string): Route {
  const clean = pathname.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/\/+$/, '') || '/'
  for (const route of routes) {
    const path = pathFor(route.lang, route.page).replace(/\/+$/, '') || '/'
    if (clean === path) return route
  }
  return { lang: defaultLang, page: 'home' }
}

// File each route is written to in dist/. Cloudflare Pages serves /services.html at /services
// and /es/index.html at /es/.
export function fileFor({ lang, page }: Route) {
  const path = pathFor(lang, page)
  return path.endsWith('/') ? `${path.slice(1)}index.html` : `${path.slice(1)}.html`
}
