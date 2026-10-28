import Section from './Section'
import { site } from '../data/site'
import { useLang } from '../i18n'

// Opens the visitor's mail app with a subject, so business inquiries are easy to spot.
export function inquiryHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

// How I work: four short steps.
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
