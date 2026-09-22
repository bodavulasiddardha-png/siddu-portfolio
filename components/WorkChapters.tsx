'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { EnvelopeSimple, Target, InstagramLogo, Eye, GraduationCap } from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import StackCard from './ui/StackCard'
import { PROJECTS, type ProjectIcon } from '@/lib/projects'

const ICONS: Record<ProjectIcon, Icon> = {
  envelope: EnvelopeSimple,
  target: Target,
  instagram: InstagramLogo,
  eye: Eye,
  'graduation-cap': GraduationCap,
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

/** Each shipped project is its own stacking card, with its real screenshot framed inline
 * rather than washed out as a full-bleed background — every card still looks different by
 * construction (its own image, icon and stack), just glass instead of photographic. */
export default function WorkChapters({ startIndex }: { startIndex: number }) {
  return (
    <>
      {PROJECTS.map((project, i) => {
        const IconCmp = ICONS[project.icon]
        const accent = (['warm', 'default', 'deep'] as const)[i % 3]
        return (
          <StackCard key={project.title} id={i === 0 ? 'work' : `work-${i}`} index={startIndex + i} label="Selected work" accent={accent}>
            <motion.div
              className="mt-6 grid gap-10 md:grid-cols-[1.1fr_1fr] items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.12 }}
            >
              <div>
                <motion.span
                  variants={item}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-surface-line text-amber mb-6"
                >
                  <IconCmp size={20} weight="light" aria-hidden="true" />
                </motion.span>
                <motion.h2 variants={item} transition={{ duration: 0.6, ease: 'easeOut' }} className="font-display text-3xl sm:text-5xl text-ink text-balance">
                  {project.title}
                </motion.h2>
                <motion.p variants={item} transition={{ duration: 0.6, ease: 'easeOut' }} className="mt-5 text-base text-muted leading-relaxed max-w-lg">
                  {project.body}
                </motion.p>
                <motion.div variants={item} transition={{ staggerChildren: 0.05 }} className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={item}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-surface-line bg-surface text-muted"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.a
                  variants={item}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-gradient hover:opacity-80 transition-opacity"
                >
                  View project ↗
                </motion.a>
              </div>
              <motion.div
                variants={item}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-surface-line shadow-glow"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 768px) 440px, 90vw"
                  className={project.logoOnDark ? 'object-contain bg-black/60 p-10' : 'object-cover'}
                />
              </motion.div>
            </motion.div>
          </StackCard>
        )
      })}
    </>
  )
}
