import type { Education } from './types'

export const education: Education[] = [
  {
    id: 'utn',
    institution: 'Universidad Tecnológica Nacional (UTN FRRe)',
    href: 'https://www.frre.utn.edu.ar',
    logo: '/images/logo-utn.webp',
    location: { en: 'Resistencia, Argentina', es: 'Resistencia, Argentina' },
    degree: { en: 'Information Systems Engineering', es: 'Ingeniería en Sistemas de Información' },
    period: { en: 'Final year in progress', es: 'Último año en curso' },
  },
  {
    id: 'cesi',
    institution: 'CESI École d’Ingénieurs',
    href: 'https://rouen.cesi.fr',
    logo: '/images/logo-cesi.webp',
    location: { en: 'Rouen, France', es: 'Rouen, Francia' },
    degree: {
      en: 'International academic exchange · Data Science master’s programme · ARFITEC scholarship',
      es: 'Intercambio académico internacional · Máster en Data Science · Beca ARFITEC',
    },
    period: { en: 'Spring semester 2026', es: 'Primer semestre 2026' },
    exchange: true,
    description: {
      en: 'One semester of coursework in data science, AI, IoT and web development, with engineering projects in multidisciplinary teams.',
      es: 'Un semestre de cursada en data science, IA, IoT y desarrollo web, con proyectos de ingeniería en equipos multidisciplinarios.',
    },
    images: [
      {
        src: '/images/cesi-presenting.webp',
        alt: {
          en: 'Eduardo presenting a team project in a CESI lecture hall',
          es: 'Eduardo presentando un proyecto en equipo en un auditorio de CESI',
        },
      },
      {
        src: '/images/cesi-team.webp',
        alt: {
          en: 'Eduardo working with his project team around a table with laptops',
          es: 'Eduardo trabajando con su equipo de proyecto alrededor de una mesa con notebooks',
        },
      },
      {
        src: '/images/cesi.webp',
        alt: { en: 'Eduardo in front of the CESI École d’Ingénieurs sign', es: 'Eduardo frente al cartel de CESI École d’Ingénieurs' },
      },
    ],
  },
]
