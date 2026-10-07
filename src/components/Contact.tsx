import Section from './Section'
import { site } from '../data/site'
import { useLang } from '../i18n'
import LinkIcon, { type LinkIconName } from './LinkIcon'

// Entries with an empty href (not configured yet) are skipped.
const links = [
  { label: 'Email', icon: 'email', href: site.email && `mailto:${site.email}`, text: site.email, external: false },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: site.linkedin,
    text: site.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''),
    external: true,
  },
  { label: 'GitHub', icon: 'github', href: site.github, text: site.github.replace(/^https:\/\//, ''), external: true },
] as { label: string; icon: LinkIconName; href: string; text: string; external: boolean }[]

const visibleLinks = links.filter((link) => link.href)

export default function Contact() {
  const { c } = useLang()

  return (
    <Section id="contact" title={c.sections.contact}>
      <p className="mb-6 max-w-xl leading-relaxed">{c.contact.intro}</p>
      <ul className="divide-y divide-line border-y border-line">
        {visibleLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4"
            >
              <span className="flex items-center gap-2.5 text-sm text-muted group-hover:text-fg">
                <LinkIcon name={link.icon} />
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
