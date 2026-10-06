import Section from './Section'
import Pipeline from './Pipeline'
import Disclosure from './Disclosure'
import { projects } from '../data/projects'
import { useLang } from '../i18n'

type Project = (typeof projects)[number]

function ProjectCard({ project }: { project: Project }) {
  const { c } = useLang()
  const text = c.projects[project.id]

  return (
    <article
      className={`rounded-lg border p-5 sm:p-6 ${
        text.status ? 'border-dashed border-line' : 'card border-line bg-surface'
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium text-fg">{text.title}</h3>
        {text.status && <span className="text-xs text-muted">{text.status}</span>}
      </div>
      <p className="mt-1 text-sm text-accent">{text.kind}</p>
      <p className="mt-4 text-sm leading-relaxed">{text.summary}</p>

      {text.pipeline && <Pipeline data={text.pipeline} />}

      {text.images && text.images.length > 0 && (
        // Swipeable strip on mobile, 4-column grid on desktop.
        <div className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {text.images.map((image) => (
            <figure key={image.src} className="w-32 shrink-0 snap-start sm:w-auto">
              <a href={image.src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md border border-line">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
                />
              </a>
              {image.caption && (
                <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

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
        <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
          {project.stack.join(' · ')}
        </p>
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

export default function Work() {
  const { c } = useLang()

  return (
    <Section id="work" title={c.sections.work}>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
