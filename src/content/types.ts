// Shape of every translatable text on the page.
// Each language file must implement it fully, so a missing translation is a type error.

export type ProjectId = 'lastfm' | 'dynamo' | 'ecommerce' | 'cesi'
export type LinkKind = 'repository' | 'walkthrough' | 'live'

export type ProjectText = {
  title: string
  kind: string
  summary: string
  highlights: string[]
  // Short label shown on cards that are not finished yet.
  status?: string
}

export type Entry = {
  title: string
  // Role, institution, location… Each item is joined with " · ". Empty items are skipped.
  meta: string[]
  period: string
  description?: string
  highlights?: string[]
  image?: { src: string; alt: string; caption: string }
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
  }
  hero: { title: string; tagline: string; viewWork: string; downloadCv: string }
  sections: {
    about: string
    work: string
    experience: string
    education: string
    languages: string
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
