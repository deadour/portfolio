import type { ReactNode } from 'react'
import { useReveal } from '../useReveal'

type Props = {
  id: string
  title: string
  children: ReactNode
}

// One section of a page: a small label over the content, separated by a thin rule.
export default function Section({ id, title, children }: Props) {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="reveal scroll-mt-24 border-t border-line py-14 sm:py-20">
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      <div className="mt-8 min-w-0 sm:mt-10">{children}</div>
    </section>
  )
}
