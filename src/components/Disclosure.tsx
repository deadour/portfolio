import type { ReactNode } from 'react'

// Native <details> styled as a small outlined button with a rotating chevron.
export default function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="disclosure group/d mt-4">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-md border border-line bg-bg px-3 py-1.5 text-sm font-medium text-accent transition-colors select-none hover:border-accent group-open/d:border-accent [&::-webkit-details-marker]:hidden">
        {label}
        <svg
          viewBox="0 0 16 16"
          className="size-3.5 transition-transform group-open/d:rotate-180 motion-reduce:transition-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </summary>
      <div className="disclosure-body">{children}</div>
    </details>
  )
}
