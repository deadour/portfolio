import { useEffect, useRef, useState } from 'react'
import Pipeline from './Pipeline'
import { ProjectCard } from './Work'
import { projects } from '../data/projects'
import { useLang } from '../i18n'
import { useReveal } from '../useReveal'
import type { ProjectId, Solution } from '../content/types'

// How I can help: an overview of every kind of work, then one block per kind with a real case
// in one sentence. Projects open in a dialog, so the reader keeps their place.
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
  const caseText = c.projects[item.case.project]

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

        {/* The real case, in one sentence. */}
        <div className="mt-6 rounded-r-lg border-l-2 border-accent bg-[color-mix(in_srgb,var(--accent)_7%,transparent)] py-3 pr-4 pl-4">
          <p className="flex flex-wrap items-center gap-x-2 text-xs font-medium tracking-wide text-accent uppercase">
            {c.solutions.caseLabel} · {caseText.title}
            {caseText.status && (
              <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-0.5 tracking-normal normal-case">
                {caseText.status}
              </span>
            )}
          </p>
          <p className="mt-1.5 leading-relaxed text-fg">{item.case.text}</p>
          <button
            type="button"
            onClick={() => onOpen(item.case.project)}
            aria-haspopup="dialog"
            className="mt-2 text-sm font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            {c.solutions.details} <span aria-hidden="true">↗</span>
          </button>
        </div>

        <a
          href="#contact"
          className="group mt-6 inline-flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-85"
        >
          {c.solutions.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
            →
          </span>
        </a>

        {item.also && item.also.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted">{c.solutions.alsoLabel}:</span>
            {item.also.map((id) => (
              <ProjectButton key={id} id={id} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>

      <div className="min-w-0">
        {item.flow ? <Pipeline data={item.flow} /> : <Gallery project={item.case.project} onOpen={onOpen} />}
      </div>
    </article>
  )
}

// Screens of one project, one per slide. Swipe on phones, arrows or dots elsewhere.
// It moves on its own while on screen until the visitor touches it; with reduced motion it stays put.
function Gallery({ project, onOpen }: { project: ProjectId; onOpen: (id: ProjectId) => void }) {
  const { c } = useLang()
  const text = c.projects[project]
  const images = text.images ?? []
  // Phone screenshots fit inside the frame instead of being cropped.
  const contain = (projects.find((p) => p.id === project)?.gallery ?? 'phone') === 'phone'
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
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-lg border border-line bg-surface shadow-[0_12px_32px_-18px_color-mix(in_srgb,var(--fg)_35%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`${text.title}: ${image.alt}`}
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
        <div className="mt-2.5 flex items-center justify-center gap-3">
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
  const { c } = useLang()
  const text = c.projects[id]
  const logo = projects.find((p) => p.id === id)?.logo
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      aria-haspopup="dialog"
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-2 text-sm text-fg hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]"
    >
      {logo ? (
        <img src={logo.src} alt="" width={16} height={16} className="size-4 rounded object-contain" />
      ) : (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      )}
      {text.title}
      {text.status && <span className="text-xs text-accent">· {text.status}</span>}
    </button>
  )
}

// The full project card over the page: business first, then the technical part.
// Closing it leaves the reader exactly where they were.
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
