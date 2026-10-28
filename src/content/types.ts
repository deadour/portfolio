// Shape of every translatable text on the page.
// Each language file must implement it fully, so a missing translation is a type error.

export type ProjectId =
  | 'lastfm'
  | 'reports'
  | 'rentalia'
  | 'intelligence'
  | 'casaPalma'
  | 'dynamo'
  | 'chedul'
  | 'cesiDl'
  | 'cesiIot'
  | 'ecommerce'
export type LinkKind = 'repository' | 'backend' | 'frontend' | 'walkthrough' | 'live' | 'post'

export type Pipeline = {
  // Main flow, left to right.
  steps: { name: string; detail: string }[]
  // Side input that feeds one of the steps (by index).
  branch?: { name: string; detail: string; target: number }
  caption: string
}

// `href` optionally points to a larger version opened on click.
export type Figure = { src: string; alt: string; caption?: string; href?: string }

// Short case-study summary shown instead of the plain summary on professional projects.
// Only verifiable facts: no metrics that haven't been confirmed.
export type CaseStudy = { problem: string; role: string; solution: string; outcome: string }

export type ProjectText = {
  title: string
  kind: string
  summary: string
  caseStudy?: CaseStudy
  // Each item may contain [text](https://…) links.
  highlights: string[]
  // Label of the button that opens the highlights. Defaults to "How it's built".
  highlightsLabel?: string
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

// One block of the solutions section: what I can do, in a title and one line, and one real case
// told in a sentence. The case's screens are shown as a swipeable gallery; `flow` replaces them with a diagram.
export type Solution = {
  // Anchor (#solution-<id>). Same in every language, so switching keeps it.
  id: string
  tag: string
  title: string
  text: string
  case: { project: ProjectId; text: string }
  // Other projects where it's done too, shown as small buttons.
  also?: ProjectId[]
  flow?: Pipeline
}

export type Content = {
  meta: { title: string; description: string }
  ui: {
    skip: string
    nav: { work: string; services: string; experience: string; contact: string }
    language: string
    themeToDark: string
    themeToLight: string
    shuffle: string
    links: Record<LinkKind, string>
    portraitAlt: string
    credential: string
    howItsBuilt: string
    caseStudy: Record<keyof CaseStudy, string>
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
  hero: { title: string; tagline: string; cta: string; downloadCv: string }
  // What I'm working on right now. `date` is written by hand, so it never claims to be newer than the text.
  now: { label: string; date: string; text: string }
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
  solutions: {
    title: string
    intro: string
    caseLabel: string
    alsoLabel: string
    // Button that opens the case in the project dialog.
    details: string
    // Button to the contact section.
    cta: string
    items: Solution[]
  }
  // How I work, plus the business inquiry button in Contact.
  services: {
    process: { title: string; steps: { title: string; text: string }[] }
    cta: string
    // Subject line of the email the CTA opens.
    emailSubject: string
  }
  experience: Entry[]
  education: Entry[]
  languages: { name: string; level: string }[]
  tech: Record<'backend' | 'data' | 'ai' | 'frontend' | 'infra', string>
  contact: { title: string; intro: string }
}
