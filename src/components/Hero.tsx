import { site } from '../data/site'
import { useLang } from '../i18n'

const secondary =
  'inline-flex items-center rounded-md border border-line px-4 py-2 text-sm font-medium text-fg hover:border-muted'

export default function Hero() {
  const { lang, c } = useLang()
  const cv = site.cv[lang]

  return (
    <section aria-labelledby="hero-title" className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <img
        src={site.portrait}
        alt={c.ui.portraitAlt}
        width={96}
        height={96}
        className="size-20 rounded-full object-cover sm:size-24"
      />
      <h1 id="hero-title" className="mt-8 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-3 text-lg text-muted sm:text-xl">{c.hero.title}</p>
      <p className="mt-8 max-w-xl leading-relaxed">{c.hero.tagline}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#work"
          className="inline-flex items-center rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
        >
          {c.hero.viewWork}
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className={secondary}>
          GitHub
        </a>
        {site.linkedin && (
          <a href={site.linkedin} target="_blank" rel="noreferrer" className={secondary}>
            LinkedIn
          </a>
        )}
        {cv && (
          <a href={cv} download className={secondary}>
            {c.hero.downloadCv}
          </a>
        )}
      </div>
    </section>
  )
}
