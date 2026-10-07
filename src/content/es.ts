import type { Content } from './types'

export const es: Content = {
  meta: {
    title: 'Eduardo M. Ramírez — Data Engineer',
    description:
      'Eduardo M. Ramírez — Data Engineer e IT Lead en una empresa de maquinaria industrial, y estudiante de último año de Ingeniería en Sistemas de Información en la UTN. Pipelines de datos, data warehouses y el software que los rodea.',
  },
  ui: {
    skip: 'Saltar al contenido',
    nav: { work: 'Proyectos', experience: 'Experiencia', contact: 'Contacto' },
    language: 'Idioma',
    themeToDark: 'Cambiar a tema oscuro',
    themeToLight: 'Cambiar a tema claro',
    shuffle: 'Mezclar los dibujos del fondo',
    links: { repository: 'Repositorio', backend: 'Repo backend', frontend: 'Repo frontend', walkthrough: 'Recorrido técnico', live: 'Ver sitio', post: 'Post en LinkedIn' },
    portraitAlt: 'Retrato de Eduardo M. Ramírez',
    credential: 'Credencial',
    howItsBuilt: 'Cómo está hecho',
    lightbox: { close: 'Cerrar', previous: 'Imagen anterior', next: 'Imagen siguiente' },
    showMore: 'Ver {n} más',
    featured: 'Proyecto principal',
    academic: 'Proyectos académicos',
    professional: 'Trabajo profesional',
    personal: 'Personal y académico',
    copyEmail: 'Copiar email',
    copied: 'Copiado',
    viewPhotos: 'Ver fotos ({n})',
  },
  hero: {
    title: 'Data Engineer · Ingeniería en Sistemas',
    tagline:
      'IT Lead & Data Engineer en una empresa de maquinaria industrial y estudiante de último año de Ingeniería en Sistemas de Información en la UTN. Construyo pipelines de datos, data warehouses y el software que los rodea.',
    viewWork: 'Ver proyectos',
    downloadCv: 'Descargar CV',
  },
  now: {
    label: 'Ahora',
    text: 'Trabajando en Last.fm Data Platform y en Malaca, una plataforma de e-commerce para un cliente.',
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
    'En BIAMAQ lidero IT y Sistemas de punta a punta: infraestructura, datos y software para una empresa con 3 sucursales. En 2026 cursé un semestre en CESI École d’Ingénieurs, Francia, mediante una beca ARFITEC, mientras avanzo en el último año de Ingeniería en Sistemas de Información en la UTN.',
    'Hoy estoy orientando mi carrera hacia Data Engineering. Me interesa especialmente lo que hace confiable a una plataforma de datos: cargas incrementales, controles de calidad, tests, trazabilidad y documentar las decisiones detrás de cada capa.',
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
      images: [
        { src: '/images/lastfm-overview-thumb.webp', href: '/images/lastfm-overview.webp', alt: 'Resumen del dashboard: 116.871 scrobbles, 4.956 artistas, scrobbles por año y artistas más escuchados' },
        { src: '/images/lastfm-taste-thumb.webp', href: '/images/lastfm-taste.webp', alt: 'Evolución del gusto: participación de géneros en el tiempo y evolución de artistas por año' },
        { src: '/images/lastfm-discovery-thumb.webp', href: '/images/lastfm-discovery.webp', alt: 'Descubrimiento y fidelidad: artistas y temas nuevos por año, concentración y diversidad' },
        { src: '/images/lastfm-patterns-thumb.webp', href: '/images/lastfm-patterns.webp', alt: 'Mapa de calor de escucha por día y hora local, y escuchas por ubicación y país del artista' },
      ],
      imagesNote: 'Dashboard en Streamlit construido sobre la capa Gold. Clic para ampliar.',
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
      badge: 'Sistema interno · Producción',
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
      kind: 'Proyecto laboral · BIAMAQ · Plataforma full-stack',
      summary:
        'Plataforma de alquiler de equipos desarrollada para la reingeniería del módulo de Alquiler de BIAMAQ, pensada como plataforma multiempresa y multisucursal. Cubre el ciclo completo del alquiler: wizard de reserva, contrato firmado, entrega técnica, devolución, cierre con días facturables y taller.',
      highlights: [
        'Backend en Django REST Framework con arquitectura hexagonal, sobre PostgreSQL o SQL Server.',
        'Contratos en PDF firmados en tableta Wacom y facturación electrónica ARCA multiempresa.',
        'Sincroniza con el ERP legacy de la empresa en SQL Server y también funciona de forma independiente.',
        'Frontend en React 19 con Tailwind, Recharts y Framer Motion; tests end-to-end con Playwright; Docker y CI con deploy automático, migraciones y smoke tests.',
      ],
      images: [
        { src: '/images/rentos-login-thumb.webp', href: '/images/rentos-login.webp', alt: 'Pantalla de inicio de sesión de RENT-OS' },
        { src: '/images/rentos-inventory-thumb.webp', href: '/images/rentos-inventory.webp', alt: 'Inventario con stock por sucursal, precio diario y disponibilidad' },
        { src: '/images/rentos-new-rental-thumb.webp', href: '/images/rentos-new-rental.webp', alt: 'Wizard de cinco pasos para crear un nuevo alquiler' },
        { src: '/images/rentos-workshop-thumb.webp', href: '/images/rentos-workshop.webp', alt: 'Tablero kanban del taller con equipos ingresados, en reparación y listos' },
      ],
      imagesNote: 'Pantallas con datos de ejemplo. Clic para ampliar.',
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
    chedul: {
      title: 'Chedul',
      kind: 'Proyecto en equipo · UTN · Equipo de 3 · Full-stack',
      summary:
        'App web para estudiantes de Ingeniería en Sistemas de la UTN que organiza toda la carrera en un solo lugar: estado académico, mapa de correlativas, calendario con clases y parciales, apuntes compartidos y mails de profesores.',
      highlights: [
        'Proyecto en equipo con Lautaro Acosta y Tobías Stegmayer. Hice la app original en Django y lideré la migración a Go + React, el deploy y el diseño.',
        'API REST en Go (capas de handlers, repositorios y dominio) y una SPA nueva en React + TypeScript, que reemplazan a la app original en Django.',
        'Plan de estudios completo en PostgreSQL: 51 materias, 109 correlativas y 68 comisiones con horarios, con migraciones versionadas.',
        'Login con JWT en cookie, buscador de materias que ignora tildes, tema claro y oscuro y diseño mobile-first.',
        'Tests de integración con Testcontainers contra un Postgres real y CI en GitHub Actions.',
        'API en Docker sobre Google Cloud Run, base de datos en Neon y frontend en Vercel, con redeploy automático en cada push a main.',
      ],
      images: [
        { src: '/images/chedul-home-thumb.webp', href: '/images/chedul-home.webp', alt: 'Inicio de Chedul con el avance de la carrera, el promedio, las próximas fechas y las materias que podés cursar' },
        { src: '/images/chedul-prerequisites-thumb.webp', href: '/images/chedul-prerequisites.webp', alt: 'Mapa de correlativas en modo oscuro, que une cada materia con las que necesita' },
        { src: '/images/chedul-status-thumb.webp', href: '/images/chedul-status.webp', alt: 'Estado académico por año, con cada materia marcada como pendiente, cursando, regular o aprobada' },
        { src: '/images/chedul-calendar-thumb.webp', href: '/images/chedul-calendar.webp', alt: 'Calendario semanal con horarios y aulas de cursada' },
      ],
      imagesNote: 'Pantallas con datos de ejemplo. Clic para ampliar.',
    },
    ecommerce: {
      title: 'Malaca',
      kind: 'Proyecto para cliente · E-commerce',
      summary:
        'Tienda online de una marca de blends de hierbas, desarrollada para un cliente real. Un catálogo mobile-first donde se compra o consulta por WhatsApp, más un panel de administración propio para gestionar la tienda.',
      highlights: [
        'Compra por WhatsApp: cada botón abre un mensaje armado con el producto, el precio y el enlace.',
        'Panel de administración para productos, hasta 5 fotos por producto, precios, stock, destacados y categorías opcionales.',
        'Productos, fotos y categorías se ordenan arrastrando.',
        'Identidad botánica con ilustraciones SVG propias; diseño mobile-first.',
        'API con Django REST Framework y PostgreSQL, imágenes en Cloudinary, deploy con Docker en Render.',
      ],
      status: 'En desarrollo',
      images: [
        { src: '/images/malaca-home-thumb.webp', href: '/images/malaca-home.webp', alt: 'Inicio de Malaca con el hero de blends de hierbas' },
        { src: '/images/malaca-catalog-thumb.webp', href: '/images/malaca-catalog.webp', alt: 'Catálogo de productos con filtro por categoría, búsqueda y orden' },
        { src: '/images/malaca-product-thumb.webp', href: '/images/malaca-product.webp', alt: 'Detalle de producto con botones de compra y consulta por WhatsApp' },
        { src: '/images/malaca-admin-thumb.webp', href: '/images/malaca-admin.webp', alt: 'Panel de administración con la lista de productos y manijas para reordenar' },
      ],
      imagesNote: 'Pantallas con datos de demostración. Clic para ampliar.',
    },
    cesiDl: {
      title: 'Predicción de diabetes con Deep Learning',
      kind: 'Proyecto académico · CESI Francia · Equipo de 4',
      summary:
        'Pipeline de machine learning de punta a punta para predecir diabetes a partir de un dataset tabular de salud con fuerte desbalance de clases. El modelo base tenía 84% de accuracy pero no detectaba casi ningún caso positivo, así que nos enfocamos en reducir los falsos negativos en lugar de perseguir la accuracy.',
      highlights: [
        'EDA y preprocesamiento, modelos base en Keras y en NumPy desde cero, y un modelo en PyTorch ajustado.',
        'Oversampling y optimización del umbral de decisión para reducir falsos negativos.',
        'Explicabilidad con SHAP y LIME, y medición de consumo energético con CodeCarbon.',
        'Prototipo de despliegue como servicio en FastAPI.',
      ],
      images: [
        { src: '/images/cesi-dl-team.webp', alt: 'El equipo presentando el proyecto de predicción de diabetes con Deep Learning en CESI' },
        { src: '/images/cesi-dl-pipeline.webp', alt: 'Slide con las nueve etapas del pipeline de punta a punta, desde la ingesta de datos hasta el deploy con FastAPI' },
        { src: '/images/cesi-dl-model.webp', alt: 'Diagrama del modelo PyTorch ajustado: dos capas densas con ReLU y dropout y una salida sigmoide' },
        { src: '/images/cesi-dl-results.webp', alt: 'Matrices de confusión antes y después del oversampling: los casos de diabetes no detectados bajan de 6.704 a 2.035' },
      ],
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
      href: 'https://biamaq.com.ar',
      logo: '/images/logo-biamaq.webp',
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
      href: 'https://www.frre.utn.edu.ar',
      logo: '/images/logo-utn.webp',
      meta: ['Ingeniería en Sistemas de Información'],
      period: 'Último año en curso',
    },
    {
      title: 'CESI École d’Ingénieurs — Rouen, Francia',
      href: 'https://rouen.cesi.fr',
      logo: '/images/logo-cesi.webp',
      meta: ['Intercambio académico · Beca ARFITEC'],
      period: 'Primer semestre 2026',
      description:
        'Un semestre del Máster en Data Science, con cursada en data science, IA, IoT y desarrollo web, y proyectos de ingeniería en equipos multidisciplinarios.',
      images: [
        { src: '/images/cesi-presenting.webp', alt: 'Eduardo presentando un proyecto en equipo en un auditorio de CESI' },
        { src: '/images/cesi-team.webp', alt: 'Eduardo trabajando con su equipo de proyecto alrededor de una mesa con notebooks' },
        { src: '/images/cesi.webp', alt: 'Eduardo frente al cartel de CESI École d’Ingénieurs' },
      ],
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'B1' },
    { name: 'Francés', level: 'A2' },
  ],
  tech: { data: 'Datos', software: 'Software e infraestructura' },
  contact: {
    title: 'Hablemos.',
    intro: 'Estoy abierto a oportunidades en Data Engineering y a conversar sobre proyectos de datos y software.',
  },
}
