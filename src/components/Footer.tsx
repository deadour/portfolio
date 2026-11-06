import { site } from '../data/site'
import { t } from '../data/localize'
import { useLang } from '../i18n'
import SketchImage from './hero/SketchImage'
import { SKETCHES } from './hero/sketchAssets'

const FOOTER_SKETCHES = [
  // The Chaco–Corrientes bridge, close to home.
  { src: SKETCHES.puenteGeneralBelgrano.src, className: 'footer-sketch-bridge' },
]

const link = 'footer-link underline decoration-current underline-offset-4'

// The name once, with role and place, and back to top; then the ways to reach me and the small print.
export default function Footer() {
  const { lang, c } = useLang()

  return (
    <footer className="footer-shell relative mt-20 overflow-hidden border-t border-line pt-10 pb-0 text-sm text-muted">
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-medium text-fg">{site.name}</p>
            {/* Role and place on one line on wide screens, two on phones. */}
            <p className="mt-1 leading-relaxed">
              <span className="block sm:inline">{t(site.headline, lang)}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">{t(site.location, lang)}</span>
            </p>
          </div>
          <a href="#top" className="footer-link inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2">
            {c.ui.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>

        <div className="footer-line flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-5">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={link}>
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={link}>
              LinkedIn
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} · <span className="font-mono">{site.domain}</span>
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="footer-sketches relative -mx-5 mt-5 h-56 sm:-mx-8 sm:h-[35.5rem]">
        {FOOTER_SKETCHES.map((sketch) => (
          <div key={sketch.src} className={`footer-sketch ${sketch.className}`}>
            <SketchImage src={sketch.src} />
          </div>
        ))}
      </div>
    </footer>
  )
}
