import type { CSSProperties } from 'react'
import { site } from '../data/site'
import { useLang } from '../i18n'
import { pathFor } from '../route'
import Link from './Link'
import LinkIcon from './LinkIcon'

const secondary =
  'inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-muted'
// Same look, square: GitHub and LinkedIn are recognisable by their icon alone.
const iconLink = 'grid size-[38px] place-items-center rounded-md border border-line bg-surface text-fg hover:border-muted'

// Staggered entrance order for each block (see .enter in index.css).
const step = (i: number) => ({ '--i': i }) as CSSProperties

export default function Hero() {
  const { lang, c } = useLang()
  const cv = site.cv[lang]

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
        {site.location}
      </p>
      <p style={step(3)} className="enter mt-8 max-w-xl leading-relaxed">
        {c.hero.tagline}
      </p>

      <p style={step(4)} className="enter mt-6 flex max-w-xl gap-3 text-sm leading-relaxed">
        <span className="now-dot mt-1.5 shrink-0" aria-hidden="true" />
        <span>
          <span className="font-medium text-fg">{c.now.label}</span>
          <span className="text-muted"> · {c.now.date} — </span>
          {c.now.text}
        </span>
      </p>

      <div style={step(5)} className="enter mt-10 flex flex-wrap gap-3">
        <a
          href="#work"
          className="group inline-flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
        >
          {c.hero.viewWork}
          <span aria-hidden="true" className="nudge-down">
            ↓
          </span>
        </a>
        <Link href={pathFor(lang, 'services')} className={`group ${secondary}`}>
          {c.hero.services}
          <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
            →
          </span>
        </Link>
        {cv && (
          <a href={cv} download className={secondary}>
            <LinkIcon name="download" />
            {c.hero.downloadCv}
          </a>
        )}
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
