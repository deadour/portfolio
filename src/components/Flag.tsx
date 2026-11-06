import { useLang } from '../i18n'
import type { Country } from '../data/types'

// Small country flag drawn in SVG, so it looks the same everywhere (emoji flags show as letters on Windows).
const FLAGS: Record<Country, { name: { en: string; es: string }; stripes: string[] }> = {
  fr: { name: { en: 'France', es: 'Francia' }, stripes: ['#002654', '#ffffff', '#ce1126'] },
}

export default function Flag({ country, className = '' }: { country: Country; className?: string }) {
  const { lang } = useLang()
  const flag = FLAGS[country]
  return (
    <svg
      viewBox="0 0 3 2"
      role="img"
      aria-label={flag.name[lang]}
      className={`inline-block h-[0.8em] w-auto shrink-0 rounded-[2px] ring-1 ring-line ${className}`}
    >
      <title>{flag.name[lang]}</title>
      {flag.stripes.map((color, i) => (
        <rect key={color} x={i} width="1" height="2" fill={color} />
      ))}
    </svg>
  )
}
