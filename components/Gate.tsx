'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import SplitWords from './ui/SplitWords'
import Magnetic from './ui/Magnetic'
import GateAtmosphere from './GateAtmosphere'

/** The gated entry: a full-screen title card over the real foggy-gate video that opens into
 * the stacking-card portfolio. */
export default function Gate({ onEnter }: { onEnter: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reduced ? 0 : 0.2 })
      const dur = reduced ? 0.01 : undefined
      tl.fromTo(roleRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: dur ?? 0.9, ease: 'power3.out' })
        .fromTo(taglineRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: dur ?? 0.9, ease: 'power2.out' }, reduced ? '<' : '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: dur ?? 0.9, ease: 'power2.out' }, reduced ? '<' : '-=0.5')
    })
    return () => ctx.revert()
  }, [])

  const enter = () => {
    if (leaving) return
    setLeaving(true)
    document.body.style.overflow = ''
    const reduced = prefersReducedMotion()
    if (reduced || !rootRef.current) {
      onEnter()
      return
    }
    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: onEnter,
    })
  }

  return (
    <div ref={rootRef} className="fixed inset-0 z-40 h-[100dvh] w-screen overflow-hidden flex items-center">
      <GateAtmosphere />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-bg/15 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 via-[42%] to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full section-pad">
        <div className="max-w-3xl">
          <p ref={roleRef} className="font-display italic text-2xl sm:text-3xl text-amber-bright mb-2">
            The
          </p>
          <h1
            className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] tracking-tight text-ink uppercase"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5)' }}
          >
            <SplitWords as="span" text="AI Automation" />
            <br />
            <SplitWords as="span" text="Builder" delay={0.1} />
          </h1>

          <p
            ref={taglineRef}
            className="mt-8 max-w-xl text-base sm:text-lg text-ink/85 text-balance"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
          >
            Siddardha Bodavula — I build AI agents, automation pipelines and agentic systems
            that ship to production. Open to AI Automation, AI Engineer and Agentic AI roles.
          </p>

          <div ref={ctaRef} className="mt-10">
            <Magnetic>
              <button
                onClick={enter}
                className="inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-bg shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Enter portfolio
                <span aria-hidden="true">→</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  )
}
