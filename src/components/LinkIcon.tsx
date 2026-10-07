import { siGithub } from 'simple-icons'

// Line icons (24×24 stroke paths) for profile links and actions.
const PATHS = {
  email: 'M3 6h18v12H3zM3 7l9 6 9-6',
  linkedin: 'M4 4h16v16H4zM8 10v6M8 7.5v.01M12 16v-6M12 13c0-2 4-2.5 4 0v3',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  // Speech bubble with "Aa": a language glyph that isn't tied to any country.
  language: 'M4 5h16v11H9l-5 4zM8 13l2.5-5 2.5 5M8.8 11.5h3.4M15 9.5v3.5M15 11c0-1 2.2-1.2 2.2.4V13',
}

export type LinkIconName = keyof typeof PATHS | 'github'

export default function LinkIcon({ name, className = 'size-4' }: { name: LinkIconName; className?: string }) {
  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
        <path d={siGithub.path} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
