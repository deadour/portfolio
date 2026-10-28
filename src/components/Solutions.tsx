import { useEffect, useState } from 'react'
import Link from './Link'
import Pipeline from './Pipeline'
import { useLightbox, toLightbox } from './Lightbox'
import { useLang } from '../i18n'
import { pathFor } from '../route'
import { useReveal } from '../useReveal'
import type { Solution } from '../content/types'

const label = 'text-xs font-medium tracking-wide uppercase'

// What I can solve: one chapter per kind of problem, revealed while scrolling.
// On wide screens a sticky index on the left follows the chapter in view.
export default function Solutions() {
  const { c } = useLang()
  const s = c.solutions
  const [active, setActive] = useState(s.items[0]?.id)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id.replace('solution-', ''))
        }),
      // A chapter counts as active while it crosses the middle of the screen.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    s.items.forEach((item) => {
      const el = document.getElementById(`solution-${item.id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [s.items])

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="grid scroll-mt-28 gap-5 border-t border-line py-12 sm:grid-cols-[9rem_1fr] sm:scroll-mt-16 sm:gap-10 sm:py-16"
    >
      <div className="self-start sm:sticky sm:top-24">
        <h2
          id="solutions-title"
          className="text-lg leading-snug font-semibold tracking-tight text-fg before:mb-3 before:block before:h-0.5 before:w-6 before:rounded-full before:bg-accent sm:text-base"
        >
          {s.title}
        </h2>
        <ol className="mt-6 hidden space-y-1 text-sm sm:block">
          {s.items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#solution-${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`block border-l-2 py-1 pl-3 transition-colors ${
                  active === item.id ? 'border-accent text-fg' : 'border-line text-muted hover:text-fg'
                }`}
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span> {item.tag}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="min-w-0">
        <p className="max-w-xl leading-relaxed">{s.intro}</p>
        {s.items.map((item, i) => (
          <Chapter key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

function Chapter({ item, index }: { item: Solution; index: number }) {
  const { lang, c } = useLang()
  const s = c.solutions
  const ref = useReveal<HTMLElement>()
  const openLightbox = useLightbox()
  const visual = item.visual

  return (
    <article
      ref={ref}
      id={`solution-${item.id}`}
      className="reveal mt-10 scroll-mt-28 border-t border-line pt-10 sm:mt-14 sm:scroll-mt-24 sm:pt-14"
    >
      <p className="font-mono text-xs text-accent">
        {String(index + 1).padStart(2, '0')} · {item.tag}
      </p>
      <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-fg sm:text-[1.75rem]">
        {item.title}
      </h3>
      <p className="mt-4 max-w-xl leading-relaxed">{item.text}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line p-4">
          <p className={`${label} text-muted`}>{s.labels.before}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{item.before}</p>
        </div>
        <div className="rounded-lg border border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] p-4">
          <p className={`${label} text-accent`}>{s.labels.after}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-fg">{item.after}</p>
        </div>
      </div>

      {visual.kind === 'flow' && <Pipeline data={visual.flow} />}

      {visual.kind === 'image' && (
        <figure className="mt-6 sm:max-w-lg">
          <a
            href={visual.image.href ?? visual.image.src}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
              e.preventDefault()
              openLightbox(toLightbox([visual.image]), 0)
            }}
            className="block overflow-hidden rounded-md border border-line"
          >
            <img
              src={visual.image.src}
              alt={visual.image.alt}
              width={960}
              height={600}
              loading="lazy"
              className="h-auto w-full transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100"
            />
          </a>
          <figcaption className="mt-2 text-xs text-muted">{visual.note}</figcaption>
        </figure>
      )}

      {visual.kind === 'example' && (
        <figure className="mt-6 rounded-lg border border-dashed border-line p-4 sm:max-w-lg">
          <figcaption className={`${label} text-muted`}>{visual.label}</figcaption>
          <p className="mt-3 rounded border border-line bg-bg px-2.5 py-1.5 font-mono text-xs text-fg">{visual.input}</p>
          <p aria-hidden="true" className="my-1.5 pl-3 text-accent">
            ↓
          </p>
          <dl className="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1.5 rounded border border-line bg-surface px-2.5 py-2 text-sm">
            {visual.output.map((row) => (
              <div key={row.name} className="contents">
                <dt className="text-muted">{row.name}</dt>
                <dd className="text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </figure>
      )}

      <p className="mt-6 flex gap-2.5 text-sm leading-relaxed">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mt-0.5 size-4 shrink-0 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <span>
          <span className="font-medium text-fg">{s.labels.proof}:</span> {item.proof.text}{' '}
          {item.proof.status && (
            <span className="mr-1 rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-0.5 text-xs font-medium whitespace-nowrap text-accent">
              {item.proof.status}
            </span>
          )}
          <Link
            href={`${pathFor(lang, 'home')}#project-${item.proof.project}`}
            className="whitespace-nowrap text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            {s.labels.seeProject}
            <span aria-hidden="true"> →</span>
          </Link>
        </span>
      </p>
    </article>
  )
}
