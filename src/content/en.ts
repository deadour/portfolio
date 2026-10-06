import type { Content } from './types'

export const en: Content = {
  meta: {
    title: 'Eduardo M. Ramírez — Data Engineer',
    description:
      'Eduardo M. Ramírez — IT Lead & Data Engineer at an industrial machinery company and final-year Information Systems Engineering student. Data pipelines, warehouses and the software around them.',
  },
  ui: {
    skip: 'Skip to content',
    nav: { work: 'Work', experience: 'Experience', contact: 'Contact' },
    language: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    links: { repository: 'Repository', walkthrough: 'Technical walkthrough', live: 'Live site', post: 'LinkedIn post' },
    portraitAlt: 'Portrait of Eduardo M. Ramírez',
    credential: 'Credential',
  },
  hero: {
    title: 'Data Engineer & Systems Engineer',
    tagline:
      'IT Lead & Data Engineer at an industrial machinery company, and final-year Information Systems Engineering student at UTN. I build data pipelines, warehouses and the software around them.',
    viewWork: 'View my work',
    downloadCv: 'Download CV',
  },
  now: {
    label: 'Now',
    text: 'Working on the Last.fm Data Platform and on Malaca, an e-commerce platform for a client.',
    updated: 'October 2026',
  },
  sections: {
    about: 'About',
    work: 'Selected work',
    experience: 'Experience',
    education: 'Education',
    languages: 'Languages',
    certifications: 'Certifications',
    tech: 'Tech',
    contact: 'Contact',
  },
  about: [
    'Since November 2023 I’ve led IT and Systems at BIAMAQ, an industrial machinery company. The work spans infrastructure, data and software: ETL pipelines and a data warehouse, Power BI dashboards, and internal applications built with Django and React.',
    'I’m in the final year of Information Systems Engineering at UTN, and in 2026 I spent a semester at CESI École d’Ingénieurs in Rouen, France, on an ARFITEC exchange scholarship, studying data science, AI and IoT.',
    'I’m now focusing my career on Data Engineering. In my own projects I care most about what makes data reliable: incremental loads, data quality checks, tests, and writing down the decisions behind each layer.',
  ],
  projects: {
    lastfm: {
      title: 'Last.fm Data Platform',
      kind: 'Personal project · Data Engineering',
      summary:
        'End-to-end data platform for my Last.fm listening history: from raw API responses to analytical marts and a dashboard, built in phases with each design decision documented.',
      highlights: [
        'Incremental ingestion from the Last.fm API using a watermark, with run metadata and resumable backfills. Raw responses are stored immutably in Bronze.',
        'Silver layer in typed Parquet: UTC timestamps, deduplication of overlapping events and lineage back to Bronze.',
        'Gold marts for activity, artists, discovery, streaks and diversity, plus artist enrichment from MusicBrainz and Last.fm tags with a local cache.',
        'Streamlit dashboard over ~117k listening events. Tests run with pytest against mocked HTTP responses.',
      ],
      pipeline: {
        steps: [
          { name: 'Last.fm API', detail: 'source' },
          { name: 'Bronze', detail: 'raw JSON' },
          { name: 'Silver', detail: 'typed Parquet' },
          { name: 'Gold', detail: 'analytical marts' },
          { name: 'Dashboard', detail: 'Streamlit' },
        ],
        branch: { name: 'Enrichment', detail: 'MusicBrainz + Last.fm tags', target: 3 },
        caption: 'Pipeline architecture. Raw data stays immutable; each layer is derived from the one before.',
      },
    },
    dynamo: {
      title: 'Dynamo',
      kind: 'Personal project · Full-stack web app',
      summary:
        'Mobile-first web app to log workouts, routines, body weight and progress. It started because I kept forgetting what I had lifted in my previous session.',
      highlights: [
        'Django REST API split into domain apps (workouts, exercises, progress, social…), with per-user data isolation covered by tests.',
        'Metrics computed from sets (volume, best weight and estimated 1RM) without storing redundant statistics.',
        'Idempotent import of an open exercise dataset, with names and instructions prepared in Spanish.',
        'React + TypeScript frontend, Docker Compose for local development and GitHub Actions running lint, tests and builds.',
      ],
    },
    ecommerce: {
      title: 'Malaca',
      kind: 'Client project · E-commerce',
      summary:
        'E-commerce platform built for a real client, currently in development. I’ll add the link and technical details once it’s live.',
      highlights: [],
      status: 'In development',
    },
    cesi: {
      title: 'Data Science & IoT Projects — CESI France',
      kind: 'Academic · Exchange semester',
      summary:
        'Group engineering projects from my semester at CESI École d’Ingénieurs, covering data science, AI, IoT and web development. Project write-ups coming soon.',
      highlights: [],
      status: 'Write-up in progress',
    },
  },
  experience: [
    {
      title: 'BIAMAQ',
      meta: ['IT Lead & Data Engineer', 'Full-time · Remote, Argentina'],
      period: 'Nov 2023 — Present',
      description:
        'I lead the IT and Systems department of an industrial machinery company end to end: infrastructure, development, automation and business intelligence.',
      highlights: [
        'Built ETL pipelines with Python and Pandas that load SQL Server data into a data warehouse, unifying sales, stock, service and equipment rental.',
        'Design and maintain executive Power BI dashboards (DAX) on SQL Server, and automate recurring reports with Python.',
        'Administer the company’s SQL Server databases across its 3 branches.',
        'Led the re-engineering of the Rental and Technical Service modules with Django REST Framework and React, and built an API that syncs inventory with WooCommerce.',
        'Deploy internal services (Django, Celery, Nginx) with Docker on Linux servers, and build AppSheet apps for field logistics.',
      ],
    },
  ],
  education: [
    {
      title: 'Universidad Tecnológica Nacional — FRRe',
      meta: ['Information Systems Engineering'],
      period: 'Final year in progress',
    },
    {
      title: 'CESI École d’Ingénieurs — Rouen, France',
      meta: ['Academic exchange · ARFITEC scholarship'],
      period: 'Spring semester 2026',
      description:
        'A semester of the Data Science master’s programme, with coursework in data science, AI, IoT and web development, and engineering projects in multidisciplinary teams.',
      image: {
        src: '/images/cesi.webp',
        alt: 'Eduardo in front of the CESI École d’Ingénieurs sign',
        caption: 'CESI Rouen, 2026',
      },
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'B1' },
    { name: 'French', level: 'A2' },
  ],
  tech: { data: 'Data', software: 'Software & infrastructure' },
  contact: {
    intro: 'The quickest way to reach me is by email. I’m also on LinkedIn and GitHub.',
  },
}
