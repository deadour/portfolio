import type { CvProfile, CvVariant } from './types'

// The CV variants. They share the template (src/cv/CvDocument.tsx) and all the data in
// src/data/: here only the focus changes — headline, summary, the order of the experience
// bullets and skills, and which side projects and certifications make the cut.
// `npm run cv` writes public/cv/<profile>-<lang>.pdf for each one.
//
// Only `general` is linked from the site. The others are for sending when a role asks for them,
// at short URLs (public/_redirects): /cv/fs/en, /cv/backend/es, /cv/data/en… and /cv, /cv/es for the general one.
export const cvProfiles: CvProfile[] = ['general', 'fs', 'backend', 'data']

export const cvVariants: Record<CvProfile, CvVariant> = {
  general: {
    label: { en: 'General', es: 'General' },
    headline: { en: 'Software & Data Engineer', es: 'Software & Data Engineer' },
    summary: {
      en: '3+ years building and running the systems of BIAMAQ (industrial machinery, 3 branches): business applications, ERP integrations, ETL, BI and OCR/LLM automation. Final-year Information Systems Engineering student (UTN); exchange at CESI, France.',
      es: 'Más de 3 años desarrollando y operando los sistemas de BIAMAQ (maquinaria industrial, 3 sucursales): aplicaciones de gestión, integraciones ERP, ETL, BI y automatización con OCR/LLM. Último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'automation', 'sales', 'reports', 'service', 'infra'],
    projects: ['ecommerce', 'resisCultural'],
    skills: ['languages', 'backend', 'data', 'frontend', 'infra'],
    certifications: ['fullStack', 'english'],
  },
  fs: {
    label: { en: 'Software Engineer / Full Stack', es: 'Software Engineer / Full Stack' },
    headline: { en: 'Software Engineer · Full Stack', es: 'Desarrollador de Software Full Stack' },
    summary: {
      en: '3+ years building and running BIAMAQ’s internal systems end to end: rentals, service, sales, automation and reporting, with Django, React, Docker and CI/CD. Final-year Information Systems Engineering student (UTN); exchange at CESI, France.',
      es: 'Más de 3 años desarrollando y operando los sistemas de BIAMAQ de punta a punta: alquileres, service, ventas, automatización y reportes, con Django, React, Docker y CI/CD. Último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'automation', 'sales', 'reports', 'service', 'infra'],
    projects: ['ecommerce', 'resisCultural'],
    skills: ['languages', 'backend', 'frontend', 'data', 'infra'],
    certifications: ['fullStack', 'english'],
  },
  backend: {
    label: { en: 'Python Backend Engineer', es: 'Python Backend Engineer' },
    headline: { en: 'Python Backend Engineer', es: 'Desarrollador Backend Python' },
    summary: {
      en: '3+ years building and maintaining the backend of BIAMAQ’s internal systems: Django REST Framework APIs over SQL Server and PostgreSQL, OCR/LLM assistants, legacy ERP integrations, Celery jobs, and Docker deployments with CI/CD on Linux. Final-year Information Systems Engineering student at UTN; exchange semester at CESI, France.',
      es: 'Más de 3 años desarrollando y manteniendo los sistemas internos de BIAMAQ: APIs en Django REST Framework sobre SQL Server y PostgreSQL, asistentes de OCR/LLM, integraciones con un ERP legacy, tareas con Celery y despliegues con Docker y CI/CD en Linux. Estudiante de último año de Ingeniería en Sistemas (UTN); intercambio de un semestre en CESI, Francia.',
    },
    experience: ['service', 'rentalia', 'automation', 'reports', 'infra'],
    projects: ['resisCultural', 'chedul'],
    skills: ['languages', 'backend', 'data', 'infra'],
    certifications: ['pythonFlask', 'english'],
  },
  data: {
    label: { en: 'Data Engineer', es: 'Data Engineer' },
    headline: { en: 'Data Engineer', es: 'Data Engineer' },
    summary: {
      en: '3+ years building BIAMAQ’s data platform: Python ETL from a SQL Server ERP to a data warehouse, BI and nightly recommendations. Final-year engineering student (UTN); Data Science exchange at CESI, France.',
      es: 'Más de 3 años desarrollando la plataforma de datos de BIAMAQ: ETL Python desde un ERP SQL Server a un data warehouse, BI y recomendaciones nocturnas. Último año de Ingeniería en Sistemas (UTN); Data Science en CESI, Francia.',
    },
    experience: ['automation', 'etl', 'reports', 'sales', 'service'],
    projects: ['lastfm', 'cesiDl'],
    skills: ['languages', 'data', 'ml', 'backend', 'infra'],
    certifications: ['powerBi', 'ml'],
  },
}

// Published file of each variant, under public/.
export const cvPath = (profile: CvProfile, lang: string) => `/cv/${profile}-${lang}.pdf`
