'use client'

import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'

const CARDS = [
  {
    label: 'For clients & businesses',
    title: 'What I build for clients',
    body: 'Websites, AI automation workflows, and chatbot/agent systems that plug straight into how a business already runs.',
    accent: 'violet' as const,
  },
  {
    label: 'For hiring teams',
    title: 'What I bring to a team',
    body: 'The same systems thinking applied inside an org — data analysis, AI tooling, and workflow design that ships.',
    accent: 'cyan' as const,
  },
]

export default function SplitIntro() {
  return (
    <section className="relative section-pad py-24 sm:py-32">
      <Reveal>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-dim font-medium mb-4">
          One builder, two angles
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="h-full rounded-3xl border border-surface-line bg-surface p-8 sm:p-10"
            >
              <span
                className={`inline-block text-[11px] tracking-[0.25em] uppercase font-semibold ${
                  card.accent === 'violet' ? 'text-violet-bright' : 'text-cyan-bright'
                }`}
              >
                {card.label}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink mt-4 text-balance">
                {card.title}
              </h3>
              <p className="mt-4 text-muted leading-relaxed">{card.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
