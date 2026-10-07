import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import Section from './Section'
import Pipeline from './Pipeline'
import Disclosure from './Disclosure'
import TechIcon from './TechIcon'
import { useLightbox, toLightbox } from './Lightbox'
import { projects } from '../data/projects'
import { useLang } from '../i18n'
import { siLastdotfm } from 'simple-icons'

type Project = (typeof projects)[number]

// Turns [text](https://…) inside a highlight into an external link; everything else stays plain text.
function withLinks(text: string) {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^)]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/)
    if (!m) return part
    return (
      <a
        key={i}
        href={m[2]}
        target="_blank"
        rel="noreferrer"
        className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
      >
        {m[1]}
      </a>
    )
  })
}

// Plain clicks open the in-page viewer; Ctrl/Cmd/middle-click still open the image in a new tab.
function viewerClick(open: () => void) {
  return (e: MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    open()
  }
}

// Logo shown next to a project title.
function Identity({ id }: { id: Project['id'] }) {
  return id === 'lastfm' ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-accent" fill="currentColor">
      <path d={siLastdotfm.path} />
    </svg>
  ) : id === 'reports' ? (
    <img src="/images/logo-biamaq.webp" alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-cover" />
  ) : id === 'rentos' ? (
    <img src="/images/logo-rentos.png" alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-contain" />
  ) : id === 'ecommerce' ? (
    <img src="/images/logo-malaca.webp" alt="" width={24} height={24} className="size-6 shrink-0 rounded-full object-contain" />
  ) : id === 'chedul' ? (
    <img src="/images/logo-chedul.svg" alt="" width={24} height={24} className="size-6 shrink-0 object-contain" />
  ) : id === 'dynamo' ? (
    <img src="/images/logo-dynamo.png" alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-cover" />
  ) : null
}

// "How it's built", stack chips and links: the same in every kind of card.
function Details({ project }: { project: Project }) {
  const { c } = useLang()
  const text = c.projects[project.id]
  return (
    <>
      {text.highlights.length > 0 && (
        <Disclosure label={c.ui.howItsBuilt}>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {text.highlights.map((item, i) => (
              <li key={i} className="relative pl-4">
                <span aria-hidden="true" className="absolute left-0 text-muted">
                  –
                </span>
                {withLinks(item)}
              </li>
            ))}
          </ul>
        </Disclosure>
      )}

      {project.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          {project.stack.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <TechIcon name={item} className="size-3.5" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {project.links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                {c.ui.links[link.kind]}
                <span aria-hidden="true"> ↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

// Static class names so Tailwind can see them.
const GRID_COLS = ['', 'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-4']

// Full card: the featured case study and the academic projects.
function ProjectCard({ project }: { project: Project }) {
  const { c } = useLang()
  const text = c.projects[project.id]
  const openLightbox = useLightbox()
  const wide = project.gallery === 'wide'
  const count = text.images?.length ?? 0
  // Phone screens: up to 4 per row. Wide screens: up to 2. A single image takes the full width.
  const cols = GRID_COLS[Math.min(count, wide ? 2 : 4)]
  const itemWidth = count === 1 ? 'w-full' : wide ? 'w-64' : project.gallery === 'photo' ? 'w-44' : 'w-32'
  const crop = project.gallery === 'photo' ? 'aspect-[4/5] object-cover' : ''
  // Intrinsic size of the thumbnails, so the page doesn't jump while they load.
  const size = wide ? { width: 960, height: 600 } : project.gallery === 'photo' ? {} : { width: 480, height: 860 }

  const featured = project.group === 'featured'
  const compact = project.group === 'academic'
  const pill = text.badge ?? text.status

  return (
    <article
      data-project={project.id}
      className={`card rounded-lg border bg-surface ${compact ? 'p-5' : 'p-5 sm:p-6'} ${
        featured ? 'border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]' : 'border-line'
      }`}
    >
      {featured && (
        <p className="mb-3 text-xs font-medium tracking-wide text-accent uppercase">{c.ui.featured}</p>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className={`flex min-w-0 items-center gap-2 font-medium text-fg ${featured ? 'text-lg' : ''}`}>
          <Identity id={project.id} />
          <span>{text.title}</span>
        </h3>
        {pill && (
          <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2.5 py-0.5 text-xs font-medium text-accent">
            {pill}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-accent">{text.kind}</p>
      <p className="mt-4 text-sm leading-relaxed">{text.summary}</p>

      {text.pipeline && <Pipeline data={text.pipeline} />}

      {/* On phones, compact cards with several images get a swipeable strip instead of one image + button.
          Photos share a 4:5 frame; slides keep their own shape at a common height. */}
      {compact && text.images && text.images.length > 1 && (
        <div className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:hidden">
          {text.images.map((image, i) => (
            <a
              key={image.src}
              href={image.href ?? image.src}
              target="_blank"
              rel="noreferrer"
              onClick={viewerClick(() => openLightbox(toLightbox(text.images), i))}
              className={`block shrink-0 snap-start overflow-hidden rounded-md border border-line ${
                project.gallery === 'photo' ? 'w-44' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={project.gallery === 'photo' ? 'aspect-[4/5] w-full object-cover' : 'h-36 w-auto max-w-none'}
              />
            </a>
          ))}
        </div>
      )}

      {/* Academic cards show one real image during normal scroll; the lightbox keeps the full set available. */}
      {compact && text.images && text.images.length > 0 && (
        <figure className={`mt-5 ${text.images.length > 1 ? 'hidden sm:block' : ''}`}>
          <a
            href={text.images[0].href ?? text.images[0].src}
            target="_blank"
            rel="noreferrer"
            onClick={viewerClick(() => openLightbox(toLightbox(text.images), 0))}
            className="block overflow-hidden rounded-md border border-line"
          >
            <img
              src={text.images[0].src}
              alt={text.images[0].alt}
              width={960}
              height={540}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100"
            />
          </a>
          {text.images[0].caption && <figcaption className="mt-2 text-xs text-muted">{text.images[0].caption}</figcaption>}
          {text.images.length > 1 && (
            <button
              type="button"
              onClick={() => openLightbox(toLightbox(text.images), 0)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              {c.ui.viewPhotos.replace('{n}', String(text.images.length))}
            </button>
          )}
        </figure>
      )}

      {!compact && text.images && text.images.length > 0 && (
        // Swipeable strip on mobile, grid on desktop.
        <div
          className={`-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 ${cols}`}
        >
          {text.images.map((image, i) => (
            <figure key={image.src} className={`shrink-0 snap-start sm:w-auto ${itemWidth}`}>
              <a
                href={image.href ?? image.src}
                target="_blank"
                rel="noreferrer"
                onClick={viewerClick(() => openLightbox(toLightbox(text.images), i))}
                className="block overflow-hidden rounded-md border border-line"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  {...size}
                  loading="lazy"
                  className={`h-auto w-full ${crop} transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100`}
                />
              </a>
              {image.caption && <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {text.imagesNote && <p className="mt-2 text-xs text-muted">{text.imagesNote}</p>}

      <Details project={project} />
    </article>
  )
}

// Preview at the top of a compact card: one desktop screenshot, or three phone screens side by
// side, in the same 16:10 frame. The full set opens in the viewer.
function Preview({ project }: { project: Project }) {
  const { c } = useLang()
  const openLightbox = useLightbox()
  const images = c.projects[project.id].images ?? []
  if (images.length === 0) return null
  const phone = project.gallery !== 'wide'
  const shown = phone ? images.slice(0, 3) : images.slice(0, 1)
  return (
    <div className="mb-4">
      <div
        className={`grid aspect-[16/10] gap-1.5 overflow-hidden rounded-md border border-line bg-bg ${
          phone ? 'grid-cols-3 p-1.5' : ''
        }`}
      >
        {shown.map((image, i) => (
          <a
            key={image.src}
            href={image.href ?? image.src}
            target="_blank"
            rel="noreferrer"
            onClick={viewerClick(() => openLightbox(toLightbox(images), i))}
            className={`block min-h-0 overflow-hidden ${phone ? 'rounded-sm' : ''}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="size-full object-cover object-top transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100"
            />
          </a>
        ))}
      </div>
      {images.length > 1 && (
        <button
          type="button"
          onClick={() => openLightbox(toLightbox(images), 0)}
          className="mt-2 text-xs text-muted underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent"
        >
          {c.ui.viewScreens.replace('{n}', String(images.length))}
        </button>
      )}
    </div>
  )
}

// Compact card used inside the BIAMAQ block and the selected projects carousel.
function ProductCard({ project, className = '' }: { project: Project; className?: string }) {
  const { c } = useLang()
  const text = c.projects[project.id]
  const pill = text.badge ?? text.status
  return (
    <article
      data-project={project.id}
      className={`card flex flex-col rounded-lg border border-line bg-surface p-4 sm:p-5 ${className}`}
    >
      <Preview project={project} />
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <h4 className="flex min-w-0 items-center gap-2 font-medium text-fg">
          <Identity id={project.id} />
          <span>{text.title}</span>
        </h4>
        {pill && (
          <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-0.5 text-[11px] font-medium text-accent">
            {pill}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-accent">{text.kind}</p>
      <p className="mt-3 text-sm leading-relaxed">{text.summary}</p>
      <Details project={project} />
    </article>
  )
}

// Small label that opens a block of the Work section, with an optional control on the right.
function GroupLabel({ children, group, aside }: { children: string; group: string; aside?: ReactNode }) {
  return (
    <div data-group={group} className="mt-12 mb-4 flex items-center gap-3 sm:mt-14">
      <h3 className="text-xs font-medium tracking-wide text-muted uppercase">{children}</h3>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      {aside}
    </div>
  )
}

// BIAMAQ: both products side by side inside one block (stacked on smaller screens), never in a carousel.
function Biamaq({ items }: { items: Project[] }) {
  const { c } = useLang()
  return (
    <div className="rounded-xl border border-line bg-[color-mix(in_srgb,var(--surface)_45%,transparent)] p-3 sm:p-4">
      <div className="flex items-center gap-3 px-1 pt-1 pb-4">
        <img src="/images/logo-biamaq.webp" alt="" width={32} height={32} className="size-8 shrink-0 rounded-md object-cover" />
        <div>
          <p className="font-medium text-fg">BIAMAQ</p>
          <p className="text-sm text-muted">{c.ui.biamaq}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((project) => (
          <ProductCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

// Selected projects: a horizontal strip with snap points. Swipe, trackpad and the keyboard
// (focus the strip, then arrow keys) all scroll it; the arrows move one card at a time. No autoplay.
function Carousel({ items }: { items: Project[] }) {
  const { c } = useLang()
  const track = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  const move = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>('article')
    if (!el || !card) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduced ? 'auto' : 'smooth' })
  }

  const arrow = (dir: 1 | -1, disabled: boolean, label: string) => (
    <button
      type="button"
      onClick={() => move(dir)}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-md border border-line bg-surface text-fg hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] disabled:cursor-default disabled:opacity-35 disabled:hover:border-line"
    >
      <span aria-hidden="true">{dir === 1 ? '→' : '←'}</span>
    </button>
  )

  return (
    <>
      <GroupLabel
        group="selected"
        aside={
          <div className="flex gap-2">
            {arrow(-1, edges.start, c.ui.carousel.previous)}
            {arrow(1, edges.end, c.ui.carousel.next)}
          </div>
        }
      >
        {c.ui.selected}
      </GroupLabel>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={c.ui.carousel.label}
        className="carousel -mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pt-1 pb-3 sm:mx-0 sm:px-0"
      >
        {items.map((project) => (
          <ProductCard key={project.id} project={project} className="w-[84%] shrink-0 snap-start sm:w-[44%]" />
        ))}
      </div>
    </>
  )
}

export default function Work() {
  const { c } = useLang()
  const pick = (group: Project['group']) => projects.filter((p) => p.group === group)

  return (
    <Section id="work" title={c.sections.work}>
      {pick('featured').map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <GroupLabel group="biamaq">{c.ui.professional}</GroupLabel>
      <Biamaq items={pick('biamaq')} />

      <Carousel items={pick('selected')} />

      <GroupLabel group="academic">{c.ui.academic}</GroupLabel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pick('academic').map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
