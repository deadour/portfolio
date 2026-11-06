import { useEffect, useRef, useState } from 'react'
import { ProjectLogo, figures, useProjectDialog } from './Project'
import { projectById } from '../data/projects'
import { t } from '../data/localize'
import type { ProjectId } from '../data/types'
import type { Solution } from '../content/types'
import { useLang } from '../i18n'
import { useReveal } from '../useReveal'

// What I can solve for a company: an overview of every kind of work, then one block per kind
// with a real case in one sentence. Projects open in a dialog, so the reader keeps their place.
export default function Solutions() {
  const { c } = useLang()
  const s = c.services.solutions
  const onOpen = useProjectDialog()

  return (
    <section id="solutions" aria-label={c.services.eyebrow} className="scroll-mt-24 pb-14 sm:pb-20">
      {/* Everything at a glance; each tile jumps to its block. */}
      <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {s.items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#solution-${item.id}`}
              className="flex h-full items-baseline gap-2 rounded-lg border border-line bg-surface px-3 py-3 text-sm font-medium text-fg hover:border-muted sm:px-4"
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              {item.tag}
            </a>
          </li>
        ))}
      </ol>

      {s.items.map((item, i) => (
        <Block key={item.id} item={item} index={i} onOpen={onOpen} />
      ))}
    </section>
  )
}

// One block, read top to bottom: what I can solve, then the real case with its screens,
// how I solved it in one sentence and a button to the full details.
function Block({ item, index, onOpen }: { item: Solution; index: number; onOpen: (id: ProjectId) => void }) {
  const { lang, c } = useLang()
  const s = c.services.solutions
  const ref = useReveal<HTMLElement>()
  const project = projectById[item.case.project]

  return (
    <article ref={ref} id={`solution-${item.id}`} className="reveal mt-16 scroll-mt-28 sm:mt-24 sm:scroll-mt-24">
      <p className="font-mono text-sm text-accent">
        {String(index + 1).padStart(2, '0')} · {item.tag}
      </p>
      <h3 className="mt-3 max-w-2xl text-3xl leading-[1.1] font-semibold tracking-tight text-fg sm:text-[2.75rem]">
        {item.title}
      </h3>
      <p className="mt-4 max-w-xl text-lg leading-relaxed">{item.text}</p>

      {/* The real case comes last: screens, one sentence, details. */}
      <figure className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-line px-4 py-3 text-xs font-medium tracking-wide text-accent uppercase sm:px-5">
          {s.caseLabel} · {t(project.title, lang)}
          {project.status === 'development' && (
            <span className="tracking-normal text-muted normal-case">· {c.ui.status.development}</span>
          )}
        </p>
        <Gallery project={item.case.project} onOpen={onOpen} />
        <figcaption className="border-t border-line px-4 py-4 sm:px-5">
          <p className="text-lg leading-relaxed text-fg">{item.case.text}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <button
              type="button"
              onClick={() => onOpen(item.case.project)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-bg px-3 py-1.5 text-sm font-medium text-fg hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]"
            >
              {s.details} <span aria-hidden="true">↗</span>
            </button>
            {item.also && item.also.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted">{s.alsoLabel}:</span>
                {item.also.map((id) => (
                  <ProjectButton key={id} id={id} onOpen={onOpen} />
                ))}
              </div>
            )}
          </div>
        </figcaption>
      </figure>

      <a
        href="#contact"
        className="btn-primary group mt-6"
      >
        {s.cta}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
          →
        </span>
      </a>
    </article>
  )
}

// Screens of one project, one per slide. Swipe on phones, arrows or dots elsewhere.
// It moves on its own while on screen until the visitor touches it; with reduced motion it stays put.
function Gallery({ project, onOpen }: { project: ProjectId; onOpen: (id: ProjectId) => void }) {
  const { lang, c } = useLang()
  const data = projectById[project]
  const title = t(data.title, lang)
  const images = figures(data.images, lang)
  // Phone screenshots fit inside the frame instead of being cropped.
  const contain = (data.gallery ?? 'phone') === 'phone'
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [stopped, setStopped] = useState(false)

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const next = (i + images.length) % images.length
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = track.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!visible || stopped || reduced || images.length < 2) return
    const timer = window.setInterval(() => goTo(index + 1), 3500)
    return () => window.clearInterval(timer)
  })

  if (images.length === 0) return null
  const stop = () => setStopped(true)

  return (
    <div className="relative" onPointerDown={stop} onWheel={stop} onMouseEnter={stop}>
      <div
        ref={track}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain bg-bg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`${title}: ${image.alt}`}
            className="aspect-[16/10] w-full shrink-0 snap-center"
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              draggable={false}
              className={`size-full ${contain ? 'object-contain p-2' : 'object-cover object-top'}`}
            />
          </button>
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 py-1.5">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={c.ui.lightbox.previous}
            className="grid size-8 place-items-center rounded-full text-lg text-muted hover:text-fg"
          >
            ‹
          </button>
          <div className="flex gap-1.5">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${i + 1} / ${images.length}`}
                aria-current={i === index ? 'true' : undefined}
                className="grid h-6 place-items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-accent' : 'w-1.5 bg-line'}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={c.ui.lightbox.next}
            className="grid size-8 place-items-center rounded-full text-lg text-muted hover:text-fg"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

// A project as a small button: logo, name and its status when it isn't finished.
function ProjectButton({ id, onOpen }: { id: ProjectId; onOpen: (id: ProjectId) => void }) {
  const { lang, c } = useLang()
  const project = projectById[id]
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      aria-haspopup="dialog"
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-2 text-sm text-fg hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]"
    >
      <ProjectLogo project={project} className="size-4" />
      {t(project.title, lang)}
      {project.status === 'development' && <span className="text-xs text-muted">· {c.ui.status.development}</span>}
    </button>
  )
}
