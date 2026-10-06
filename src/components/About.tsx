import Section from './Section'
import { useLang } from '../i18n'

export default function About() {
  const { c } = useLang()

  return (
    <Section id="about" title={c.sections.about}>
      <div className="max-w-xl space-y-4 leading-relaxed">
        {c.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
