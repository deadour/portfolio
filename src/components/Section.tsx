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
      className="reveal grid scroll-mt-16 gap-5 border-t border-line py-12 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:py-16"
    >
      <h2
        id={`${id}-title`}
        className="self-start text-lg leading-snug font-semibold tracking-tight text-fg before:mb-3 before:block before:h-0.5 before:w-6 before:rounded-full before:bg-accent sm:sticky sm:top-8 sm:text-base"
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
