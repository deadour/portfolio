import type { CvProfile, CvVariant } from './types'

// The CV variants. They share the template (src/cv/CvDocument.tsx) and all the data in
// src/data/: here only the focus changes — headline, summary, the order of the experience
// bullets and skills, and which side projects and certifications make the cut.
// `npm run cv` writes public/cv/<profile>-<lang>.pdf for each one.
//
// Only `general` is linked from the site, and it's the complete one (up to 2 pages); the others fit one page. The others are for sending when a role asks for them,
// at short URLs (public/_redirects): /cv/fs/en, /cv/backend/es, /cv/data/en… and /cv, /cv/es for the general one.
export const cvProfiles: CvProfile[] = ['general', 'fs', 'backend', 'data']

export const cvVariants: Record<CvProfile, CvVariant> = {
  general: {
    label: { en: 'General', es: 'General' },
    headline: { en: 'Software & Data Engineer', es: 'Software & Data Engineer' },
    summary: {
      en: 'Software & Data Engineer with 3+ years in charge of the systems of BIAMAQ, an industrial machinery company with 3 branches in Argentina. I design, build and run end to end the software the company uses every day: rental and after-sales management, a sales assistant with product recommendations, OCR/LLM invoice automation, ETL and a data warehouse on top of the ERP, BI for management, and the infrastructure with Docker and CI/CD. I work with Python, Django REST Framework, SQL Server, PostgreSQL, React and TypeScript. Final-year Information Systems Engineering student at UTN, with an exchange semester in CESI’s Data Science master’s programme in France.',
      es: 'Software & Data Engineer con más de 3 años a cargo de los sistemas de BIAMAQ, empresa de maquinaria industrial con 3 sucursales en Argentina. Diseño, desarrollo y opero de punta a punta el software que la empresa usa todos los días: gestión de alquileres y service, un asistente de ventas con recomendaciones de productos, automatización de facturas con OCR/LLM, ETL y data warehouse sobre el ERP, BI para la dirección y la infraestructura con Docker y CI/CD. Trabajo con Python, Django REST Framework, SQL Server, PostgreSQL, React y TypeScript. Estudiante de último año de Ingeniería en Sistemas de Información (UTN), con un semestre de intercambio en el Máster en Data Science de CESI, Francia.',
    },
    experience: ['rentalia', 'sales', 'automation', 'reports', 'etl', 'service', 'infra'],
    projects: ['ecommerce', 'casaPalma', 'resisCultural', 'chedul', 'lastfm', 'dynamo', 'cesiDl', 'cesiIot'],
    skills: ['languages', 'backend', 'data', 'ml', 'frontend', 'infra'],
    certifications: ['fullStack', 'english', 'powerBi', 'ml', 'pythonFlask'],
    maxPages: 2,
    detailed: true,
  },
  fs: {
    label: { en: 'Software Engineer / Full Stack', es: 'Software Engineer / Full Stack' },
    headline: { en: 'Software Engineer · Full Stack', es: 'Desarrollador de Software Full Stack' },
    summary: {
      en: '3+ years building and running BIAMAQ’s internal systems end to end: rentals, service, sales, automation and reporting, with Django, React, Docker and CI/CD. Final-year Information Systems Engineering student (UTN); exchange at CESI, France.',
      es: 'Más de 3 años desarrollando y operando los sistemas de BIAMAQ de punta a punta: alquileres, service, ventas, automatización y reportes, con Django, React, Docker y CI/CD. Último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'automation', 'sales', 'reports', 'service'],
    projects: ['chedul', 'dynamo'],
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
    projects: ['chedul', 'dynamo'],
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
