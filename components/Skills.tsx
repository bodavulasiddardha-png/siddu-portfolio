'use client'

import { motion } from 'framer-motion'
import { ChartBar, Brain, Lightning } from '@phosphor-icons/react/dist/ssr'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const GROUPS = [
  {
    title: 'Data & Analytics',
    Icon: ChartBar,
    items: [
      'Excel (Pivot Tables, Power Query, XLOOKUP, DAX)',
      'SQL',
      'Power BI',
      'Python (Pandas, NumPy)',
      'Tableau',
    ],
  },
  {
    title: 'AI Systems',
    Icon: Brain,
    items: [
      'Embeddings & vector search',
      'RAG pipelines',
      'FastAPI',
      'LLM/Claude API integration',
      'Prompt & model evaluation',
    ],
  },
  {
    title: 'Automation',
    Icon: Lightning,
    items: ['n8n', 'API/webhook integration', 'GitHub Actions'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative section-pad py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="Capabilities" title="Skills" />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3 mt-12">
        {GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-surface-line bg-surface p-8">
              <div className="h-9 w-9 rounded-lg bg-amber/15 flex items-center justify-center text-amber-bright mb-4">
                <group.Icon size={18} weight="regular" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-amber-bright">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm px-3 py-1.5 rounded-full border border-surface-line text-muted"
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
