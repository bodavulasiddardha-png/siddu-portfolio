'use client'

import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ContentNeeded from './ui/ContentNeeded'

const PROJECTS = [1, 2, 3]

export default function Work() {
  return (
    <section id="work" className="relative section-pad py-24 sm:py-32 bg-bg-soft">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          description="[Placeholder] — case studies go here once real project details are supplied."
        />
        <ContentNeeded>
          which specific projects to include, their real descriptions, tech stack used, links/repos,
          and outcomes — nothing here is invented.
        </ContentNeeded>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3 mt-12">
        {PROJECTS.map((n, i) => (
          <Reveal key={n} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="h-full rounded-3xl border border-dashed border-surface-line bg-surface/60 p-8 flex flex-col"
            >
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-violet/20 to-cyan/10 border border-surface-line mb-6 flex items-center justify-center text-muted-dim text-sm">
                Project image / screenshot
              </div>
              <h3 className="font-display text-xl text-ink">[Placeholder project title]</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                [Placeholder] — short description of the problem, approach, and outcome for this
                project.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Tech', 'Stack', 'Tags'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-surface-line text-muted-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
