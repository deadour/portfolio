import Section from './Section'
import { projects, type Project } from '../data/projects'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang()

  return (
    <article
      className={`rounded-lg border p-5 sm:p-6 ${
        project.pending ? 'border-dashed border-line' : 'border-line bg-surface'
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium text-fg">{t(project.title)}</h3>
        {project.pending && <span className="text-xs text-muted">{t(ui.pending)}</span>}
      </div>
      <p className="mt-1 text-sm text-accent">{t(project.kind)}</p>
      <p className="mt-4 text-sm leading-relaxed">{t(project.summary)}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
          {project.highlights.map((item) => (
            <li key={item.en} className="relative pl-4">
              <span aria-hidden="true" className="absolute left-0 text-muted">
                –
              </span>
              {t(item)}
            </li>
          ))}
        </ul>
      )}

      {project.stack.length > 0 && (
        <p className="mt-5 font-mono text-xs leading-relaxed text-muted">
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
                {t(link.label)}
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
  const { t } = useLang()

  return (
    <Section id="work" title={t(ui.sections.work)}>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.title.en} project={project} />
        ))}
      </div>
    </Section>
  )
}
