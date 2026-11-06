import type { L } from './types'

// Who I am and where to find me. Shared by the portfolio and the CVs.
// Only what is meant to be public: no phone number or street address.
export const site = {
  name: 'Eduardo M. Ramírez',
  domain: 'eduramirez.dev',
  github: 'https://github.com/deadour',
  linkedin: 'https://www.linkedin.com/in/eduramirez645/',
  email: 'edu.ramirez645@gmail.com',
  // Shown in the hero (and marked on its map) and in the CV header.
  location: { en: 'Resistencia, Chaco, Argentina', es: 'Resistencia, Chaco, Argentina' } satisfies L,
  portrait: '/images/portrait.webp',
  // Headline on the portfolio. Each CV variant has its own (src/data/cv.ts).
  headline: { en: 'Software & Data Engineer', es: 'Software & Data Engineer' } satisfies L,
  // Who I am in two sentences: the first thing a visitor reads.
  summary: {
    en: 'I build backend systems, data pipelines and internal software used in real business operations. For 3+ years I’ve been in charge of the systems of BIAMAQ, an industrial machinery company with 3 branches in Argentina.',
    es: 'Desarrollo sistemas backend, pipelines de datos y software interno que se usa en la operación real de empresas. Hace más de 3 años estoy a cargo de los sistemas de BIAMAQ, una empresa de maquinaria industrial con 3 sucursales en Argentina.',
  } satisfies L,
}
