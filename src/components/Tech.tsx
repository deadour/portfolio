import Section from './Section'
import { tech } from '../data/tech'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Tech() {
  const { t } = useLang()

  return (
    <Section id="tech" title={t(ui.sections.tech)}>
      <div className="grid gap-8 sm:grid-cols-2">
        {tech.map((group) => (
          <div key={group.group.en}>
            <h3 className="text-sm text-muted">{t(group.group)}</h3>
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
