import type { Localized } from '../i18n'

export type Entry = {
  title: Localized
  // Role, institution or similar. Hidden when empty.
  meta: Localized
  period: Localized
  description?: Localized
}

const empty = { en: '', es: '' }

export const experience: Entry[] = [
  {
    // TODO: add role and dates.
    title: { en: 'BIAMAQ', es: 'BIAMAQ' },
    meta: empty,
    period: empty,
    description: {
      en: 'Systems, data, automation and software development inside an industrial company.',
      es: 'Sistemas, datos, automatización y desarrollo de software dentro de una empresa industrial.',
    },
  },
]

export const education: Entry[] = [
  {
    // TODO: add the university name in `meta`.
    title: { en: 'Systems Engineering', es: 'Ingeniería en Sistemas' },
    meta: empty,
    period: { en: 'In progress (final stage)', es: 'En curso (etapa final)' },
  },
  {
    title: { en: 'CESI École d’Ingénieurs — France', es: 'CESI École d’Ingénieurs — Francia' },
    meta: { en: 'Academic exchange', es: 'Intercambio académico' },
    period: { en: '2026', es: '2026' },
    description: {
      en: 'Data science, IoT and engineering projects.',
      es: 'Proyectos de data science, IoT e ingeniería.',
    },
  },
]
