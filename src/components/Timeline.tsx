import type { ReactNode } from 'react'
import Section from './Section'
import type { Entry } from '../content/types'
import { useLightbox, toLightbox } from './Lightbox'

type Props = {
  id: string
  title: string
  entries: Entry[]
  children?: ReactNode
}

// Used for both Experience and Education.
export default function Timeline({ id, title, entries, children }: Props) {
  const openLightbox = useLightbox()
  return (
    <Section id={id} title={title}>
      <ol className="space-y-10">
        {entries.map((entry) => {
          const meta = entry.meta.filter(Boolean).join(' · ')
          return (
            <li key={entry.title}>
              <div className="flex items-start gap-3.5">
                {entry.logo && (
                  <img
                    src={entry.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="mt-0.5 size-10 shrink-0 rounded-lg border border-line object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-medium text-fg">
                      {entry.href ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-line underline-offset-4 hover:decoration-accent"
                        >
                          {entry.title}
                          <span aria-hidden="true" className="text-muted"> ↗</span>
                        </a>
                      ) : (
                        entry.title
                      )}
                    </h3>
                    {entry.period && <p className="text-sm text-muted">{entry.period}</p>}
                  </div>
                  {meta && <p className="mt-1 text-sm text-accent">{meta}</p>}
                </div>
              </div>
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
                  {entry.images.map((image, i) => (
                    <figure key={image.src} className="w-44 shrink-0 snap-start sm:w-auto">
                      <a
                        href={image.href ?? image.src}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          // Plain clicks open the in-page viewer; Ctrl/Cmd/middle-click still open a new tab.
                          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                          e.preventDefault()
                          openLightbox(toLightbox(entry.images), i)
                        }}
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
