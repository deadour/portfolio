import Section from './Section'
import { site } from '../data/site'
import { useLang } from '../i18n'
import { siGithub } from 'simple-icons'

// Small line icons (24×24) for each contact row.
const ICONS: Record<string, string> = {
  Email: 'M3 6h18v12H3zM3 7l9 6 9-6',
  LinkedIn: 'M4 4h16v16H4zM8 10v6M8 7.5v.01M12 16v-6M12 13c0-2 4-2.5 4 0v3',
}

function ContactIcon({ label }: { label: string }) {
  if (label === 'GitHub') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0" fill="currentColor">
        <path d={siGithub.path} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[label]} />
    </svg>
  )
}

// Entries with an empty href (not configured yet) are skipped.
const links = [
  { label: 'Email', href: site.email && `mailto:${site.email}`, text: site.email, external: false },
  {
    label: 'LinkedIn',
    href: site.linkedin,
    text: site.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''),
    external: true,
  },
  { label: 'GitHub', href: site.github, text: site.github.replace(/^https:\/\//, ''), external: true },
].filter((link) => link.href)

export default function Contact() {
  const { c } = useLang()

  return (
    <Section id="contact" title={c.sections.contact}>
      <p className="mb-6 max-w-xl leading-relaxed">{c.contact.intro}</p>
      <ul className="divide-y divide-line border-y border-line">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4"
            >
              <span className="flex items-center gap-2.5 text-sm text-muted group-hover:text-fg">
                <ContactIcon label={link.label} />
                {link.label}
              </span>
              <span className="break-all text-fg decoration-accent underline-offset-4 group-hover:underline">
                {link.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
