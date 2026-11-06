import Section from './Section'
import { site } from '../data/site'
import { useLang } from '../i18n'
import { pathFor } from '../route'

// Opens the visitor's mail app with a subject, so business inquiries are easy to spot.
export function inquiryHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

// Top of the services page: who it's for and the way in.
export function ServicesIntro() {
  const { c } = useLang()
  const s = c.services
  return (
    <section aria-labelledby="services-title" className="pt-10 pb-6 sm:pt-16">
      <p className="enter font-mono text-sm text-accent">{s.eyebrow}</p>
      <h1 id="services-title" className="enter mt-3 max-w-2xl text-4xl leading-[1.1] font-semibold tracking-tight text-fg sm:text-5xl">
        {s.title}
      </h1>
      <p className="enter mt-5 max-w-xl text-lg leading-relaxed">{s.intro}</p>
      <div className="enter mt-8 flex flex-wrap gap-3">
        <a href={inquiryHref(s.emailSubject)} className="btn-primary">
          {s.cta}
        </a>
      </div>
    </section>
  )
}

// How I work: four short steps.
export function Process() {
  const { c } = useLang()
  const { process } = c.services

  return (
    <Section id="process" title={process.title}>
      <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-4">
        {process.steps.map((step, i) => (
          <li key={step.title}>
            <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 font-medium text-fg">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

// Home page: a short block for companies, pointing to the services page.
export function CompaniesTeaser() {
  const { lang, c } = useLang()
  return (
    <Section id="companies" title={c.companies.title}>
      <p className="max-w-xl text-lg leading-relaxed text-fg">{c.companies.text}</p>
      <a href={pathFor(lang, 'services')} className="btn mt-6">
        {c.companies.cta} <span aria-hidden="true">→</span>
      </a>
    </Section>
  )
}
