import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { content, type Lang } from './content'
import { isLegacyServicesPath, parseRoute, pathFor, type Route } from './route'

const Context = createContext<Route & { setLang: (lang: Lang) => void }>({ ...parseRoute('/'), setLang: () => {} })

// The language comes from the URL. Switching it changes the URL without a reload or losing the scroll position.
export function LangProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname))

  useEffect(() => {
    // Old links to the former services page land on the solutions section of the same page.
    if (isLegacyServicesPath(window.location.pathname)) {
      window.history.replaceState(null, '', `${pathFor(route.lang)}#solutions`)
      requestAnimationFrame(() => document.getElementById('solutions')?.scrollIntoView())
    }
    const onPop = () => setRoute(parseRoute(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const { meta } = content[route.lang]
    document.documentElement.lang = route.lang
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [route.lang])

  const setLang = (lang: Lang) => {
    const next = pathFor(lang) + window.location.hash
    if (next !== window.location.pathname + window.location.hash) window.history.pushState(null, '', next)
    flushSync(() => setRoute({ lang }))
  }

  return <Context.Provider value={{ ...route, setLang }}>{children}</Context.Provider>
}

// Returns the current language and its content, plus the setter.
export function useLang() {
  const { lang, setLang } = useContext(Context)
  return { lang, setLang, c: content[lang] }
}
