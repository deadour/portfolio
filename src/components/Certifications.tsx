import Section from './Section'
import { certifications } from '../data/certifications'
import { useLang } from '../i18n'

export default function Certifications() {
  const { lang, c } = useLang()
  const month = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' })
  const format = (date: string) => month.format(new Date(`${date}-01T00:00:00Z`))

  return (
    <Section id="certifications" title={c.sections.certifications}>
      <ul className="divide-y divide-line border-y border-line">
        {certifications.map((cert) => (
          <li key={cert.title} className="flex flex-col items-start gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <p lang="es" className="text-sm text-fg">
                {cert.title}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {cert.issuer} · {format(cert.date)}
              </p>
            </div>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-xs text-muted underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent"
              >
                {c.ui.credential}
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
