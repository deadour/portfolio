import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { languages } from '../content'
import { useLang } from '../i18n'
import { pathFor } from '../route'
import Link from './Link'
import Wordmark from './Wordmark'
import { shuffleSketches } from './hero/pageSlots'

// Icon buttons and language links share a 36px hit area, comfortable on touch screens.
const iconButton = 'grid size-9 place-items-center rounded-md text-muted hover:text-fg'

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
      className={iconButton}
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
      className={iconButton}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    </button>
  )
}

export default function Header() {
  const { lang, page, setLang, c } = useLang()
  const home = pathFor(lang, 'home')
  const nav = [
    { label: c.ui.nav.work, href: `${home}#work` },
    { label: c.ui.nav.services, href: pathFor(lang, 'services'), current: page === 'services' },
    { label: c.ui.nav.experience, href: `${home}#experience` },
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
      className="site-header sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-4 pt-4 pb-2 sm:flex-nowrap sm:py-5"
    >
      <Link href={`${home}#top`} aria-label={site.domain} className="font-mono text-sm text-muted hover:text-fg">
        <Wordmark value={site.domain} />
      </Link>
      {/* On phones the links take a full row under the logo and controls. */}
      <nav aria-label="Main" className="order-last -mx-1 w-full sm:order-none sm:mx-0 sm:ml-auto sm:w-auto">
        <ul className="flex gap-1 overflow-x-auto text-sm text-muted sm:gap-6">
          {nav.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={`block rounded-md px-1 py-2 hover:text-fg sm:p-0 ${item.current ? 'text-fg' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-1 sm:ml-2">
        <div role="group" aria-label={c.ui.language} className="flex items-center text-xs font-medium">
          {languages.map((code, i) => (
            <span key={code} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="text-line">
                  |
                </span>
              )}
              <a
                href={pathFor(code, page)}
                hrefLang={code}
                lang={code}
                aria-current={lang === code ? 'true' : undefined}
                onClick={(e) => {
                  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                  e.preventDefault()
                  setLang(code)
                }}
                className={`grid h-9 min-w-9 place-items-center rounded-md px-2 uppercase ${
                  lang === code ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {code}
              </a>
            </span>
          ))}
        </div>
        <ShuffleButton />
        <ThemeToggle />
      </div>
    </header>
  )
}
