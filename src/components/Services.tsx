import Section from './Section'
import { site } from '../data/site'
import { useLang } from '../i18n'
import SolutionIcon from './SolutionIcon'

const STEP_ICONS = ['talk', 'proposal', 'build', 'support']

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
            <span className="grid size-8 place-items-center rounded-md bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent">
              <SolutionIcon name={STEP_ICONS[i]} />
            </span>
            <h3 className="mt-2.5 font-medium text-fg">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
