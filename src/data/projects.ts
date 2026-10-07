import type { LinkKind, ProjectId } from '../content/types'

// Order, stack and links of the project cards. Texts are in src/content/.
export const projects: {
  id: ProjectId
  // 'phone' (default): narrow screenshots in a row of 4. 'wide': desktop screenshots in a 2×2 grid.
  // 'photo': mixed-size photos cropped to the same 4:5 frame.
  gallery?: 'phone' | 'wide' | 'photo'
  // 'featured': the main case study. 'secondary': compact cards in the academic subsection.
  tier?: 'featured' | 'secondary'
  stack: string[]
  links: { kind: LinkKind; href: string }[]
}[] = [
  {
    id: 'lastfm',
    tier: 'featured',
    gallery: 'wide',
    stack: ['Python', 'Parquet', 'Last.fm API', 'MusicBrainz', 'Streamlit', 'pytest'],
    links: [
      { kind: 'repository', href: 'https://github.com/deadour/lastfm-data-platform' },
      {
        kind: 'walkthrough',
        href: 'https://github.com/deadour/lastfm-data-platform/blob/main/docs/PROJECT_WALKTHROUGH.md',
      },
    ],
  },
  {
    // Internal system: screens must be mockups with sample data only.
    id: 'reports',
    gallery: 'wide',
    stack: ['Python', 'Pandas', 'SQL Server', 'Django REST Framework', 'Celery', 'Redis', 'React', 'Docker'],
    links: [],
  },
  {
    // Internal system: screens must be mockups with sample data only.
    id: 'rentos',
    gallery: 'wide',
    stack: ['Django REST Framework', 'PostgreSQL', 'SQL Server', 'React', 'Tailwind CSS', 'Playwright', 'Docker'],
    links: [],
  },
  {
    // TODO: add stack and a { kind: 'live', href } link once it's deployed.
    id: 'ecommerce',
    stack: [],
    links: [],
  },
  {
    id: 'dynamo',
    stack: ['Django', 'Django REST Framework', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'GitHub Actions'],
    links: [
      { kind: 'live', href: 'https://dynamo-1.onrender.com' },
      { kind: 'repository', href: 'https://github.com/deadour/dynamo' },
      {
        kind: 'post',
        href: 'https://www.linkedin.com/posts/eduramirez645_hace-un-tiempo-me-di-cuenta-de-que-en-el-ugcPost-7511498777858441217-nD0B/',
      },
    ],
  },
  {
    id: 'cesiDl',
    tier: 'secondary',
    gallery: 'wide',
    stack: ['Python', 'PyTorch', 'Keras', 'NumPy', 'SHAP', 'LIME', 'FastAPI'],
    links: [
      {
        kind: 'post',
        href: 'https://www.linkedin.com/posts/eduramirez645_deeplearning-pytorch-keras-ugcPost-7450863599469735936-QqvC/',
      },
    ],
  },
  {
    id: 'cesiIot',
    tier: 'secondary',
    gallery: 'photo',
    stack: ['ESP32', 'ESPHome', 'Home Assistant', 'InfluxDB', 'Grafana'],
    links: [
      {
        kind: 'post',
        href: 'https://www.linkedin.com/posts/eduramirez645_iot-esp32-homeassistant-ugcPost-7435821903157719040-VhMi/',
      },
    ],
  },
]
