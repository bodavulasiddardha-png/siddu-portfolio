'use client'

import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ContentNeeded from './ui/ContentNeeded'

const GROUPS = [
  { title: 'Data & Analytics', items: ['[Skill]', '[Skill]', '[Skill]', '[Skill]'] },
  { title: 'AI Systems', items: ['[Skill]', '[Skill]', '[Skill]', '[Skill]'] },
  { title: 'Automation', items: ['[Skill]', '[Skill]', '[Skill]', '[Skill]'] },
]

export default function Skills() {
  return (
    <section id="skills" className="relative section-pad py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="Capabilities" title="Skills" />
        <ContentNeeded>the exact skill list per group below.</ContentNeeded>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3 mt-12">
        {GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-surface-line bg-surface p-8">
              <h3 className="font-display text-lg text-cyan-bright">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm px-3 py-1.5 rounded-full border border-dashed border-surface-line text-muted"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
