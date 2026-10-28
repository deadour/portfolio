import { defaultLang, type Lang } from './content'

// One page in two languages: / in English and /es/ in Spanish. The URL decides the language,
// so a link can open the Spanish version directly. Shared by the app and the build (see vite.config.ts).
export type Route = { lang: Lang }

const PATHS: Record<Lang, string> = { en: '/', es: '/es/' }

export const routes: Route[] = [{ lang: 'en' }, { lang: 'es' }]

export function pathFor(lang: Lang) {
  return PATHS[lang]
}

// Anything under /es is Spanish (including the old /es/servicios); everything else is English.
export function parseRoute(pathname: string): Route {
  return { lang: /^\/es(\/|\.html$|$)/.test(pathname) ? 'es' : defaultLang }
}

// The former services page now lives on the home page, in the solutions section.
export const isLegacyServicesPath = (pathname: string) => /^\/(es\/servicios|services)(\.html)?\/?$/.test(pathname)

// File each route is written to in dist/. Cloudflare Pages serves /es/index.html at /es/.
export function fileFor({ lang }: Route) {
  return `${PATHS[lang].slice(1)}index.html`
}
