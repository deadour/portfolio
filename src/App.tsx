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

export default function App() {
  const { c } = useLang()

  return (
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
            <ul className="mt-3 space-y-1.5">
              {c.languages.map((item) => (
                <li key={item.name}>
                  <span className="text-fg">{item.name}</span>
                  <span className="text-muted"> — {item.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Timeline>
        <Certifications />
        <Tech />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
