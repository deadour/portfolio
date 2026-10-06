import { site } from '../data/site'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const secondary =
  'inline-flex items-center rounded-md border border-line px-4 py-2 text-sm font-medium text-fg hover:border-muted'

export default function Hero() {
  const { t } = useLang()

  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-20 sm:pt-28 sm:pb-28">
      <h1 id="hero-title" className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-3 text-lg text-muted sm:text-xl">{t(site.title)}</p>
      <p className="mt-8 max-w-xl leading-relaxed">{t(site.tagline)}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#work"
          className="inline-flex items-center rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
        >
          {t(ui.viewProjects)}
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className={secondary}>
          GitHub
        </a>
        {site.linkedin && (
          <a href={site.linkedin} target="_blank" rel="noreferrer" className={secondary}>
            LinkedIn
          </a>
        )}
      </div>
    </section>
  )
}
