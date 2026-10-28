# eduramirez.dev

Personal portfolio of Eduardo M. Ramírez — a static site in English and Spanish, with light and dark themes.

## Pages

| Page | English | Spanish |
|---|---|---|
| Home (portfolio) | `/` | `/es/` |
| Services for companies | `/services` | `/es/servicios` |

The URL decides the language, so a Spanish link can be shared directly. The build writes one HTML file per route with its own `lang`, title, description, canonical, `hreflang` and Open Graph tags (`src/head.ts`, `vite.config.ts`); the app reads the route from the URL (`src/route.ts`).

## Stack

React, TypeScript, Vite and Tailwind CSS. No backend; the build output is plain static files.

## Editing content

Translatable text lives in `src/content/`:

- `en.ts` / `es.ts` — every visible text, one file per language. Both implement the `Content` type in `types.ts`, so a missing translation fails the build.
- `index.ts` — available languages and the default one (English, used for unknown URLs).

Non-translatable data lives in `src/data/`:

- `site.ts` — name, links, email, portrait and CV paths (empty values are hidden)
- `projects.ts` — order, stack and links of the project cards
- `tech.ts` — tech list

Images are in `public/images/`. `public/og.png` is the link preview image; `public/sitemap.xml` lists the four routes.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # type-check + build into dist/
npm run preview   # serve dist/ locally
```

## Deployment

Deployed on Cloudflare Pages, connected to this repository. Every push to `main` triggers a new build.

- Build command: `npm run build`
- Output directory: `dist`
