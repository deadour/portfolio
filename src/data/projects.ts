import type { LinkKind, ProjectId } from '../content/types'

// Order, stack and links of the project cards. Texts are in src/content/.
export const projects: {
  id: ProjectId
  stack: string[]
  links: { kind: LinkKind; href: string }[]
}[] = [
  {
    id: 'lastfm',
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
    // TODO: add stack and a { kind: 'live', href } link once it's deployed.
    id: 'ecommerce',
    stack: [],
    links: [],
  },
  {
    // TODO: replace with the actual projects from the exchange semester.
    id: 'cesi',
    stack: [],
    links: [],
  },
]
