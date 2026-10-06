import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Timeline from './components/Timeline'
import Tech from './components/Tech'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { experience, education } from './data/experience'
import { ui } from './data/ui'
import { useLang } from './i18n'

export default function App() {
  const { t } = useLang()

  return (
    <div id="top" className="mx-auto max-w-3xl px-5 sm:px-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        {t(ui.skip)}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Timeline id="experience" title={t(ui.sections.experience)} entries={experience} />
        <Timeline id="education" title={t(ui.sections.education)} entries={education} />
        <Tech />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
