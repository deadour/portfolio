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

const LOGO_SHAPE = { rounded: 'rounded-md', circle: 'rounded-full', plain: '' }

const CASE_STUDY = ['problem', 'role', 'solution', 'outcome'] as const

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
  // Intrinsic size of the thumbnails, so the page doesn't jump while they load.
  const size = wide ? { width: 960, height: 600 } : project.gallery === 'photo' ? {} : { width: 480, height: 860 }

  const featured = project.tier === 'featured'
  const compact = project.tier === 'secondary'
  const pill = text.badge ?? text.status

  const logo = project.logo
  const identity =
    project.id === 'lastfm' ? (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-accent" fill="currentColor">
        <path d={siLastdotfm.path} />
      </svg>
    ) : logo ? (
      <img
        src={logo.src}
        alt=""
        width={24}
        height={24}
        className={`size-6 shrink-0 ${LOGO_SHAPE[logo.shape ?? 'rounded']} ${logo.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      />
    ) : null

  return (
    <article
      id={`project-${project.id}`}
      className={`card scroll-mt-28 rounded-lg border bg-surface ${compact ? 'p-5' : 'p-5 sm:p-6'} ${
        featured ? 'border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]' : 'border-line'
      }`}
    >
      {featured && (
        <p className="mb-3 text-xs font-medium tracking-wide text-accent uppercase">{c.ui.featured}</p>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className={`flex min-w-0 items-center gap-2 font-medium text-fg ${featured ? 'text-lg' : ''}`}>
          {identity}
          <span>{text.title}</span>
        </h4>
        {pill && (
          <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2.5 py-0.5 text-xs font-medium text-accent">
            {pill}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-accent">{text.kind}</p>
      {text.caseStudy ? (
        // Professional projects read as a short case study instead of a plain summary.
        <dl className="mt-4 grid gap-y-1 text-sm leading-relaxed sm:grid-cols-[6.5rem_1fr] sm:gap-x-5 sm:gap-y-2.5">
          {CASE_STUDY.map((key) => (
            <div key={key} className="contents">
              <dt className="text-xs font-medium tracking-wide text-muted uppercase sm:pt-[0.2rem]">{c.ui.caseStudy[key]}</dt>
              <dd className="mb-2.5 sm:mb-0">{text.caseStudy![key]}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm leading-relaxed">{text.summary}</p>
      )}

      {text.pipeline && <Pipeline data={text.pipeline} />}

      {/* Academic cards show one real image during normal scroll; the lightbox keeps the full set available. */}
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
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                e.preventDefault()
                openLightbox(toLightbox(text.images), i)
              }}
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

      {compact && text.images && text.images.length > 0 && (
        <figure className={`mt-5 ${text.images.length > 1 ? 'hidden sm:block' : ''}`}>
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
                  {...size}
                  loading="lazy"
                  className={`h-auto w-full ${crop} transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100`}
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
        <Disclosure label={text.highlightsLabel ?? c.ui.howItsBuilt}>
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
    </article>
  )
}

// Small label that opens a block of the Work section.
function GroupLabel({ children }: { children: string }) {
  return (
    <h3 className="mt-12 mb-4 flex items-center gap-3 text-xs font-medium tracking-wide text-muted uppercase first:mt-0 sm:mt-14 sm:first:mt-0">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </h3>
  )
}

// One block: full cards first, then the compact ones in two columns.
function Group({ group, label, compactLabel }: { group: Project['group']; label: string; compactLabel?: string }) {
  const items = projects.filter((p) => p.group === group)
  const full = items.filter((p) => p.tier !== 'secondary')
  const compact = items.filter((p) => p.tier === 'secondary')
  return (
    <>
      <GroupLabel>{label}</GroupLabel>
      <div className="space-y-4">
        {full.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {compact.length > 0 && (
        <>
          {compactLabel ? (
            <p className="mt-8 mb-4 text-sm font-medium text-muted">{compactLabel}</p>
          ) : (
            <div className="mt-4" />
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {compact.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default function Work() {
  const { c } = useLang()

  return (
    <Section id="work" title={c.sections.work}>
      <Group group="professional" label={c.ui.professional} />
      <Group group="personal" label={c.ui.personal} compactLabel={c.ui.academic} />
    </Section>
  )
}
