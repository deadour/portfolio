// Line icons (24×24 stroke paths) that stand in for numbers on the solutions and How I work.
const PATHS: Record<string, string> = {
  // Solutions, by id
  software: 'M4 5h16v14H4zM4 9h16M8 13h4M8 16h8',
  reporting: 'M4 20V11M10 20V5M16 20v-6M3 20h18',
  ecommerce: 'M5 8h14l-1.2 12H6.2zM9 8V7a3 3 0 0 1 6 0v1',
  ai: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
  // How I work, by position
  talk: 'M4 5h16v11H9l-5 4z',
  proposal: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
  build: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12',
  support: 'M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.1-.7-.7-2.1z',
}

export default function SolutionIcon({ name, className = 'size-4' }: { name: string; className?: string }) {
  const d = PATHS[name]
  if (!d) return null
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
      <path d={d} />
    </svg>
  )
}
