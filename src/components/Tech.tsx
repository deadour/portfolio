import Section from './Section'
import { tech } from '../data/tech'
import { useLang } from '../i18n'

export default function Tech() {
  const { c } = useLang()
  const groups = [
    { title: c.tech.data, items: tech.data },
    { title: c.tech.software, items: tech.software },
  ]

  return (
    <Section id="tech" title={c.sections.tech}>
      <div className="grid gap-8 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm text-muted">{group.title}</h3>
            <ul className="mt-3 space-y-1.5 text-fg">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
