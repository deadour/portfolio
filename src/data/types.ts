// Shared shapes of the professional data in src/data/. This data is the single source for
// both the portfolio and the CVs: every fact (dates, roles, stacks, descriptions) is written once,
// with its Spanish and English text side by side.

import type { Lang } from '../content'

// A text in both languages. Plain strings are for names that read the same in both (e.g. "RentalIA").
export type L = Record<Lang, string>
export type Text = string | L

// 'YYYY-MM'. Formatted per language (see localize.ts).
export type YearMonth = `${number}-${number}`

export type ProjectId =
  | 'reports'
  | 'rentalia'
  | 'sales'
  | 'lastfm'
  | 'resisCultural'
  | 'ecommerce'
  | 'casaPalma'
  | 'chedul'
  | 'dynamo'
  | 'cesiDl'
  | 'cesiIot'

export type LinkKind = 'repository' | 'backend' | 'frontend' | 'walkthrough' | 'live' | 'post'

// Where a project stands today. Labels live in src/content/ (ui.status).
// internal: running in production inside the company · development: not finished yet
// live: deployed and public · repository: public code, runs locally · academic: finished university project
export type ProjectStatus = 'internal' | 'completed' | 'development' | 'live' | 'repository' | 'academic'

// `href` optionally points to a larger version opened on click.
export type Figure = { src: string; alt: L; href?: string }

export type Pipeline = {
  // Main flow, left to right.
  steps: { name: Text; detail: L }[]
  // Side input that feeds one of the steps (by index).
  branch?: { name: Text; detail: L; target: number }
  branches?: { name: Text; detail: L; target: number }[]
  caption: L
}

// Only verifiable facts: no metrics that haven't been confirmed.
export type CaseStudy = { problem: L; solution: L; role: L; outcome: L }

// Countries with a flag on the page (src/components/Flag.tsx).
export type Country = 'fr'

export type Project = {
  id: ProjectId
  // Where it was done, when it's abroad: shown as a small flag.
  country?: Country
  title: Text
  kind: L
  // Professional work is shown before personal and academic projects.
  group: 'professional' | 'personal'
  // 'featured': highlighted card. 'secondary': compact cards in a two-column grid at the end of its block.
  tier?: 'featured' | 'secondary'
  status: ProjectStatus
  summary: L
  credit?: L
  caseStudy?: CaseStudy
  // Technical details. Each item may contain [text](https://…) links.
  highlights: L[]
  // Label of the button that opens the highlights. Defaults to "How it's built".
  highlightsLabel?: L
  pipeline?: Pipeline
  images?: Figure[]
  // Short note under the images, e.g. that the data is fictional.
  imagesNote?: L
  // 'wide': desktop screenshots. 'phone': narrow screenshots. 'photo': photos cropped to 4:5.
  gallery?: 'wide' | 'phone' | 'photo'
  logo?: { src: string; shape?: 'rounded' | 'circle' | 'plain'; fit?: 'cover' | 'contain' }
  stack: string[]
  links: { kind: LinkKind; href: string }[]
  // One line for the CV's project section. Projects without it can't be picked by a CV variant.
  cv?: L
}

export type BulletId = 'reports' | 'rentalia' | 'sales' | 'automation' | 'etl' | 'infra' | 'service'

export type Experience = {
  id: string
  company: string
  href?: string
  logo?: string
  role: L
  // Contract and place, e.g. "Full-time · Remote, Argentina".
  meta: L
  // What the company does, in a few words (CV context line).
  industry: L
  start: YearMonth
  // Empty while it's the current job.
  end?: YearMonth
  description: L
  // Shown on the portfolio in this order; each CV variant picks and reorders them by id.
  bullets: { id: BulletId; text: L; cvText?: L; cvOnly?: boolean; project?: ProjectId; stack: string[] }[]
}

export type Education = {
  id: 'utn' | 'cesi'
  institution: string
  href?: string
  logo?: string
  location: L
  degree: L
  // Written by hand: the exact dates aren't confirmed (see README, "Missing data").
  period: L
  // International exchange.
  exchange?: boolean
  // Shown as a small flag next to the institution.
  country?: Country
  description?: L
  images?: Figure[]
}

export type SkillGroup = 'languages' | 'backend' | 'data' | 'frontend' | 'infra' | 'ml'

export type CertificationId =
  | 'powerBi'
  | 'testing'
  | 'fullStack'
  | 'english'
  | 'ml'
  | 'webDev'
  | 'pythonFlask'
  | 'programming'
  | 'argentinaPrograma'

export type Certification = {
  id: CertificationId
  // Kept in its original language.
  title: string
  issuer: string
  date: YearMonth
  // Public verification link. Empty when the credential isn't public: those are not shown.
  url: string
  // Shown first on the portfolio; the rest go behind "Show more".
  featured?: boolean
}

export type CvProfile = 'general' | 'fs' | 'backend' | 'data'

// One CV variant. All of them share the template and the data; only the focus changes.
export type CvVariant = {
  // Selector label on /cv.
  label: L
  // Role shown under the name.
  headline: L
  summary: L
  // Experience bullets, in order. Their stacks are merged into one line per job.
  experience: BulletId[]
  // Selected projects (outside the experience), in order. Each must have a `cv` line.
  projects: ProjectId[]
  skills: SkillGroup[]
  certifications: CertificationId[]
  // Pages it may take (default 1). Beyond one, the CV flows across A4 pages without splitting an entry.
  maxPages?: number
  // Full bullet texts, job stacks, project context and education details instead of the short CV lines.
  detailed?: boolean
}
