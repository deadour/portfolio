import type { Lang } from '../content'
import { certificationById } from '../data/certifications'
import { cvVariants } from '../data/cv'
import { education } from '../data/education'
import { experience } from '../data/experience'
import { displayUrl, formatPeriod, t } from '../data/localize'
import { projectById } from '../data/projects'
import { site } from '../data/site'
import { languages, skills } from '../data/skills'
import type { CvProfile } from '../data/types'

// One-page A4 CV, shared by the /cv preview and the PDF generator (scripts/cv.mjs).
// Single column, real text and links, no icons or tables, so ATS parsers read it top to bottom.
// Styles: cv.css (scoped to .cv). Content: src/data/ (variant in src/data/cv.ts).

const LABELS = {
  en: {
    summary: 'Summary',
    experience: 'Experience',
    projects: 'Selected projects',
    education: 'Education',
    skills: 'Technical skills',
    languages: 'Languages',
    certifications: 'Certifications',
  },
  es: {
    summary: 'Perfil',
    experience: 'Experiencia',
    projects: 'Proyectos seleccionados',
    education: 'Educación',
    skills: 'Habilidades técnicas',
    languages: 'Idiomas',
    certifications: 'Certificaciones',
  },
} satisfies Record<Lang, Record<string, string>>

const Link = ({ href, children }: { href: string; children?: string }) => (
  <a href={href}>{children ?? displayUrl(href)}</a>
)

// `embedded`: shown inside a page that has its own <h1> (the /cv preview), so the name isn't one.
// `photo`: image source for the portrait (the PDF generator passes it inline).
export default function CvDocument({
  profile,
  lang,
  embedded = false,
  photo = site.portrait,
}: {
  profile: CvProfile
  lang: Lang
  embedded?: boolean
  photo?: string
}) {
  const variant = cvVariants[profile]
  const l = LABELS[lang]
  const year = (date: string) => date.slice(0, 4)

  return (
    <article className="cv" lang={lang}>
      <header className="cv-header">
        <div className="cv-identity">
          {embedded ? <p className="cv-name">{site.name}</p> : <h1 className="cv-name">{site.name}</h1>}
          <p className="cv-headline">
            {t(variant.headline, lang)}
            <span className="cv-location"> · {t(site.location, lang)}</span>
          </p>
          <p className="cv-contact">
            <Link href={`mailto:${site.email}`}>{site.email}</Link>
            <Link href={`https://${site.domain}`} />
            <Link href={site.linkedin} />
            <Link href={site.github} />
          </p>
        </div>
        <img className="cv-photo" src={photo} alt={site.name} width={88} height={88} />
      </header>

      <section>
        <h2>{l.summary}</h2>
        <p>{t(variant.summary, lang)}</p>
      </section>

      <section>
        <h2>{l.experience}</h2>
        {experience.map((job) => {
          const bullets = variant.experience.flatMap((id) => job.bullets.filter((b) => b.id === id))
          // One technology line per job, in the order the bullets mention them.
          const stack = [...new Set(bullets.flatMap((b) => b.stack))].slice(0, 9)
          return (
            <div key={job.id} className="cv-entry">
              <div className="cv-row">
                <h3>
                  {t(job.role, lang)} — {job.company}
                </h3>
                <span className="cv-date">{formatPeriod(job.start, job.end, lang)}</span>
              </div>
              <p className="cv-meta">
                {t(job.industry, lang)} · {t(job.meta, lang)}
              </p>
              <ul>
                {bullets.map((bullet) => (
                  <li key={bullet.id}>{t(bullet.text, lang)}</li>
                ))}
              </ul>
              <p className="cv-stack">{stack.join(' · ')}</p>
            </div>
          )
        })}
      </section>

      {variant.projects.length > 0 && (
        <section>
          <h2>{l.projects}</h2>
          {variant.projects.map((id) => {
            const project = projectById[id]
            const link = project.links.find((x) => x.kind === 'live') ?? project.links.find((x) => x.kind === 'repository')
            return (
              <div key={id} className="cv-entry cv-project">
                <div className="cv-row">
                  <h3>
                    {t(project.title, lang)} <span className="cv-kind">— {t(project.kind, lang)}</span>
                  </h3>
                  {link && (
                    <span className="cv-date">
                      <Link href={link.href} />
                    </span>
                  )}
                </div>
                <p>
                  {project.cv && t(project.cv, lang)}
                  <span className="cv-stack">{project.stack.slice(0, 6).join(' · ')}</span>
                </p>
              </div>
            )
          })}
        </section>
      )}

      <section>
        <h2>{l.education}</h2>
        {education.map((item) => (
          <div key={item.id} className="cv-entry cv-education">
            <div className="cv-row">
              <h3>
                {item.institution} <span className="cv-kind">— {t(item.location, lang)}</span>
              </h3>
              <span className="cv-date">{t(item.period, lang)}</span>
            </div>
            <p>{t(item.degree, lang)}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>{l.skills}</h2>
        <ul className="cv-skills">
          {variant.skills.map((group) => (
            <li key={group}>
              <strong>{t(skills[group].title, lang)}:</strong> {skills[group].items.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{l.certifications}</h2>
        <ul className="cv-certs">
          {variant.certifications
            .map((id) => certificationById[id])
            .filter((cert) => cert.url)
            .map((cert) => (
              <li key={cert.id}>
                <Link href={cert.url}>{cert.title}</Link> — {cert.issuer}, {year(cert.date)}
              </li>
            ))}
        </ul>
      </section>

      <section>
        <h2>{l.languages}</h2>
        <p>{languages.map((x) => `${t(x.name, lang)} (${t(x.level, lang)})`).join(' · ')}</p>
      </section>
    </article>
  )
}
