import { useState } from 'react'
import { site } from '../data/site'
import { ui } from '../data/ui'
import { useLang, type Lang } from '../i18n'

const nav = [
  { label: ui.nav.work, href: '#work' },
  { label: ui.nav.experience, href: '#experience' },
  { label: ui.nav.contact, href: '#contact' },
]

const langs: Lang[] = ['en', 'es']

function ThemeToggle() {
  const { t } = useLang()
  // The initial theme is set by an inline script in index.html before the first paint.
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage unavailable
    }
    setDark(!dark)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(dark ? ui.themeToLight : ui.themeToDark)}
      title={t(dark ? ui.themeToLight : ui.themeToDark)}
      className="grid size-8 place-items-center rounded-md text-muted hover:text-fg"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  )
}

export default function Header() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <a href="#top" className="font-mono text-sm text-muted hover:text-fg">
        {site.domain}
      </a>
      <div className="flex items-center gap-4 sm:gap-6">
        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex gap-6 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-fg">
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <div role="group" aria-label={t(ui.language)} className="flex text-xs font-medium">
            {langs.map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-md px-2 py-1.5 uppercase ${
                  lang === code ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
