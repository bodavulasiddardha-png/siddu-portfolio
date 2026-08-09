'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const EMAIL = 'bodavulasiddardha@gmail.com'
const GITHUB_URL = 'https://github.com/bodavulasiddardha-png'
const PHONE = '+91 8374324110'
const PHONE_HREF = 'tel:+918374324110'

type Inquiry = 'project' | 'role'

const SUBJECTS: Record<Inquiry, string> = {
  project: 'Project inquiry',
  role: 'Role inquiry',
}

export default function Contact() {
  const [inquiry, setInquiry] = useState<Inquiry>('project')

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECTS[inquiry])}`

  return (
    <section id="contact" className="relative section-pad py-24 sm:py-32">
      <Reveal>
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's talk"
          description="Tell me which kind of conversation this is, then reach out."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 max-w-xl">
          <div
            role="group"
            aria-label="Inquiry type"
            className="inline-flex rounded-full border border-surface-line bg-surface p-1"
          >
            {(['project', 'role'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setInquiry(type)}
                aria-pressed={inquiry === type}
                className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                  inquiry === type ? 'text-bg' : 'text-muted hover:text-ink'
                }`}
              >
                {inquiry === type && (
                  <motion.span
                    layoutId="inquiry-pill"
                    className="absolute inset-0 rounded-full bg-cyan"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {type === 'project' ? 'Project inquiry' : 'Role inquiry'}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={mailto}
              className="inline-flex w-fit items-center gap-3 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Email me — {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex w-fit items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              Call — {PHONE}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
