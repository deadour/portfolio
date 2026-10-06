# eduramirez.dev

Personal portfolio of Eduardo M. Ramírez — a single static page with projects, experience and contact links.

## Stack

React, TypeScript, Vite and Tailwind CSS. No backend; the build output is plain static files.

## Editing content

All content lives in `src/data/`:

- `site.ts` — name, title, GitHub / LinkedIn / email (empty values are hidden)
- `projects.ts` — project cards (`pending: true` marks a card still to be written)
- `experience.ts` — experience entries
- `tech.ts` — tech list

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

Any static host works. With Cloudflare Pages, Netlify or Vercel:

- Build command: `npm run build`
- Output directory: `dist`

Then add `eduramirez.dev` as a custom domain in the host's dashboard and point the DNS records it shows.
