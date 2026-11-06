import type { L, SkillGroup } from './types'

// Technologies I've used in real or published projects. The portfolio shows every group in this
// order; each CV variant picks and orders the groups (src/data/cv.ts). Keep each group short.
export const skills: Record<SkillGroup, { title: L; items: string[] }> = {
  languages: { title: { en: 'Languages', es: 'Lenguajes' }, items: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Go'] },
  backend: {
    title: { en: 'Backend', es: 'Backend' },
    items: ['Django', 'Django REST Framework', 'FastAPI', 'Celery', 'Redis', 'REST APIs'],
  },
  data: {
    title: { en: 'Data', es: 'Datos' },
    items: ['SQL Server', 'PostgreSQL', 'Pandas', 'Parquet', 'ETL', 'Data warehousing', 'Power BI', 'Streamlit'],
  },
  frontend: { title: { en: 'Frontend', es: 'Frontend' }, items: ['React', 'Next.js', 'Vite', 'Tailwind CSS'] },
  infra: {
    title: { en: 'Infrastructure & testing', es: 'Infraestructura y testing' },
    items: ['Docker', 'Linux', 'Nginx', 'GitHub Actions', 'Google Cloud Run', 'Vercel', 'pytest', 'Playwright'],
  },
  ml: {
    title: { en: 'Machine learning', es: 'Machine learning' },
    items: ['scikit-learn', 'PyTorch', 'Keras', 'NumPy', 'SHAP'],
  },
}

export const skillOrder = Object.keys(skills) as SkillGroup[]

export const languages: { name: L; level: L }[] = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'B1', es: 'B1' } },
  { name: { en: 'French', es: 'Francés' }, level: { en: 'A2', es: 'A2' } },
]
