import Section from './Section'
import { site } from '../data/site'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function About() {
  const { t } = useLang()

  return (
    <Section id="about" title={t(ui.sections.about)}>
      <div className="max-w-xl space-y-4 leading-relaxed">
        {site.about.map((paragraph) => (
          <p key={paragraph.en}>{t(paragraph)}</p>
        ))}
      </div>
    </Section>
  )
}
