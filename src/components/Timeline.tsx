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
              {entry.images && entry.images.length > 0 && (
                // Same 4:5 frame for every photo; swipeable on mobile.
                <div className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                  {entry.images.map((image) => (
                    <figure key={image.src} className="w-44 shrink-0 snap-start sm:w-auto">
                      <a
                        href={image.href ?? image.src}
                        target="_blank"
                        rel="noreferrer"
                        className="block overflow-hidden rounded-lg border border-line"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
                        />
                      </a>
                      {image.caption && <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {children}
    </Section>
  )
}
