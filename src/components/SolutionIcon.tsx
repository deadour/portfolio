// Line icons (24×24 stroke paths) for the solutions, by id.
const PATHS: Record<string, string> = {
  software: 'M4 5h16v14H4zM4 9h16M8 13h4M8 16h8',
  reporting: 'M4 20V11M10 20V5M16 20v-6M3 20h18',
  ecommerce: 'M5 8h14l-1.2 12H6.2zM9 8V7a3 3 0 0 1 6 0v1',
  ai: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
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
