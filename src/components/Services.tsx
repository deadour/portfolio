import Section from './Section'
import Link from './Link'
import { site } from '../data/site'
import { useLang } from '../i18n'
import { pathFor } from '../route'

const label = 'text-xs font-medium tracking-wide text-muted uppercase'

// Opens the visitor's mail app with a subject, so business inquiries are easy to spot.
export function inquiryHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

// Short version on the home page: one line per service and a link to the full page.
export function ServicesSummary() {
  const { lang, c } = useLang()
  const page = pathFor(lang, 'services')

  return (
    <Section id="services" title={c.sections.services}>
      <p className="max-w-xl leading-relaxed">{c.services.intro}</p>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {c.services.items.map((item) => (
          <li key={item.id} className="py-4 sm:grid sm:grid-cols-[15rem_1fr] sm:gap-6">
            <Link
              href={`${page}#${item.id}`}
              className="font-medium text-fg underline decoration-transparent underline-offset-4 hover:decoration-accent"
            >
              {item.title}
            </Link>
            <p className="mt-1 text-sm leading-relaxed sm:mt-0">{item.summary}</p>
          </li>
        ))}
      </ul>
      <Link
        href={page}
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
      >
        {c.services.more}
        <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
          →
        </span>
      </Link>
    </Section>
  )
}

// Full services page: intro, one section per service, how I work.
export function ServicesPage() {
  const { lang, c } = useLang()
  const s = c.services
  const home = pathFor(lang, 'home')

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
            href={`${home}#work`}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-muted"
          >
            {c.hero.viewWork}
          </Link>
        </div>
      </section>

      {s.items.map((item) => (
        <Section key={item.id} id={item.id} title={item.title}>
          <div className="max-w-xl space-y-6 leading-relaxed">
            <div>
              <h3 className={label}>{s.labels.problems}</h3>
              <ul className="mt-2 space-y-1.5">
                {item.problems.map((problem) => (
                  <li key={problem} className="relative pl-4">
                    <span aria-hidden="true" className="absolute left-0 text-muted">
                      –
                    </span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={label}>{s.labels.solution}</h3>
              <p className="mt-2">{item.solution}</p>
            </div>
            <div className="border-l-2 border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] pl-4">
              <h3 className={label}>{s.labels.example}</h3>
              <p className="mt-2 text-sm">
                {item.example.text}
                {item.example.project && (
                  <>
                    {' '}
                    <Link
                      href={`${home}#project-${item.example.project}`}
                      className="whitespace-nowrap text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
                    >
                      {s.labels.seeProject}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        </Section>
      ))}

      <Section id="process" title={s.process.title}>
        <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {s.process.steps.map((step, i) => (
            <li key={step.title}>
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-1 font-medium text-fg">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
