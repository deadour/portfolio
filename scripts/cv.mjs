// Generates the CV PDFs (every profile × language) into public/cv/.
//
//   npm run cv
//
// 1. Vite's SSR loads src/cv/render.tsx and renders <CvDocument> to static HTML: the same
//    component and data the /cv page shows.
// 2. Playwright's Chromium prints it to an A4 PDF with selectable text and working links.
// 3. Every PDF is checked: one A4 page, links, real text (scripts/check-cv.mjs).
// If the content doesn't fit one page the script fails instead of shrinking the type:
// shorten the texts in src/data/ instead.

import { readFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { chromium } from 'playwright'
import { LANGS, PROFILES, checkAll, cvFile } from './check-cv.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// `--png <dir>`: also save a screenshot of each CV (whole content, even past the page) for review.
const pngIndex = process.argv.indexOf('--png')
const pngDir = pngIndex > 0 ? path.resolve(process.argv[pngIndex + 1]) : null

async function fontFaces() {
  const dir = path.join(root, 'node_modules', '@fontsource', 'inter', 'files')
  const faces = await Promise.all(
    [400, 500, 600, 700].map(async (weight) => {
      const data = await readFile(path.join(dir, `inter-latin-${weight}-normal.woff2`))
      return `@font-face{font-family:'Inter';font-style:normal;font-weight:${weight};src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');}`
    }),
  )
  return faces.join('\n')
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

const server = await createServer({
  root,
  configFile: false,
  plugins: [react()],
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false },
})

let browser
try {
  const cv = await server.ssrLoadModule('/src/cv/render.tsx')
  if (cv.cvProfiles.join() !== PROFILES.join() || cv.languages.join() !== LANGS.join()) {
    throw new Error('scripts/check-cv.mjs PROFILES/LANGS are out of sync with src/data/cv.ts and src/content/')
  }
  // The portrait goes inline, since the page is loaded from a string.
  const photo = `data:image/webp;base64,${(await readFile(path.join(root, 'public', 'images', 'portrait.webp'))).toString('base64')}`
  const css = (await readFile(path.join(root, 'src', 'cv', 'cv.css'), 'utf8')) + '\n' + (await fontFaces())

  browser = await chromium.launch()
  const page = await browser.newPage()
  await mkdir(path.join(root, 'public', 'cv'), { recursive: true })

  const overflows = []
  for (const profile of PROFILES) {
    for (const lang of LANGS) {
      const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escape(cv.cvTitle(profile, lang))}</title><style>${css}\nhtml,body{margin:0;background:#fff}</style></head><body>${cv.renderCv(profile, lang, photo)}</body></html>`
      await page.setContent(html, { waitUntil: 'load' })
      await page.evaluate(() => document.fonts.ready)
      // The page is a fixed A4 box: anything taller would be cut, so stop instead.
      const fit = await page.evaluate(() => {
        const el = document.querySelector('.cv')
        return { content: el.scrollHeight, page: el.clientHeight }
      })
      if (pngDir) {
        await mkdir(pngDir, { recursive: true })
        await page.addStyleTag({ content: '.cv{height:auto;min-height:297mm;outline:1px solid red}' })
        await page.locator('.cv').screenshot({ path: path.join(pngDir, `${profile}-${lang}.png`) })
        await page.addStyleTag({ content: '.cv{height:297mm;outline:none}' })
      }
      if (fit.content > fit.page + 1) overflows.push(`${profile}-${lang}: content is ${fit.content - fit.page}px taller than the page`)
      await page.pdf({
        path: cvFile(profile, lang),
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        tagged: true,
      })
    }
  }

  const problems = [...overflows, ...(await checkAll())]
  if (problems.length) {
    console.error(`\nCV generation failed:\n- ${problems.join('\n- ')}`)
    process.exitCode = 1
  } else {
    console.log('All CVs generated and checked.')
  }
} finally {
  await browser?.close()
  await server.close()
}
