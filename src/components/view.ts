import type { Content, Entry, ProjectText } from '../content/types'
import type { Lang } from '../content'
import { education } from '../data/education'
import { experience } from '../data/experience'
import { formatPeriod, t } from '../data/localize'
import type { Figure, Project } from '../data/types'

// Turns the bilingual data in src/data/ into the texts the page components show, in one language.
// The CVs read the same data (src/cv/CvDocument.tsx), so the site and the PDFs never disagree.

const figures = (images: Figure[] | undefined, lang: Lang) =>
  images?.map((image) => ({ src: image.src, href: image.href, alt: t(image.alt, lang) }))

export function projectText(project: Project, lang: Lang, c: Content): ProjectText {
  const cs = project.caseStudy
  const status = c.ui.status[project.status]
  return {
    title: t(project.title, lang),
    kind: t(project.kind, lang),
    summary: t(project.summary, lang),
    caseStudy: cs && { problem: t(cs.problem, lang), role: t(cs.role, lang), solution: t(cs.solution, lang), outcome: t(cs.outcome, lang) },
    highlights: project.highlights.map((h) => t(h, lang)),
    highlightsLabel: project.highlightsLabel && t(project.highlightsLabel, lang),
    // In-progress projects say so; finished internal systems show a production pill.
    status: project.status === 'development' ? status : undefined,
    badge: project.status !== 'development' && status ? status : undefined,
    pipeline: project.pipeline,
    images: figures(project.images, lang),
    imagesNote: project.imagesNote && t(project.imagesNote, lang),
  }
}

export function experienceEntries(lang: Lang): Entry[] {
  return experience.map((job) => ({
    title: job.company.replace(/ SRL$/, ''),
    href: job.href,
    logo: job.logo,
    meta: [t(job.role, lang), t(job.meta, lang)],
    period: formatPeriod(job.start, job.end, lang),
    description: t(job.description, lang),
    highlights: job.bullets.filter((b) => !b.cvOnly).map((b) => t(b.text, lang)),
  }))
}

export function educationEntries(lang: Lang): Entry[] {
  return education.map((item) => ({
    title: `${item.institution} — ${t(item.location, lang)}`,
    href: item.href,
    logo: item.logo,
    country: item.country,
    meta: [t(item.degree, lang)],
    period: t(item.period, lang),
    description: item.description && t(item.description, lang),
    images: figures(item.images, lang),
  }))
}
