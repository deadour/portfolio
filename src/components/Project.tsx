import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { siLastdotfm } from 'simple-icons'
import Disclosure from './Disclosure'
import Pipeline from './Pipeline'
import { toLightbox, useLightbox } from './Lightbox'
import { projectById } from '../data/projects'
import { t } from '../data/localize'
import type { Figure, Project, ProjectId } from '../data/types'
import type { Lang } from '../content'
import { useLang } from '../i18n'

// How projects are shown: a full case study (featured projects on the home page and the project
// dialog), a compact row (the rest), and the dialog itself. All read src/data/projects.ts.

// Turns [text](https://…) inside a highlight into an external link; everything else stays plain text.
export function withLinks(text: string) {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^)]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/)
    if (!m) return part
    return (
      <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="link">
        {m[1]}
      </a>
    )
  })
}

export const figures = (images: Figure[] | undefined, lang: Lang) =>
  (images ?? []).map((image) => ({ src: image.src, href: image.href, alt: t(image.alt, lang) }))

const LOGO_SHAPE = { rounded: 'rounded-md', circle: 'rounded-full', plain: '' }

export function ProjectLogo({ project, className = 'size-6' }: { project: Project; className?: string }) {
  if (project.id === 'lastfm') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 p-0.5 text-accent ${className}`} fill="currentColor">
        <path d={siLastdotfm.path} />
      </svg>
    )
  }
  const logo = project.logo
  if (!logo) return <span aria-hidden="true" className={`grid shrink-0 place-items-center ${className}`}><span className="size-1.5 rounded-full bg-accent" /></span>
  return (
    <img
      src={logo.src}
      alt=""
      width={24}
      height={24}
      className={`shrink-0 ${className} ${LOGO_SHAPE[logo.shape ?? 'rounded']} ${logo.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
    />
  )
}

// Where the project stands today, in plain words.
export function Status({ project }: { project: Project }) {
  const { c } = useLang()
  const active = project.status === 'internal' || project.status === 'live'
  return (
    <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-muted">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${active ? 'bg-accent' : 'border border-muted'}`} />
      {c.ui.status[project.status]}
    </span>
  )
}

function Links({ project }: { project: Project }) {
  const { c } = useLang()
  if (project.links.length === 0) return null
  return (
    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {project.links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noreferrer" className="link">
            {c.ui.links[link.kind]}
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

// Thumbnails in a grid; click opens the large version in the viewer.
function Gallery({ project }: { project: Project }) {
  const { lang } = useLang()
  const openLightbox = useLightbox()
  const images = figures(project.images, lang)
  if (images.length === 0) return null
  const cols =
    project.gallery === 'phone' ? 'grid-cols-4' : project.gallery === 'photo' ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
  const frame = project.gallery === 'photo' ? 'aspect-[4/5] object-cover' : project.gallery === 'phone' ? '' : 'aspect-[16/10] object-cover object-top'
  return (
    <div>
      <ul className={`mt-6 grid gap-2 ${cols}`}>
        {images.map((image, i) => (
          <li key={image.src}>
            <a
              href={image.href ?? image.src}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                // Plain clicks open the in-page viewer; Ctrl/Cmd/middle-click still open a new tab.
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                e.preventDefault()
                openLightbox(toLightbox(images, project.gallery !== 'photo'), i)
              }}
              className="block overflow-hidden rounded-md border border-line bg-surface"
            >
              <img src={image.src} alt={image.alt} loading="lazy" className={`h-auto w-full ${frame}`} />
            </a>
          </li>
        ))}
      </ul>
      {project.imagesNote && <p className="mt-2 text-xs text-muted">{t(project.imagesNote, lang)}</p>}
    </div>
  )
}

const CASE = ['problem', 'solution', 'role', 'outcome'] as const

// A project told top to bottom: what it is, the problem, what I built, my part, where it stands,
// the stack and the screens. The technical details sit behind a button.
export function ProjectCase({ project, heading = 'h3', anchor = true }: { project: Project; heading?: 'h2' | 'h3'; anchor?: boolean }) {
  const { lang, c } = useLang()
  const Heading = heading
  return (
    <article id={anchor ? `project-${project.id}` : undefined} className="scroll-mt-24">
      <div className="flex items-start gap-3">
        <ProjectLogo project={project} className="mt-0.5 size-7" />
        <div className="min-w-0">
          <Heading className="text-xl font-semibold tracking-tight text-fg">{t(project.title, lang)}</Heading>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span>{t(project.kind, lang)}</span>
            <Status project={project} />
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-2xl leading-relaxed">{t(project.summary, lang)}</p>

      {project.caseStudy && (
        <dl className="mt-6 grid max-w-2xl gap-y-1 text-sm leading-relaxed sm:grid-cols-[7rem_1fr] sm:gap-x-6 sm:gap-y-3">
          {CASE.map((key) => (
            <div key={key} className="contents">
              <dt className="text-xs font-medium tracking-wide text-muted uppercase sm:pt-[0.2rem]">{c.ui.caseStudy[key]}</dt>
              <dd className="mb-3 sm:mb-0">{t(project.caseStudy![key], lang)}</dd>
            </div>
          ))}
          <dt className="text-xs font-medium tracking-wide text-muted uppercase sm:pt-[0.2rem]">{c.ui.stack}</dt>
          <dd className="text-muted">{project.stack.join(' · ')}</dd>
        </dl>
      )}
      {!project.caseStudy && <p className="mt-3 max-w-2xl text-sm text-muted">{project.stack.join(' · ')}</p>}

      {project.pipeline && <Pipeline data={project.pipeline} />}
      <Gallery project={project} />

      {project.highlights.length > 0 && (
        <Disclosure label={project.highlightsLabel ? t(project.highlightsLabel, lang) : c.ui.howItsBuilt}>
          <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed">
            {project.highlights.map((item, i) => (
              <li key={i} className="relative pl-4">
                <span aria-hidden="true" className="absolute left-0 text-muted">
                  –
                </span>
                {withLinks(t(item, lang))}
              </li>
            ))}
          </ul>
        </Disclosure>
      )}
      <Links project={project} />
    </article>
  )
}

// A project in one short block: name, status, what it is, stack, and a button to the full case.
export function ProjectRow({ project }: { project: Project }) {
  const { lang, c } = useLang()
  const open = useProjectDialog()
  return (
    <li id={`project-${project.id}`} className="scroll-mt-24 border-t border-line py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h4 className="flex items-center gap-2 font-medium text-fg">
          <ProjectLogo project={project} className="size-5" />
          {t(project.title, lang)}
        </h4>
        <Status project={project} />
      </div>
      <p className="mt-1 text-sm text-muted">{t(project.kind, lang)}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed">{t(project.summary, lang)}</p>
      <p className="mt-2 text-xs text-muted">{project.stack.join(' · ')}</p>
      <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <li>
          <button type="button" onClick={() => open(project.id)} aria-haspopup="dialog" className="link">
            {c.ui.details}
          </button>
        </li>
        {project.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer" className="link">
              {c.ui.links[link.kind]}
              <span aria-hidden="true"> ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

// The full case over the page; closing it leaves the reader where they were.
const DialogContext = createContext<(id: ProjectId) => void>(() => {})
export const useProjectDialog = () => useContext(DialogContext)

export function ProjectDialogProvider({ children, cta }: { children: ReactNode; cta?: { label: string; href: string } }) {
  const { lang, c } = useLang()
  const ref = useRef<HTMLDialogElement>(null)
  const [id, setId] = useState<ProjectId | null>(null)
  const project = id ? projectById[id] : null

  const open = useCallback((next: ProjectId) => setId(next), [])

  useEffect(() => {
    const dialog = ref.current
    if (project && dialog && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
  }, [project])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onClose = () => {
      document.documentElement.style.overflow = ''
      setId(null)
    }
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  return (
    <DialogContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-label={project ? t(project.title, lang) : undefined}
        onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(48rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-line bg-bg p-0 text-body backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
      >
        {project && (
          <div className="relative p-5 sm:p-8">
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
            <div className="pr-8">
              <ProjectCase project={project} heading="h2" anchor={false} />
            </div>
            {cta && (
              <a href={cta.href} onClick={() => ref.current?.close()} className="btn-primary mt-8 w-full justify-center">
                {cta.label} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        )}
      </dialog>
    </DialogContext.Provider>
  )
}
