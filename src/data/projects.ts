import type { Project } from './types'

// Every project, in the order it's shown: professional work first, then personal and academic.
// Internal systems: screens must be mockups with sample data only.
export const projects: Project[] = [
  {
    id: 'reports',
    title: { en: 'BIAMAQ Reports', es: 'Reportes BIAMAQ' },
    kind: { en: 'BIAMAQ · Business Intelligence', es: 'BIAMAQ · Business Intelligence' },
    group: 'professional',
    status: 'internal',
    logo: { src: '/images/logo-biamaq.webp' },
    gallery: 'wide',
    summary: {
      en: 'An internal platform spanning the whole company and its 3 branches. Sales, purchasing, administration, collections, inventory, rentals and service each have their own data and workflows, while management gets a shared view of the business.',
      es: 'Plataforma interna que abarca toda la empresa y sus 3 sucursales. Ventas, compras, administración, cobranzas, stock, alquileres y service tienen sus propios datos y circuitos de trabajo, mientras la dirección dispone de una visión compartida del negocio.',
    },
    caseStudy: {
      problem: {
        en: 'Management needed one place to follow sales, purchases, receivables, customers and workshop activity across 3 branches. The data was generated every day in the company’s ERP (SQL Server), which had no management reporting of its own.',
        es: 'La dirección necesitaba un solo lugar para seguir ventas, compras, cobranzas, clientes y la actividad del taller de las 3 sucursales. Los datos se generaban todos los días en el ERP de la empresa (SQL Server), que no traía reportes de gestión.',
      },
      solution: {
        en: 'Scheduled Python extractors load the ERP into a data warehouse. A Django REST API and a React frontend serve the analyses: sales dashboard, purchases vs sales, 80/20 customers, receivables aging and workshop stock.',
        es: 'Extractores en Python programados cargan el ERP en un data warehouse. Una API en Django REST Framework y un frontend en React sirven los análisis: tablero de ventas, compras vs ventas, clientes 80/20, antigüedad de deuda y stock del taller.',
      },
      role: {
        en: 'I designed and built it end to end (extractors, data warehouse, API, frontend and deployment) and I maintain it.',
        es: 'Lo diseñé y desarrollé de punta a punta (extractores, data warehouse, API, frontend y despliegue) y lo mantengo.',
      },
      outcome: {
        en: 'Used by management in day-to-day operations; daily stock intelligence turns replenishment rules and reorder points into a repeatable process instead of spreadsheet review.',
        es: 'La dirección lo usa en la operación diaria; el stock inteligente calcula cada día reglas de reabastecimiento y puntos de pedido en vez de depender de una revisión manual en planillas.',
      },
    },
    highlights: [
      {
        en: 'Modules by business area: sales targets and commissions; purchasing, suppliers and payment orders; customers, collections and accounts; stock, rentals, contracts and service. Excel/PDF exports and Google Sheets/Drive integrations connect daily work.',
        es: 'Módulos por área: ventas, objetivos y comisiones; compras, proveedores y órdenes de pago; clientes, cobranzas y cuenta corriente; stock, alquileres, contratos y service. Exportaciones Excel/PDF e integraciones con Google Sheets/Drive conectan el trabajo diario.',
      },
      {
        en: 'Python and Pandas extractors, scheduled with Celery and Redis: daily loads, monthly receivables snapshots and customer classification.',
        es: 'Extractores en Python y Pandas programados con Celery y Redis: cargas diarias, snapshots mensuales de cobranzas y clasificación de clientes.',
      },
      {
        en: 'Analyses include a management sales dashboard, purchases vs sales history, an 80/20 customer analysis with retention, receivables aging and workshop stock.',
        es: 'Incluye tablero gerencial de ventas, histórico de compras vs ventas, análisis 80/20 de clientes con retención, antigüedad de deuda y stock del taller.',
      },
      {
        en: 'Daily stock intelligence combines current stock, sales history and reorder rules to support replenishment and seller-order decisions.',
        es: 'El stock inteligente combina stock actual, historial de ventas y reglas de punto de pedido para apoyar el reabastecimiento y las decisiones sobre pedidos de vendedores.',
      },
      {
        en: 'CI/CD with GitHub Actions: Docker images published to Docker Hub and deployed on a self-hosted runner.',
        es: 'CI/CD con GitHub Actions: imágenes Docker publicadas en Docker Hub y desplegadas en un runner self-hosted.',
      },
    ],
    pipeline: {
      steps: [
        { name: { en: 'SQL Server ERP', es: 'ERP SQL Server' }, detail: { en: 'transactional DB', es: 'BD transaccional' } },
        { name: { en: 'Python ETL', es: 'ETL en Python' }, detail: { en: 'extract · transform · load', es: 'extraer · transformar · cargar' } },
        { name: { en: 'Data warehouse', es: 'Data warehouse' }, detail: { en: 'modeled data', es: 'datos modelados' } },
        { name: { en: 'Calculations', es: 'Cálculos' }, detail: { en: 'KPIs · snapshots · stock', es: 'KPIs · snapshots · stock' } },
        { name: { en: 'Django REST', es: 'Django REST' }, detail: { en: 'backend API', es: 'API backend' } },
        { name: 'React', detail: { en: 'dashboards and workflows by area', es: 'tableros y gestión por área' } },
      ],
      branch: {
        name: { en: 'Redis + Celery', es: 'Redis + Celery' },
        detail: { en: 'daily jobs and snapshots', es: 'tareas diarias y snapshots' },
        target: 1,
      },
      caption: {
        en: 'Analytical data flow. The API also queries operational SQL Server data directly. The warehouse supports historical analysis, KPIs and daily stock calculations; each area consumes the information it needs.',
        es: 'Recorrido analítico de los datos. La API también consulta directamente la base operativa en SQL Server. El warehouse permite analizar históricos, KPIs y cálculos diarios de stock; cada área consume la información que necesita.',
      },
    },
    images: [
      {
        src: '/images/reports-sales-thumb.webp',
        href: '/images/reports-sales.webp',
        alt: {
          en: 'Management sales dashboard with KPIs and daily target vs invoiced chart',
          es: 'Tablero gerencial de ventas con KPIs y gráfico de objetivo vs facturado diario',
        },
      },
      {
        src: '/images/reports-purchases-vs-sales-thumb.webp',
        href: '/images/reports-purchases-vs-sales.webp',
        alt: {
          en: 'Monthly purchases vs sales history from 2023 to 2026',
          es: 'Histórico mensual de compras vs ventas de 2023 a 2026',
        },
      },
      {
        src: '/images/reports-customers-8020-thumb.webp',
        href: '/images/reports-customers-8020.webp',
        alt: {
          en: '80/20 customer analysis comparing two periods, with retention and loyal customers',
          es: 'Análisis 80/20 de clientes comparando dos períodos, con retención y clientes fieles',
        },
      },
      {
        src: '/images/reports-service-thumb.webp',
        href: '/images/reports-service.webp',
        alt: {
          en: 'Workshop stock by month with intake, output and machines in repair',
          es: 'Stock del taller por mes con ingresos, egresos y máquinas en reparación',
        },
      },
    ],
    imagesNote: { en: 'Screens shown with sample data.', es: 'Pantallas con datos de ejemplo.' },
    stack: ['Python', 'Pandas', 'SQL Server', 'Django REST Framework', 'Celery', 'Redis', 'React', 'Docker'],
    links: [],
  },
  {
    // No link to the commercial landing until its plans and terms are confirmed with BIAMAQ.
    id: 'rentalia',
    title: 'RentalIA',
    kind: { en: 'BIAMAQ · Full-stack platform', es: 'BIAMAQ · Plataforma full-stack' },
    group: 'professional',
    status: 'internal',
    logo: { src: '/images/logo-rentos.png', fit: 'contain' },
    gallery: 'wide',
    summary: {
      en: 'Rental management system developed at BIAMAQ: booking, signed contract, delivery, return, workshop and invoicing in one place. It works connected to the ERP or on its own.',
      es: 'Sistema de gestión de alquileres desarrollado en BIAMAQ: reserva, contrato firmado, entrega, devolución, taller y facturación en un solo lugar. Funciona conectado al ERP o de forma independiente.',
    },
    caseStudy: {
      problem: {
        en: 'BIAMAQ’s equipment rentals ran on a module of its legacy ERP. The goal was one system for the whole cycle: booking, contract, delivery, return, billable days, workshop and invoicing.',
        es: 'Los alquileres de equipos de BIAMAQ funcionaban en un módulo de su ERP legacy. El objetivo era un solo sistema para todo el ciclo: reserva, contrato, entrega, devolución, días facturables, taller y facturación.',
      },
      solution: {
        en: 'Multi-company, multi-branch platform with a booking wizard, PDF contracts signed on a tablet, technical delivery and return, billable-days close, workshop and electronic invoicing. It syncs with the ERP or runs standalone.',
        es: 'Plataforma multiempresa y multisucursal con asistente de reserva, contratos en PDF firmados en tableta, entrega técnica y devolución, cierre por días facturables, taller y facturación electrónica. Sincroniza con el ERP o funciona de forma independiente.',
      },
      role: {
        en: 'I led its re-engineering and development: architecture, backend, frontend, ERP integration and deployment.',
        es: 'Lideré su reingeniería y desarrollo: arquitectura, backend, frontend, integración con el ERP y despliegue.',
      },
      outcome: {
        en: 'In use in BIAMAQ’s rental operations. The contract flow moved from paper to professional PDF signatures on a tablet; the standalone mode also lets other rental businesses use it without BIAMAQ’s ERP.',
        es: 'En uso en la operación de alquileres de BIAMAQ. El flujo de contratos pasó del papel a firmas profesionales en PDF desde una tableta; el modo independiente también permite usarlo sin el ERP de BIAMAQ.',
      },
    },
    highlights: [
      {
        en: 'Django REST Framework backend with a hexagonal architecture, on PostgreSQL or SQL Server.',
        es: 'Backend en Django REST Framework con arquitectura hexagonal, sobre PostgreSQL o SQL Server.',
      },
      {
        en: 'PDF contracts signed on a Wacom tablet, and multi-company electronic invoicing with ARCA (Argentina’s tax authority).',
        es: 'Contratos en PDF firmados en tableta Wacom y facturación electrónica ARCA multiempresa.',
      },
      {
        en: 'Syncs with the company’s legacy SQL Server ERP, and also runs standalone without it.',
        es: 'Sincroniza con el ERP legacy de la empresa en SQL Server y también funciona de forma independiente.',
      },
      {
        en: 'React 19 frontend with Tailwind, Recharts and Framer Motion; Playwright end-to-end tests; Docker and CI with automatic deploys, migrations and smoke tests.',
        es: 'Frontend en React 19 con Tailwind, Recharts y Framer Motion; tests end-to-end con Playwright; Docker y CI con deploy automático, migraciones y smoke tests.',
      },
    ],
    pipeline: {
      steps: [
        { name: 'React + Vite', detail: { en: 'Customer, equipment and availability', es: 'Cliente, equipos y disponibilidad' } },
        { name: 'Django REST', detail: { en: 'Rental rules, tenant and branch validation', es: 'Reglas de alquiler, empresa y sucursal' } },
        { name: 'SQL Server', detail: { en: 'Inventory, rentals and returns', es: 'Inventario, alquileres y devoluciones' } },
      ],
      branch: {
        name: { en: 'Backend integrations', es: 'Integraciones del backend' },
        detail: { en: 'ERP sync, PDF contracts, Wacom signatures and audit trail', es: 'Sincronización ERP, contratos PDF, firma Wacom y auditoría' },
        target: 1,
      },
      caption: {
        en: 'Modular monolith: the API coordinates booking, signing, pickup, partial returns and closure. Workers handle synchronization with the ERP.',
        es: 'Monolito modular: la API coordina reserva, firma, retiro, devoluciones parciales y cierre. Los workers gestionan la sincronización con el ERP.',
      },
    },
    images: [
      {
        src: '/images/rentalia-dashboard-thumb.webp',
        href: '/images/rentalia-dashboard.webp',
        alt: {
          en: 'Daily dashboard: equipment out, the day’s projected rental and today’s priorities',
          es: 'Panel del día: equipos fuera, proyección del alquiler diario y prioridades de hoy',
        },
      },
      {
        src: '/images/rentalia-equipment-thumb.webp',
        href: '/images/rentalia-equipment.webp',
        alt: {
          en: 'Rental wizard, step 2: equipment catalog with photos and price per day',
          es: 'Asistente de alquiler, paso 2: catálogo de equipos con foto y precio por día',
        },
      },
      {
        src: '/images/rentalia-contract-thumb.webp',
        href: '/images/rentalia-contract.webp',
        alt: {
          en: 'Review and confirm: customer, serial numbers and daily total before generating the contract',
          es: 'Revisar y confirmar: cliente, números de serie y total por día antes de generar el contrato',
        },
      },
      {
        src: '/images/rentalia-return-thumb.webp',
        href: '/images/rentalia-return.webp',
        alt: {
          en: 'Returning a rental: days computed, discounts and the amount to charge',
          es: 'Devolución de un alquiler: días computados, descuentos y monto a cobrar',
        },
      },
      {
        src: '/images/rentalia-bi-thumb.webp',
        href: '/images/rentalia-bi.webp',
        alt: {
          en: 'Management & BI: billed revenue, occupancy and profitability per equipment',
          es: 'Gestión & BI: facturación conciliada, ocupación y rentabilidad por equipo',
        },
      },
    ],
    imagesNote: { en: 'Screens shown with sample data.', es: 'Pantallas con datos de ejemplo.' },
    stack: ['Django REST Framework', 'PostgreSQL', 'SQL Server', 'React', 'Tailwind CSS', 'Playwright', 'Docker'],
    links: [],
  },
  {
    // Screens show catalog products only, never customers or sales figures.
    id: 'sales',
    title: { en: 'BIAMAQ Sales', es: 'BIAMAQ Ventas' },
    kind: { en: 'BIAMAQ · AI applied to sales', es: 'BIAMAQ · IA aplicada a ventas' },
    group: 'professional',
    status: 'internal',
    logo: { src: '/images/logo-biamaq.webp' },
    gallery: 'wide',
    summary: {
      en: 'I changed how BIAMAQ sells with an intelligent system that brings customer segmentation, product recommendations and live stock together. Salespeople can understand each customer’s buying profile, find relevant products and identify opportunities to reconnect.',
      es: 'Cambié la forma de vender en BIAMAQ con un sistema inteligente que reúne segmentación de clientes, recomendaciones de productos y stock en vivo. Los vendedores pueden entender el perfil de compra de cada cliente, encontrar productos relevantes y detectar oportunidades para retomar el contacto.',
    },
    caseStudy: {
      problem: {
        en: 'BIAMAQ sells machines and tools from brands like STIHL, Makita and Husqvarna. Sales happened at the counter PC, and offering what goes with each machine, or an alternative, depended on each salesperson’s memory.',
        es: 'BIAMAQ vende máquinas y herramientas de marcas como STIHL, Makita y Husqvarna. La venta se hacía desde la PC del mostrador, y ofrecer lo que acompaña a cada máquina o una alternativa dependía de la memoria de cada vendedor.',
      },
      solution: {
        en: 'A sales workspace connected to the ERP and data warehouse: RFM segments, buying affinities, customer profiles and monthly history help prepare each contact. Product recommendations learned from sales and quotes suggest complementary items and alternatives. A nightly worker enriches the catalog and rebuilds the recommendation index.',
        es: 'Un espacio comercial conectado al ERP y al data warehouse: segmentos RFM, afinidades de compra, radiografía del cliente e historia mensual para preparar cada contacto. Las recomendaciones aprendidas de ventas y presupuestos sugieren productos complementarios y alternativas. Un worker nocturno enriquece el catálogo y reconstruye el índice de recomendaciones.',
      },
      role: {
        en: 'I designed and built it end to end (data, recommendation model, API, app and deployment) and I maintain it.',
        es: 'Lo diseñé y desarrollé de punta a punta (datos, modelo de recomendación, API, app y despliegue) y lo mantengo.',
      },
      outcome: {
        en: 'Brings assisted selling and customer follow-up together: at-risk customers, VIPs, reactivation and quote follow-up. The sales funnel records each interaction and its outcome; product purchase history helps identify customers to contact.',
        es: 'Integra venta asistida y seguimiento de cartera: clientes en riesgo, VIP, reactivación y seguimiento de presupuestos. El embudo comercial registra cada atención y su resultado; el historial de compradores de un producto ayuda a identificar a quién contactar.',
      },
    },
    highlights: [
      {
        en: 'Product network learned from sales and quote history since 2023: it combines co-purchases, quotes, repeat purchases by the same customer and compatibility declared in the catalog, with relevance filters by machine type and re-ranking by branch and recency.',
        es: 'Red de productos aprendida del historial de ventas y presupuestos desde 2023: combina co-compra, presupuestos, recompra del mismo cliente y compatibilidad declarada en el catálogo, con filtros de pertinencia por tipo de máquina y reordenamiento por sucursal y recencia.',
      },
      {
        en: 'Offline evaluation across four rolling quarters: approximately 40% top-3 hit rate versus 20% for best-seller recommendations. This measures recommendation accuracy, not sales growth.',
        es: 'Evaluación offline en cuatro trimestres móviles: aproximadamente 40% de acierto top-3 frente a 20% al recomendar lo más vendido. Mide acierto de recomendaciones, no crecimiento de ventas.',
      },
      {
        en: 'Customer segmentation by RFM, business unit, branch, salesperson, category and brand. Customer profiles combine buying affinities, balances and up to 24 monthly snapshots from the DW; opportunities highlight VIPs, at-risk customers and reactivation. Product purchase history identifies potential contacts.',
        es: 'Segmentación de clientes por RFM, unidad de negocio, sucursal, vendedor, categoría y marca. La radiografía reúne afinidades de compra, saldos y hasta 24 snapshots mensuales del DW; las oportunidades destacan VIP, clientes en riesgo y reactivación. El historial de compradores de cada producto orienta a quién contactar.',
      },
      {
        en: 'Automatic product sheet enrichment through connectors to manufacturer and distributor sites plus web search with the Brave Search API, checking exact brand and model and respecting robots.txt.',
        es: 'Enriquecimiento automático de fichas con conectores a sitios de fabricantes y distribuidores y búsqueda web con Brave Search API, verificando marca y modelo exactos y respetando robots.txt.',
      },
      {
        en: 'Nightly worker extracts read-only ERP snapshots, enriches, retrains and evaluates. If cross-selling hit@3 drops by more than one percentage point, it keeps the previous index.',
        es: 'El worker nocturno extrae snapshots del ERP en solo lectura, enriquece, reentrena y evalúa. Si el hit@3 de venta cruzada cae más de un punto porcentual, conserva el índice anterior.',
      },
      {
        en: 'Two services share the published index: nightly enriches, trains and evaluates; web serves recommendations without training during a sale. Customer segmentation and monthly history are read from the DW, while stock and balances come from the ERP. The app does not calculate RFM.',
        es: 'Dos servicios comparten el índice publicado: nightly enriquece, entrena y evalúa; web sirve recomendaciones sin entrenar durante la venta. La segmentación e historia mensual se leen del DW; el stock y los saldos, del ERP. La app no calcula el RFM.',
      },
      {
        en: 'Django REST Framework API and a React 19 + TypeScript + Vite PWA. Sign-in with the internal platform’s users or its own users with Argon2, HttpOnly cookie, login attempt limits, CSP and role-based permissions.',
        es: 'API en Django REST Framework y PWA en React 19 + TypeScript + Vite. Login con los usuarios de la plataforma interna o usuarios propios con Argon2, cookie HttpOnly, límite de intentos, CSP y permisos por rol.',
      },
      {
        en: 'Docker Compose and CI/CD with GitHub Actions on a self-hosted runner: tests, image on Docker Hub and deploy with a smoke test.',
        es: 'Docker Compose y CI/CD con GitHub Actions en un runner self-hosted: tests, imagen en Docker Hub y deploy con smoke test.',
      },
    ],
    pipeline: {
      steps: [
        { name: 'ERP + DW', detail: { en: 'Read-only sales, quotes and catalog', es: 'Ventas, presupuestos y catálogo en solo lectura' } },
        { name: 'Worker nightly', detail: { en: 'Nightly snapshots and retraining', es: 'Snapshots y reentrenamiento nocturno' } },
        { name: { en: 'Enrichment', es: 'Enriquecimiento' }, detail: { en: 'Manufacturer data with source evidence', es: 'Datos de fabricantes con evidencia de origen' } },
        { name: { en: 'Recommendations', es: 'Recomendaciones' }, detail: { en: 'Product network and alternatives', es: 'Red de productos y alternativas' } },
        { name: { en: 'Evaluation', es: 'Evaluación' }, detail: { en: 'Quality gate before publishing the index', es: 'Control de calidad antes de publicar el índice' } },
        { name: 'Django REST', detail: { en: 'Precomputed index in RAM + live ERP stock', es: 'Índice precalculado en RAM + stock en vivo del ERP' } },
        { name: 'React PWA', detail: { en: 'Assisted sales, customer profiles and opportunities', es: 'Venta asistida, radiografías y oportunidades' } },
      ],
      branches: [
        {
          name: 'Brave Search API',
          detail: { en: 'Web searches for product sheets and manuals', es: 'Búsquedas web de fichas y manuales' },
          target: 2,
        },
        {
          name: { en: 'Customer DW', es: 'DW de clientes' },
          detail: { en: 'RFM segments, buying affinities and 24 monthly snapshots', es: 'Segmentos RFM, afinidades de compra y 24 snapshots mensuales' },
          target: 5,
        },
        {
          name: { en: 'Live ERP', es: 'ERP en vivo' },
          detail: { en: 'Branch stock, account balances and outstanding invoices', es: 'Stock por sucursal, saldos y comprobantes pendientes' },
          target: 5,
        },
        {
          name: { en: 'Manufacturer connectors', es: 'Conectores de fabricantes' },
          detail: { en: 'Brand and model verification; source evidence', es: 'Verificación de marca y modelo; evidencia de origen' },
          target: 2,
        },
      ],
      caption: {
        en: 'From sales history to product recommendations and customer follow-up.',
        es: 'Del historial de ventas a recomendaciones de productos y seguimiento de clientes.',
      },
    },
    images: [
      {
        src: '/images/ventas-tablet-thumb.webp',
        href: '/images/ventas-tablet.webp',
        alt: {
          en: 'Battery chainsaw product sheet on the tablet, with photo, price, stock and parts diagram; "Add to the sale" suggests oil, charger and battery of the same brand, with the sale in progress below with 3 items',
          es: 'Ficha de una motosierra a batería en la tablet, con foto, precio, stock y despiece; "Sumá a la venta" sugiere aceite, cargador y batería de la misma marca, y abajo la venta en curso con 3 ítems',
        },
      },
      {
        src: '/images/ventas-phone-thumb.webp',
        href: '/images/ventas-phone.webp',
        alt: {
          en: 'The same product sheet on a phone, with the sale in progress below',
          es: 'La misma ficha en el celular, con la venta en curso abajo',
        },
      },
      {
        src: '/images/ventas-desktop-thumb.webp',
        href: '/images/ventas-desktop.webp',
        alt: {
          en: 'Chainsaw product sheet with items to add to the sale and cheaper and pricier alternatives with their stock',
          es: 'Ficha de una motosierra con productos para sumar a la venta y alternativas más barata y más cara con su stock',
        },
      },
    ],
    imagesNote: { en: 'Sample searches over the catalog.', es: 'Búsquedas de ejemplo sobre el catálogo.' },
    stack: ['Python', 'Pandas', 'Parquet', 'scikit-learn', 'Django REST Framework', 'SQL Server', 'React', 'TypeScript', 'Vite', 'Docker', 'GitHub Actions', 'Brave Search API'],
    links: [],
  },
  {
    id: 'lastfm',
    title: 'Last.fm Data Platform',
    kind: { en: 'Personal project · Data Engineering', es: 'Proyecto personal · Data Engineering' },
    group: 'personal',
    tier: 'featured',
    status: 'repository',
    gallery: 'wide',
    summary: {
      en: 'End-to-end data platform for my Last.fm listening history: from raw API responses to analytical marts and a dashboard, built in phases with each design decision documented.',
      es: 'Plataforma de datos end-to-end sobre mi historial de escucha de Last.fm: desde las respuestas crudas de la API hasta marts analíticos y un dashboard, construida por fases y con cada decisión de diseño documentada.',
    },
    caseStudy: {
      problem: {
        en: 'Years of listening history only existed as raw, paginated API responses: duplicated events, mixed time zones and no artist metadata to analyse.',
        es: 'Años de historial de escucha existían solo como respuestas crudas y paginadas de una API: eventos duplicados, zonas horarias mezcladas y sin metadatos de artistas para analizar.',
      },
      solution: {
        en: 'A layered pipeline: incremental ingestion into an immutable Bronze layer, typed and deduplicated Parquet in Silver, analytical marts in Gold enriched with MusicBrainz, and a Streamlit dashboard on top.',
        es: 'Un pipeline por capas: ingesta incremental a una capa Bronze inmutable, Parquet tipado y deduplicado en Silver, marts analíticos en Gold enriquecidos con MusicBrainz y un dashboard en Streamlit.',
      },
      role: {
        en: 'Personal project: I designed, built, tested and documented every layer.',
        es: 'Proyecto personal: diseñé, desarrollé, testeé y documenté cada capa.',
      },
      outcome: {
        en: 'Public repository with a technical walkthrough. The dashboard runs over ~117k listening events.',
        es: 'Repositorio público con un recorrido técnico. El dashboard corre sobre ~117 mil eventos de escucha.',
      },
    },
    highlights: [
      {
        en: 'Incremental ingestion from the Last.fm API using a watermark, with run metadata and resumable backfills. Raw responses are stored immutably in Bronze.',
        es: 'Ingesta incremental desde la API de Last.fm con watermark, metadata por ejecución y backfills reanudables. Las respuestas crudas se guardan inmutables en Bronze.',
      },
      {
        en: 'Silver layer in typed Parquet: UTC timestamps, deduplication of overlapping events and lineage back to Bronze.',
        es: 'Capa Silver en Parquet tipado: timestamps en UTC, deduplicación de eventos superpuestos y linaje hacia Bronze.',
      },
      {
        en: 'Gold marts for activity, artists, discovery, streaks and diversity, plus artist enrichment from MusicBrainz and Last.fm tags with a local cache.',
        es: 'Marts Gold de actividad, artistas, descubrimiento, rachas y diversidad, más enriquecimiento de artistas con MusicBrainz y tags de Last.fm usando caché local.',
      },
      {
        en: 'Streamlit dashboard over ~117k listening events. Tests run with pytest against mocked HTTP responses.',
        es: 'Dashboard en Streamlit sobre ~117 mil eventos de escucha. Tests con pytest sobre respuestas HTTP simuladas.',
      },
    ],
    pipeline: {
      steps: [
        { name: 'Last.fm API', detail: { en: 'source', es: 'origen' } },
        { name: 'Bronze', detail: { en: 'raw JSON', es: 'JSON crudo' } },
        { name: 'Silver', detail: { en: 'typed Parquet', es: 'Parquet tipado' } },
        { name: 'Gold', detail: { en: 'analytical marts', es: 'marts analíticos' } },
        { name: 'Dashboard', detail: { en: 'Streamlit', es: 'Streamlit' } },
      ],
      branch: {
        name: { en: 'Enrichment', es: 'Enriquecimiento' },
        detail: { en: 'MusicBrainz + Last.fm tags', es: 'MusicBrainz + tags de Last.fm' },
        target: 3,
      },
      caption: {
        en: 'Pipeline architecture. Raw data stays immutable; each layer is derived from the one before.',
        es: 'Arquitectura del pipeline. Los datos crudos son inmutables; cada capa se deriva de la anterior.',
      },
    },
    images: [
      {
        src: '/images/lastfm-overview-thumb.webp',
        href: '/images/lastfm-overview.webp',
        alt: {
          en: 'Dashboard overview: 116,871 scrobbles, 4,956 artists, scrobbles per year and top artists',
          es: 'Resumen del dashboard: 116.871 scrobbles, 4.956 artistas, scrobbles por año y artistas más escuchados',
        },
      },
      {
        src: '/images/lastfm-taste-thumb.webp',
        href: '/images/lastfm-taste.webp',
        alt: {
          en: 'Taste evolution: genre share over time and artist evolution by year',
          es: 'Evolución del gusto: participación de géneros en el tiempo y evolución de artistas por año',
        },
      },
      {
        src: '/images/lastfm-discovery-thumb.webp',
        href: '/images/lastfm-discovery.webp',
        alt: {
          en: 'Discovery and loyalty: new artists and tracks per year, concentration and diversity',
          es: 'Descubrimiento y fidelidad: artistas y temas nuevos por año, concentración y diversidad',
        },
      },
      {
        src: '/images/lastfm-patterns-thumb.webp',
        href: '/images/lastfm-patterns.webp',
        alt: {
          en: 'Listening heatmap by weekday and local hour, plus listening by location and artist country',
          es: 'Mapa de calor de escucha por día y hora local, y escuchas por ubicación y país del artista',
        },
      },
    ],
    imagesNote: {
      en: 'Streamlit dashboard built on the Gold layer.',
      es: 'Dashboard en Streamlit construido sobre la capa Gold.',
    },
    stack: ['Python', 'Parquet', 'Last.fm API', 'MusicBrainz', 'Streamlit', 'pytest'],
    links: [
      { kind: 'repository', href: 'https://github.com/deadour/lastfm-data-platform' },
      { kind: 'walkthrough', href: 'https://github.com/deadour/lastfm-data-platform/blob/main/docs/PROJECT_WALKTHROUGH.md' },
    ],
    cv: {
      en: 'Data platform over ~117k listening events: incremental API ingestion with resumable backfills, Bronze/Silver/Gold layers in Parquet, MusicBrainz enrichment and a Streamlit dashboard.',
      es: 'Plataforma de datos sobre ~117 mil eventos de escucha: ingesta incremental con backfills reanudables, capas Bronze/Silver/Gold en Parquet, enriquecimiento con MusicBrainz y dashboard en Streamlit.',
    },
  },
  {
    // TODO: add a { kind: 'live', href } link once it's launched.
    id: 'ecommerce',
    title: 'Malaca',
    kind: { en: 'Client project · E-commerce', es: 'Proyecto para cliente · E-commerce' },
    group: 'professional',
    status: 'completed',
    logo: { src: '/images/logo-malaca.webp', shape: 'circle', fit: 'contain' },
    gallery: 'wide',
    summary: {
      en: 'Completed online store for a herbal blends brand: catalog, cart, guest checkout, payments and order management.',
      es: 'Tienda online terminada para una marca de blends de hierbas: catálogo, carrito, checkout invitado, pagos y gestión de pedidos.',
    },
    highlights: [
      {
        en: 'Persistent cart, guest checkout, Mercado Pago and bank transfers, stock reservations and private order tracking. WhatsApp contact works independently.',
        es: 'Carrito persistente, checkout invitado, Mercado Pago y transferencias, reservas de stock y seguimiento privado de pedidos. Contacto por WhatsApp independiente.',
      },
      {
        en: 'Admin panel for products, up to 5 photos per product, prices, stock, featured items and optional categories.',
        es: 'Panel de administración para productos, hasta 5 fotos por producto, precios, stock, destacados y categorías opcionales.',
      },
      {
        en: 'Products, photos and categories are reordered by drag and drop.',
        es: 'Productos, fotos y categorías se ordenan arrastrando.',
      },
      {
        en: 'Botanical visual identity with custom SVG illustrations; mobile-first design.',
        es: 'Identidad botánica con ilustraciones SVG propias; diseño mobile-first.',
      },
      {
        en: 'Django REST Framework API with PostgreSQL, images on Cloudinary, deployed with Docker on Render.',
        es: 'API con Django REST Framework y PostgreSQL, imágenes en Cloudinary, deploy con Docker en Render.',
      },
    ],
    images: [
      {
        src: '/images/malaca-home-thumb.webp',
        href: '/images/malaca-home.webp',
        alt: { en: 'Malaca home page with the herbal blends hero', es: 'Inicio de Malaca con el hero de blends de hierbas' },
      },
      {
        src: '/images/malaca-catalog-thumb.webp',
        href: '/images/malaca-catalog.webp',
        alt: {
          en: 'Product catalog with category filter, search and sorting',
          es: 'Catálogo de productos con filtro por categoría, búsqueda y orden',
        },
      },
      {
        src: '/images/malaca-product-thumb.webp',
        href: '/images/malaca-product.webp',
        alt: {
          en: 'Product page with WhatsApp buy and inquiry buttons',
          es: 'Detalle de producto con botones de compra y consulta por WhatsApp',
        },
      },
      {
        src: '/images/malaca-admin-thumb.webp',
        href: '/images/malaca-admin.webp',
        alt: {
          en: 'Admin panel product list with drag handles to reorder',
          es: 'Panel de administración con la lista de productos y manijas para reordenar',
        },
      },
    ],
    imagesNote: { en: 'Screens shown with demo data.', es: 'Pantallas con datos de demostración.' },
    stack: ['Django REST Framework', 'PostgreSQL', 'React', 'TypeScript', 'Vite', 'Cloudinary', 'Docker', 'Render'],
    links: [],
    cv: {
      en: 'Ecommerce with guest checkout, Mercado Pago, stock reservations, shipping, order tracking and an admin panel.',
      es: 'Ecommerce con checkout invitado, Mercado Pago, reservas de stock, envíos y panel de gestión de pedidos.',
    },
  },
  {
    // Private repository. Highlights only list what is implemented in the code.
    id: 'casaPalma',
    title: 'Casa Palma',
    kind: { en: 'Client project · Business management', es: 'Proyecto para cliente · Gestión comercial' },
    group: 'professional',
    tier: 'secondary',
    status: 'development',
    summary: {
      en: 'Management system for a collaborative store that sells products from different local makers. It replaces the spreadsheets the store used for daily sales, expenses and payouts to each maker.',
      es: 'Sistema de gestión para una tienda colaborativa que vende productos de distintas emprendedoras. Reemplaza las planillas que la tienda usaba para las ventas diarias, los gastos y las liquidaciones a cada emprendedora.',
    },
    highlightsLabel: { en: 'Built so far', es: 'Implementado hasta ahora' },
    highlights: [
      {
        en: 'Sales register where one ticket holds several products and mixed payments, with stock updated in the same transaction.',
        es: 'Caja donde una venta agrupa varios productos y pagos mixtos, y descuenta el stock en la misma transacción.',
      },
      { en: 'Stock per product and maker, with a movement history.', es: 'Stock por producto y emprendedora, con historial de movimientos.' },
      { en: 'Expenses and per-period payouts to each maker.', es: 'Gastos y liquidaciones por período a cada emprendedora.' },
      {
        en: 'Product import from Excel and Tiendanube with a preview, and a monthly PDF report for the accountant.',
        es: 'Importación de productos desde Excel y Tienda Nube con vista previa, y reporte mensual en PDF para la contadora.',
      },
      {
        en: 'Four roles (admin, maker, seller, accountant) with permissions checked on the server.',
        es: 'Cuatro roles (administración, emprendedora, vendedora y contadora) con permisos verificados en el servidor.',
      },
      {
        en: 'Business rules covered by tests on an in-memory Postgres. It runs in test mode until the owners confirm the commercial rules.',
        es: 'Reglas de negocio cubiertas por tests sobre un Postgres en memoria. Funciona en modo prueba hasta que las dueñas confirmen las reglas comerciales.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Vitest'],
    links: [],
    cv: {
      en: 'In development. Management system for a collaborative store of local makers: sales register with mixed payments, stock per maker, expenses, payouts, Excel and Tiendanube import, and role-based permissions.',
      es: 'En desarrollo. Sistema de gestión para una tienda colaborativa de emprendedoras: caja con pagos mixtos, stock por emprendedora, gastos, liquidaciones, importación desde Excel y Tienda Nube, y roles con permisos.',
    },
  },
  {
    id: 'chedul',
    title: 'Chedul',
    kind: { en: 'Personal project · Team of 3', es: 'Proyecto personal · Equipo de 3' },
    group: 'personal',
    tier: 'secondary',
    status: 'live',
    logo: { src: '/images/logo-chedul.svg', shape: 'plain', fit: 'contain' },
    gallery: 'wide',
    summary: {
      en: 'Web app for Information Systems Engineering students at UTN that keeps the whole degree in one place: academic status, a prerequisites map, a calendar with classes and exams, shared notes and professors’ emails.',
      es: 'App web para estudiantes de Ingeniería en Sistemas de la UTN que organiza toda la carrera en un solo lugar: estado académico, mapa de correlativas, calendario con clases y parciales, apuntes compartidos y mails de profesores.',
    },
    highlights: [
      {
        en: 'Team project with [Lautaro Acosta](https://www.linkedin.com/in/lautaro-acosta-quintana/) and [Tobías Stegmayer](https://www.linkedin.com/in/tobias-stegmayer-612551218/). I built the original Django app and led the migration to Go + React, the deployment and the design.',
        es: 'Proyecto en equipo con [Lautaro Acosta](https://www.linkedin.com/in/lautaro-acosta-quintana/) y [Tobías Stegmayer](https://www.linkedin.com/in/tobias-stegmayer-612551218/). Hice la app original en Django y lideré la migración a Go + React, el deploy y el diseño.',
      },
      {
        en: 'Go REST API (handlers, repositories and domain layers) and a new React + TypeScript SPA, replacing the original Django app.',
        es: 'API REST en Go (capas de handlers, repositorios y dominio) y una SPA nueva en React + TypeScript, que reemplazan a la app original en Django.',
      },
      {
        en: 'Full curriculum in PostgreSQL: 51 subjects, 109 prerequisites and 68 class groups with schedules, with versioned migrations.',
        es: 'Plan de estudios completo en PostgreSQL: 51 materias, 109 correlativas y 68 comisiones con horarios, con migraciones versionadas.',
      },
      {
        en: 'JWT login in a cookie, accent-insensitive subject search, light and dark themes and a mobile-first design.',
        es: 'Login con JWT en cookie, buscador de materias que ignora tildes, tema claro y oscuro y diseño mobile-first.',
      },
      {
        en: 'Integration tests with Testcontainers against a real Postgres, and CI on GitHub Actions.',
        es: 'Tests de integración con Testcontainers contra un Postgres real y CI en GitHub Actions.',
      },
      {
        en: 'API in Docker on Google Cloud Run, database on Neon and frontend on Vercel, redeployed automatically on every push to main.',
        es: 'API en Docker sobre Google Cloud Run, base de datos en Neon y frontend en Vercel, con redeploy automático en cada push a main.',
      },
    ],
    images: [
      {
        src: '/images/chedul-home-thumb.webp',
        href: '/images/chedul-home.webp',
        alt: {
          en: 'Chedul home with degree progress, average, upcoming dates and the subjects you can take',
          es: 'Inicio de Chedul con el avance de la carrera, el promedio, las próximas fechas y las materias que podés cursar',
        },
      },
      {
        src: '/images/chedul-prerequisites-thumb.webp',
        href: '/images/chedul-prerequisites.webp',
        alt: {
          en: 'Prerequisites map in dark mode, linking each subject to the ones it requires',
          es: 'Mapa de correlativas en modo oscuro, que une cada materia con las que necesita',
        },
      },
      {
        src: '/images/chedul-status-thumb.webp',
        href: '/images/chedul-status.webp',
        alt: {
          en: 'Academic status by year, with each subject marked as pending, in progress, regular or passed',
          es: 'Estado académico por año, con cada materia marcada como pendiente, cursando, regular o aprobada',
        },
      },
      {
        src: '/images/chedul-calendar-thumb.webp',
        href: '/images/chedul-calendar.webp',
        alt: { en: 'Weekly calendar with class times and classrooms', es: 'Calendario semanal con horarios y aulas de cursada' },
      },
    ],
    imagesNote: { en: 'Screens shown with sample data.', es: 'Pantallas con datos de ejemplo.' },
    stack: ['Go', 'React', 'TypeScript', 'Vite', 'PostgreSQL', 'Docker', 'Google Cloud Run', 'Vercel', 'GitHub Actions'],
    links: [
      { kind: 'live', href: 'https://chedul.vercel.app' },
      { kind: 'backend', href: 'https://github.com/ProjectUTN/chedul-core' },
      { kind: 'frontend', href: 'https://github.com/ProjectUTN/chedul-frontend' },
    ],
    cv: {
      en: 'Degree planner for UTN students. Led the migration from Django to a Go REST API and a React + TypeScript SPA, with Testcontainers integration tests; deployed on Cloud Run and Vercel.',
      es: 'Planificador de carrera para estudiantes de la UTN. Lideré la migración de Django a una API REST en Go y una SPA en React + TypeScript, con tests de integración en Testcontainers; deploy en Cloud Run y Vercel.',
    },
  },
  {
    id: 'dynamo',
    title: 'Dynamo',
    kind: { en: 'Personal project · Full-stack web app', es: 'Proyecto personal · Aplicación web full-stack' },
    group: 'personal',
    tier: 'secondary',
    status: 'live',
    logo: { src: '/images/logo-dynamo.png' },
    gallery: 'phone',
    summary: {
      en: 'Mobile-first web app to log workouts, routines, body weight and progress. It started because I kept forgetting what I had lifted in my previous session.',
      es: 'Aplicación web mobile-first para registrar entrenamientos, rutinas, peso corporal y progreso. Surgió porque no recordaba qué peso había usado en la sesión anterior.',
    },
    highlights: [
      {
        en: 'Django REST API split into domain apps (workouts, exercises, progress, social…), with per-user data isolation covered by tests.',
        es: 'API REST en Django dividida en apps por dominio (entrenamientos, ejercicios, progreso, social…), con aislamiento de datos por usuario cubierto por tests.',
      },
      {
        en: 'Metrics computed from sets (volume, best weight and estimated 1RM) without storing redundant statistics.',
        es: 'Métricas calculadas a partir de las series (volumen, mejor peso y 1RM estimado) sin guardar estadísticas redundantes.',
      },
      {
        en: 'Idempotent import of an open exercise dataset, with names and instructions prepared in Spanish.',
        es: 'Importación idempotente de un dataset abierto de ejercicios, con nombres e instrucciones en español.',
      },
      {
        en: 'React + TypeScript frontend, Docker Compose for local development and GitHub Actions running lint, tests and builds.',
        es: 'Frontend en React + TypeScript, Docker Compose para desarrollo local y GitHub Actions con lint, tests y build.',
      },
    ],
    images: [
      {
        src: '/images/dynamo-home.webp',
        alt: {
          en: 'Dynamo home screen with today’s routines and 30-day stats',
          es: 'Pantalla de inicio de Dynamo con las rutinas del día y estadísticas de 30 días',
        },
      },
      {
        src: '/images/dynamo-progress.webp',
        alt: {
          en: 'Progress screen with best weight, estimated 1RM and a per-session chart',
          es: 'Pantalla de progreso con mejor peso, 1RM estimado y gráfico por sesión',
        },
      },
      {
        src: '/images/dynamo-workout.webp',
        alt: {
          en: 'Workout in progress with duration, sets, volume and exercise list',
          es: 'Entrenamiento en curso con duración, series, volumen y lista de ejercicios',
        },
      },
      {
        src: '/images/dynamo-profile.webp',
        alt: {
          en: 'Profile with a yearly training heatmap and saved routines',
          es: 'Perfil con mapa de calor anual de entrenamientos y rutinas guardadas',
        },
      },
    ],
    stack: ['Django', 'Django REST Framework', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'GitHub Actions'],
    links: [
      { kind: 'live', href: 'https://dynamo-1.onrender.com' },
      { kind: 'repository', href: 'https://github.com/deadour/dynamo' },
      {
        kind: 'post',
        href: 'https://www.linkedin.com/posts/eduramirez645_hace-un-tiempo-me-di-cuenta-de-que-en-el-ugcPost-7511498777858441217-nD0B/',
      },
    ],
    cv: {
      en: 'Workout tracker: Django REST API split into domain apps with per-user data isolation covered by tests, metrics derived from sets, React + TypeScript frontend and CI on GitHub Actions.',
      es: 'Registro de entrenamientos: API REST en Django dividida por dominio con aislamiento de datos por usuario cubierto por tests, métricas derivadas de las series, frontend en React + TypeScript y CI en GitHub Actions.',
    },
  },
  {
    id: 'cesiDl',
    country: 'fr',
    title: { en: 'Diabetes Prediction with Deep Learning', es: 'Predicción de diabetes con Deep Learning' },
    kind: { en: 'Academic project · CESI France · Team of 4', es: 'Proyecto académico · CESI Francia · Equipo de 4' },
    group: 'personal',
    tier: 'secondary',
    status: 'academic',
    gallery: 'wide',
    summary: {
      en: 'End-to-end machine learning pipeline to predict diabetes from a tabular health dataset with heavy class imbalance. The 84%-accurate baseline missed almost every positive case, so we focused on reducing false negatives instead of chasing accuracy.',
      es: 'Pipeline de machine learning de punta a punta para predecir diabetes a partir de un dataset tabular de salud con fuerte desbalance de clases. El modelo base tenía 84% de accuracy pero no detectaba casi ningún caso positivo, así que nos enfocamos en reducir los falsos negativos en lugar de perseguir la accuracy.',
    },
    highlights: [
      {
        en: 'EDA and preprocessing, Keras and custom NumPy baselines, and a tuned PyTorch model.',
        es: 'EDA y preprocesamiento, modelos base en Keras y en NumPy desde cero, y un modelo en PyTorch ajustado.',
      },
      {
        en: 'Oversampling and decision-threshold optimization to reduce false negatives.',
        es: 'Oversampling y optimización del umbral de decisión para reducir falsos negativos.',
      },
      {
        en: 'Explainability with SHAP and LIME, and energy tracking with CodeCarbon.',
        es: 'Explicabilidad con SHAP y LIME, y medición de consumo energético con CodeCarbon.',
      },
      { en: 'Prototype deployment as a FastAPI service.', es: 'Prototipo de despliegue como servicio en FastAPI.' },
    ],
    images: [
      {
        src: '/images/cesi-dl-team.webp',
        alt: {
          en: 'The team presenting the Diabetes Prediction with Deep Learning project at CESI',
          es: 'El equipo presentando el proyecto de predicción de diabetes con Deep Learning en CESI',
        },
      },
      {
        src: '/images/cesi-dl-pipeline.webp',
        alt: {
          en: 'Slide with the nine stages of the end-to-end pipeline, from data ingestion to FastAPI deployment',
          es: 'Slide con las nueve etapas del pipeline de punta a punta, desde la ingesta de datos hasta el deploy con FastAPI',
        },
      },
      {
        src: '/images/cesi-dl-model.webp',
        alt: {
          en: 'Diagram of the tuned PyTorch model: two dense layers with ReLU and dropout and a sigmoid output',
          es: 'Diagrama del modelo PyTorch ajustado: dos capas densas con ReLU y dropout y una salida sigmoide',
        },
      },
      {
        src: '/images/cesi-dl-results.webp',
        alt: {
          en: 'Confusion matrices before and after oversampling: missed diabetes cases drop from 6,704 to 2,035',
          es: 'Matrices de confusión antes y después del oversampling: los casos de diabetes no detectados bajan de 6.704 a 2.035',
        },
      },
    ],
    stack: ['Python', 'PyTorch', 'Keras', 'NumPy', 'SHAP', 'LIME', 'FastAPI'],
    links: [
      {
        kind: 'post',
        href: 'https://www.linkedin.com/posts/eduramirez645_deeplearning-pytorch-keras-ugcPost-7450863599469735936-QqvC/',
      },
    ],
    cv: {
      en: 'End-to-end ML pipeline on a highly imbalanced health dataset: PyTorch model, oversampling and threshold tuning to cut false negatives, SHAP/LIME explainability and a FastAPI prototype.',
      es: 'Pipeline de ML de punta a punta sobre un dataset de salud muy desbalanceado: modelo en PyTorch, oversampling y ajuste de umbral para reducir falsos negativos, explicabilidad con SHAP/LIME y prototipo en FastAPI.',
    },
  },
  {
    id: 'cesiIot',
    country: 'fr',
    title: { en: 'Classroom Noise Monitor', es: 'Monitor de ruido en aulas' },
    kind: { en: 'Academic project · CESI France · IoT · Team of 4', es: 'Proyecto académico · CESI Francia · IoT · Equipo de 4' },
    group: 'personal',
    tier: 'secondary',
    status: 'academic',
    gallery: 'photo',
    summary: {
      en: 'Real-time device that measures noise levels in classrooms to improve the campus environment, connecting low-level hardware all the way to analytics dashboards. Privacy by design: it only measures decibels and never records audio.',
      es: 'Dispositivo en tiempo real que mide el nivel de ruido en las aulas para mejorar el ambiente del campus, conectando hardware de bajo nivel con dashboards de análisis. Privacidad desde el diseño: sólo mide decibeles y nunca graba audio.',
    },
    highlights: [
      {
        en: 'ESP32-S3 with an INMP441 24-bit digital microphone for precise noise readings.',
        es: 'ESP32-S3 con un micrófono digital INMP441 de 24 bits para lecturas precisas.',
      },
      {
        en: 'Data sent over WiFi through the ESPHome Native API instead of an MQTT broker.',
        es: 'Envío de datos por WiFi mediante la API nativa de ESPHome, sin broker MQTT.',
      },
      {
        en: 'Home Assistant ingests the readings, stores them in InfluxDB, and Grafana shows them in real time.',
        es: 'Home Assistant recibe las lecturas, las guarda en InfluxDB y Grafana las muestra en tiempo real.',
      },
    ],
    images: [
      {
        src: '/images/cesi-iot-device.webp',
        alt: {
          en: 'The noise monitor: a small 3D-printed case with an OLED screen showing the decibel level',
          es: 'El monitor de ruido: una caja impresa en 3D con pantalla OLED que muestra los decibeles',
        },
      },
      {
        src: '/images/cesi-iot-grafana.webp',
        alt: {
          en: 'Grafana dashboard with real-time noise level, state and a decibel gauge',
          es: 'Dashboard de Grafana con el ruido en tiempo real, el estado y un medidor de decibeles',
        },
      },
      {
        src: '/images/cesi-iot-architecture.webp',
        alt: { en: 'Whiteboard sketch of the system architecture', es: 'Boceto en pizarra de la arquitectura del sistema' },
      },
    ],
    stack: ['ESP32', 'ESPHome', 'Home Assistant', 'InfluxDB', 'Grafana'],
    links: [
      {
        kind: 'post',
        href: 'https://www.linkedin.com/posts/eduramirez645_iot-esp32-homeassistant-ugcPost-7435821903157719040-VhMi/',
      },
    ],
    cv: {
      en: 'Real-time classroom noise monitor: ESP32-S3 with a digital microphone, readings sent through ESPHome to Home Assistant, InfluxDB and Grafana dashboards, never recording audio.',
      es: 'Monitor de ruido en tiempo real para aulas: ESP32-S3 con micrófono digital, lecturas vía ESPHome a Home Assistant, InfluxDB y tableros en Grafana, sin grabar audio.',
    },
  },
]

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<Project['id'], Project>
