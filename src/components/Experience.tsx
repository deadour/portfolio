import Section from './Section'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {experience.map((item) => (
          <li key={item.organization}>
            <h3 className="font-medium text-zinc-100">{item.organization}</h3>
            {(item.role || item.period) && (
              <p className="mt-1 text-sm text-zinc-500">
                {[item.role, item.period].filter(Boolean).join(' — ')}
              </p>
            )}
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
