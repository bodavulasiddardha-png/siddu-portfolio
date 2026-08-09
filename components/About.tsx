'use client'

import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ContentNeeded from './ui/ContentNeeded'

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
              [Placeholder] — a brief personal narrative connecting the operator background to the
              technical building: how the path from operations / analysis work led into building AI
              systems and automation.
            </p>
            <p>
              [Placeholder] — second paragraph, if needed, covering what drives the work today.
            </p>
            <ContentNeeded>
              exact wording for this narrative — no biographical facts, dates, or claims have been
              invented.
            </ContentNeeded>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
