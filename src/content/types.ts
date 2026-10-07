// Shape of every translatable text on the page.
// Each language file must implement it fully, so a missing translation is a type error.

export type ProjectId = 'lastfm' | 'reports' | 'rentos' | 'dynamo' | 'cesiDl' | 'cesiIot' | 'ecommerce'
export type LinkKind = 'repository' | 'walkthrough' | 'live' | 'post'

export type Pipeline = {
  // Main flow, left to right.
  steps: { name: string; detail: string }[]
  // Side input that feeds one of the steps (by index).
  branch?: { name: string; detail: string; target: number }
  caption: string
}

// `href` optionally points to a larger version opened on click.
export type Figure = { src: string; alt: string; caption?: string; href?: string }

export type ProjectText = {
  title: string
  kind: string
  summary: string
  highlights: string[]
  // Short label shown on cards that are not finished yet.
  status?: string
  // Short factual tag shown as a pill, e.g. that a system runs in production.
  badge?: string
  pipeline?: Pipeline
  images?: Figure[]
  // Short note under the images, e.g. that the data is fictional.
  imagesNote?: string
}

export type Entry = {
  title: string
  // Optional website for the title.
  href?: string
  // Optional square logo shown next to the entry.
  logo?: string
  // Role, institution, location… Each item is joined with " · ". Empty items are skipped.
  meta: string[]
  period: string
  description?: string
  highlights?: string[]
  images?: Figure[]
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
    lightbox: { close: string; previous: string; next: string }
    // {n} is replaced by the number of hidden items.
    showMore: string
    featured: string
    academic: string
    professional: string
    personal: string
    copyEmail: string
    copied: string
    // {n} is replaced by the number of photos.
    viewPhotos: string
  }
  hero: { title: string; tagline: string; viewWork: string; downloadCv: string }
  // What I'm working on right now. The month shown next to it is always the current one.
  now: { label: string; text: string }
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
  contact: { title: string; intro: string }
}
