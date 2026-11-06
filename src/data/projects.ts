import type { Project } from './types'

// Every project, in the order it's shown: professional work first, then personal and academic.
// Featured projects are told as case studies on the home page; the rest are listed compactly.
// Internal systems: screens must be mockups with sample data only.
export const projects: Project[] = [
  {
    id: 'reports',
    title: { en: 'BIAMAQ Reports', es: 'Reportes BIAMAQ' },
    kind: { en: 'BIAMAQ · Business Intelligence', es: 'BIAMAQ · Business Intelligence' },
    group: 'professional',
    featured: true,
    status: 'internal',
    logo: { src: '/images/logo-biamaq.webp' },
    gallery: 'wide',
    summary: {
      en: 'Internal platform where BIAMAQ’s management follows sales, purchases, receivables, customers and the workshop across its 3 branches, with data that updates itself from the ERP every day.',
      es: 'Plataforma interna donde la dirección de BIAMAQ sigue ventas, compras, cobranzas, clientes y el taller de sus 3 sucursales, con datos que se actualizan solos desde el ERP todos los días.',
    },
    caseStudy: {
      problem: {
        en: 'Management needed one place to follow sales, purchases, receivables, customers and workshop activity across 3 branches. The data lived in the company’s SQL Server ERP.',
        es: 'La dirección necesitaba un solo lugar para seguir ventas, compras, cobranzas, clientes y la actividad del taller de las 3 sucursales. Los datos estaban en el ERP de la empresa, en SQL Server.',
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
        en: 'Used by management in day-to-day operations.',
        es: 'La dirección lo usa en la operación diaria.',
      },
    },
    highlights: [
      {
        en: 'Django REST Framework API over SQL Server (ERP + data warehouse), with a React frontend.',
        es: 'API en Django REST Framework sobre SQL Server (ERP + data warehouse), con frontend en React.',
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
        en: 'CI/CD with GitHub Actions: Docker images published to Docker Hub and deployed on a self-hosted runner.',
        es: 'CI/CD con GitHub Actions: imágenes Docker publicadas en Docker Hub y desplegadas en un runner self-hosted.',
      },
    ],
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
    featured: true,
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
        en: 'In use in BIAMAQ’s rental operations. The standalone mode lets rental businesses of other products and equipment use it without BIAMAQ’s ERP.',
        es: 'En uso en la operación de alquileres de BIAMAQ. El modo independiente permite que negocios de alquiler de otros productos y equipos lo usen sin el ERP de BIAMAQ.',
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
    images: [
      {
        src: '/images/rentos-new-rental-thumb.webp',
        href: '/images/rentos-new-rental.webp',
        alt: {
          en: 'Rental wizard, step 2: equipment catalog with the price per day',
          es: 'Asistente de alquiler, paso 2: catálogo de equipos con precio por día',
        },
      },
      {
        src: '/images/rentos-bi-thumb.webp',
        href: '/images/rentos-bi.webp',
        alt: {
          en: 'Management & BI view with billing, occupancy and profitability per equipment',
          es: 'Vista de Gestión & BI con facturación, ocupación y rentabilidad por equipo',
        },
      },
      {
        src: '/images/rentos-workshop-thumb.webp',
        href: '/images/rentos-workshop.webp',
        alt: {
          en: 'Workshop with counters, days in repair and a delay alert',
          es: 'Taller con contadores, días en reparación y alerta de demora',
        },
      },
      {
        src: '/images/rentos-returns-thumb.webp',
        href: '/images/rentos-returns.webp',
        alt: {
          en: 'Returning a rental, with a summary of the amount to charge',
          es: 'Devolución de un alquiler con el resumen del cobro',
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
    featured: true,
    status: 'internal',
    logo: { src: '/images/logo-biamaq.webp' },
    gallery: 'wide',
    summary: {
      en: 'Sales assistant that changed the way BIAMAQ sells: salespeople went from the counter PC to a tablet in hand, next to the customer, connected live to the ERP. Behind it, an AI suggests what else to offer, proposes alternatives and fills in product sheets, photos and manuals on its own every night.',
      es: 'Asistente de venta que cambió la forma de vender en BIAMAQ: los vendedores pasaron de la PC del mostrador a una tablet en la mano, al lado del cliente, conectada en vivo con el ERP. Detrás hay una IA que sugiere qué más ofrecer, propone alternativas y completa sola fichas, fotos y manuales cada noche.',
    },
    caseStudy: {
      problem: {
        en: 'BIAMAQ sells machines and tools from brands like STIHL, Makita and Husqvarna. Sales happened at the counter PC, and offering what goes with each machine, or an alternative, depended on each salesperson’s memory.',
        es: 'BIAMAQ vende máquinas y herramientas de marcas como STIHL, Makita y Husqvarna. La venta se hacía desde la PC del mostrador, y ofrecer lo que acompaña a cada máquina o una alternativa dependía de la memoria de cada vendedor.',
      },
      solution: {
        en: 'A tablet and phone app connected live to the ERP: the salesperson searches for a product and sees its sheet, photo, stock per branch, what to add to the sale and cheaper or pricier alternatives. Recommendations come from years of real sales and quotes, and every night the system fills in sheets, photos and manuals and retrains itself.',
        es: 'Una app para tablet y celular conectada en vivo con el ERP: el vendedor busca un producto y ve la ficha, la foto, el stock por sucursal, qué sumar a la venta y alternativas más baratas o más caras. Las recomendaciones salen de años de ventas y presupuestos reales, y cada noche el sistema completa fichas, fotos y manuales y se reentrena solo.',
      },
      role: {
        en: 'I designed and built it end to end (data, recommendation model, API, app and deployment) and I maintain it.',
        es: 'Lo diseñé y desarrollé de punta a punta (datos, modelo de recomendación, API, app y despliegue) y lo mantengo.',
      },
      outcome: {
        en: 'Salespeople use it at the counter. Each visit is closed as an order, a quote or "didn’t buy" with the reason, which feeds a sales funnel for management. Recommendations hit 3 times more often than suggesting the best sellers.',
        es: 'Los vendedores lo usan en el mostrador. Cada atención se cierra como pedido, presupuesto o "no compró" con su motivo, y eso alimenta un embudo comercial para la gerencia. Las recomendaciones aciertan 3 veces más que sugerir lo más vendido.',
      },
    },
    highlights: [
      {
        en: 'Product network learned from sales and quote history since 2023: it combines co-purchases, quotes, repeat purchases by the same customer and compatibility declared in the catalog, with relevance filters by machine type and re-ranking by branch and recency.',
        es: 'Red de productos aprendida del historial de ventas y presupuestos desde 2023: combina co-compra, presupuestos, recompra del mismo cliente y compatibilidad declarada en el catálogo, con filtros de pertinencia por tipo de máquina y reordenamiento por sucursal y recencia.',
      },
      {
        en: 'Evaluated with temporal validation (train on the past, test on the following quarters): top-3 hit rate went from 32% to 40% on data not used for tuning. I used scikit-learn to evaluate a re-ranker.',
        es: 'Evaluado con validación temporal (entrenar con el pasado y probar con los trimestres siguientes): el acierto top-3 pasó de 32% a 40% en datos que no se usaron para ajustar. Usé scikit-learn para evaluar un re-ranker.',
      },
      {
        en: 'Automatic product sheet enrichment through connectors to manufacturer and distributor sites plus web search with the Brave Search API, checking exact brand and model and respecting robots.txt.',
        es: 'Enriquecimiento automático de fichas con conectores a sitios de fabricantes y distribuidores y búsqueda web con Brave Search API, verificando marca y modelo exactos y respetando robots.txt.',
      },
      {
        en: 'Runs on its own every night: extracts data from the SQL Server ERP in read-only mode, enriches, retrains, measures and publishes the new model only if it doesn’t get worse.',
        es: 'Corre solo todas las noches: extrae datos del ERP en SQL Server en modo solo lectura, enriquece, reentrena, mide y publica el modelo nuevo sólo si no empeora.',
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
    featured: true,
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
    status: 'development',
    logo: { src: '/images/logo-malaca.webp', shape: 'circle', fit: 'contain' },
    gallery: 'wide',
    summary: {
      en: 'Online store for a brand of herbal blends, built for a real client. A mobile-first catalog where customers buy or ask through WhatsApp, plus a custom admin panel to run the store.',
      es: 'Tienda online de una marca de blends de hierbas, desarrollada para un cliente real. Un catálogo mobile-first donde se compra o consulta por WhatsApp, más un panel de administración propio para gestionar la tienda.',
    },
    highlights: [
      {
        en: 'WhatsApp checkout: each button opens a prefilled message with the product, price and link.',
        es: 'Compra por WhatsApp: cada botón abre un mensaje armado con el producto, el precio y el enlace.',
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
      en: 'Online store for a herbal blends brand (client, in development): mobile-first catalog, WhatsApp checkout and a custom admin panel with drag-and-drop ordering.',
      es: 'Tienda online para una marca de blends de hierbas (cliente, en desarrollo): catálogo mobile-first, compra por WhatsApp y panel de administración propio con orden por arrastre.',
    },
  },
  {
    // Private repository. Highlights only list what is implemented in the code.
    id: 'casaPalma',
    title: 'Casa Palma',
    kind: { en: 'Client project · Business management', es: 'Proyecto para cliente · Gestión comercial' },
    group: 'professional',
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
  },
  {
    id: 'chedul',
    title: 'Chedul',
    kind: { en: 'Team project · UTN · Team of 3', es: 'Proyecto en equipo · UTN · Equipo de 3' },
    group: 'personal',
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
    title: { en: 'Diabetes Prediction with Deep Learning', es: 'Predicción de diabetes con Deep Learning' },
    kind: { en: 'Academic project · CESI France · Team of 4', es: 'Proyecto académico · CESI Francia · Equipo de 4' },
    group: 'personal',
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
    title: { en: 'Classroom Noise Monitor', es: 'Monitor de ruido en aulas' },
    kind: { en: 'Academic project · CESI France · IoT · Team of 4', es: 'Proyecto académico · CESI Francia · IoT · Equipo de 4' },
    group: 'personal',
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
  },
]

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<Project['id'], Project>
