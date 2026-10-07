import type { CSSProperties } from 'react'
import {
  siApacheparquet,
  siCelery,
  siDjango,
  siDocker,
  siEspressif,
  siEsphome,
  siFastapi,
  siGithubactions,
  siGo,
  siGooglecloud,
  siVercel,
  siGrafana,
  siHomeassistant,
  siInfluxdb,
  siKeras,
  siLastdotfm,
  siLinux,
  siMusicbrainz,
  siNumpy,
  siPandas,
  siPostgresql,
  siPytest,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siStreamlit,
  siTailwindcss,
  siVite,
  siCloudinary,
  siRender,
  siTypescript,
} from 'simple-icons'

type Icon = { path: string; hex: string }

// Generic glyphs (24×24 stroke paths) for tools without an official logo in simple-icons.
const DATABASE =
  'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6'
const CHART = 'M4 20V10M10 20V4M16 20v-8M22 20H2'
const SPARK = 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6'
const TEST = 'M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3'

const BRAND: Record<string, Icon> = {
  Python: siPython,
  PostgreSQL: siPostgresql,
  Pandas: siPandas,
  Django: siDjango,
  'Django REST Framework': siDjango,
  React: siReact,
  TypeScript: siTypescript,
  Docker: siDocker,
  Linux: siLinux,
  'GitHub Actions': siGithubactions,
  Go: siGo,
  'Google Cloud Run': siGooglecloud,
  Vercel: siVercel,
  Parquet: siApacheparquet,
  Streamlit: siStreamlit,
  pytest: siPytest,
  'Last.fm API': siLastdotfm,
  MusicBrainz: siMusicbrainz,
  Celery: siCelery,
  Redis: siRedis,
  PyTorch: siPytorch,
  Keras: siKeras,
  NumPy: siNumpy,
  FastAPI: siFastapi,
  ESP32: siEspressif,
  ESPHome: siEsphome,
  'Home Assistant': siHomeassistant,
  InfluxDB: siInfluxdb,
  Grafana: siGrafana,
  'Tailwind CSS': siTailwindcss,
  Vite: siVite,
  Cloudinary: siCloudinary,
  Render: siRender,
}

const GENERIC: Record<string, string> = {
  SQL: DATABASE,
  'SQL Server': DATABASE,
  'Power BI': CHART,
  SHAP: SPARK,
  LIME: SPARK,
  Playwright: TEST,
}

// Brand colors too dark to read on the dark theme (or too light on the light one)
// fall back to the text color; see .tech-icon in index.css.
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

type Props = { name: string; colored?: boolean; className?: string }

export default function TechIcon({ name, colored = false, className = 'size-4' }: Props) {
  const brand = BRAND[name]
  if (brand) {
    const lum = luminance(brand.hex)
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`tech-icon shrink-0 ${className}`}
        data-colored={colored || undefined}
        data-dark-unsafe={lum < 0.25 || undefined}
        data-light-unsafe={lum > 0.8 || undefined}
        style={{ '--brand': `#${brand.hex}` } as CSSProperties}
        fill="currentColor"
      >
        <path d={brand.path} />
      </svg>
    )
  }
  const generic = GENERIC[name]
  if (!generic) return null
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
      <path d={generic} />
    </svg>
  )
}
