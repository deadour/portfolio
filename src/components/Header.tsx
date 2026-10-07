import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { languages } from '../content'
import { useLang } from '../i18n'
import Wordmark from './Wordmark'
import { shuffleSketches } from './hero/pageSlots'

function ThemeToggle() {
  const { c } = useLang()
  // The initial theme is set by an inline script in index.html before the first paint.
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const label = dark ? c.ui.themeToLight : c.ui.themeToDark

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
      aria-label={label}
      title={label}
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

// Small easter egg: picks a new set of background sketches and positions.
function ShuffleButton() {
  const { c } = useLang()
  return (
    <button
      type="button"
      onClick={shuffleSketches}
      aria-label={c.ui.shuffle}
      title={c.ui.shuffle}
      className="grid size-8 place-items-center rounded-md text-muted hover:text-fg"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    </button>
  )
}

export default function Header() {
  const { lang, setLang, c } = useLang()
  const nav = [
    { label: c.ui.nav.work, href: '#work' },
    { label: c.ui.nav.experience, href: '#experience' },
    { label: c.ui.nav.contact, href: '#contact' },
  ]
  // The header stays pinned; its soft backdrop only appears once the page has scrolled.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="site-header sticky top-0 z-40 flex items-center justify-between gap-4 py-5"
    >
      <a href="#top" aria-label={site.domain} className="font-mono text-sm text-muted hover:text-fg">
        <Wordmark value={site.domain} />
      </a>
      <div className="flex items-center gap-4 sm:gap-6">
        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex gap-6 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <div role="group" aria-label={c.ui.language} className="flex items-center text-xs font-medium">
            {languages.map((code, i) => (
              <span key={code} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="text-line">
                    |
                  </span>
                )}
                <button
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
              </span>
            ))}
          </div>
          <ShuffleButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
