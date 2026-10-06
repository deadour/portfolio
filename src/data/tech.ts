import type { Localized } from '../i18n'

export const tech: { group: Localized; items: string[] }[] = [
  {
    group: { en: 'Data', es: 'Datos' },
    items: ['Python', 'SQL', 'PostgreSQL', 'Parquet', 'Streamlit', 'Power BI'],
  },
  {
    group: { en: 'Software', es: 'Software' },
    items: ['Django', 'React', 'TypeScript', 'Docker', 'GitHub Actions'],
  },
]
