import type { Localized } from '../i18n'

export type Project = {
  title: Localized
  kind: Localized
  summary: Localized
  highlights: Localized[]
  stack: string[]
  links: { label: Localized; href: string }[]
  // Marks a card whose details are still to be written.
  pending?: boolean
}

const repository = { en: 'Repository', es: 'Repositorio' }

export const projects: Project[] = [
  {
    title: { en: 'Last.fm Data Platform', es: 'Last.fm Data Platform' },
    kind: { en: 'Personal project · Data Engineering', es: 'Proyecto personal · Data Engineering' },
    summary: {
      en: 'End-to-end data platform for my Last.fm listening history: from raw API responses to analytical marts and a dashboard, built in phases with each design decision documented.',
      es: 'Plataforma de datos end-to-end sobre mi historial de escucha de Last.fm: desde las respuestas crudas de la API hasta marts analíticos y un dashboard, construida por fases y con cada decisión de diseño documentada.',
    },
    highlights: [
      {
        en: 'Incremental ingestion from the Last.fm API using a watermark, with run metadata and resumable backfills. Raw responses are stored immutably in Bronze.',
        es: 'Ingesta incremental desde la API de Last.fm con watermark, metadata por ejecución y backfills reanudables. Las respuestas crudas se guardan inmutables en Bronze.',
      },
      {
        en: 'Silver layer in typed Parquet: UTC timestamps, deduplication of overlapping events and lineage back to Bronze.',
        es: 'Capa Silver en Parquet tipado: timestamps en UTC, deduplicación de eventos superpuestos y linaje hacia Bronze.',
      },
      {
        en: 'Gold marts for activity, artists, discovery, streaks and diversity, plus artist enrichment from MusicBrainz and Last.fm tags with a local cache.',
        es: 'Marts Gold de actividad, artistas, descubrimiento, rachas y diversidad, más enriquecimiento de artistas con MusicBrainz y tags de Last.fm usando caché local.',
      },
      {
        en: 'Streamlit dashboard over ~117k listening events. Tests run with pytest against mocked HTTP responses.',
        es: 'Dashboard en Streamlit sobre ~117 mil eventos de escucha. Tests con pytest sobre respuestas HTTP simuladas.',
      },
    ],
    stack: ['Python', 'Parquet', 'Last.fm API', 'MusicBrainz', 'Streamlit', 'pytest'],
    links: [
      { label: repository, href: 'https://github.com/deadour/lastfm-data-platform' },
      {
        label: { en: 'Technical walkthrough', es: 'Recorrido técnico' },
        href: 'https://github.com/deadour/lastfm-data-platform/blob/main/docs/PROJECT_WALKTHROUGH.md',
      },
    ],
  },
  {
    title: { en: 'Dynamo', es: 'Dynamo' },
    kind: { en: 'Personal project · Full-stack web app', es: 'Proyecto personal · Aplicación web full-stack' },
    summary: {
      en: 'Mobile-first web app to log workouts, routines, body weight and progress. It started because I kept forgetting what I had lifted in my previous session.',
      es: 'Aplicación web mobile-first para registrar entrenamientos, rutinas, peso corporal y progreso. Empezó porque no recordaba qué peso había usado en la sesión anterior.',
    },
    highlights: [
      {
        en: 'Django REST API split into domain apps (workouts, exercises, progress, social…), with per-user data isolation covered by tests.',
        es: 'API REST en Django dividida en apps por dominio (entrenamientos, ejercicios, progreso, social…), con aislamiento de datos por usuario cubierto por tests.',
      },
      {
        en: 'Metrics computed from sets (volume, best weight and estimated 1RM) without storing redundant statistics.',
        es: 'Métricas calculadas a partir de las series (volumen, mejor peso y 1RM estimado) sin guardar estadísticas redundantes.',
      },
      {
        en: 'Idempotent import of an open exercise dataset, with names and instructions prepared in Spanish.',
        es: 'Importación idempotente de un dataset abierto de ejercicios, con nombres e instrucciones en español.',
      },
      {
        en: 'React + TypeScript frontend, Docker Compose for local development and GitHub Actions running lint, tests and builds.',
        es: 'Frontend en React + TypeScript, Docker Compose para desarrollo local y GitHub Actions con lint, tests y build.',
      },
    ],
    stack: ['Django', 'Django REST Framework', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'GitHub Actions'],
    links: [{ label: repository, href: 'https://github.com/deadour/dynamo' }],
  },
  {
    // TODO: add scope, stack, highlights and (if allowed) a link.
    title: { en: 'Production E-commerce Platform', es: 'Plataforma de e-commerce en producción' },
    kind: { en: 'Client project', es: 'Proyecto para cliente' },
    summary: {
      en: 'E-commerce software built for a real business use case. A detailed write-up of scope and stack is in progress.',
      es: 'Software de e-commerce desarrollado para un caso de uso real de negocio. La descripción detallada del alcance y el stack está en preparación.',
    },
    highlights: [],
    stack: [],
    links: [],
    pending: true,
  },
  {
    // TODO: replace with the actual projects from the exchange semester.
    title: {
      en: 'Data Science & IoT Projects — CESI France',
      es: 'Proyectos de Data Science e IoT — CESI Francia',
    },
    kind: { en: 'Academic · Exchange semester', es: 'Académico · Semestre de intercambio' },
    summary: {
      en: 'Academic projects completed during my exchange at CESI École d’Ingénieurs, in the areas of data science, IoT and systems. Project details coming soon.',
      es: 'Proyectos académicos realizados durante mi intercambio en CESI École d’Ingénieurs, en las áreas de data science, IoT y sistemas. Detalles próximamente.',
    },
    highlights: [],
    stack: [],
    links: [],
    pending: true,
  },
]
