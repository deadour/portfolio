import Section from './Section'
import { ProjectCase, ProjectRow } from './Project'
import { projects } from '../data/projects'
import { useLang } from '../i18n'

// Selected work: the featured projects as case studies (professional first, then personal),
// and every other project as a compact row that opens its full case in a dialog.
const featured = projects.filter((p) => p.featured)
const professional = featured.filter((p) => p.group === 'professional')
const personal = featured.filter((p) => p.group === 'personal')
const others = projects.filter((p) => !p.featured)

function GroupLabel({ children }: { children: string }) {
  return (
    <h3 className="mb-8 flex items-center gap-3 text-xs font-medium tracking-wide text-muted uppercase">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </h3>
  )
}

export default function Work() {
  const { c } = useLang()

  return (
    <>
      <Section id="work" title={c.sections.work}>
        <GroupLabel>{c.sections.professional}</GroupLabel>
        <div className="space-y-16">
          {professional.map((project) => (
            <ProjectCase key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-20">
          <GroupLabel>{c.sections.personal}</GroupLabel>
          <div className="space-y-16">
            {personal.map((project) => (
              <ProjectCase key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>
      <Section id="more-projects" title={c.sections.more}>
        <ul>
          {others.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
      </Section>
    </>
  )
}
