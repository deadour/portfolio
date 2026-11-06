import { site } from '../data/site'
import { useLang } from '../i18n'
import SketchImage from './hero/SketchImage'
import { SKETCHES } from './hero/sketchAssets'

const FOOTER_SKETCHES = [
  // The Chaco–Corrientes bridge, close to home.
  { src: SKETCHES.puenteGeneralBelgrano.src, className: 'footer-sketch-bridge' },
]

export default function Footer() {
  const { c } = useLang()

  return (
    <footer className="footer-shell relative mt-20 overflow-hidden border-t border-line pt-10 pb-0 text-sm text-muted">
      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono">{site.domain}</p>
            <p className="mt-2 max-w-xs leading-relaxed">{site.name} · Software &amp; Data Engineer</p>
          </div>
          <a href="#top" className="footer-link inline-flex items-center gap-2 rounded-full border px-3 py-2">
            {c.ui.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>

        <div className="footer-line flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-5">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={`mailto:${site.email}`} className="footer-link underline decoration-current underline-offset-4">
              {site.email}
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="footer-link underline decoration-current underline-offset-4">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="footer-link underline decoration-current underline-offset-4">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="footer-sketches relative -mx-5 mt-5 h-44 sm:-mx-8 sm:h-56">
        {FOOTER_SKETCHES.map((sketch) => (
          <div key={sketch.src} className={`footer-sketch ${sketch.className}`}>
            <SketchImage src={sketch.src} />
          </div>
        ))}
      </div>
    </footer>
  )
}
