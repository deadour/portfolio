import type { Content } from './types'

export const en: Content = {
  meta: {
    title: 'Eduardo M. Ramírez — Data Engineer',
    description:
      'Eduardo M. Ramírez — Data Engineer and IT Lead at an industrial machinery company, and final-year Information Systems Engineering student at UTN. Data pipelines, warehouses and the software around them.',
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
    howItsBuilt: 'How it’s built',
    lightbox: { close: 'Close', previous: 'Previous image', next: 'Next image' },
    showMore: 'Show {n} more',
    featured: 'Featured project',
    academic: 'Academic projects',
    viewPhotos: 'View photos ({n})',
  },
  hero: {
    title: 'Data Engineer · Systems Engineering',
    tagline:
      'IT Lead & Data Engineer at an industrial machinery company, and final-year Information Systems Engineering student at UTN. I build data pipelines, warehouses and the software around them.',
    viewWork: 'View my work',
    downloadCv: 'Download CV',
  },
  now: {
    label: 'Now',
    text: 'Working on the Last.fm Data Platform and on Malaca, an e-commerce platform for a client.',
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
    'At BIAMAQ, I lead IT and Systems end to end: infrastructure, data and software for a company with 3 branches. In 2026, I spent a semester at CESI École d’Ingénieurs in France through an ARFITEC scholarship while completing the final year of Information Systems Engineering at UTN.',
    'I am now shaping my career around Data Engineering. I am especially interested in what makes a data platform trustworthy: incremental loads, quality checks, tests, traceability and documenting the decisions behind each layer.',
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
      images: [
        { src: '/images/lastfm-overview-thumb.webp', href: '/images/lastfm-overview.webp', alt: 'Dashboard overview: 116,871 scrobbles, 4,956 artists, scrobbles per year and top artists' },
        { src: '/images/lastfm-taste-thumb.webp', href: '/images/lastfm-taste.webp', alt: 'Taste evolution: genre share over time and artist evolution by year' },
        { src: '/images/lastfm-discovery-thumb.webp', href: '/images/lastfm-discovery.webp', alt: 'Discovery and loyalty: new artists and tracks per year, concentration and diversity' },
        { src: '/images/lastfm-patterns-thumb.webp', href: '/images/lastfm-patterns.webp', alt: 'Listening heatmap by weekday and local hour, plus listening by location and artist country' },
      ],
      imagesNote: 'Streamlit dashboard built on the Gold layer. Click to enlarge.',
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
    reports: {
      title: 'BIAMAQ Reports',
      kind: 'Work project · BIAMAQ · Business Intelligence',
      badge: 'Internal production system',
      summary:
        'Internal reporting platform where BIAMAQ’s management follows sales, purchases, receivables, customers and workshop activity across its 3 branches. It runs on top of the extractors and data warehouse I built from the company’s SQL Server ERP.',
      highlights: [
        'Django REST Framework API over SQL Server (ERP + data warehouse), with a React frontend.',
        'Python and Pandas extractors, scheduled with Celery and Redis: daily loads, monthly receivables snapshots and customer classification.',
        'Analyses include a management sales dashboard, purchases vs sales history, an 80/20 customer analysis with retention, receivables aging and workshop stock.',
        'CI/CD with GitHub Actions: Docker images published to Docker Hub and deployed on a self-hosted runner.',
      ],
      images: [
        { src: '/images/reports-sales-thumb.webp', href: '/images/reports-sales.webp', alt: 'Management sales dashboard with KPIs and daily target vs invoiced chart' },
        { src: '/images/reports-purchases-vs-sales-thumb.webp', href: '/images/reports-purchases-vs-sales.webp', alt: 'Monthly purchases vs sales history from 2023 to 2026' },
        { src: '/images/reports-customers-8020-thumb.webp', href: '/images/reports-customers-8020.webp', alt: '80/20 customer analysis comparing two periods, with retention and loyal customers' },
        { src: '/images/reports-service-thumb.webp', href: '/images/reports-service.webp', alt: 'Workshop stock by month with intake, output and machines in repair' },
      ],
      imagesNote: 'Screens shown with sample data. Click to enlarge.',
    },
    rentos: {
      title: 'RENT-OS',
      kind: 'Work project · BIAMAQ · Full-stack platform',
      summary:
        'Equipment rental platform built for BIAMAQ’s re-engineering of its Rental module, built as a multi-company, multi-branch platform. It covers the full rental cycle: booking wizard, signed contract, technical delivery, return, billable-days close and workshop.',
      highlights: [
        'Django REST Framework backend with a hexagonal architecture, on PostgreSQL or SQL Server.',
        'PDF contracts signed on a Wacom tablet, and multi-company electronic invoicing with ARCA (Argentina’s tax authority).',
        'Syncs with the company’s legacy SQL Server ERP, and also runs standalone without it.',
        'React 19 frontend with Tailwind, Recharts and Framer Motion; Playwright end-to-end tests; Docker and CI with automatic deploys, migrations and smoke tests.',
      ],
      images: [
        { src: '/images/rentos-login-thumb.webp', href: '/images/rentos-login.webp', alt: 'RENT-OS login screen' },
        { src: '/images/rentos-inventory-thumb.webp', href: '/images/rentos-inventory.webp', alt: 'Inventory with stock by branch, daily price and availability' },
        { src: '/images/rentos-new-rental-thumb.webp', href: '/images/rentos-new-rental.webp', alt: 'Five-step wizard to create a new rental' },
        { src: '/images/rentos-workshop-thumb.webp', href: '/images/rentos-workshop.webp', alt: 'Workshop kanban board with incoming, in-repair and ready equipment' },
      ],
      imagesNote: 'Screens shown with sample data. Click to enlarge.',
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
      images: [
        { src: '/images/dynamo-home.webp', alt: 'Dynamo home screen with today’s routines and 30-day stats' },
        { src: '/images/dynamo-progress.webp', alt: 'Progress screen with best weight, estimated 1RM and a per-session chart' },
        { src: '/images/dynamo-workout.webp', alt: 'Workout in progress with duration, sets, volume and exercise list' },
        { src: '/images/dynamo-profile.webp', alt: 'Profile with a yearly training heatmap and saved routines' },
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
    cesiDl: {
      title: 'Diabetes Prediction with Deep Learning',
      kind: 'Academic project · CESI France · Team of 4',
      summary:
        'End-to-end machine learning pipeline to predict diabetes from a tabular health dataset with heavy class imbalance. The 84%-accurate baseline missed almost every positive case, so we focused on reducing false negatives instead of chasing accuracy.',
      highlights: [
        'EDA and preprocessing, Keras and custom NumPy baselines, and a tuned PyTorch model.',
        'Oversampling and decision-threshold optimization to reduce false negatives.',
        'Explainability with SHAP and LIME, and energy tracking with CodeCarbon.',
        'Prototype deployment as a FastAPI service.',
      ],
      images: [{ src: '/images/cesi-dl-team.webp', alt: 'The team presenting the Diabetes Prediction with Deep Learning project at CESI' }],
    },
    cesiIot: {
      title: 'Classroom Noise Monitor',
      kind: 'Academic project · CESI France · IoT · Team of 4',
      summary:
        'Real-time device that measures noise levels in classrooms to improve the campus environment, connecting low-level hardware all the way to analytics dashboards. Privacy by design: it only measures decibels and never records audio.',
      highlights: [
        'ESP32-S3 with an INMP441 24-bit digital microphone for precise noise readings.',
        'Data sent over WiFi through the ESPHome Native API instead of an MQTT broker.',
        'Home Assistant ingests the readings, stores them in InfluxDB, and Grafana shows them in real time.',
      ],
      images: [
        { src: '/images/cesi-iot-device.webp', alt: 'The noise monitor: a small 3D-printed case with an OLED screen showing the decibel level' },
        { src: '/images/cesi-iot-grafana.webp', alt: 'Grafana dashboard with real-time noise level, state and a decibel gauge' },
        { src: '/images/cesi-iot-architecture.webp', alt: 'Whiteboard sketch of the system architecture' },
      ],
    },
  },
  experience: [
    {
      title: 'BIAMAQ',
      href: 'https://biamaq.com.ar',
      logo: '/images/logo-biamaq.webp',
      meta: ['IT Lead & Data Engineer', 'Full-time · Remote, Argentina'],
      period: 'Nov 2023 — Present',
      description:
        'IT and Systems for an industrial machinery company: infrastructure, development, automation and business intelligence.',
      highlights: [
        'Built ETL pipelines with Python and Pandas that load SQL Server data into a data warehouse, unifying sales, stock, service and equipment rental across 3 branches.',
        'Design and maintain executive Power BI dashboards (DAX) and automate recurring reports with Python.',
        'Led the re-engineering of the Rental and Technical Service modules with Django REST Framework and React, deployed with Docker on Linux servers.',
      ],
    },
  ],
  education: [
    {
      title: 'Universidad Tecnológica Nacional — FRRe',
      href: 'https://www.frre.utn.edu.ar',
      logo: '/images/logo-utn.webp',
      meta: ['Information Systems Engineering'],
      period: 'Final year in progress',
    },
    {
      title: 'CESI École d’Ingénieurs — Rouen, France',
      href: 'https://rouen.cesi.fr',
      logo: '/images/logo-cesi.webp',
      meta: ['Academic exchange · ARFITEC scholarship'],
      period: 'Spring semester 2026',
      description:
        'A semester of the Data Science master’s programme, with coursework in data science, AI, IoT and web development, and engineering projects in multidisciplinary teams.',
      images: [
        { src: '/images/cesi.webp', alt: 'Eduardo in front of the CESI École d’Ingénieurs sign', caption: 'CESI Rouen, 2026' },
        { src: '/images/cesi-presenting.webp', alt: 'Eduardo presenting a team project in a CESI lecture hall', caption: 'Presenting a project' },
        { src: '/images/cesi-team.webp', alt: 'Eduardo working with his project team around a table with laptops', caption: 'Working with my team' },
      ],
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
