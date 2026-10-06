import type { ReactNode } from 'react'
import { useReveal } from '../useReveal'

type Props = {
  id: string
  title: string
  children: ReactNode
}

export default function Section({ id, title, children }: Props) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className="reveal grid gap-6 border-t border-line py-14 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:py-20"
    >
      <h2 id={`${id}-title`} className="text-sm font-medium text-muted">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
