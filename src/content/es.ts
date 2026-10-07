import type { Content } from './types'

export const es: Content = {
  meta: {
    title: 'Eduardo M. Ramírez — Ingeniero de Datos',
    description:
      'Eduardo M. Ramírez — IT Lead & Data Engineer en una empresa de maquinaria industrial y estudiante de último año de Ingeniería en Sistemas de Información. Pipelines de datos, data warehouses y el software que los rodea.',
  },
  ui: {
    skip: 'Saltar al contenido',
    nav: { work: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
    language: 'Idioma',
    themeToDark: 'Cambiar a tema oscuro',
    themeToLight: 'Cambiar a tema claro',
    links: { repository: 'Repositorio', walkthrough: 'Recorrido técnico', live: 'Ver sitio', post: 'Post en LinkedIn' },
    portraitAlt: 'Retrato de Eduardo M. Ramírez',
    credential: 'Credencial',
    howItsBuilt: 'Cómo está hecho',
    showMore: 'Ver {n} más',
  },
  hero: {
    title: 'Ingeniero de Datos · Ingeniería en Sistemas',
    tagline:
      'IT Lead & Data Engineer en una empresa de maquinaria industrial y estudiante de último año de Ingeniería en Sistemas de Información en la UTN. Construyo pipelines de datos, data warehouses y el software que los rodea.',
    viewWork: 'Ver proyectos',
    downloadCv: 'Descargar CV',
  },
  now: {
    label: 'Ahora',
    text: 'Trabajando en Last.fm Data Platform y en Malaca, una plataforma de e-commerce para un cliente.',
    updated: 'Octubre 2026',
  },
  sections: {
    about: 'Sobre mí',
    work: 'Proyectos destacados',
    experience: 'Experiencia',
    education: 'Formación',
    languages: 'Idiomas',
    certifications: 'Certificaciones',
    tech: 'Tecnologías',
    contact: 'Contacto',
  },
  about: [
    'En BIAMAQ lidero IT y Sistemas de punta a punta: infraestructura, datos y software para una empresa con 3 sucursales. Estoy en el último año de Ingeniería en Sistemas de Información en la UTN y cursé el primer semestre de 2026 en CESI École d’Ingénieurs, en Francia, con una beca ARFITEC.',
    'Hoy estoy orientando mi carrera hacia Data Engineering. En mis proyectos pongo el foco en lo que hace confiables a los datos: cargas incrementales, controles de calidad, tests y documentar las decisiones detrás de cada capa.',
  ],
  projects: {
    lastfm: {
      title: 'Last.fm Data Platform',
      kind: 'Proyecto personal · Data Engineering',
      summary:
        'Plataforma de datos end-to-end sobre mi historial de escucha de Last.fm: desde las respuestas crudas de la API hasta marts analíticos y un dashboard, construida por fases y con cada decisión de diseño documentada.',
      highlights: [
        'Ingesta incremental desde la API de Last.fm con watermark, metadata por ejecución y backfills reanudables. Las respuestas crudas se guardan inmutables en Bronze.',
        'Capa Silver en Parquet tipado: timestamps en UTC, deduplicación de eventos superpuestos y linaje hacia Bronze.',
        'Marts Gold de actividad, artistas, descubrimiento, rachas y diversidad, más enriquecimiento de artistas con MusicBrainz y tags de Last.fm usando caché local.',
        'Dashboard en Streamlit sobre ~117 mil eventos de escucha. Tests con pytest sobre respuestas HTTP simuladas.',
      ],
      pipeline: {
        steps: [
          { name: 'Last.fm API', detail: 'origen' },
          { name: 'Bronze', detail: 'JSON crudo' },
          { name: 'Silver', detail: 'Parquet tipado' },
          { name: 'Gold', detail: 'marts analíticos' },
          { name: 'Dashboard', detail: 'Streamlit' },
        ],
        branch: { name: 'Enriquecimiento', detail: 'MusicBrainz + tags de Last.fm', target: 3 },
        caption: 'Arquitectura del pipeline. Los datos crudos son inmutables; cada capa se deriva de la anterior.',
      },
    },
    reports: {
      title: 'Reportes BIAMAQ',
      kind: 'Proyecto laboral · BIAMAQ · Business Intelligence',
      summary:
        'Plataforma interna de reportes desde la que la dirección de BIAMAQ sigue ventas, compras, cobranzas, clientes y la actividad del taller de sus 3 sucursales. Funciona sobre los extractores y el data warehouse que construí a partir del ERP en SQL Server.',
      highlights: [
        'API en Django REST Framework sobre SQL Server (ERP + data warehouse), con frontend en React.',
        'Extractores en Python y Pandas programados con Celery y Redis: cargas diarias, snapshots mensuales de cobranzas y clasificación de clientes.',
        'Incluye tablero gerencial de ventas, histórico de compras vs ventas, análisis 80/20 de clientes con retención, antigüedad de deuda y stock del taller.',
        'CI/CD con GitHub Actions: imágenes Docker publicadas en Docker Hub y desplegadas en un runner self-hosted.',
      ],
      images: [
        { src: '/images/reports-sales-thumb.webp', href: '/images/reports-sales.webp', alt: 'Tablero gerencial de ventas con KPIs y gráfico de objetivo vs facturado diario' },
        { src: '/images/reports-purchases-vs-sales-thumb.webp', href: '/images/reports-purchases-vs-sales.webp', alt: 'Histórico mensual de compras vs ventas de 2023 a 2026' },
        { src: '/images/reports-customers-8020-thumb.webp', href: '/images/reports-customers-8020.webp', alt: 'Análisis 80/20 de clientes comparando dos períodos, con retención y clientes fieles' },
        { src: '/images/reports-service-thumb.webp', href: '/images/reports-service.webp', alt: 'Stock del taller por mes con ingresos, egresos y máquinas en reparación' },
      ],
      imagesNote: 'Pantallas con datos de ejemplo. Clic para ampliar.',
    },
    rentos: {
      title: 'RENT-OS',
      kind: 'Proyecto laboral · BIAMAQ',
      summary:
        'Plataforma de alquiler de equipos para BIAMAQ, desarrollada como parte de la reingeniería del módulo de Alquiler de la empresa. API en Django REST Framework con frontend en React, desplegada con Docker en servidores Linux.',
      highlights: [],
      status: 'Pantallas próximamente',
    },
    dynamo: {
      title: 'Dynamo',
      kind: 'Proyecto personal · Aplicación web full-stack',
      summary:
        'Aplicación web mobile-first para registrar entrenamientos, rutinas, peso corporal y progreso. Surgió porque no recordaba qué peso había usado en la sesión anterior.',
      highlights: [
        'API REST en Django dividida en apps por dominio (entrenamientos, ejercicios, progreso, social…), con aislamiento de datos por usuario cubierto por tests.',
        'Métricas calculadas a partir de las series (volumen, mejor peso y 1RM estimado) sin guardar estadísticas redundantes.',
        'Importación idempotente de un dataset abierto de ejercicios, con nombres e instrucciones en español.',
        'Frontend en React + TypeScript, Docker Compose para desarrollo local y GitHub Actions con lint, tests y build.',
      ],
      images: [
        { src: '/images/dynamo-home.webp', alt: 'Pantalla de inicio de Dynamo con las rutinas del día y estadísticas de 30 días' },
        { src: '/images/dynamo-progress.webp', alt: 'Pantalla de progreso con mejor peso, 1RM estimado y gráfico por sesión' },
        { src: '/images/dynamo-workout.webp', alt: 'Entrenamiento en curso con duración, series, volumen y lista de ejercicios' },
        { src: '/images/dynamo-profile.webp', alt: 'Perfil con mapa de calor anual de entrenamientos y rutinas guardadas' },
      ],
    },
    ecommerce: {
      title: 'Malaca',
      kind: 'Proyecto para cliente · E-commerce',
      summary:
        'Plataforma de e-commerce desarrollada para un cliente real, actualmente en desarrollo. Voy a sumar el link y los detalles técnicos cuando esté publicada.',
      highlights: [],
      status: 'En desarrollo',
    },
    cesiDl: {
      title: 'Predicción de diabetes con Deep Learning',
      kind: 'Proyecto académico · CESI Francia · Equipo de 4',
      summary:
        'Pipeline de machine learning de punta a punta para predecir diabetes a partir de datos clínicos tabulares, con un dataset muy desbalanceado. El modelo base tenía 84% de accuracy pero no detectaba a casi ningún paciente diabético, así que optimizamos para la seguridad clínica: muchos menos falsos negativos.',
      highlights: [
        'EDA y preprocesamiento, modelos base en Keras y en NumPy desde cero, y un modelo en PyTorch ajustado.',
        'Oversampling y optimización del umbral de decisión para reducir falsos negativos.',
        'Explicabilidad con SHAP y LIME, y medición de consumo energético con CodeCarbon.',
        'Prototipo de despliegue como servicio en FastAPI.',
      ],
      images: [{ src: '/images/cesi-dl-team.webp', alt: 'El equipo presentando el proyecto de predicción de diabetes con Deep Learning en CESI' }],
    },
    cesiIot: {
      title: 'Monitor de ruido en aulas',
      kind: 'Proyecto académico · CESI Francia · IoT · Equipo de 4',
      summary:
        'Dispositivo en tiempo real que mide el nivel de ruido en las aulas para mejorar el ambiente del campus, conectando hardware de bajo nivel con dashboards de análisis. Privacidad desde el diseño: sólo mide decibeles y nunca graba audio.',
      highlights: [
        'ESP32-S3 con un micrófono digital INMP441 de 24 bits para lecturas precisas.',
        'Envío de datos por WiFi mediante la API nativa de ESPHome, sin broker MQTT.',
        'Home Assistant recibe las lecturas, las guarda en InfluxDB y Grafana las muestra en tiempo real.',
      ],
      images: [
        { src: '/images/cesi-iot-device.webp', alt: 'El monitor de ruido: una caja impresa en 3D con pantalla OLED que muestra los decibeles' },
        { src: '/images/cesi-iot-grafana.webp', alt: 'Dashboard de Grafana con el ruido en tiempo real, el estado y un medidor de decibeles' },
        { src: '/images/cesi-iot-architecture.webp', alt: 'Boceto en pizarra de la arquitectura del sistema' },
      ],
    },
  },
  experience: [
    {
      title: 'BIAMAQ',
      meta: ['IT Lead & Data Engineer', 'Jornada completa · Remoto, Argentina'],
      period: 'Nov. 2023 — Actualidad',
      description:
        'IT y Sistemas de una empresa de maquinaria industrial: infraestructura, desarrollo, automatización e inteligencia de negocios.',
      highlights: [
        'Desarrollé pipelines ETL con Python y Pandas que cargan datos de SQL Server en un data warehouse, unificando ventas, stock, service y alquiler de equipos de las 3 sucursales.',
        'Diseño y mantengo tableros ejecutivos en Power BI (DAX) y automatizo reportes recurrentes con Python.',
        'Lideré la reingeniería de los módulos de Alquiler y Servicio Técnico con Django REST Framework y React, desplegados con Docker en servidores Linux.',
      ],
    },
  ],
  education: [
    {
      title: 'Universidad Tecnológica Nacional — FRRe',
      meta: ['Ingeniería en Sistemas de Información'],
      period: 'Último año en curso',
    },
    {
      title: 'CESI École d’Ingénieurs — Rouen, Francia',
      meta: ['Intercambio académico · Beca ARFITEC'],
      period: 'Primer semestre 2026',
      description:
        'Un semestre del Máster en Data Science, con cursada en data science, IA, IoT y desarrollo web, y proyectos de ingeniería en equipos multidisciplinarios.',
      image: {
        src: '/images/cesi.webp',
        alt: 'Eduardo frente al cartel de CESI École d’Ingénieurs',
        caption: 'CESI Rouen, 2026',
      },
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'B1' },
    { name: 'Francés', level: 'A2' },
  ],
  tech: { data: 'Datos', software: 'Software e infraestructura' },
  contact: {
    intro: 'La forma más rápida de contactarme es por email. También estoy en LinkedIn y GitHub.',
  },
}
