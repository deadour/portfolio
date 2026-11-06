import { defaultLang, languages, type Lang } from './content'
import type { Page } from './content/types'

// Three pages in two languages. The URL decides both, so any page can be shared in either language.
// Shared by the app and the build (see vite.config.ts), which writes one HTML file per route.
export type Route = { lang: Lang; page: Page }

const PATHS: Record<Lang, Record<Page, string>> = {
  en: { home: '/', cv: '/cv/', services: '/services/' },
  es: { home: '/es/', cv: '/es/cv/', services: '/es/servicios/' },
}

const pages: Page[] = ['home', 'cv', 'services']
export const routes: Route[] = languages.flatMap((lang) => pages.map((page) => ({ lang, page })))

export function pathFor(lang: Lang, page: Page = 'home') {
  return PATHS[lang][page]
}

// Anything under /es is Spanish; everything else is English. Unknown paths show the home page.
export function parseRoute(pathname: string): Route {
  const lang: Lang = /^\/es(\/|\.html$|$)/.test(pathname) ? 'es' : defaultLang
  const rest = lang === 'es' ? pathname.replace(/^\/es/, '') : pathname
  const page: Page = /^\/cv(\/|\.html)?$/.test(rest)
    ? 'cv'
    : /^\/(services|servicios)(\/|\.html)?$/.test(rest)
      ? 'services'
      : 'home'
  return { lang, page }
}

// File each route is written to in dist/. Cloudflare Pages serves /es/cv/index.html at /es/cv/.
export function fileFor({ lang, page }: Route) {
  return `${pathFor(lang, page).slice(1)}index.html`
}
