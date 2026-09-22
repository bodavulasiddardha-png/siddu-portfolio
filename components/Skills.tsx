'use client'

import { motion } from 'framer-motion'
import StackCard from './ui/StackCard'

const GROUPS = [
  { title: 'AI Systems', items: ['Embeddings & vector search', 'RAG pipelines', 'FastAPI', 'LLM/Claude API integration', 'Prompt & model evaluation'] },
  { title: 'Automation', items: ['n8n', 'API/webhook integration', 'GitHub Actions'] },
]

export default function Skills({ index }: { index: number }) {
  return (
    <StackCard id="skills" index={index} label="What I build with" accent="deep">
      <h2 className="font-display text-4xl sm:text-6xl text-ink mb-10 mt-4 text-balance max-w-2xl">
        <span className="text-gradient">Skills</span>
      </h2>
      <div className="space-y-8 max-w-3xl">
        {GROUPS.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.06, delayChildren: groupIndex * 0.15 }}
          >
            <h3 className="shrink-0 w-full sm:w-48 font-display text-lg text-amber-dim">{group.title}</h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ y: -3, borderColor: 'rgba(109,94,245,0.5)' }}
                  className="text-sm px-4 py-2 rounded-full border border-surface-line bg-surface text-muted"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </StackCard>
  )
}
