# eduramirez.dev

Personal portfolio and CV system of Eduardo M. Ramírez — a static site in English and Spanish, with light and dark themes, plus A4 CVs generated from the same data: a complete general one (up to 2 pages, linked from the site) and one-page variants for specific roles.

## Pages

| Page | English | Spanish |
|---|---|---|
| One-page portfolio: solutions, projects, experience and contact | `/` | `/es/` |
| General CV download | `/cv/en` | `/cv/es` |

The URL decides language. Both versions start with solutions followed by projects. The build writes HTML with localized metadata. Only the general CV is linked publicly; role-specific PDFs are shared through `/cv/fs/{en,es}`, `/cv/backend/{en,es}` and `/cv/data/{en,es}`. Cloudflare serves these short URLs through `public/_redirects`; `public/_headers` excludes CVs from search indexing. Former services URLs redirect to the solutions section.

## Stack

React, TypeScript, Vite and Tailwind CSS. No backend, no database: the build output is plain static files. Inter is self-hosted (`@fontsource/inter`). Playwright (dev only) prints the CVs.

## Where the content lives

**Professional data — single source for the portfolio and the CVs (`src/data/`).** Every fact is written once, with its English and Spanish text side by side (`{ en, es }`); dates are `YYYY-MM` and formatted per language.

- `site.ts` — name, headline, two-line summary, location, email and profile links
- `experience.ts` — jobs; bullets have website text and optional concise `cvText`. `cvOnly` keeps Service BIAMAQ in the CVs without displaying it on the website.
- `projects.ts` — every project: summary, case study (problem, solution, role, today), status, highlights, screenshots, stack, links and a one-line `cv` text
- `education.ts` — UTN and the CESI exchange
- `skills.ts` — skill groups and spoken languages
- `certifications.ts` — only those with a public `url` are shown
- `cv.ts` — general CV and three role-specific variants (headline, summary, bullet order, side projects, skill groups and certifications)
- `types.ts` — the shapes of all of the above; `localize.ts` — `t()` and date helpers

**Interface and marketing texts (`src/content/en.ts`, `es.ts`).** Labels, page metadata, the services page copy. Both implement `Content` (`types.ts`), so a missing translation fails the build.

**Visual identity (`src/components/hero/`).** The drifting sketches, the Argentina map, the dust canvas and the shuffle button. `pageSlots.ts` ties each sketch spot to a section of each page (`#project-reports`, `#experience`, `#cv-preview`…): if you rename a section id, update its spots there.

## CVs

```bash
npm run cv          # writes public/cv/{general,fs,backend,data}-{en,es}.pdf and checks them
npm run cv:check    # only checks the existing PDFs
```

`scripts/cv.mjs` renders `src/cv/CvDocument.tsx` through Vite's SSR, prints it with Playwright's Chromium and checks every file: one A4 page, selectable text, clickable links. If the content is taller than the page it fails instead of shrinking the type — shorten the CV text in `src/data/`. `node scripts/cv.mjs --png <dir>` also saves screenshots for review.

After editing anything in `src/data/`, run `npm run cv` and commit the PDFs. `npm run build` runs `cv:check`, so a missing or broken PDF stops the deploy. The PDFs aren't generated on Cloudflare Pages (that would need a browser download on every build).

First time only: `npx playwright install chromium-headless-shell`. Alternatively set `CV_BROWSER_CHANNEL=msedge` or `chrome` to use an installed browser (PowerShell: `$env:CV_BROWSER_CHANNEL='msedge'`).

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
npm run build     # type-check + build into dist/ + CV check
npm run preview   # serve dist/ locally
```

## Deployment

Cloudflare Pages, connected to this repository. Every push to `main` triggers a new build (`npm run build`, output `dist`). Old CV URLs redirect to the new files (`public/_redirects`).

## Missing data

Things the CV and the site leave out until they're confirmed:

- **UTN:** start year and expected graduation date (shown as "Final year in progress").
- **CESI:** exact dates. The old CVs disagreed (Jan–Jun vs Jan–Jul 2026); shown as "Spring semester 2026".
- **Availability:** remote / relocation / contractor, and whether to show it on the CV.
- **Freelance:** Malaca and Casa Palma are client projects with no dates; a "Freelance" entry in the experience would need them.
- **Results:** Sales uses ~40% offline hit@3 versus ~20% for best sellers, not sales growth. Administrative automation uses the author's estimate of 8 to 2 hours (75% less manual time).
- **Certifications without a public link** (UTN Testing, Argentina Programa 2022) are hidden until there's a verification URL.
- **Last.fm status:** shown as "Public repository"; say if it's still active.
- **RentalIA screenshots** still show the old "RentOS" name in the interface.
