import type { CSSProperties } from 'react'
import { site } from '../data/site'
import { cvPath } from '../data/cv'
import { t } from '../data/localize'
import { useLang } from '../i18n'
import LinkIcon from './LinkIcon'
import { withLinks } from './Work'

const secondary =
  'inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-muted'
// Same look, square: GitHub and LinkedIn are recognisable by their icon alone.
const iconLink = 'grid size-[38px] place-items-center rounded-md border border-line bg-surface text-fg hover:border-muted'

// Staggered entrance order for each block (see .enter in index.css).
const step = (i: number) => ({ '--i': i }) as CSSProperties

function currentMonth(lang: 'en' | 'es') {
  const parts = new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).formatToParts(new Date())
  const month = parts.find((part) => part.type === 'month')?.value ?? ''
  const year = parts.find((part) => part.type === 'year')?.value ?? ''
  return `${lang === 'es' ? month.charAt(0).toUpperCase() + month.slice(1) : month} ${year}`
}

export default function Hero() {
  const { lang, c } = useLang()

  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-16 sm:pt-16 sm:pb-20">
      <img
        src={site.portrait}
        alt={c.ui.portraitAlt}
        width={128}
        height={128}
        style={step(0)}
        className="enter size-24 rounded-full object-cover ring-1 ring-line sm:size-32"
      />
      <h1
        id="hero-title"
        style={step(1)}
        className="enter mt-8 text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
      >
        {site.name}
      </h1>
      <p style={step(2)} className="enter mt-3 text-lg text-muted sm:text-xl">
        {c.hero.title}
      </p>
      <p style={step(2)} className="enter mt-2 flex items-center gap-1.5 text-sm text-muted">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4 shrink-0 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
        {t(site.location, lang)}
      </p>
      <p style={step(3)} className="enter mt-8 max-w-xl leading-relaxed">
        {c.hero.tagline}
      </p>

      <p style={step(4)} className="enter mt-6 flex max-w-xl gap-3 text-sm leading-relaxed">
        <span className="now-dot mt-1.5 shrink-0" aria-hidden="true" />
        <span>
          <span className="font-medium text-fg">{c.now.label}</span>
          <span className="text-muted"> · {currentMonth(lang)} — </span>
          {withLinks(c.now.text)}
        </span>
      </p>

      <div style={step(5)} className="enter mt-10 flex flex-wrap gap-3">
        <a
          href="#solutions"
          className="group inline-flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
        >
          {c.hero.cta}
          <span aria-hidden="true" className="nudge-down">
            ↓
          </span>
        </a>
        <a href={cvPath('general', lang)} download={`Eduardo-Ramirez-CV-${lang.toUpperCase()}.pdf`} className={secondary}>
          <LinkIcon name="download" />
          {c.hero.downloadCv}
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className={iconLink}>
          <LinkIcon name="github" />
        </a>
        {site.linkedin && (
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className={iconLink}>
            <LinkIcon name="linkedin" />
          </a>
        )}
      </div>
    </section>
  )
}
