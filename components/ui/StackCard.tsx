'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ACCENTS = {
  default: 'radial-gradient(circle at 50% 0%, rgba(215,181,140,0.1), transparent 60%)',
  warm: 'radial-gradient(circle at 20% 20%, rgba(215,181,140,0.16), transparent 55%)',
  deep: 'radial-gradient(circle at 80% 75%, rgba(215,181,140,0.12), transparent 55%)',
} as const

/** One card in the post-gate scroll: pinned via CSS `sticky` so the next card naturally
 * slides up and covers it — the browser does the stacking, we only scale/dim the outgoing
 * card as it gets covered, so each section reads as its own deck entry, not a repeat.
 * Each section also carries its own gold-wash placement, so the deck doesn't read as one
 * flat card repeated nine times. */
export default function StackCard({
  id,
  index,
  label,
  accent = 'default',
  className,
  children,
}: {
  id: string
  index: number
  label: string
  accent?: keyof typeof ACCENTS
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5])

  return (
    <section
      id={id}
      data-chapter={index}
      ref={ref}
      className="sticky top-0 min-h-screen w-full flex items-center py-24"
      style={{ zIndex: index }}
    >
      <motion.div
        style={{ scale, opacity, backgroundImage: ACCENTS[accent] }}
        className={`glass relative mx-auto w-[min(1100px,92vw)] rounded-[28px] px-8 py-12 sm:px-14 sm:py-16 shadow-glow ${className ?? ''}`}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted">{label}</span>
        {children}
      </motion.div>
    </section>
  )
}
