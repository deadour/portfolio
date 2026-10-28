import Section from './Section'
import Link from './Link'
import Solutions from './Solutions'
import { site } from '../data/site'
import { useLang } from '../i18n'
import { pathFor } from '../route'

// Opens the visitor's mail app with a subject, so business inquiries are easy to spot.
export function inquiryHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

// How I work: four short steps. On the home page and the services page.
export function Process() {
  const { c } = useLang()
  const { process } = c.services

  return (
    <Section id="process" title={process.title}>
      <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
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

// Services page: a short intro, the same solutions as the home page, and how I work.
export function ServicesPage() {
  const { lang, c } = useLang()
  const s = c.services

  return (
    <>
      <section aria-labelledby="services-title" className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <p className="enter text-sm text-accent">
          {site.name} · {c.hero.title}
        </p>
        <h1 id="services-title" className="enter mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {s.title}
        </h1>
        <p className="enter mt-6 max-w-xl leading-relaxed">{s.lead}</p>
        <div className="enter mt-8 flex flex-wrap gap-3">
          <a
            href={inquiryHref(s.emailSubject)}
            className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
          >
            {s.cta}
          </a>
          <Link
            href={`${pathFor(lang, 'home')}#work`}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-muted"
          >
            {c.hero.viewWork}
          </Link>
        </div>
      </section>
      <Solutions />
      <Process />
    </>
  )
}
