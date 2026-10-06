# eduramirez.dev

Personal portfolio of Eduardo M. Ramírez — a single static page in English and Spanish, with light and dark themes.

## Stack

React, TypeScript, Vite and Tailwind CSS. No backend; the build output is plain static files.

## Editing content

All content lives in `src/data/`. Every text has an `en` and an `es` version.

- `site.ts` — name, title, about text, GitHub / LinkedIn / email (empty values are hidden)
- `projects.ts` — project cards (`pending: true` marks a card still to be written)
- `experience.ts` — experience and education entries
- `tech.ts` — tech list
- `ui.ts` — interface labels

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

Every push to `main` builds and deploys the site to GitHub Pages (`.github/workflows/deploy.yml`). Pull requests only run the build.

One-time setup:

1. Repository **Settings → Pages → Source**: select **GitHub Actions**.
2. On the same page, set the custom domain to `eduramirez.dev` and enable **Enforce HTTPS**.
3. In the DNS provider, add a `CNAME` record for `@` pointing to `deadour.github.io` (on Cloudflare, set it to *DNS only*).
