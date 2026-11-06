import Section from './Section'
import { t } from '../data/localize'
import { skillOrder, skills } from '../data/skills'
import { useLang } from '../i18n'

// The same groups the CVs use, as plain text: no logos, no bars.
export default function Skills() {
  const { lang, c } = useLang()

  return (
    <Section id="skills" title={c.sections.skills}>
      <dl className="grid max-w-2xl gap-y-1 sm:grid-cols-[11rem_1fr] sm:gap-x-6 sm:gap-y-4">
        {skillOrder.map((group) => (
          <div key={group} className="contents">
            <dt className="text-sm text-muted">{t(skills[group].title, lang)}</dt>
            <dd className="mb-4 text-fg sm:mb-0">{skills[group].items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
