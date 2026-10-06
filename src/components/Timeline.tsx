import type { ReactNode } from 'react'
import Section from './Section'
import type { Entry } from '../content/types'

type Props = {
  id: string
  title: string
  entries: Entry[]
  children?: ReactNode
}

// Used for both Experience and Education.
export default function Timeline({ id, title, entries, children }: Props) {
  return (
    <Section id={id} title={title}>
      <ol className="space-y-10">
        {entries.map((entry) => {
          const meta = entry.meta.filter(Boolean).join(' · ')
          return (
            <li key={entry.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium text-fg">{entry.title}</h3>
                {entry.period && <p className="text-sm text-muted">{entry.period}</p>}
              </div>
              {meta && <p className="mt-1 text-sm text-accent">{meta}</p>}
              {entry.description && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed">{entry.description}</p>
              )}
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 max-w-xl space-y-2 text-sm leading-relaxed">
                  {entry.highlights.map((item, i) => (
                    <li key={i} className="relative pl-4">
                      <span aria-hidden="true" className="absolute left-0 text-muted">
                        –
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {entry.image && (
                <figure className="mt-5 max-w-sm">
                  <img
                    src={entry.image.src}
                    alt={entry.image.alt}
                    width={720}
                    height={540}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-lg border border-line object-cover"
                  />
                  <figcaption className="mt-2 text-xs text-muted">{entry.image.caption}</figcaption>
                </figure>
              )}
            </li>
          )
        })}
      </ol>
      {children}
    </Section>
  )
}
