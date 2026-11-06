import Section from './Section'
import Disclosure from './Disclosure'
import { verifiedCertifications } from '../data/certifications'
import { formatMonth } from '../data/localize'
import type { Certification } from '../data/types'
import { useLang } from '../i18n'

// Only credentials with a public link. Featured ones are visible; the rest go behind "Show N more".
const featured = verifiedCertifications.filter((cert) => cert.featured)
const others = verifiedCertifications.filter((cert) => !cert.featured)

export default function Certifications() {
  const { lang, c } = useLang()

  const list = (items: Certification[]) => (
    <ul className="divide-y divide-line">
      {items.map((cert) => (
        <li key={cert.id} className="flex flex-col items-start gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p lang="es" className="text-fg">
              {cert.title}
            </p>
            <p className="mt-0.5 text-sm text-muted">
              {cert.issuer} · {formatMonth(cert.date, lang)}
            </p>
          </div>
          <a href={cert.url} target="_blank" rel="noreferrer" className="shrink-0 text-sm text-muted underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent">
            {c.ui.credential}
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <Section id="certifications" title={c.sections.certifications}>
      <div className="max-w-2xl border-y border-line">{list(featured)}</div>
      {others.length > 0 && (
        <Disclosure label={c.ui.showMore.replace('{n}', String(others.length))}>
          <div className="mt-2 max-w-2xl border-y border-line">{list(others)}</div>
        </Disclosure>
      )}
    </Section>
  )
}
