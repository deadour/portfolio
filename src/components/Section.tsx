import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  children: ReactNode
}

export default function Section({ id, title, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-6 border-t border-zinc-800/80 py-14 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:py-20"
    >
      <h2 id={`${id}-title`} className="text-sm font-medium text-zinc-500">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
