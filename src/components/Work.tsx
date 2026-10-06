import Section from './Section'
import { projects, type Project } from '../data/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`rounded-lg border p-5 sm:p-6 ${
        project.pending ? 'border-dashed border-zinc-800' : 'border-zinc-800 bg-zinc-900/40'
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium text-zinc-100">{project.title}</h3>
        {project.pending && <span className="text-xs text-zinc-500">Write-up in progress</span>}
      </div>
      <p className="mt-1 text-sm text-zinc-500">{project.kind}</p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{project.description}</p>

      {project.stack.length > 0 && (
        <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-400">
          {project.stack.join(' · ')}
        </p>
      )}

      {project.links.length > 0 && (
        <ul className="mt-5 flex gap-5 text-sm">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-200"
              >
                {link.label}
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
  return (
    <Section id="work" title="Selected work">
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  )
}
