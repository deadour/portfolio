import { useEffect, useRef, useState } from 'react'
import Section from './Section'
import { site } from '../data/site'
import { useLang } from '../i18n'
import LinkIcon, { type LinkIconName } from './LinkIcon'
import { inquiryHref } from './Services'
import { pathFor } from '../route'

// Entries with an empty href (not configured yet) are skipped.
const links = [
  { label: 'LinkedIn', icon: 'linkedin', href: site.linkedin },
  { label: 'GitHub', icon: 'github', href: site.github },
].filter((link) => link.href) as { label: string; icon: LinkIconName; href: string }[]

// Same block on every page. On the services page the main button opens an email with a subject,
// so business inquiries are easy to spot; elsewhere the CV and the services page are one click away.
export default function Contact() {
  const { lang, page, c } = useLang()
  const business = page === 'services'
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      // Clipboard API blocked: fall back to a hidden textarea. If that fails too, the mailto link still works.
      const area = document.createElement('textarea')
      area.value = site.email
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.append(area)
      area.select()
      const ok = document.execCommand('copy')
      area.remove()
      if (!ok) return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Section id="contact" title={c.sections.contact}>
      <div className="pt-2 pb-8 sm:pb-12">
        <p className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{c.contact.title}</p>
        <p className="mt-4 max-w-xl leading-relaxed">{business ? c.services.solutions.cta + '.' : c.contact.intro}</p>

        {site.email && (
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="min-w-0 text-xl font-medium break-all text-fg underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-accent sm:text-2xl"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="btn"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {copied ? (
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="var(--accent)" />
                ) : (
                  <>
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                  </>
                )}
              </svg>
              <span aria-live="polite">{copied ? c.ui.copied : c.ui.copyEmail}</span>
            </button>
            {business && (
              <a href={inquiryHref(c.services.emailSubject)} className="btn-primary">
                <LinkIcon name="email" className="size-4" />
                {c.services.cta}
              </a>
            )}
          </div>
        )}

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                <LinkIcon name={link.icon} />
                {link.label}
                <span aria-hidden="true" className="text-muted">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href={pathFor(lang, 'cv')} className="inline-flex items-center gap-2 text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
              <LinkIcon name="download" />
              {c.ui.nav.cv}
            </a>
          </li>
          {!business && (
            <li>
              <a href={pathFor(lang, 'services')} className="inline-flex items-center gap-2 text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
                {c.ui.nav.services}
                <span aria-hidden="true" className="text-muted">→</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </Section>
  )
}
