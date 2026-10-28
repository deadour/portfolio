import type { Content } from './types'

export const en: Content = {
  meta: {
    title: 'Eduardo M. Ramírez — Software & Data Engineer',
    description:
      'Software & Data Engineer in Argentina. I build backend systems, ERP integrations, data pipelines and internal business software used in real operations.',
  },
  ui: {
    skip: 'Skip to content',
    nav: { work: 'Work', services: 'Services', experience: 'Experience', contact: 'Contact' },
    language: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    shuffle: 'Shuffle the background sketches',
    links: { repository: 'Repository', backend: 'Backend repository', frontend: 'Frontend repository', walkthrough: 'Technical walkthrough', live: 'Live site', post: 'LinkedIn post' },
    portraitAlt: 'Portrait of Eduardo M. Ramírez',
    credential: 'Credential',
    howItsBuilt: 'How it’s built',
    caseStudy: { problem: 'Problem', role: 'My role', solution: 'Solution', outcome: 'Today' },
    lightbox: { close: 'Close', previous: 'Previous image', next: 'Next image' },
    showMore: 'Show {n} more',
    featured: 'Featured technical project',
    academic: 'Academic projects',
    professional: 'Professional work',
    personal: 'Personal & academic',
    copyEmail: 'Copy email',
    copied: 'Copied',
    viewPhotos: 'View photos ({n})',
  },
  hero: {
    title: 'Software & Data Engineer',
    tagline:
      'I help companies connect their systems, make sense of their data and stop depending on spreadsheets. Since 2023 I’ve built and run the systems BIAMAQ, an industrial machinery company, uses every day.',
    solutions: 'What I can solve',
    viewWork: 'View projects',
    downloadCv: 'Download CV',
  },
  now: {
    label: 'Now',
    date: 'October 2026',
    text: 'Building BIAMAQ Intelligence, a commercial intelligence platform on top of ERP data, and Malaca, an e-commerce site for a client.',
  },
  sections: {
    about: 'About',
    work: 'Selected work',
    experience: 'Experience',
    education: 'Education',
    languages: 'Languages',
    certifications: 'Certifications',
    tech: 'Tech',
    contact: 'Contact',
  },
  about: [
    'At BIAMAQ, an industrial machinery company with 3 branches, I build and maintain the systems it runs on: ERP integrations, ETL pipelines and BI tools over sales, purchases, stock, receivables, service and rentals, plus RentalIA, its rental platform. I also handle infrastructure, automation and deployments.',
    'I like to understand how a business works before writing code: what gets entered twice, which report is built by hand, which decision is made without data. I’m finishing Information Systems Engineering at UTN, and in 2026 I spent a semester of CESI’s Data Science master’s programme in France on an ARFITEC scholarship, working on machine learning and IoT projects.',
  ],
  projects: {
    lastfm: {
      title: 'Last.fm Data Platform',
      kind: 'Personal project · Data Engineering',
      summary:
        'End-to-end data platform for my Last.fm listening history: from raw API responses to analytical marts and a dashboard, built in phases with each design decision documented.',
      highlights: [
        'Incremental ingestion from the Last.fm API using a watermark, with run metadata and resumable backfills. Raw responses are stored immutably in Bronze.',
        'Silver layer in typed Parquet: UTC timestamps, deduplication of overlapping events and lineage back to Bronze.',
        'Gold marts for activity, artists, discovery, streaks and diversity, plus artist enrichment from MusicBrainz and Last.fm tags with a local cache.',
        'Streamlit dashboard over ~117k listening events. Tests run with pytest against mocked HTTP responses.',
      ],
      images: [
        { src: '/images/lastfm-overview-thumb.webp', href: '/images/lastfm-overview.webp', alt: 'Dashboard overview: 116,871 scrobbles, 4,956 artists, scrobbles per year and top artists' },
        { src: '/images/lastfm-taste-thumb.webp', href: '/images/lastfm-taste.webp', alt: 'Taste evolution: genre share over time and artist evolution by year' },
        { src: '/images/lastfm-discovery-thumb.webp', href: '/images/lastfm-discovery.webp', alt: 'Discovery and loyalty: new artists and tracks per year, concentration and diversity' },
        { src: '/images/lastfm-patterns-thumb.webp', href: '/images/lastfm-patterns.webp', alt: 'Listening heatmap by weekday and local hour, plus listening by location and artist country' },
      ],
      imagesNote: 'Streamlit dashboard built on the Gold layer. Click to enlarge.',
      pipeline: {
        steps: [
          { name: 'Last.fm API', detail: 'source' },
          { name: 'Bronze', detail: 'raw JSON' },
          { name: 'Silver', detail: 'typed Parquet' },
          { name: 'Gold', detail: 'analytical marts' },
          { name: 'Dashboard', detail: 'Streamlit' },
        ],
        branch: { name: 'Enrichment', detail: 'MusicBrainz + Last.fm tags', target: 3 },
        caption: 'Pipeline architecture. Raw data stays immutable; each layer is derived from the one before.',
      },
    },
    reports: {
      title: 'BIAMAQ Reports',
      kind: 'Work project · BIAMAQ · Business Intelligence',
      badge: 'Internal production system',
      summary:
        'Internal platform where BIAMAQ’s management follows sales, purchases, receivables, customers and the workshop across its 3 branches, with data that updates itself from the ERP every day.',
      caseStudy: {
        problem:
          'Management needed one place to follow sales, purchases, receivables, customers and workshop activity across 3 branches. The data lived in the company’s SQL Server ERP.',
        role: 'I designed and built it end to end (extractors, data warehouse, API, frontend and deployment) and I maintain it.',
        solution:
          'Scheduled Python extractors load the ERP into a data warehouse. A Django REST API and a React frontend serve the analyses: sales dashboard, purchases vs sales, 80/20 customers, receivables aging and workshop stock.',
        outcome: 'Used by management in day-to-day operations.',
      },
      highlights: [
        'Django REST Framework API over SQL Server (ERP + data warehouse), with a React frontend.',
        'Python and Pandas extractors, scheduled with Celery and Redis: daily loads, monthly receivables snapshots and customer classification.',
        'Analyses include a management sales dashboard, purchases vs sales history, an 80/20 customer analysis with retention, receivables aging and workshop stock.',
        'CI/CD with GitHub Actions: Docker images published to Docker Hub and deployed on a self-hosted runner.',
      ],
      images: [
        { src: '/images/reports-sales-thumb.webp', href: '/images/reports-sales.webp', alt: 'Management sales dashboard with KPIs and daily target vs invoiced chart' },
        { src: '/images/reports-purchases-vs-sales-thumb.webp', href: '/images/reports-purchases-vs-sales.webp', alt: 'Monthly purchases vs sales history from 2023 to 2026' },
        { src: '/images/reports-customers-8020-thumb.webp', href: '/images/reports-customers-8020.webp', alt: '80/20 customer analysis comparing two periods, with retention and loyal customers' },
        { src: '/images/reports-service-thumb.webp', href: '/images/reports-service.webp', alt: 'Workshop stock by month with intake, output and machines in repair' },
      ],
      imagesNote: 'Screens shown with sample data. Click to enlarge.',
    },
    rentalia: {
      title: 'RentalIA',
      kind: 'Work project · BIAMAQ · Full-stack platform',
      badge: 'In production at BIAMAQ',
      summary:
        'Rental management system developed at BIAMAQ: booking, signed contract, delivery, return, workshop and invoicing in one place. It works connected to the ERP or on its own.',
      caseStudy: {
        problem:
          'BIAMAQ’s equipment rentals ran on a module of its legacy ERP. The goal was one system for the whole cycle: booking, contract, delivery, return, billable days, workshop and invoicing.',
        role: 'I led its re-engineering and development: architecture, backend, frontend, ERP integration and deployment.',
        solution:
          'Multi-company, multi-branch platform with a booking wizard, PDF contracts signed on a tablet, technical delivery and return, billable-days close, workshop and electronic invoicing. It syncs with the ERP or runs standalone.',
        outcome:
          'In use in BIAMAQ’s rental operations. The standalone mode lets rental businesses of other products and equipment use it without BIAMAQ’s ERP.',
      },
      highlights: [
        'Django REST Framework backend with a hexagonal architecture, on PostgreSQL or SQL Server.',
        'PDF contracts signed on a Wacom tablet, and multi-company electronic invoicing with ARCA (Argentina’s tax authority).',
        'Syncs with the company’s legacy SQL Server ERP, and also runs standalone without it.',
        'React 19 frontend with Tailwind, Recharts and Framer Motion; Playwright end-to-end tests; Docker and CI with automatic deploys, migrations and smoke tests.',
      ],
      images: [
        { src: '/images/rentos-new-rental-thumb.webp', href: '/images/rentos-new-rental.webp', alt: 'Rental wizard, step 2: equipment catalog with the price per day' },
        { src: '/images/rentos-bi-thumb.webp', href: '/images/rentos-bi.webp', alt: 'Management & BI view with billing, occupancy and profitability per equipment' },
        { src: '/images/rentos-workshop-thumb.webp', href: '/images/rentos-workshop.webp', alt: 'Workshop with counters, days in repair and a delay alert' },
        { src: '/images/rentos-returns-thumb.webp', href: '/images/rentos-returns.webp', alt: 'Returning a rental, with a summary of the amount to charge' },
      ],
      imagesNote: 'Screens shown with sample data. Click to enlarge.',
    },
    intelligence: {
      title: 'BIAMAQ Intelligence',
      kind: 'Work project · BIAMAQ · Data & applied AI',
      status: 'In development',
      summary:
        'Commercial intelligence platform I’m building on top of BIAMAQ’s ERP data. The goal is to enrich the catalog automatically and recommend related products and alternatives, for a target catalog of around 20,000 products and spare parts.',
      highlightsLabel: 'Planned scope',
      highlights: [
        'ETL and normalization of ERP data.',
        'Product classification and enrichment, including extraction of technical attributes.',
        'Local LLMs and semantic similarity.',
        'Recommendations of related products and alternatives.',
        'Integration with the company’s sales applications.',
      ],
    },
    casaPalma: {
      title: 'Casa Palma',
      kind: 'Client project · Business management',
      status: 'In development',
      summary:
        'Management system for a collaborative store that sells products from different local makers. It replaces the spreadsheets the store used for daily sales, expenses and payouts to each maker.',
      highlightsLabel: 'Built so far',
      highlights: [
        'Sales register where one ticket holds several products and mixed payments, with stock updated in the same transaction.',
        'Stock per product and maker, with a movement history.',
        'Expenses and per-period payouts to each maker.',
        'Product import from Excel and Tiendanube with a preview, and a monthly PDF report for the accountant.',
        'Four roles (admin, maker, seller, accountant) with permissions checked on the server.',
        'Business rules covered by tests on an in-memory Postgres. It runs in test mode until the owners confirm the commercial rules.',
      ],
    },
    dynamo: {
      title: 'Dynamo',
      kind: 'Personal project · Full-stack web app',
      summary:
        'Mobile-first web app to log workouts, routines, body weight and progress. It started because I kept forgetting what I had lifted in my previous session.',
      highlights: [
        'Django REST API split into domain apps (workouts, exercises, progress, social…), with per-user data isolation covered by tests.',
        'Metrics computed from sets (volume, best weight and estimated 1RM) without storing redundant statistics.',
        'Idempotent import of an open exercise dataset, with names and instructions prepared in Spanish.',
        'React + TypeScript frontend, Docker Compose for local development and GitHub Actions running lint, tests and builds.',
      ],
      images: [
        { src: '/images/dynamo-home.webp', alt: 'Dynamo home screen with today’s routines and 30-day stats' },
        { src: '/images/dynamo-progress.webp', alt: 'Progress screen with best weight, estimated 1RM and a per-session chart' },
        { src: '/images/dynamo-workout.webp', alt: 'Workout in progress with duration, sets, volume and exercise list' },
        { src: '/images/dynamo-profile.webp', alt: 'Profile with a yearly training heatmap and saved routines' },
      ],
    },
    chedul: {
      title: 'Chedul',
      kind: 'Team project · UTN · Team of 3 · Full-stack',
      summary:
        'Web app for Information Systems Engineering students at UTN that keeps the whole degree in one place: academic status, a prerequisites map, a calendar with classes and exams, shared notes and professors’ emails.',
      highlights: [
        'Team project with [Lautaro Acosta](https://www.linkedin.com/in/lautaro-acosta-quintana/) and [Tobías Stegmayer](https://www.linkedin.com/in/tobias-stegmayer-612551218/). I built the original Django app and led the migration to Go + React, the deployment and the design.',
        'Go REST API (handlers, repositories and domain layers) and a new React + TypeScript SPA, replacing the original Django app.',
        'Full curriculum in PostgreSQL: 51 subjects, 109 prerequisites and 68 class groups with schedules, with versioned migrations.',
        'JWT login in a cookie, accent-insensitive subject search, light and dark themes and a mobile-first design.',
        'Integration tests with Testcontainers against a real Postgres, and CI on GitHub Actions.',
        'API in Docker on Google Cloud Run, database on Neon and frontend on Vercel, redeployed automatically on every push to main.',
      ],
      images: [
        { src: '/images/chedul-home-thumb.webp', href: '/images/chedul-home.webp', alt: 'Chedul home with degree progress, average, upcoming dates and the subjects you can take' },
        { src: '/images/chedul-prerequisites-thumb.webp', href: '/images/chedul-prerequisites.webp', alt: 'Prerequisites map in dark mode, linking each subject to the ones it requires' },
        { src: '/images/chedul-status-thumb.webp', href: '/images/chedul-status.webp', alt: 'Academic status by year, with each subject marked as pending, in progress, regular or passed' },
        { src: '/images/chedul-calendar-thumb.webp', href: '/images/chedul-calendar.webp', alt: 'Weekly calendar with class times and classrooms' },
      ],
      imagesNote: 'Screens shown with sample data. Click to enlarge.',
    },
    ecommerce: {
      title: 'Malaca',
      kind: 'Client project · E-commerce',
      summary:
        'Online store for a brand of herbal blends, built for a real client. A mobile-first catalog where customers buy or ask through WhatsApp, plus a custom admin panel to run the store.',
      highlights: [
        'WhatsApp checkout: each button opens a prefilled message with the product, price and link.',
        'Admin panel for products, up to 5 photos per product, prices, stock, featured items and optional categories.',
        'Products, photos and categories are reordered by drag and drop.',
        'Botanical visual identity with custom SVG illustrations; mobile-first design.',
        'Django REST Framework API with PostgreSQL, images on Cloudinary, deployed with Docker on Render.',
      ],
      status: 'In development',
      images: [
        { src: '/images/malaca-home-thumb.webp', href: '/images/malaca-home.webp', alt: 'Malaca home page with the herbal blends hero' },
        { src: '/images/malaca-catalog-thumb.webp', href: '/images/malaca-catalog.webp', alt: 'Product catalog with category filter, search and sorting' },
        { src: '/images/malaca-product-thumb.webp', href: '/images/malaca-product.webp', alt: 'Product page with WhatsApp buy and inquiry buttons' },
        { src: '/images/malaca-admin-thumb.webp', href: '/images/malaca-admin.webp', alt: 'Admin panel product list with drag handles to reorder' },
      ],
      imagesNote: 'Screens shown with demo data. Click to enlarge.',
    },
    cesiDl: {
      title: 'Diabetes Prediction with Deep Learning',
      kind: 'Academic project · CESI France · Team of 4',
      summary:
        'End-to-end machine learning pipeline to predict diabetes from a tabular health dataset with heavy class imbalance. The 84%-accurate baseline missed almost every positive case, so we focused on reducing false negatives instead of chasing accuracy.',
      highlights: [
        'EDA and preprocessing, Keras and custom NumPy baselines, and a tuned PyTorch model.',
        'Oversampling and decision-threshold optimization to reduce false negatives.',
        'Explainability with SHAP and LIME, and energy tracking with CodeCarbon.',
        'Prototype deployment as a FastAPI service.',
      ],
      images: [
        { src: '/images/cesi-dl-team.webp', alt: 'The team presenting the Diabetes Prediction with Deep Learning project at CESI' },
        { src: '/images/cesi-dl-pipeline.webp', alt: 'Slide with the nine stages of the end-to-end pipeline, from data ingestion to FastAPI deployment' },
        { src: '/images/cesi-dl-model.webp', alt: 'Diagram of the tuned PyTorch model: two dense layers with ReLU and dropout and a sigmoid output' },
        { src: '/images/cesi-dl-results.webp', alt: 'Confusion matrices before and after oversampling: missed diabetes cases drop from 6,704 to 2,035' },
      ],
    },
    cesiIot: {
      title: 'Classroom Noise Monitor',
      kind: 'Academic project · CESI France · IoT · Team of 4',
      summary:
        'Real-time device that measures noise levels in classrooms to improve the campus environment, connecting low-level hardware all the way to analytics dashboards. Privacy by design: it only measures decibels and never records audio.',
      highlights: [
        'ESP32-S3 with an INMP441 24-bit digital microphone for precise noise readings.',
        'Data sent over WiFi through the ESPHome Native API instead of an MQTT broker.',
        'Home Assistant ingests the readings, stores them in InfluxDB, and Grafana shows them in real time.',
      ],
      images: [
        { src: '/images/cesi-iot-device.webp', alt: 'The noise monitor: a small 3D-printed case with an OLED screen showing the decibel level' },
        { src: '/images/cesi-iot-grafana.webp', alt: 'Grafana dashboard with real-time noise level, state and a decibel gauge' },
        { src: '/images/cesi-iot-architecture.webp', alt: 'Whiteboard sketch of the system architecture' },
      ],
    },
  },
  solutions: {
    title: 'What I can solve',
    intro:
      'Many companies already have an ERP and plenty of data, but the information doesn’t work together. These are the problems I know how to solve, with examples of where I’ve already done it.',
    labels: { before: 'Before', after: 'After', proof: 'Already done', seeProject: 'See project' },
    items: [
      {
        id: 'integration',
        tag: 'Integration',
        title: 'Systems that talk to each other.',
        text: 'I connect the ERP with the rest of the company’s tools, so information is entered once and reaches where it’s needed on its own.',
        before: 'Entering the same data in the ERP and in a spreadsheet.',
        after: 'Entered once, available everywhere.',
        visual: {
          kind: 'flow',
          flow: {
            steps: [
              { name: 'ERP', detail: 'sales, stock' },
              { name: 'Automatic sync', detail: 'every day' },
              { name: 'Your tools', detail: 'reports, apps' },
            ],
            caption: 'Simplified diagram.',
          },
        },
        proof: { text: 'At BIAMAQ, the ERP feeds management reporting every day.', project: 'reports' },
      },
      {
        id: 'reporting',
        tag: 'Reporting & data',
        title: 'Clear numbers, no spreadsheets built by hand.',
        text: 'Dashboards that update themselves with the company’s real data (sales, purchases, receivables, stock), so everyone looks at the same number.',
        before: 'A weekly report someone builds by hand in Excel.',
        after: 'A dashboard that updates itself every day.',
        visual: {
          kind: 'image',
          image: { src: '/images/reports-sales-thumb.webp', href: '/images/reports-sales.webp', alt: 'Management sales dashboard with KPIs and daily target vs invoiced chart' },
          note: 'Sample data. Click to enlarge.',
        },
        proof: { text: 'BIAMAQ’s management follows its 3 branches with BIAMAQ Reports.', project: 'reports' },
      },
      {
        id: 'software',
        tag: 'Custom software',
        title: 'A system that fits how you work.',
        text: 'When a key process lives in spreadsheets or depends on one person, I turn it into a simple application, with permissions and a history.',
        before: 'The process depends on spreadsheets and on someone remembering.',
        after: 'One system, with history, permissions and everything in one place.',
        visual: {
          kind: 'image',
          image: { src: '/images/rentos-new-rental-thumb.webp', href: '/images/rentos-new-rental.webp', alt: 'Rental wizard: equipment catalog with the price per day' },
          note: 'Sample data. Click to enlarge.',
        },
        proof: { text: 'RentalIA runs BIAMAQ’s rentals, from contract to invoicing.', project: 'rentalia' },
      },
      {
        id: 'ai',
        tag: 'Applied AI',
        title: 'An organized catalog that suggests alternatives.',
        text: 'With thousands of products, completing descriptions by hand doesn’t scale. I use AI to classify products, fill in technical details and suggest related products or alternatives.',
        before: 'Incomplete descriptions and products that are hard to find.',
        after: 'Complete product data and suggested alternatives.',
        visual: {
          kind: 'example',
          label: 'Illustrative example',
          input: 'OIL FILT. 4T ENGINE X UNIT',
          output: [
            { name: 'Type', value: 'Oil filter' },
            { name: 'Engine', value: '4-stroke' },
            { name: 'Sold by', value: 'Unit' },
            { name: 'Suggested', value: 'Compatible air filter, engine oil' },
          ],
        },
        proof: {
          text: 'I’m building it in BIAMAQ Intelligence, for a catalog of around 20,000 items.',
          project: 'intelligence',
          status: 'In development',
        },
      },
    ],
  },
  services: {
    process: {
      title: 'How I work',
      steps: [
        { title: 'First conversation', text: 'You tell me about the process, the systems you use and what you want to solve.' },
        { title: 'Review', text: 'I look at the data and systems involved and propose a concrete scope.' },
        { title: 'Build in stages', text: 'Short deliveries you can try with real data.' },
        { title: 'Launch and support', text: 'Deployment, documentation and maintenance.' },
      ],
    },
    cta: 'Tell me about your project',
    emailSubject: 'Project inquiry — eduramirez.dev',
  },
  experience: [
    {
      title: 'BIAMAQ',
      href: 'https://biamaq.com.ar',
      logo: '/images/logo-biamaq.webp',
      meta: ['Software & Data Engineer · IT Lead', 'Full-time · Remote, Argentina'],
      period: 'Nov 2023 — Present',
      description:
        'Systems for an industrial machinery company with 3 branches: software that runs daily operations, ERP integrations, data, automation and infrastructure.',
      highlights: [
        'Built ETL pipelines with Python and Pandas that load the SQL Server ERP into a data warehouse, covering sales, purchases, stock, receivables, service and rentals.',
        'Built BIAMAQ Reports, the internal reporting platform used by management, and maintain Power BI dashboards and automated reports.',
        'Led the re-engineering of the Rental and Technical Service modules with Django REST Framework and React; the rental module became RentalIA.',
        'Handle infrastructure, automation and deployments: Docker on Linux servers and CI/CD with GitHub Actions.',
      ],
    },
  ],
  education: [
    {
      title: 'Universidad Tecnológica Nacional — FRRe',
      href: 'https://www.frre.utn.edu.ar',
      logo: '/images/logo-utn.webp',
      meta: ['Information Systems Engineering'],
      period: 'Final year in progress',
    },
    {
      title: 'CESI École d’Ingénieurs — Rouen, France',
      href: 'https://rouen.cesi.fr',
      logo: '/images/logo-cesi.webp',
      meta: ['Academic exchange · ARFITEC scholarship'],
      period: 'Spring semester 2026',
      description:
        'A semester of the Data Science master’s programme, with coursework in data science, AI, IoT and web development, and engineering projects in multidisciplinary teams.',
      images: [
        { src: '/images/cesi-presenting.webp', alt: 'Eduardo presenting a team project in a CESI lecture hall' },
        { src: '/images/cesi-team.webp', alt: 'Eduardo working with his project team around a table with laptops' },
        { src: '/images/cesi.webp', alt: 'Eduardo in front of the CESI École d’Ingénieurs sign' },
      ],
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'B1' },
    { name: 'French', level: 'A2' },
  ],
  tech: { data: 'Data', software: 'Software & infrastructure' },
  contact: {
    title: 'Let’s talk.',
    paragraphs: [
      {
        lead: 'Recruiters:',
        text: 'I’m open to remote full-time or contractor roles in Backend, Data or Software Engineering, and to relocation opportunities.',
      },
      {
        lead: 'Companies:',
        text: 'if a process still depends on spreadsheets or your data doesn’t add up, email me which systems you use and what you want to solve. If I’m not the right person for it, I’ll tell you.',
      },
    ],
  },
}
