import Section from './Section'
import Pipeline from './Pipeline'
import Disclosure from './Disclosure'
import TechIcon from './TechIcon'
import { useLightbox, toLightbox } from './Lightbox'
import { projects } from '../data/projects'
import { useLang } from '../i18n'
import { siLastdotfm } from 'simple-icons'

type Project = (typeof projects)[number]

// Static class names so Tailwind can see them.
const GRID_COLS = ['', 'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-4']

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

  const featured = project.tier === 'featured'
  const compact = project.tier === 'secondary'
  const pill = text.badge ?? text.status

  const identity = project.id === 'lastfm' ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-accent" fill="currentColor">
      <path d={siLastdotfm.path} />
    </svg>
  ) : project.id === 'reports' ? (
    <img src="/images/logo-biamaq.webp" alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-cover" />
  ) : project.id === 'rentos' ? (
    <img src="/images/logo-rentos.png" alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-contain" />
  ) : project.id === 'ecommerce' ? (
    <img src="/images/logo-malaca.webp" alt="" width={24} height={24} className="size-6 shrink-0 rounded-full object-contain" />
  ) : project.id === 'dynamo' ? (
    <img src="/images/logo-dynamo.png" alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-cover" />
  ) : null

  return (
    <article
      className={`card rounded-lg border bg-surface ${compact ? 'p-5' : 'p-5 sm:p-6'} ${
        featured ? 'border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]' : 'border-line'
      }`}
    >
      {featured && (
        <p className="mb-3 text-xs font-medium tracking-wide text-accent uppercase">{c.ui.featured}</p>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className={`flex min-w-0 items-center gap-2 font-medium text-fg ${featured ? 'text-lg' : ''}`}>
          {identity}
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

      {/* Academic cards show one real image during normal scroll; the lightbox keeps the full set available. */}
      {compact && text.images && text.images.length > 0 && (
        <figure className="mt-5">
          <a
            href={text.images[0].href ?? text.images[0].src}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
              e.preventDefault()
              openLightbox(toLightbox(text.images), 0)
            }}
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
                onClick={(e) => {
                  // Plain clicks open the in-page viewer; Ctrl/Cmd/middle-click still open a new tab.
                  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                  e.preventDefault()
                  openLightbox(toLightbox(text.images), i)
                }}
                className="block overflow-hidden rounded-md border border-line"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`w-full ${crop} transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100`}
                />
              </a>
              {image.caption && (
                <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {text.imagesNote && <p className="mt-2 text-xs text-muted">{text.imagesNote}</p>}

      {text.highlights.length > 0 && (
        <Disclosure label={c.ui.howItsBuilt}>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {text.highlights.map((item, i) => (
              <li key={i} className="relative pl-4">
                <span aria-hidden="true" className="absolute left-0 text-muted">
                  –
                </span>
                {item}
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
    </article>
  )
}

// Small label that opens a block of the Work section.
function GroupLabel({ children }: { children: string }) {
  return (
    <h3 className="mt-12 mb-4 flex items-center gap-3 text-xs font-medium tracking-wide text-muted uppercase sm:mt-14">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </h3>
  )
}

export default function Work() {
  const { c } = useLang()
  const featured = projects.filter((p) => p.group === 'featured')
  const professional = projects.filter((p) => p.group === 'professional')
  const personal = projects.filter((p) => p.group === 'personal' && p.tier !== 'secondary')
  const academic = projects.filter((p) => p.tier === 'secondary')

  return (
    <Section id="work" title={c.sections.work}>
      <div className="space-y-4">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <GroupLabel>{c.ui.professional}</GroupLabel>
      <div className="space-y-4">
        {professional.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <GroupLabel>{c.ui.personal}</GroupLabel>
      <div className="space-y-4">
        {personal.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {academic.length > 0 && (
        <>
          <h4 className="mt-8 mb-4 text-sm font-medium text-muted">{c.ui.academic}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {academic.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </Section>
  )
}
