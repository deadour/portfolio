import type { CSSProperties } from 'react'
import { site } from '../data/site'
import { experience } from '../data/experience'
import { formatMonth, t } from '../data/localize'
import { useLang } from '../i18n'
import { pathFor } from '../route'
import LinkIcon from './LinkIcon'

const iconLink = 'grid size-10 place-items-center rounded-md border border-line bg-surface text-fg hover:border-muted'

// Staggered entrance order for each block (see .enter in index.css).
const step = (i: number) => ({ '--i': i }) as CSSProperties

// Who I am, what I do, where I work now and where to see it, in the first screen.
export default function Hero() {
  const { lang, c } = useLang()
  const job = experience[0]
  const current = c.hero.current
    .replace('{role}', t(job.role, lang))
    .replace('{company}', job.company.replace(/ SRL$/, ''))
    .replace('{since}', formatMonth(job.start, lang))

  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-16 sm:pt-16 sm:pb-24">
      <img
        src={site.portrait}
        alt={c.ui.portraitAlt}
        width={112}
        height={112}
        style={step(0)}
        className="enter size-24 rounded-full object-cover ring-1 ring-line sm:size-28"
      />
      <h1 id="hero-title" style={step(1)} className="enter mt-8 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {site.name}
      </h1>
      <p style={step(2)} className="enter mt-3 text-lg text-fg sm:text-xl">
        {t(site.headline, lang)}
      </p>
      <p style={step(2)} className="enter mt-2 flex items-center gap-1.5 text-sm text-muted">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
        {t(site.location, lang)}
      </p>
      <p style={step(3)} className="enter mt-8 max-w-xl text-lg leading-relaxed">
        {t(site.summary, lang)}
      </p>
      <p style={step(4)} className="enter mt-5 flex max-w-xl items-center gap-2.5 text-sm text-muted">
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
        {current}
      </p>

      <div style={step(5)} className="enter mt-10 flex flex-wrap gap-3">
        <a href="#work" className="btn-primary">
          {c.hero.work}
          <span aria-hidden="true">↓</span>
        </a>
        <a href={pathFor(lang, 'cv')} className="btn">
          <LinkIcon name="download" />
          {c.hero.cv}
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className={iconLink}>
          <LinkIcon name="github" />
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className={iconLink}>
          <LinkIcon name="linkedin" />
        </a>
        <a href={`mailto:${site.email}`} aria-label={site.email} title={site.email} className={iconLink}>
          <LinkIcon name="email" />
        </a>
      </div>
    </section>
  )
}
