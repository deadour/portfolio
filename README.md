# eduramirez.dev

Personal portfolio of Eduardo M. Ramírez — a single static page in English and Spanish, with light and dark themes.

## Stack

React, TypeScript, Vite and Tailwind CSS. No backend; the build output is plain static files.

## Editing content

Translatable text lives in `src/content/`:

- `en.ts` / `es.ts` — every visible text, one file per language. Both implement the `Content` type in `types.ts`, so a missing translation fails the build.
- `index.ts` — available languages and the default one (English).

Non-translatable data lives in `src/data/`:

- `site.ts` — name, links, email, portrait and CV paths (empty values are hidden)
- `projects.ts` — order, stack and links of the project cards
- `tech.ts` — tech list

Images are in `public/images/`.

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
