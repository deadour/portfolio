// Checks the published CVs in public/cv/: all of them exist, and each one fits its page limit on A4
// with real (selectable) text and clickable links. No dependencies: it reads the PDF structure.
// Runs after `npm run cv` and as part of `npm run build`.
//
//   node scripts/check-cv.mjs

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Must match cvProfiles in src/data/cv.ts and the languages in src/content/ (scripts/cv.mjs asserts it).
export const PROFILES = ['general', 'fs', 'backend', 'data']
export const LANGS = ['en', 'es']
// Pages each profile may take (maxPages in src/data/cv.ts); any profile not listed must be one page.
export const MAX_PAGES = { general: 2, fs: 1, backend: 1, data: 1 }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const cvFile = (profile, lang) => path.join(root, 'public', 'cv', `${profile}-${lang}.pdf`)

// A4 is 595.28 × 841.89 pt; Chromium rounds to whole CSS pixels.
const A4 = { w: 595.28, h: 841.89, tolerance: 2 }

export async function inspectPdf(file) {
  const raw = (await readFile(file)).toString('latin1')
  const pages = raw.match(/\/Type\s*\/Page(?![s\w])/g)?.length ?? 0
  const box = raw.match(/\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/)
  const width = box ? Number(box[3]) - Number(box[1]) : NaN
  const height = box ? Number(box[4]) - Number(box[2]) : NaN
  return {
    pages,
    width,
    height,
    a4: Math.abs(width - A4.w) <= A4.tolerance && Math.abs(height - A4.h) <= A4.tolerance,
    links: raw.match(/\/URI\s*\(/g)?.length ?? 0,
    // Embedded fonts with a Unicode map: the text can be selected, searched and parsed.
    text: /\/ToUnicode/.test(raw) && !/\/Subtype\s*\/Type3/.test(raw),
    kb: Math.round(raw.length / 1024),
  }
}

export async function checkAll({ log = console.log } = {}) {
  const problems = []
  for (const profile of PROFILES) {
    for (const lang of LANGS) {
      const file = cvFile(profile, lang)
      const name = path.relative(root, file).replaceAll('\\', '/')
      let info
      try {
        info = await inspectPdf(file)
      } catch {
        problems.push(`${name}: missing (run npm run cv)`)
        continue
      }
      const issues = [
        (info.pages < 1 || info.pages > MAX_PAGES[profile]) && `${info.pages} pages (max ${MAX_PAGES[profile]})`,
        !info.a4 && `not A4 (${info.width}×${info.height} pt)`,
        info.links === 0 && 'no links',
        !info.text && 'text is not selectable',
      ].filter(Boolean)
      if (issues.length) problems.push(`${name}: ${issues.join(', ')}`)
      log(
        `${issues.length ? '✗' : '✓'} ${name} — ${info.pages} page${info.pages === 1 ? '' : 's'}, ${info.width.toFixed(1)}×${info.height.toFixed(1)} pt, ${info.links} links, ${info.kb} KB`,
      )
    }
  }
  return problems
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const problems = await checkAll()
  if (problems.length) {
    console.error(`\nCV check failed:\n- ${problems.join('\n- ')}`)
    process.exit(1)
  }
  console.log('CV check passed.')
}
