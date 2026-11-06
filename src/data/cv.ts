import type { CvProfile, CvVariant } from './types'

// The three CV variants. They share the template (src/cv/CvDocument.tsx) and all the data in
// src/data/: here only the focus changes — headline, summary, the order of the experience
// bullets and skills, and which side projects and certifications make the cut.
// `npm run cv` writes public/cv/<profile>-<lang>.pdf for each one.
export const cvProfiles: CvProfile[] = ['software', 'backend', 'data']

export const cvVariants: Record<CvProfile, CvVariant> = {
  software: {
    label: { en: 'Software Engineer / Full Stack', es: 'Software Engineer / Full Stack' },
    headline: { en: 'Software Engineer · Full Stack', es: 'Desarrollador de Software Full Stack' },
    summary: {
      en: 'Software engineer building and running the internal systems of an industrial machinery company with 3 branches (rental management, an ERP-connected sales assistant and reporting), from architecture to deployment. Final-year Information Systems Engineering student at UTN; exchange semester at CESI, France.',
      es: 'Desarrollo y opero los sistemas internos de una empresa de maquinaria industrial con 3 sucursales (alquileres, un asistente de venta conectado al ERP y reportes), de la arquitectura al despliegue. Estudiante de último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'sales', 'reports', 'etl', 'infra'],
    projects: ['chedul', 'dynamo'],
    skills: ['languages', 'backend', 'frontend', 'data', 'infra'],
    certifications: ['fullStack', 'english'],
  },
  backend: {
    label: { en: 'Python Backend Engineer', es: 'Python Backend Engineer' },
    headline: { en: 'Python Backend Engineer', es: 'Desarrollador Backend Python' },
    summary: {
      en: 'Since 2023 I build and maintain the backend of BIAMAQ’s internal systems: Django REST Framework APIs over SQL Server and PostgreSQL, legacy ERP integrations, Celery jobs, and Docker deployments with CI/CD on Linux. Final-year Information Systems Engineering student at UTN; exchange semester at CESI, France.',
      es: 'Desde 2023 desarrollo y mantengo los sistemas internos de BIAMAQ: APIs en Django REST Framework sobre SQL Server y PostgreSQL, integraciones con un ERP legacy, tareas con Celery y despliegues con Docker y CI/CD en Linux. Estudiante de último año de Ingeniería en Sistemas (UTN); intercambio en CESI, Francia.',
    },
    experience: ['rentalia', 'reports', 'sales', 'etl', 'infra'],
    projects: ['dynamo', 'chedul'],
    skills: ['languages', 'backend', 'data', 'infra'],
    certifications: ['pythonFlask', 'english'],
  },
  data: {
    label: { en: 'Data Engineer', es: 'Data Engineer' },
    headline: { en: 'Data Engineer', es: 'Data Engineer' },
    summary: {
      en: 'Since 2023 I build the data platform of BIAMAQ, an industrial machinery company: Python ETL from the SQL Server ERP into a data warehouse, the BI platform management uses daily and a recommendation model retrained every night on sales history. Final-year Information Systems Engineering student at UTN; Data Science semester at CESI, France.',
      es: 'Desde 2023 desarrollo la plataforma de datos de BIAMAQ: ETL en Python desde el ERP en SQL Server a un data warehouse, la plataforma de BI que la dirección usa a diario y un modelo de recomendación que se reentrena cada noche. Estudiante de último año de Ingeniería en Sistemas (UTN); semestre de Data Science en CESI, Francia.',
    },
    experience: ['etl', 'reports', 'sales', 'infra'],
    projects: ['lastfm', 'cesiDl'],
    skills: ['languages', 'data', 'ml', 'backend', 'infra'],
    certifications: ['powerBi', 'ml', 'english'],
  },
}

// Published file of each variant, under public/.
export const cvPath = (profile: CvProfile, lang: string) => `/cv/${profile}-${lang}.pdf`
