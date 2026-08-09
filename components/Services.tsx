'use client'

import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const SERVICES = [
  {
    title: 'AI Automation & Workflows',
    body: 'n8n-based automation that connects your tools (Gmail, Telegram, APIs) and removes manual work: email triage, lead routing, content pipelines.',
  },
  {
    title: 'AI Chatbots & Agents',
    body: 'Claude/LLM-powered agents that handle real tasks: classification, retrieval, routing — not just chat demos.',
  },
  {
    title: 'Website Building',
    body: 'From concept to deployed site — landing pages, business sites, portfolios.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative section-pad py-24 sm:py-32">
      <Reveal>
        <SectionHeading
          eyebrow="For clients & businesses"
          title="Services"
          description="Contact for quote — every engagement is project-based."
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6, borderColor: 'rgba(63,231,214,0.4)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="h-full rounded-3xl border border-surface-line bg-surface p-8"
            >
              <div className="h-10 w-10 rounded-xl bg-violet/15 flex items-center justify-center text-violet-bright font-display text-lg">
                {i + 1}
              </div>
              <h3 className="font-display text-xl text-ink mt-6">{service.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{service.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
