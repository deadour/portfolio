import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { content, type Lang } from './content'
import { parseRoute, pathFor, type Route } from './route'

type RouteContext = Route & { go: (href: string, scroll?: boolean) => void }

const Context = createContext<RouteContext>({ ...parseRoute('/'), go: () => {} })

// Language and page come from the URL. Internal links change it without a reload (see Link.tsx).
export function LangProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname))

  useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const meta = content[route.lang].meta[route.page]
    document.documentElement.lang = route.lang
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [route.lang, route.page])

  // Moves to another route. With `scroll`, lands on the #hash target or the top of the page;
  // without it (language switch), the visitor stays where they were.
  const go = (href: string, scroll = true) => {
    const url = new URL(href, window.location.href)
    const next = url.pathname + url.hash
    if (next !== window.location.pathname + window.location.hash) window.history.pushState(null, '', next)
    // Render the new route before scrolling, so the target exists.
    flushSync(() => setRoute(parseRoute(url.pathname)))
    if (!scroll) return
    const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return <Context.Provider value={{ ...route, go }}>{children}</Context.Provider>
}

// Returns the current language, page and content, plus helpers to move between routes.
export function useLang() {
  const { lang, page, go } = useContext(Context)
  const setLang = (next: Lang) => go(pathFor(next, page) + window.location.hash, false)
  return { lang, page, go, setLang, c: content[lang] }
}
