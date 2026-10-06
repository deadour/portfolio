import { site } from '../data/site'

const secondary =
  'inline-flex items-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-zinc-50'

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-20 sm:pt-28 sm:pb-28">
      <h1 id="hero-title" className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-3 text-lg text-zinc-400 sm:text-xl">{site.title}</p>
      <p className="mt-8 max-w-xl leading-relaxed text-zinc-300">{site.tagline}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#work"
          className="inline-flex items-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
        >
          View projects
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
