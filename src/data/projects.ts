export type Project = {
  title: string
  kind: string
  description: string
  stack: string[]
  links: { label: string; href: string }[]
  // Marks a card whose details are still to be written.
  pending?: boolean
}

export const projects: Project[] = [
  {
    title: 'Last.fm Data Platform',
    kind: 'Personal project · Data Engineering',
    description:
      'Data platform that ingests listening data from the Last.fm API into a Bronze / Silver / Gold layered model stored as Parquet. Covers incremental ingestion, data quality checks, metadata enrichment and analytical marts, explored through a Streamlit app.',
    stack: ['Python', 'REST APIs', 'ETL / ELT', 'Parquet', 'Streamlit'],
    links: [{ label: 'Repository', href: 'https://github.com/deadour/lastfm-data-platform' }],
  },
  {
    title: 'Dynamo',
    kind: 'Personal project · Web application',
    description:
      'Training and gym tracking application with a Django REST Framework API and a React + TypeScript frontend, backed by PostgreSQL and containerized with Docker.',
    stack: ['Django', 'Django REST Framework', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    links: [{ label: 'Repository', href: 'https://github.com/deadour/dynamo' }],
  },
  {
    // TODO: add scope, stack and (if allowed) a link.
    title: 'Production E-commerce Platform',
    kind: 'Client project',
    description:
      'E-commerce software built for a real business use case. A detailed write-up of scope and stack is in progress.',
    stack: [],
    links: [],
    pending: true,
  },
  {
    // TODO: replace with the actual projects from the exchange semester.
    title: 'Data Science & IoT Projects — CESI France',
    kind: 'Academic · Exchange semester',
    description:
      'Academic projects completed during my exchange at CESI École d’Ingénieurs, in the areas of data science, IoT and systems. Project details coming soon.',
    stack: [],
    links: [],
    pending: true,
  },
]
