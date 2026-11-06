import Section from './Section'
import TechIcon from './TechIcon'
import { t } from '../data/localize'
import { skillOrder, skills } from '../data/skills'
import { useLang } from '../i18n'

// Same groups and items as the CVs (src/data/skills.ts).
export default function Tech() {
  const { lang, c } = useLang()
  const groups = skillOrder.map((key) => ({ title: t(skills[key].title, lang), items: skills[key].items }))

  return (
    <Section id="tech" title={c.sections.tech}>
      <div className="grid gap-8">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm text-muted">{group.title}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2 text-sm whitespace-nowrap text-fg"
                >
                  <TechIcon name={item} colored className="size-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
