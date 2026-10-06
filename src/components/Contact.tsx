import Section from './Section'
import { site } from '../data/site'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

// Entries with an empty href (not configured yet) are skipped.
const links = [
  { label: 'GitHub', href: site.github, text: site.github.replace(/^https:\/\//, ''), external: true },
  {
    label: 'LinkedIn',
    href: site.linkedin,
    text: site.linkedin.replace(/^https:\/\/(www\.)?/, ''),
    external: true,
  },
  { label: 'Email', href: site.email && `mailto:${site.email}`, text: site.email, external: false },
].filter((link) => link.href)

export default function Contact() {
  const { t } = useLang()

  return (
    <Section id="contact" title={t(ui.sections.contact)}>
      <ul className="divide-y divide-line border-y border-line">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
            >
              <span className="text-sm text-muted">{link.label}</span>
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
