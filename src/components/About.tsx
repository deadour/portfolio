import Section from './Section'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-xl space-y-4 leading-relaxed text-zinc-300">
        <p>
          I’m finishing my degree in Systems Engineering and work across data and software
          development. Professionally, I’ve worked on systems for an industrial company, covering
          data, automation and software.
        </p>
        <p>
          I spent an academic semester at CESI École d’Ingénieurs in France, working on data
          science and IoT projects. I’m now focusing my career on Data Engineering.
        </p>
      </div>
    </Section>
  )
}
