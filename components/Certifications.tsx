'use client'

import { motion } from 'framer-motion'
import StackCard from './ui/StackCard'

// Placeholder wording until real certificate titles/dates/links are provided.
const CERTS = [
  { name: 'Deloitte', note: 'Certified' },
  { name: 'Tata', note: 'Certified' },
  { name: 'HackerRank', note: 'Certified' },
  { name: 'Anthropic', note: 'Certified' },
]

export default function Certifications({ index }: { index: number }) {
  return (
    <StackCard id="certifications" index={index} label="Credentials" accent="warm">
      <h2 className="font-display text-4xl sm:text-6xl text-ink mb-10 mt-4 text-balance max-w-2xl">
        <span className="text-gradient">Certifications</span>
      </h2>
      <motion.div
        className="flex flex-wrap gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {CERTS.map((c) => (
          <motion.div
            key={c.name}
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4, borderColor: 'rgba(109,94,245,0.4)' }}
            className="min-w-[180px] rounded-2xl border border-surface-line bg-surface px-6 py-5"
          >
            <div className="font-display text-lg text-ink">{c.name}</div>
            <div className="mt-1 text-sm text-muted">{c.note}</div>
          </motion.div>
        ))}
      </motion.div>
    </StackCard>
  )
}
