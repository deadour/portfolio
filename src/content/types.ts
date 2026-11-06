// Interface and marketing texts, one file per language. Each language file must implement this
// fully, so a missing translation is a type error.
// Professional data (experience, projects, education, skills…) is NOT here: it lives once, in
// both languages, in src/data/, and is shared with the CVs.

import type { CaseStudy, LinkKind, ProjectId, ProjectStatus } from '../data/types'

export type Page = 'home' | 'cv' | 'services'

// One block of the services page: what I can do, in a title and one line, and one real case
// told in a sentence, with its screens as a swipeable gallery.
export type Solution = {
  // Anchor (#solution-<id>). Same in every language, so switching keeps it.
  id: string
  tag: string
  title: string
  text: string
  case: { project: ProjectId; text: string }
  // Other projects where it's done too, shown as small buttons.
  also?: ProjectId[]
}

export type Content = {
  meta: Record<Page, { title: string; description: string }>
  ui: {
    skip: string
    nav: { work: string; experience: string; cv: string; services: string; contact: string }
    language: string
    themeToDark: string
    themeToLight: string
    shuffle: string
    links: Record<LinkKind, string>
    portraitAlt: string
    credential: string
    howItsBuilt: string
    caseStudy: Record<keyof CaseStudy, string>
    stack: string
    status: Record<ProjectStatus, string>
    lightbox: { close: string; previous: string; next: string }
    // {n} is replaced by the number of hidden items.
    showMore: string
    // {n} is replaced by the number of images.
    viewImages: string
    viewPhotos: string
    details: string
    copyEmail: string
    copied: string
    exchange: string
  }
  hero: {
    // Line under the summary with the current job. {role}, {company} and {since} are filled in.
    current: string
    work: string
    cv: string
  }
  sections: {
    work: string
    professional: string
    personal: string
    more: string
    experience: string
    education: string
    languages: string
    skills: string
    certifications: string
    contact: string
  }
  // Short block on the home page that sends companies to the services page.
  companies: { title: string; text: string; cta: string }
  // The services page, for companies.
  services: {
    eyebrow: string
    title: string
    intro: string
    process: { title: string; steps: { title: string; text: string }[] }
    cta: string
    // Subject line of the email the CTA opens.
    emailSubject: string
    solutions: {
      caseLabel: string
      alsoLabel: string
      // Button that opens the case in the project dialog.
      details: string
      // Button to the contact section.
      cta: string
      items: Solution[]
    }
  }
  cv: {
    title: string
    intro: string
    profile: string
    language: string
    download: string
    open: string
    // Under the preview: the PDF is the same document.
    note: string
  }
  contact: { title: string; intro: string }
}
