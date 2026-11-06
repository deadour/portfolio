import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CvPage from './components/CvPage'
import Solutions from './components/Solutions'
import { CompaniesTeaser, Process, ServicesIntro } from './components/Services'
import { ProjectDialogProvider } from './components/Project'
import HeroSketches from './components/hero/Sketches'
import DustCanvas from './components/hero/DustCanvas'
import PageSketches from './components/hero/PageSketches'
import { useLang } from './i18n'

// Three pages over the same backdrop: the sketches, the map and the dust are the site's identity.
export default function App() {
  const { page, c } = useLang()

  return (
    <div className="relative isolate overflow-x-clip">
      {/* Decorative backdrop: dust, sketches along the margins and the doodles behind the header (see index.css). */}
      <DustCanvas />
      <PageSketches />
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
        <ProjectDialogProvider cta={page === 'services' ? { label: c.services.solutions.cta, href: '#contact' } : undefined}>
          <main id="main">
            {page === 'home' && (
              <>
                <Hero />
                <Work />
                <Experience />
                <Education />
                <Skills />
                <Certifications />
                <CompaniesTeaser />
              </>
            )}
            {page === 'services' && (
              <>
                <ServicesIntro />
                <Solutions />
                <Process />
              </>
            )}
            {page === 'cv' && <CvPage />}
            <Contact />
          </main>
        </ProjectDialogProvider>
        <Footer />
      </div>
    </div>
  )
}
