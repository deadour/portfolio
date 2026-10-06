// Shape of every translatable text on the page.
// Each language file must implement it fully, so a missing translation is a type error.

export type ProjectId = 'lastfm' | 'rentos' | 'dynamo' | 'ecommerce' | 'cesi'
export type LinkKind = 'repository' | 'walkthrough' | 'live' | 'post'

export type Pipeline = {
  // Main flow, left to right.
  steps: { name: string; detail: string }[]
  // Side input that feeds one of the steps (by index).
  branch?: { name: string; detail: string; target: number }
  caption: string
}

export type Figure = { src: string; alt: string; caption?: string }

export type ProjectText = {
  title: string
  kind: string
  summary: string
  highlights: string[]
  // Short label shown on cards that are not finished yet.
  status?: string
  pipeline?: Pipeline
  images?: Figure[]
}

export type Entry = {
  title: string
  // Role, institution, location… Each item is joined with " · ". Empty items are skipped.
  meta: string[]
  period: string
  description?: string
  highlights?: string[]
  image?: Figure
}

export type Content = {
  meta: { title: string; description: string }
  ui: {
    skip: string
    nav: { work: string; experience: string; contact: string }
    language: string
    themeToDark: string
    themeToLight: string
    links: Record<LinkKind, string>
    portraitAlt: string
    credential: string
    howItsBuilt: string
    // {n} is replaced by the number of hidden items.
    showMore: string
  }
  hero: { title: string; tagline: string; viewWork: string; downloadCv: string }
  // What I'm working on right now. Update the date when the text changes.
  now: { label: string; text: string; updated: string }
  sections: {
    about: string
    work: string
    experience: string
    education: string
    languages: string
    certifications: string
    tech: string
    contact: string
  }
  about: string[]
  projects: Record<ProjectId, ProjectText>
  experience: Entry[]
  education: Entry[]
  languages: { name: string; level: string }[]
  tech: { data: string; software: string }
  contact: { intro: string }
}
