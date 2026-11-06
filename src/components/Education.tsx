import Section from './Section'
import { figures } from './Project'
import { toLightbox, useLightbox } from './Lightbox'
import { education } from '../data/education'
import { t } from '../data/localize'
import { languages } from '../data/skills'
import { useLang } from '../i18n'

export default function Education() {
  const { lang, c } = useLang()
  const openLightbox = useLightbox()

  return (
    <Section id="education" title={c.sections.education}>
      <ol className="space-y-10">
        {education.map((item) => (
          <li key={item.id} className="flex items-start gap-3.5">
            {item.logo && (
              <img src={item.logo} alt="" width={40} height={40} className="mt-0.5 size-10 shrink-0 rounded-lg border border-line object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold text-fg">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="link">
                      {item.institution}
                    </a>
                  ) : (
                    item.institution
                  )}
                </h3>
                <p className="text-sm text-muted">{t(item.period, lang)}</p>
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {t(item.location, lang)}
                {item.exchange && <span className="text-accent"> · {c.ui.exchange}</span>}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed">{t(item.degree, lang)}</p>
              {item.description && <p className="mt-2 max-w-2xl text-sm leading-relaxed">{t(item.description, lang)}</p>}
              {item.images && item.images.length > 0 && (
                <button
                  type="button"
                  onClick={() => openLightbox(toLightbox(figures(item.images, lang), false), 0)}
                  className="link mt-3 text-sm"
                >
                  {c.ui.viewPhotos.replace('{n}', String(item.images.length))}
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>

      <h3 className="mt-14 text-xs font-medium tracking-wide text-muted uppercase">{c.sections.languages}</h3>
      <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {languages.map((item) => (
          <li key={item.name.en}>
            <span className="text-fg">{t(item.name, lang)}</span> <span className="text-sm text-muted">· {t(item.level, lang)}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
