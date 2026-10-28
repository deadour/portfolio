import { useEffect, useRef, useState } from 'react'
import Pipeline from './Pipeline'
import { ProjectCard } from './Work'
import { useLightbox, toLightbox } from './Lightbox'
import { projects } from '../data/projects'
import { useLang } from '../i18n'
import { useReveal } from '../useReveal'
import type { ProjectId, Solution } from '../content/types'

// How I can help: a quick overview of every kind of work, then one big block per kind.
// Each block lists the projects where it's already done; they open in a dialog so the reader keeps their place.
export default function Solutions() {
  const { c } = useLang()
  const s = c.solutions
  const [open, setOpen] = useState<ProjectId | null>(null)

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-28 border-t border-line py-14 sm:scroll-mt-16 sm:py-20">
      <h2 id="solutions-title" className="text-3xl leading-tight font-semibold tracking-tight text-fg sm:text-5xl">
        {s.title}
      </h2>
      <p className="mt-3 text-lg text-muted">{s.intro}</p>

      {/* Everything at a glance; each tile jumps to its block. */}
      <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {s.items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#solution-${item.id}`}
              className="card flex h-full items-baseline gap-2 rounded-lg border border-line bg-surface px-3 py-3 text-sm font-medium text-fg sm:px-4"
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              {item.tag}
            </a>
          </li>
        ))}
      </ol>

      {s.items.map((item, i) => (
        <Block key={item.id} item={item} index={i} onOpen={setOpen} />
      ))}

      <ProjectDialog id={open} onClose={() => setOpen(null)} />
    </section>
  )
}

function Block({ item, index, onOpen }: { item: Solution; index: number; onOpen: (id: ProjectId) => void }) {
  const { c } = useLang()
  const ref = useReveal<HTMLElement>()
  const openLightbox = useLightbox()
  const visual = item.visual
  // Screens from the projects behind this block, a few from each.
  const slides = item.projects.flatMap((id) =>
    (c.projects[id].images ?? []).slice(0, 3).map((image) => ({
      ...image,
      project: id,
      // Phone screenshots fit inside the frame instead of being cropped.
      contain: (projects.find((p) => p.id === id)?.gallery ?? 'phone') === 'phone',
    })),
  )

  return (
    <article
      ref={ref}
      id={`solution-${item.id}`}
      className="reveal mt-16 grid scroll-mt-28 items-center gap-6 sm:mt-24 sm:scroll-mt-24 sm:grid-cols-2 sm:gap-10"
    >
      {/* Text and visual swap sides every other block. */}
      <div className={index % 2 ? 'sm:order-2' : ''}>
        <p className="font-mono text-sm text-accent">
          {String(index + 1).padStart(2, '0')} · {item.tag}
        </p>
        <h3 className="mt-3 text-3xl leading-[1.1] font-semibold tracking-tight text-fg sm:text-4xl">{item.title}</h3>
        <p className="mt-4 text-lg leading-relaxed">{item.text}</p>
        <a
          href="#contact"
          className="group mt-6 inline-flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
        >
          {c.solutions.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
            →
          </span>
        </a>
        <div className="mt-6">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">{c.solutions.projectsLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.projects.map((id) => (
              <li key={id}>
                <ProjectButton id={id} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="min-w-0">
        {visual.kind !== 'example' && slides.length > 0 && <Slideshow slides={slides} onOpen={onOpen} />}

        {visual.kind === 'flow' && slides.length === 0 && <Pipeline data={visual.flow} />}

        {visual.kind === 'image' && slides.length === 0 && (
          <figure>
            <a
              href={visual.image.href ?? visual.image.src}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                e.preventDefault()
                openLightbox(toLightbox([visual.image]), 0)
              }}
              className="block overflow-hidden rounded-lg border border-line shadow-[0_12px_32px_-18px_color-mix(in_srgb,var(--fg)_35%,transparent)]"
            >
              <img
                src={visual.image.src}
                alt={visual.image.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100"
              />
            </a>
            <figcaption className="mt-2 text-xs text-muted">{visual.note}</figcaption>
          </figure>
        )}

        {visual.kind === 'example' && (
          <figure className="rounded-lg border border-dashed border-line p-4">
            <figcaption className="text-xs font-medium tracking-wide text-muted uppercase">{visual.label}</figcaption>
            <p className="mt-3 rounded border border-line bg-bg px-2.5 py-1.5 font-mono text-xs text-fg">{visual.input}</p>
            <p aria-hidden="true" className="my-1.5 pl-3 text-accent">
              ↓
            </p>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 rounded border border-line bg-surface px-2.5 py-2 text-sm">
              {visual.output.map((row) => (
                <div key={row.name} className="contents">
                  <dt className="text-muted">{row.name}</dt>
                  <dd className="text-fg">{row.value}</dd>
                </div>
              ))}
            </dl>
          </figure>
        )}
      </div>
    </article>
  )
}

type Slide = { src: string; alt: string; project: ProjectId; contain: boolean }

// Project screens that change on their own while the block is on screen, like a quick success story.
// Pauses on hover; with reduced motion it stays on the first one. Tapping opens that project.
function Slideshow({ slides, onOpen }: { slides: Slide[]; onOpen: (id: ProjectId) => void }) {
  const { c } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  const slide = slides[index]

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!visible || paused || reduced || slides.length < 2) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 3200)
    return () => window.clearInterval(timer)
  }, [visible, paused, slides.length])

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button
        type="button"
        onClick={() => onOpen(slide.project)}
        aria-haspopup="dialog"
        aria-label={`${c.projects[slide.project].title}: ${c.solutions.details}`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface shadow-[0_12px_32px_-18px_color-mix(in_srgb,var(--fg)_35%,transparent)]"
      >
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={i === index ? s.alt : ''}
            loading="lazy"
            className={`absolute inset-0 size-full transition-opacity duration-700 motion-reduce:transition-none ${
              s.contain ? 'object-contain p-2' : 'object-cover object-top'
            } ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-2.5 py-1 text-xs font-medium text-fg shadow-sm">
          {c.projects[slide.project].title}
          <span className="text-accent">· {c.solutions.details} ↗</span>
        </span>
      </button>
      {slides.length > 1 && (
        <div className="mt-2.5 flex justify-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1} / ${slides.length}`}
              aria-current={i === index ? 'true' : undefined}
              className="grid h-4 place-items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-accent' : 'w-1.5 bg-line'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// A project as a small button: logo, name and its status when it isn't finished.
function ProjectButton({ id, onOpen }: { id: ProjectId; onOpen: (id: ProjectId) => void }) {
  const { c } = useLang()
  const text = c.projects[id]
  const logo = projects.find((p) => p.id === id)?.logo
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      aria-haspopup="dialog"
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-3 pl-2 text-sm text-fg hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]"
    >
      {logo ? (
        <img src={logo.src} alt="" width={18} height={18} className="size-[18px] rounded object-contain" />
      ) : (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      )}
      {text.title}
      {text.status && <span className="text-xs text-accent">· {text.status}</span>}
      <span aria-hidden="true" className="text-muted">
        ↗
      </span>
    </button>
  )
}

// The full project card over the page. Closing it leaves the reader exactly where they were.
function ProjectDialog({ id, onClose }: { id: ProjectId | null; onClose: () => void }) {
  const { c } = useLang()
  const ref = useRef<HTMLDialogElement>(null)
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
  }, [project])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handle = () => {
      document.documentElement.style.overflow = ''
      onClose()
    }
    dialog.addEventListener('close', handle)
    return () => dialog.removeEventListener('close', handle)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      aria-label={project ? c.projects[project.id].title : undefined}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(48rem,calc(100vw-2rem))] overflow-y-auto rounded-xl bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
    >
      {project && (
        <div className="relative">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={c.ui.lightbox.close}
            className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full border border-line bg-surface text-fg hover:border-muted"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <ProjectCard project={project} detailed />
          <a
            href="#contact"
            onClick={() => ref.current?.close()}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-fg px-4 py-3 text-sm font-medium text-bg hover:opacity-85"
          >
            {c.solutions.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </dialog>
  )
}
