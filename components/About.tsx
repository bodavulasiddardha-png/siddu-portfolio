'use client'

import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  return (
    <section id="about" className="relative section-pad py-24 sm:py-32 bg-bg-soft">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeading eyebrow="Journey" title="About" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-2xl space-y-4 text-muted leading-relaxed">
            <p>
              CSE grad (Bharath University, 2026) who builds AI systems that ship — not demos.
              Co-founded Edunova Consultancy, guiding students into engineering seats. I build
              agents that route real mail, bots that post autonomously for months, pipelines meant
              for production — not notebooks.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
