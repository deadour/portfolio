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
        id: 'service',
        cvOnly: true,
        text: {
          en: 'Built Service BIAMAQ: versioned repair quotes, workshop tracking, ERP orders and Infolab history.',
          es: 'Desarrollé Service BIAMAQ: presupuestos de reparación versionados, taller, pedidos al ERP e historial Infolab.',
        },
        stack: ['Django REST Framework', 'SQL Server', 'React', 'TypeScript', 'Docker'],
      },
      {
        id: 'rentalia',
        cvText: {
          en: 'Built RentalIA: replaced paper contracts with tablet-signed PDFs, rental returns, workshop and ARCA invoicing, integrated with the ERP or standalone.',
          es: 'Desarrollé RentalIA: contratos en papel reemplazados por PDFs firmados en tableta, devoluciones, taller y facturación ARCA, con ERP o independiente.',
        },
        project: 'rentalia',
        text: {
          en: 'Led the re-engineering of the rental module into RentalIA, replacing paper contracts and fragmented legacy workflows with tablet-signed PDFs, returns, workshop and ARCA e-invoicing, synced with the ERP or standalone.',
          es: 'Lideré la reingeniería del módulo de alquileres en RentalIA: reemplacé contratos en papel y flujos legacy fragmentados por PDFs firmados en tableta, devoluciones, taller y facturación electrónica ARCA, sincronizado con el ERP o independiente.',
        },
        stack: ['Django REST Framework', 'PostgreSQL', 'SQL Server', 'React', 'Playwright', 'Docker'],
      },
      {
        id: 'automation',
        cvText: {
          en: 'Automated invoices, expenses and products with OCR/LLM and tax checks: manual time from 8 to 2 hours (75% less).',
          es: 'Automaticé facturas, gastos y productos con OCR/LLM y controles fiscales: de 8 a 2 horas manuales (75% menos).',
        },
        text: {
          en: 'Automated invoice, expense and product-data workflows with OCR/LLM assistants and tax checks, reducing estimated manual processing time from 8 to 2 hours (6 hours saved; 75% less manual time).',
          es: 'Automaticé la carga de facturas, gastos y productos con asistentes de OCR/LLM y controles fiscales, reduciendo el tiempo manual estimado de 8 a 2 horas (6 horas ahorradas; 75% menos tiempo manual).',
        },
        stack: ['Python', 'OCR', 'LLM', 'SQL Server', 'Django REST Framework'],
      },
      {
        id: 'sales',
        cvText: {
          en: 'Built a sales assistant on the ERP and DW with customer segmentation and nightly recommendations, twice as accurate as best sellers (~40% vs ~20%).',
          es: 'Desarrollé un asistente de ventas sobre ERP y DW con segmentación y recomendaciones nocturnas: el doble de aciertos que lo más vendido (~40% vs ~20%).',
        },
        project: 'sales',
        text: {
          en: 'Transformed BIAMAQ’s sales workflow with customer segmentation, product recommendations and commercial follow-up, integrating the ERP and DW with nightly retraining (about 40% offline hit@3 versus 20% for best sellers).',
          es: 'Transformé el proceso comercial de BIAMAQ con segmentación de clientes, recomendaciones y seguimiento de oportunidades, integrando ERP y DW con reentrenamiento nocturno (hit@3 offline de ~40% frente a ~20% de lo más vendido).',
        },
        stack: ['Python', 'Pandas', 'scikit-learn', 'Django REST Framework', 'React', 'TypeScript'],
      },
      {
        id: 'reports',
        cvText: {
          en: 'Built company-wide BI with ERP ETL and a data warehouse: sales, purchasing, collections, daily replenishment metrics and Power BI dashboards.',
          es: 'Desarrollé BI para toda la empresa con ETL del ERP y data warehouse: ventas, compras, cobranzas, reposición diaria y tableros Power BI.',
        },
        project: 'reports',
        text: {
          en: 'Built BIAMAQ Reports, the BI platform management uses daily: sales, purchases vs sales, 80/20 customers, receivables aging, seller orders and workshop stock. Also maintain Power BI dashboards and daily replenishment metrics.',
          es: 'Desarrollé Reportes BIAMAQ, la plataforma de BI que la dirección usa a diario: ventas, compras vs ventas, clientes 80/20, antigüedad de deuda, pedidos de vendedores y stock del taller. También mantengo tableros en Power BI y métricas diarias de reabastecimiento.',
        },
        stack: ['Django REST Framework', 'React', 'SQL Server', 'Power BI'],
      },
      {
        id: 'etl',
        cvText: {
          en: 'Built Python ETL from the SQL Server ERP to a data warehouse, with daily loads and monthly snapshots scheduled with Celery.',
          es: 'Desarrollé ETL en Python desde el ERP SQL Server a un data warehouse, con cargas diarias y snapshots mensuales programados con Celery.',
        },
        text: {
          en: 'Built ETL pipelines that load the SQL Server ERP into a data warehouse (sales, purchases, stock, receivables, service and rentals), with daily loads and monthly snapshots scheduled with Celery.',
          es: 'Desarrollé pipelines ETL que cargan el ERP en SQL Server a un data warehouse (ventas, compras, stock, cobranzas, service y alquileres), con cargas diarias y snapshots mensuales programados con Celery.',
        },
        stack: ['Python', 'Pandas', 'SQL Server', 'Celery', 'Redis'],
      },
      {
        id: 'infra',
        cvText: {
          en: 'Run infrastructure and deployments: Docker on Linux with Nginx and CI/CD on GitHub Actions.',
          es: 'Administro infraestructura y despliegues: Docker en Linux con Nginx y CI/CD en GitHub Actions.',
        },
        text: {
          en: 'Run the infrastructure: Docker on Linux servers and CI/CD with GitHub Actions on a self-hosted runner.',
          es: 'Administro la infraestructura: Docker en servidores Linux y CI/CD con GitHub Actions en un runner self-hosted.',
        },
        stack: ['Docker', 'Linux', 'Nginx', 'GitHub Actions'],
      },
    ],
  },
]
