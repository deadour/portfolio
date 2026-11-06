import type { Experience } from './types'

// Work experience, newest first. Bullets are short enough for the CV (about two printed lines).
export const experience: Experience[] = [
  {
    id: 'biamaq',
    company: 'BIAMAQ SRL',
    href: 'https://biamaq.com.ar',
    logo: '/images/logo-biamaq.webp',
    role: { en: 'Software & Data Engineer · IT Lead', es: 'Software & Data Engineer · IT Lead' },
    meta: { en: 'Full-time · Remote, Argentina', es: 'Jornada completa · Remoto, Argentina' },
    // Context line on the CV.
    industry: { en: 'Industrial machinery, 3 branches', es: 'Maquinaria industrial, 3 sucursales' },
    start: '2023-11',
    description: {
      en: 'Industrial machinery company with 3 branches. I build and run its systems: software for daily operations, ERP integrations, data, automation and infrastructure.',
      es: 'Empresa de maquinaria industrial con 3 sucursales. Desarrollo y opero sus sistemas: software para la operación diaria, integraciones con el ERP, datos, automatización e infraestructura.',
    },
    bullets: [
      {
        id: 'rentalia',
        project: 'rentalia',
        text: {
          en: 'Led the re-engineering of the rental module into RentalIA: booking, tablet-signed PDF contracts, returns, workshop and ARCA e-invoicing, synced with the ERP or standalone.',
          es: 'Lideré la reingeniería del módulo de alquileres en RentalIA: reserva, contratos en PDF firmados en tableta, devoluciones, taller y facturación electrónica ARCA, sincronizado con el ERP o independiente.',
        },
        stack: ['Django REST Framework', 'PostgreSQL', 'SQL Server', 'React', 'Playwright', 'Docker'],
      },
      {
        id: 'sales',
        project: 'sales',
        text: {
          en: 'Built BIAMAQ Sales, a tablet sales assistant connected live to the ERP, with recommendations learned from sales history (top-3 hit rate from 32% to 40% in temporal validation) and nightly retraining.',
          es: 'Desarrollé BIAMAQ Ventas, un asistente de venta en tablet conectado en vivo al ERP, con recomendaciones aprendidas del historial (acierto top-3 de 32% a 40% en validación temporal) y reentrenamiento nocturno.',
        },
        stack: ['Python', 'Pandas', 'scikit-learn', 'Django REST Framework', 'React', 'TypeScript'],
      },
      {
        id: 'reports',
        project: 'reports',
        text: {
          en: 'Built BIAMAQ Reports, the BI platform management uses daily: sales, purchases vs sales, 80/20 customers, receivables aging and workshop stock. Also maintain Power BI dashboards.',
          es: 'Desarrollé Reportes BIAMAQ, la plataforma de BI que la dirección usa a diario: ventas, compras vs ventas, clientes 80/20, antigüedad de deuda y stock del taller. También mantengo tableros en Power BI.',
        },
        stack: ['Django REST Framework', 'React', 'SQL Server', 'Power BI'],
      },
      {
        id: 'etl',
        text: {
          en: 'Built ETL pipelines that load the SQL Server ERP into a data warehouse (sales, purchases, stock, receivables, service and rentals), with daily loads and monthly snapshots scheduled with Celery.',
          es: 'Desarrollé pipelines ETL que cargan el ERP en SQL Server a un data warehouse (ventas, compras, stock, cobranzas, service y alquileres), con cargas diarias y snapshots mensuales programados con Celery.',
        },
        stack: ['Python', 'Pandas', 'SQL Server', 'Celery', 'Redis'],
      },
      {
        id: 'infra',
        text: {
          en: 'Run the infrastructure: Docker on Linux servers and CI/CD with GitHub Actions on a self-hosted runner.',
          es: 'Administro la infraestructura: Docker en servidores Linux y CI/CD con GitHub Actions en un runner self-hosted.',
        },
        stack: ['Docker', 'Linux', 'Nginx', 'GitHub Actions'],
      },
    ],
  },
]
