import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { languages } from '../content'
import { useLang } from '../i18n'
import { pathFor } from '../route'
import Wordmark from './Wordmark'
import { shuffleSketches } from './hero/pageSlots'

// Icon buttons and language links share a 36px hit area, comfortable on touch screens.
const iconButton = 'grid size-9 place-items-center rounded-md text-muted hover:text-fg'
const NAV_SECTION_IDS = ['solutions', 'work', 'experience', 'contact'] as const

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
  const { lang, setLang, c } = useLang()
  const nav = [
    { id: 'solutions', label: c.ui.nav.services, href: '#solutions' },
    { id: 'work', label: c.ui.nav.work, href: '#work' },
    { id: 'experience', label: c.ui.nav.experience, href: '#experience' },
    { id: 'contact', label: c.ui.nav.contact, href: '#contact' },
  ]
  // The header stays pinned; its soft backdrop only appears once the page has scrolled.
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  useEffect(() => {
    const sections = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const marker = window.scrollY + 150
      let current = ''
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id
      }
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="site-header sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-4 pt-4 pb-2 sm:flex-nowrap sm:py-5"
    >
      <a href="#top" aria-label={site.domain} className="font-mono text-sm text-muted hover:text-fg">
        <Wordmark value={site.domain} />
      </a>
      {/* On phones the links take a full row under the logo and controls. */}
      <nav aria-label="Main" className="order-last -mx-1 w-full sm:order-none sm:mx-0 sm:ml-auto sm:w-auto">
        <ul className="flex justify-between gap-1 overflow-x-auto pb-1 text-sm text-muted sm:justify-start sm:gap-6 sm:overflow-visible sm:pb-0">
          {nav.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className={`relative flex min-h-11 items-center rounded-md px-1 py-2 hover:text-fg sm:block sm:min-h-0 sm:p-0 ${activeSection === item.id ? 'text-fg after:absolute after:right-1 after:bottom-1 after:left-1 after:h-px after:bg-accent sm:after:right-0 sm:after:bottom-[-0.65rem] sm:after:left-0' : ''}`}
              >
                {item.label}
              </a>
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
                href={pathFor(code)}
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
