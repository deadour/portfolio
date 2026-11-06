import { renderToStaticMarkup } from 'react-dom/server'
import CvDocument from './CvDocument'
import { languages, type Lang } from '../content'
import { cvPath, cvProfiles, cvVariants } from '../data/cv'
import { t } from '../data/localize'
import { site } from '../data/site'
import type { CvProfile } from '../data/types'

// Entry point for the PDF generator (scripts/cv.mjs), loaded through Vite's SSR.

export { cvProfiles, languages, cvPath }

export function renderCv(profile: CvProfile, lang: Lang, photo?: string) {
  return renderToStaticMarkup(<CvDocument profile={profile} lang={lang} photo={photo} />)
}

// Becomes the PDF's title.
export function cvTitle(profile: CvProfile, lang: Lang) {
  return `${site.name} — CV · ${t(cvVariants[profile].headline, lang)}`
}
