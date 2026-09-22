'use client'

import StackCard from './ui/StackCard'
import Magnetic from './ui/Magnetic'

const EMAIL = 'bodavulasiddardha@gmail.com'
const GITHUB_URL = 'https://github.com/bodavulasiddardha-png'
const PHONE = '+91 8374234110'
const PHONE_HREF = 'tel:+918374234110'
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Role inquiry')}`

export default function Contact({ index }: { index: number }) {
  return (
    <StackCard id="contact" index={index} label="Get in touch" accent="deep">
      <div className="text-center max-w-xl mx-auto mt-4">
        <h2 className="font-display text-4xl sm:text-6xl text-ink text-balance">
          Open to <span className="text-gradient">AI Automation, AI Engineer</span> &amp; Agentic AI roles.
        </h2>
        <p className="mt-6 text-muted">Reach out — happy to walk through any of the work above on a call.</p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Magnetic>
            <a
              href={MAILTO}
              className="inline-flex items-center gap-3 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Email me — {EMAIL}
            </a>
          </Magnetic>
          <a href={PHONE_HREF} className="text-sm text-muted hover:text-ink transition-colors">
            Call — {PHONE}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-ink transition-colors">
            GitHub ↗
          </a>
        </div>

        <p className="mt-16 text-xs tracking-[0.2em] uppercase text-muted-dim">
          Portfolio by Siddardha Bodavula · Next.js, Three.js &amp; GSAP
        </p>
      </div>
    </StackCard>
  )
}
