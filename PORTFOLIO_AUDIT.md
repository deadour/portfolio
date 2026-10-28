# Auditoría de eduramirez.dev

Fecha: octubre 2026 · Alcance: repositorio `deadour/portfolio` (rama `main` @ `119ea93`), build local y navegación con Playwright (escritorio 1440×900 y móvil 390×844, ES/EN, tema claro y oscuro).

> El sitio en producción (`https://eduramirez.dev`) no fue accesible desde el entorno de auditoría (la red saliente lo bloquea). Todo lo observado proviene del build local, que es el mismo código que despliega Cloudflare Pages.

---

## 1. Diagnóstico en una línea

El diseño es bueno y conviene conservarlo. El problema no es visual sino de **mensaje y estructura**: el sitio le habla solo a un reclutador de Data Engineering, no tiene propuesta para empresas, el proyecto destacado es personal en vez de los sistemas que están en uso real, y el español no tiene URL propia (no se puede mandar un link en español a una pyme).

---

## 2. Lo que hay hoy

| Aspecto | Estado |
|---|---|
| Stack | React 19 + TypeScript + Vite 8 + Tailwind 4. Sin router ni backend. Única dependencia extra: `simple-icons`. |
| Estructura | Una sola página (SPA): Hero → About → Selected work → Experience → Education (+ idiomas) → Tech → Certifications → Contact. |
| i18n | `src/content/en.ts` y `es.ts` tipados contra `Content` (si falta una traducción, falla el build). Idioma guardado en `localStorage`; inglés por defecto; **sin URL por idioma**. |
| Proyectos | Last.fm Data Platform (destacado), BIAMAQ Reports, RENT-OS, Malaca, Dynamo, Chedul, Diabetes DL (CESI), Classroom Noise Monitor (CESI). |
| Calidad | Build limpio, **0 errores de consola**, 0 imágenes sin `alt`, sin scroll horizontal en móvil. |
| Rendimiento (local) | LCP ≈ 0,6 s escritorio / 0,35 s móvil. Primera carga ≈ 1,1 MB escritorio (720 KB son bocetos de fondo) y ≈ 1 MB móvil. JS: 360 KB (131 KB gzip). |
| Altura de página | ≈ 8.900 px en escritorio, ≈ 9.800–10.100 px en móvil. |

**No existen en el repositorio:** "RentalIA", "BIAMAQ Intelligence" ni "Casa Palma". El sistema de alquileres se llama **RENT-OS** en el sitio. Ver sección 9 (información faltante).

---

## 3. Fortalezas que conviene conservar

1. **Identidad visual sobria y propia.** Inter, paleta neutra con acento verde azulado (`#0f6e64` / `#6fc9b8`), grano sutil, bocetos de tipo plano técnico y el mapa de Argentina con la ubicación. Transmite ingeniería y personalidad sin caer en la estética de landing genérica.
2. **Grilla de secciones** con el título fijo a la izquierda (`Section.tsx`). Buena jerarquía y lectura tipo documento.
3. **Honestidad ya incorporada en el contenido:** badges "Internal production system" / "In development", notas "Screens shown with sample data". Esto es exactamente el tono de credibilidad que buscás.
4. **Evidencia visual real**: capturas de BIAMAQ Reports, RENT-OS, Malaca, Chedul y Dynamo con datos de ejemplo, lightbox, y el diagrama de pipeline de Last.fm.
5. **Arquitectura de contenido limpia**: textos separados de componentes, tipos que obligan a traducir todo. Se puede extender sin duplicar lógica.
6. **Buena base de accesibilidad**: skip link, `aria-pressed` en el selector de idioma, `:focus-visible`, `prefers-reduced-motion`, alt descriptivos, contraste de texto correcto (muted ≈ 5:1 sobre el fondo).
7. **Tema claro/oscuro sin parpadeo** (script inline antes del primer paint).
8. **Contacto directo**: email grande + botón copiar. Sin formulario. Correcto.

---

## 4. Problemas detectados (priorizados)

### P0 — Afectan directamente a conseguir clientes o entrevistas

1. **No hay propuesta para empresas.** El hero dice "Data Engineer · Systems Engineering" y el contacto dice "abierto a oportunidades en Data Engineering". Un gerente de pyme que llega desde un email no encuentra qué problemas resolvés ni cómo empezar una conversación.
2. **El proyecto destacado es personal (Last.fm).** Es un gran proyecto técnico, pero lo primero que se ve después del About es tu historial de música, mientras que BIAMAQ Reports (en producción interna) y RENT-OS (con landing pública) quedan debajo. Para ambos públicos, la evidencia más fuerte es lo que corre en operaciones reales.
3. **El español no es enlazable.** El idioma vive solo en `localStorage`. `https://eduramirez.dev` siempre abre en inglés para quien llega por primera vez; no existe `/es/`. Esto bloquea las campañas a empresas argentinas.
4. **Los proyectos se leen como listas técnicas.** El resumen está bien, pero falta una estructura explícita de **problema → mi rol → solución → resultado → estado**. El contenido de "How it's built" es casi todo stack.
5. **Título profesional inconsistente** entre fuentes:
   - Sitio: "IT Lead & Data Engineer"
   - CV PDF: "Backend & Data Engineer / Project Manager" y "Information Systems Engineering Student | Data Engineer"
   - Tu brief: "desarrollador de software".
   Un reclutador que compara web, CV y LinkedIn nota la diferencia.

### P1 — SEO, compartibilidad y navegación

6. **Metadatos pobres para compartir:** sin `og:image`, `twitter:card=summary` (tarjeta chica), `og:description` genérica ("Data Engineering and software projects by…"). Un link pegado en LinkedIn, WhatsApp o un email se ve vacío.
7. **SEO de una SPA sin prerender:** el HTML entregado tiene `<div id="root"></div>` y un `<noscript>`. Título y descripción en español solo se aplican con JS (y el `<title>` en ES sigue diciendo "Data Engineer" en inglés). Sin `robots.txt`, sin `sitemap.xml`, sin `hreflang`, sin datos estructurados (`Person`).
8. **En móvil no hay navegación.** El `<nav>` está oculto (`hidden sm:block`) y no hay reemplazo. Con ~10.000 px de página, llegar a Contacto o a Experiencia en el teléfono es scroll puro.
9. **"Now · Octubre 2026" se calcula con la fecha del navegador.** El texto es manual pero el mes se actualiza solo: si el texto queda viejo, el sitio afirma algo desactualizado con fecha de hoy.

### P2 — Pulido

10. **Certificaciones:** la primera destacada es "Power BI: Desde cero para principiantes". Para un perfil que quiere verse sólido, un curso introductorio destacado resta más de lo que suma. Conviene destacar las de datos/ML y dejar el resto en "Mostrar más".
11. **Jerarquía de headings:** dentro de "Selected work" los rótulos de grupo ("Professional work") y los títulos de proyecto son ambos `h3`, y "Academic projects" es `h4` hermano de `h3`. Menor, pero afecta lectores de pantalla.
12. **Objetivos táctiles chicos:** botones EN/ES (~28 px) y tema/shuffle (32 px). Cumplen AA (24 px) pero quedan justos en móvil; ideal ≥ 40 px.
13. **Higiene del repo:** `scratch_merge.py`, `scratch_process3.py`, `scratch_smart.py` versionados en la raíz.
14. **Fondo decorativo:** ~720 KB de bocetos en la primera carga de escritorio. No afecta el LCP (0,6 s) pero es la mayor parte del peso. Se puede diferir sin perder la identidad.
15. **Google Fonts externo**: una dependencia de render bloqueante más; autoalojar Inter (una sola fuente variable) es simple.

---

## 5. Mejoras priorizadas

| # | Mejora | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Nuevo hero con propuesta de valor + CTAs "Ver proyectos / Servicios / Contacto / CV" | Alto | Bajo |
| 2 | Reordenar proyectos: trabajo profesional primero, Last.fm como primer proyecto personal | Alto | Bajo |
| 3 | Estructura de caso de estudio en cada proyecto profesional (problema, rol, solución, resultado, estado) | Alto | Medio |
| 4 | Sección **Servicios** (3 categorías) en el inicio + página `/servicios` enlazable | Alto | Medio |
| 5 | URLs por idioma: `/` (EN) y `/es/` (ES), con meta por idioma y `hreflang` | Alto | Medio |
| 6 | Contacto con dos intenciones (empresas / reclutadores) | Alto | Bajo |
| 7 | `og:image` 1200×630, `summary_large_image`, descripciones reales, JSON-LD `Person`, `robots.txt`, `sitemap.xml` | Medio | Bajo |
| 8 | Navegación móvil (fila compacta de enlaces bajo el header) | Medio | Bajo |
| 9 | Unificar título profesional en web, CV y LinkedIn | Medio | Bajo (tuyo) |
| 10 | "Now" con mes escrito en el contenido, no calculado | Bajo | Bajo |
| 11 | Certificaciones relevantes primero | Bajo | Bajo |
| 12 | Headings, tap targets, quitar scratch scripts, diferir bocetos, autoalojar Inter | Bajo | Bajo |
| 13 | Prerender del HTML por ruta (SEO completo sin dependencias nuevas) | Medio | Medio-alto |

---

## 6. Nueva estructura sugerida

No es un rediseño: es la misma página con orden y mensajes nuevos, más una ruta de servicios.

```
/            (EN)   /es/          (ES)
  Header: logo · Projects · Services · Experience · Contact · EN|ES · tema
  1. Hero          nombre, título, propuesta de valor, ubicación, CTAs
  2. About         2 párrafos: quién soy + cómo trabajo (procesos → sistemas)
  3. Projects      Trabajo profesional (casos de estudio)
                     BIAMAQ Reports · RENT-OS · [BIAMAQ Intelligence — en desarrollo]
                     Malaca · [Casa Palma]
                   Proyectos personales y de equipo
                     Last.fm Data Platform · Chedul · Dynamo
                   Académicos (compactos, como hoy)
  4. Services      3 bloques breves → "Ver servicios en detalle" (/servicios)
  5. Experience
  6. Education + idiomas
  7. Tech
  8. Certifications (relevantes primero)
  9. Contact       empresas / reclutadores, email, LinkedIn, GitHub, CV

/services    (EN)   /es/servicios (ES)
  Intro corta · 3 servicios (problemas habituales, qué hago, ejemplo real)
  · Cómo trabajo (4 pasos) · Contacto
```

**Por qué una página de servicios además de la sección:** para las campañas por email conviene un link directo (`eduramirez.dev/es/servicios`) que vaya al grano, sin obligar a un gerente a pasar por el historial académico. La sección en el inicio mantiene el sitio como una sola historia para el reclutador.

**Casos de estudio:** propongo empezar **dentro de las tarjetas actuales** (un bloque "Problema / Mi rol / Solución / Resultado / Estado" encima de "How it's built"), sin páginas individuales. Si más adelante un caso crece, se le da ruta propia.

---

## 7. Propuestas de copy

Reglas aplicadas: sin superlativos, sin "transformamos/impulsamos", primera persona, cada afirmación respaldada por algo visible en el sitio. Lo que está entre `[corchetes]` depende de datos que tenés que confirmar.

### 7.1 Hero

**ES**
- Título: `Software · Datos · IA aplicada`
- Bajada: `Desarrollo software, integro sistemas empresariales y automatizo procesos para que las empresas aprovechen mejor sus datos. Desde 2023 construyo y mantengo los sistemas internos de BIAMAQ, una empresa de maquinaria industrial con 3 sucursales.`
- CTAs: `Ver proyectos` · `Servicios para empresas` · `Contacto` · `Descargar CV`

**EN**
- Title: `Software Engineering · Data Engineering · Applied AI`
- Tagline: `I build backend systems, data pipelines and internal tools around real business operations. Since 2023 I've designed and run the internal systems of BIAMAQ, an industrial machinery company with 3 branches: ERP integrations, a data warehouse, management reporting and an equipment rental platform.`
- CTAs: `View projects` · `Services` · `Contact` · `Download CV`

> Sobre "Applied AI": hoy la evidencia visible es un proyecto académico (Diabetes DL, CESI) y BIAMAQ Intelligence en desarrollo. Recomiendo mantenerlo como tercer término, no como el principal, hasta que haya un caso de IA aplicada mostrable. Para postular a roles "AI Engineer", ese caso es lo que más falta.

### 7.2 About

**ES**
1. `Trabajo en BIAMAQ desde 2023. Empecé resolviendo problemas puntuales de sistemas y hoy me ocupo de punta a punta de su infraestructura, sus datos y su software: integraciones con el ERP, un data warehouse, reportes de gestión y la reingeniería de los módulos de Alquileres y Servicio Técnico.`
2. `Me interesa entender cómo funciona el negocio antes de escribir código: qué se carga dos veces, qué reporte se arma a mano, qué decisión se toma sin datos. Ahí es donde un buen sistema hace diferencia. Estoy terminando Ingeniería en Sistemas de Información en la UTN y en 2026 cursé un semestre del máster en Data Science de CESI (Francia) con beca ARFITEC.`

**EN**
1. `I've worked at BIAMAQ since 2023. I started by fixing specific systems problems and now own its infrastructure, data and software end to end: ERP integrations, a data warehouse, management reporting, and the re-engineering of the Rental and Technical Service modules.`
2. `I like to understand how a business runs before writing code: what gets entered twice, which report is built by hand, which decision is made without data. That's where a well-built system makes a difference. I'm finishing Information Systems Engineering at UTN, and in 2026 I spent a semester of CESI's Data Science master's programme in France on an ARFITEC scholarship.`

### 7.3 Servicios

Intro **ES**: `Trabajo con empresas que ya tienen sistemas y datos, pero procesos que dependen de planillas, cargas manuales o información que no cierra. No vendo paquetes: primero entiendo el problema y después propongo la solución más simple que lo resuelva.`

Intro **EN**: `I work with companies that already have systems and data, but processes that still depend on spreadsheets, manual data entry or numbers that don't add up. No packages: I first understand the problem, then propose the simplest solution that solves it.`

**A. Integración y automatización** / *Integration & automation*
- Problemas habituales: `La misma información se carga en dos sistemas.` · `El ERP no se comunica con otras herramientas.` · `Un reporte semanal se arma a mano en Excel.`
- Qué hago: `Integraciones con ERP y APIs, sincronización entre SQL Server, PostgreSQL y Excel, procesos programados y exportaciones automáticas.`
- Ejemplo real: `En BIAMAQ, extractores en Python cargan diariamente los datos del ERP (SQL Server) en un data warehouse que alimenta los reportes de gestión de las 3 sucursales.`

**B. Datos e IA aplicada** / *Data engineering & applied AI*
- Problemas: `Los datos existen, pero cada área tiene su propio número.` · `Un catálogo de miles de productos con descripciones incompletas o inconsistentes.` · `Las decisiones comerciales se toman sin mirar el historial.`
- Qué hago: `Pipelines y data warehouses, tableros de gestión (Power BI o web), limpieza y enriquecimiento de catálogos, clasificación y recomendaciones basadas en datos propios.`
- Ejemplo real: `BIAMAQ Reports (en producción interna).` [+ `BIAMAQ Intelligence, en desarrollo: enriquecimiento de un catálogo de ~20.000 productos.` — solo si confirmás que se puede mencionar]

**C. Software a medida** / *Custom business software*
- Problemas: `Un proceso clave vive en planillas y depende de una persona.` · `El sistema actual no cubre cómo trabaja realmente la empresa.`
- Qué hago: `Aplicaciones internas, gestión comercial, inventario, alquileres y herramientas operativas, con despliegue y mantenimiento.`
- Ejemplo real: `RENT-OS: el ciclo completo de alquiler de equipos, desde la reserva y el contrato firmado hasta la devolución y la facturación electrónica.` [+ Casa Palma]

**Cómo empezar** (ES): `Escribime contando qué proceso querés mejorar y qué sistemas usan hoy. La primera conversación es para entender el problema; si no soy la persona indicada, te lo digo.`
(EN): `Email me what process you want to improve and which systems you use today. The first conversation is about understanding the problem; if I'm not the right person for it, I'll tell you.`

### 7.4 Contacto

**ES**
- Título: `Hablemos.`
- `¿Un proceso que depende de planillas, o datos que no cierran? Contame qué sistemas usan y lo vemos.`
- `Si sos reclutador: estoy abierto a posiciones remotas de Backend o Data Engineering.`

**EN**
- `Let's talk.`
- `Hiring for a Backend or Data Engineering role? I'm open to remote positions [and relocation].`
- `Running a business with a process that still lives in spreadsheets? Tell me which systems you use.`

(En inglés va primero el reclutador; en español, la empresa.)

### 7.5 Caso de estudio (ejemplo: BIAMAQ Reports, ES)

- **Problema:** `La gerencia seguía ventas, compras, cobranzas y taller con reportes armados a mano a partir del ERP.` [confirmar]
- **Mi rol:** `Diseño, desarrollo, despliegue y mantenimiento, de punta a punta.`
- **Solución:** `Extractores en Python que cargan el ERP (SQL Server) en un data warehouse, una API en Django REST Framework y un frontend en React.`
- **Resultado:** `En uso interno por la gerencia de las 3 sucursales.` [agregar solo resultados que puedas verificar: frecuencia de actualización, reportes que dejaron de hacerse a mano, cantidad de usuarios]
- **Estado:** `En producción interna.`

### 7.6 Metadatos

- EN title: `Eduardo M. Ramírez — Backend & Data Engineer`
- EN description: `Software, data engineering and applied AI. I build ERP integrations, data pipelines and internal business systems. Based in Argentina, working remotely.`
- ES title: `Eduardo M. Ramírez — Desarrollo de software, datos e integraciones`
- ES description: `Desarrollo software a medida, integro sistemas empresariales (ERP, SQL Server) y automatizo procesos con datos. Resistencia, Chaco · trabajo remoto.`
- Servicios ES: `Servicios para empresas — Eduardo M. Ramírez` / `Integración con ERP, automatización de procesos, datos e IA aplicada y software empresarial a medida.`

---

## 8. Cambios técnicos necesarios

Sin dependencias nuevas.

1. **Rutas mínimas sin librería** (`src/route.ts`): leer `location.pathname` y resolver `{ lang, page }` para `/`, `/es/`, `/services`, `/es/servicios`. El selector EN|ES navega a la ruta equivalente. `localStorage` deja de decidir el idioma (la URL manda); se respeta la decisión actual de no detectar por navegador.
2. **HTML por ruta en el build**: script post-build que copia `dist/index.html` a `dist/es/index.html`, `dist/services/index.html` y `dist/es/servicios/index.html`, reemplazando `lang`, `<title>`, description, OG, canonical y `hreflang`. Así cada link compartido tiene su preview correcto sin prerender completo.
3. **`public/robots.txt`, `public/sitemap.xml`, `public/og.png`** (1200×630, generado con la tipografía y paleta del sitio, sin fotos de stock) y JSON-LD `Person` en `index.html`.
4. **Tipos de contenido** (`types.ts`): agregar a `ProjectText` un bloque opcional `caseStudy: { problem, role, solution, outcome, status }`; nuevo bloque `services` en `Content`; `hero` con CTAs nuevos; `contact` con dos párrafos; `now` con el mes en el texto.
5. **Componentes**: reutilizar `Section`, `ProjectCard`, `Disclosure`. Nuevos: `Services.tsx` (sección y página comparten el mismo componente con una prop `detailed`) y `CaseStudy.tsx` (lista de definición pequeña dentro de la tarjeta).
6. **`projects.ts`**: nuevo orden; `group: 'professional'` primero; Last.fm pasa a primer proyecto personal (sigue siendo destacado visualmente dentro de su grupo si querés).
7. **Header móvil**: mostrar los enlaces en una segunda fila con scroll horizontal en `< sm`.
8. **Accesibilidad**: corregir niveles de headings en Work; tap targets ≥ 40 px.
9. **Limpieza**: quitar `scratch_*.py` de la raíz (o moverlos a `scripts/` si los seguís usando).
10. **Opcional / fase 2**: diferir la carga de los bocetos de fondo hasta después del primer paint; autoalojar Inter; prerender del body con `vite build --ssr` + `renderToString` (requiere proteger los usos de `window`/canvas).
11. **Cloudflare Pages**: con HTML físico por ruta no hace falta configuración extra; agregar `public/404.html` simple.

No hay suite de tests en el repo; la verificación será `npm run build` (incluye `tsc`) + Playwright en escritorio y móvil, ES/EN, claro/oscuro.

---

## 9. Información faltante (necesaria antes de redactar afirmaciones)

1. **RentalIA vs RENT-OS.** El repo y la landing pública (`alquileres.biamaq.com.ar/landing/`) usan **RENT-OS**. ¿Es el mismo sistema? ¿Qué nombre usamos?
2. **RENT-OS:** ¿está en producción en BIAMAQ? ¿Lo usa alguna otra empresa? La landing ofrece planes (Essential / Professional / Enterprise): ¿es un producto tuyo, de BIAMAQ o compartido? ¿Tenés autorización para presentarlo como producto?
3. **BIAMAQ Intelligence:** no está en el repo. ¿Qué está implementado hoy y qué es plan? ¿Se puede nombrar públicamente y mostrar capturas con datos ficticios? ¿El "~20.000 productos" se puede publicar?
4. **Casa Palma:** no está en el repo. ¿Es un cliente real? ¿Puedo usar el nombre? ¿Estado (producción / desarrollo)? ¿Capturas, URL o repo?
5. **Malaca:** figura "In development". ¿Sigue así o ya está publicada? ¿URL?
6. **Título profesional** a unificar en web, CV y LinkedIn. Mi recomendación: **"Backend & Data Engineer"** (cubre ambos públicos y coincide con tu experiencia real). ¿"IT Lead" lo querés mantener en la entrada de experiencia?
7. **Resultados verificables** de BIAMAQ que se puedan publicar sin exponer datos privados (ej.: reportes que dejaron de hacerse a mano, frecuencia de actualización, cantidad de usuarios). Si no hay ninguno confirmado, los casos se redactan sin resultado cuantitativo.
8. **Disponibilidad:** remoto full-time, contractor, ¿relocalización? ¿Facturás como independiente en Argentina (para clientes locales)?
9. **Contacto para pymes:** ¿querés sumar WhatsApp? En Argentina suele ser el canal que más responde; es opcional.

---

## 10. Plan de implementación propuesto

1. Contenido y tipos (hero, about, contacto, servicios, casos de estudio) en ES y EN.
2. Reorden de proyectos + `CaseStudy` en tarjetas profesionales.
3. Sección y página de Servicios.
4. Rutas por idioma, HTML por ruta, metadatos, OG, sitemap, robots.
5. Navegación móvil, accesibilidad, limpieza.
6. Verificación: build + Playwright (escritorio/móvil, ES/EN, claro/oscuro) con capturas antes/después.

Sin deploy hasta tu autorización (cada push a `main` despliega en Cloudflare Pages; trabajo en una rama aparte).
