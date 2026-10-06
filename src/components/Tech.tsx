import Section from './Section'
import { tech } from '../data/tech'

export default function Tech() {
  return (
    <Section id="tech" title="Tech">
      <div className="grid gap-8 sm:grid-cols-2">
        {tech.map((group) => (
          <div key={group.group}>
            <h3 className="text-sm text-zinc-500">{group.group}</h3>
            <ul className="mt-3 space-y-1.5 text-zinc-200">
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
