import Section from './Section'
import type { Entry } from '../data/experience'
import { useLang } from '../i18n'

type Props = {
  id: string
  title: string
  entries: Entry[]
}

// Used for both Experience and Education.
export default function Timeline({ id, title, entries }: Props) {
  const { t } = useLang()

  return (
    <Section id={id} title={title}>
      <ol className="space-y-10">
        {entries.map((entry) => {
          const meta = [t(entry.meta), t(entry.period)].filter(Boolean).join(' — ')
          return (
            <li key={entry.title.en}>
              <h3 className="font-medium text-fg">{t(entry.title)}</h3>
              {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
              {entry.description && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed">{t(entry.description)}</p>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
