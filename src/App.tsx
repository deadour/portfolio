import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Timeline from './components/Timeline'
import Certifications from './components/Certifications'
import Tech from './components/Tech'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLang } from './i18n'
import LinkIcon from './components/LinkIcon'
import HeroSketches from './components/hero/Sketches'
import DustCanvas from './components/hero/DustCanvas'

export default function App() {
  const { c } = useLang()

  return (
    <div className="relative isolate">
      {/* Decorative backdrop behind the header and hero: accent glow + doodle canvas (see index.css). */}
      <DustCanvas />
      <div aria-hidden="true" className="hero-backdrop">
        <HeroSketches className="hero-canvas" />
      </div>
    <div id="top" className="mx-auto max-w-[52rem] px-5 sm:px-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        {c.ui.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Timeline id="experience" title={c.sections.experience} entries={c.experience} />
        <Timeline id="education" title={c.sections.education} entries={c.education}>
          <div className="mt-12">
            <h3 className="text-sm text-muted">{c.sections.languages}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.languages.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2 text-sm text-fg"
                >
                  <LinkIcon name="language" className="size-4 text-accent" />
                  {item.name}
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-0.5 text-xs font-medium text-accent">
                    {item.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Timeline>
        <Tech />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
    </div>
  )
}
