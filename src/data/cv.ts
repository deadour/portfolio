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
      en: 'Since 2023 I build BIAMAQ’s operational software, ERP integrations and data platform across 3 branches. Final-year Information Systems Engineering student at UTN; exchange semester at CESI, France.',
      es: 'Desde 2023 desarrollo software de gestión, integraciones ERP y la plataforma de datos de BIAMAQ para 3 sucursales. Último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'automation', 'sales', 'reports', 'service'],
    projects: ['ecommerce', 'resisCultural'],
    skills: ['languages', 'backend', 'data', 'frontend', 'infra'],
    certifications: ['fullStack', 'english'],
  },
  fs: {
    label: { en: 'Software Engineer / Full Stack', es: 'Software Engineer / Full Stack' },
    headline: { en: 'Software Engineer · Full Stack', es: 'Desarrollador de Software Full Stack' },
    summary: {
      en: 'I build and operate BIAMAQ’s internal systems, from architecture to deployment: rentals, service, sales, automation and reporting. Final-year Information Systems Engineering student at UTN; exchange semester at CESI, France.',
      es: 'Desarrollo y opero los sistemas de BIAMAQ, de la arquitectura al despliegue: alquileres, service, ventas, automatización y reportes. Último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'automation', 'sales', 'reports', 'service'],
    projects: ['ecommerce', 'resisCultural'],
    skills: ['languages', 'backend', 'frontend', 'data', 'infra'],
    certifications: ['fullStack', 'english'],
  },
  backend: {
    label: { en: 'Python Backend Engineer', es: 'Python Backend Engineer' },
    headline: { en: 'Python Backend Engineer', es: 'Desarrollador Backend Python' },
    summary: {
      en: 'Since 2023 I build and maintain the backend of BIAMAQ’s internal systems: Django REST Framework APIs over SQL Server and PostgreSQL, OCR/LLM assistants, legacy ERP integrations, Celery jobs, and Docker deployments with CI/CD on Linux. Final-year Information Systems Engineering student at UTN; exchange semester at CESI, France.',
      es: 'Desde 2023 desarrollo y mantengo los sistemas internos de BIAMAQ: APIs en Django REST Framework sobre SQL Server y PostgreSQL, asistentes de OCR/LLM, integraciones con un ERP legacy, tareas con Celery y despliegues con Docker y CI/CD en Linux. Estudiante de último año de Ingeniería en Sistemas (UTN); intercambio de un semestre en CESI, Francia.',
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
      en: 'I build BIAMAQ’s data platform: Python ETL, SQL Server, BI and recommendations. Final-year engineering student at UTN; Data Science exchange at CESI, France.',
      es: 'Desarrollo la plataforma de datos de BIAMAQ: ETL Python, SQL Server, BI y recomendaciones. Último año de Ingeniería en Sistemas (UTN); intercambio en Data Science, CESI Francia.',
    },
    experience: ['automation', 'etl', 'reports', 'sales', 'service'],
    projects: ['lastfm', 'cesiDl'],
    skills: ['languages', 'data', 'ml', 'backend', 'infra'],
    certifications: ['powerBi', 'ml'],
  },
}

// Published file of each variant, under public/.
export const cvPath = (profile: CvProfile, lang: string) => `/cv/${profile}-${lang}.pdf`
