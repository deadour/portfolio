import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, defaultLang, languages, type Lang } from './content'

const STORAGE_KEY = 'lang'

// English unless the visitor picked a language before. No browser or location detection.
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (languages.includes(saved as Lang)) return saved as Lang
  } catch {
    // storage unavailable
  }
  return defaultLang
}

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: defaultLang,
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    const { meta } = content[lang]
    document.documentElement.lang = lang
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage unavailable
    }
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

// Returns the current language, its content and the setter.
export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  return { lang, setLang, c: content[lang] }
}
