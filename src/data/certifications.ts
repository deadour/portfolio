import type { Certification } from './types'

// Certifications, newest first. Only the ones with a public `url` are shown (portfolio and CV),
// so every listed credential can be checked. Titles stay in their original language.
export const certifications: Certification[] = [
  {
    id: 'powerBi',
    title: 'Power BI: Desde cero para principiantes',
    featured: true,
    issuer: 'Udemy',
    date: '2024-02',
    url: 'https://www.udemy.com/certificate/UC-fc3d5160-a68f-48a8-9b8e-c7cde2399f8f/',
  },
  {
    id: 'testing',
    title: 'Testing Manual, Ágil y con Herramientas',
    issuer: 'Universidad Tecnológica Nacional',
    date: '2023-04',
    url: '', // Drive file is private
  },
  {
    id: 'fullStack',
    title: 'Programación Web Full Stack',
    featured: true,
    issuer: 'Argentina Programa',
    date: '2023-04',
    url: 'https://drive.google.com/file/d/1h7tmo6JmEJcUroCgNeEY4w_DSJ-Ng4pB/view',
  },
  {
    id: 'english',
    title: 'Inglés Técnico para Desarrolladores de Software — Nivel 6',
    featured: true,
    issuer: 'Centro Universitario de Idiomas (CUI)',
    date: '2023-02',
    url: 'https://drive.google.com/file/d/1sl3oqMVPHEo4PFhgAjh2esQeuwStqhD0/view',
  },
  {
    id: 'ml',
    title: 'Introducción a Machine Learning',
    featured: true,
    issuer: 'Informatorio Chaco',
    date: '2023-01',
    url: 'https://drive.google.com/file/d/1wd49i3LZfZdBGTgKmgDdHUlMv_Fmf9Ug/view',
  },
  {
    id: 'webDev',
    title: 'Programación y Desarrollo Web',
    issuer: 'Informatorio Chaco',
    date: '2022-12',
    url: 'https://drive.google.com/file/d/1QGbElGnuGyTNXyBdXZnVy-q6bhrjUxiJ/view',
  },
  {
    id: 'pythonFlask',
    title: 'Python sin fronteras: HTML, CSS, Flask y MySQL',
    issuer: 'Udemy',
    date: '2022-09',
    url: 'https://www.udemy.com/certificate/UC-5b7e67b2-db58-44a7-8f52-8619d7f867e3/',
  },
  {
    id: 'programming',
    title: 'Introducción a la Programación',
    issuer: 'Informatorio Chaco',
    date: '2022-08',
    url: 'https://drive.google.com/file/d/1AzrbLTa2PgxXhtAhA3UejZ_uvSpgaStJ/view',
  },
  {
    id: 'argentinaPrograma',
    title: 'Argentina Programa 2022',
    issuer: 'Argentina Programa',
    date: '2022-07',
    url: '', // verification site (seprogramar.inti.gob.ar) is offline
  },
]

// Only verifiable credentials are published.
export const verifiedCertifications = certifications.filter((cert) => cert.url)
export const certificationById = Object.fromEntries(certifications.map((c) => [c.id, c])) as Record<
  Certification['id'],
  Certification
>
