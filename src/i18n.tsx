import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { content, type Lang } from './content'
import { parseRoute, pathFor, type Route } from './route'

const Context = createContext<Route & { setLang: (lang: Lang) => void }>({ ...parseRoute('/'), setLang: () => {} })

// The language and page come from the URL. Switching the language keeps the page, the query
// (e.g. the CV picked on /cv/) and the scroll position, without a reload.
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
  }, [route])

  const setLang = (lang: Lang) => {
    const { search, hash, pathname } = window.location
    const next = pathFor(lang, route.page) + search + hash
    if (next !== pathname + search + hash) window.history.pushState(null, '', next)
    flushSync(() => setRoute({ ...route, lang }))
  }

  return <Context.Provider value={{ ...route, setLang }}>{children}</Context.Provider>
}

// Returns the current language, page and content, plus the language setter.
export function useLang() {
  const { lang, page, setLang } = useContext(Context)
  return { lang, page, setLang, c: content[lang] }
}
