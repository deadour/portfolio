import Section from './Section'
import { experience } from '../data/experience'
import { projectById } from '../data/projects'
import { formatPeriod, t } from '../data/localize'
import { useLang } from '../i18n'

export default function Experience() {
  const { lang, c } = useLang()

  return (
    <Section id="experience" title={c.sections.experience}>
      <ol className="space-y-12">
        {experience.map((job) => (
          <li key={job.id}>
            <div className="flex items-start gap-3.5">
              {job.logo && (
                <img src={job.logo} alt="" width={40} height={40} className="mt-0.5 size-10 shrink-0 rounded-lg border border-line object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold text-fg">{t(job.role, lang)}</h3>
                  <p className="text-sm text-muted">{formatPeriod(job.start, job.end, lang)}</p>
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  {job.href ? (
                    <a href={job.href} target="_blank" rel="noreferrer" className="link font-medium">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  {' · '}
                  {t(job.meta, lang)}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed">{t(job.description, lang)}</p>
            <ul className="mt-4 max-w-2xl space-y-2.5 text-sm leading-relaxed">
              {job.bullets.map((bullet) => (
                <li key={bullet.id} className="relative pl-4">
                  <span aria-hidden="true" className="absolute left-0 text-muted">
                    –
                  </span>
                  {t(bullet.text, lang)}
                  {bullet.project && (
                    <a href={`#project-${bullet.project}`} className="ml-1.5 text-xs whitespace-nowrap text-muted hover:text-fg" aria-label={`${c.ui.details}: ${t(projectById[bullet.project].title, lang)}`}
                      title={t(projectById[bullet.project].title, lang)}>
                      ↓
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
