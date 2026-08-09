'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import HeroVideoCard from './HeroVideoCard'

const HeroScene = dynamic(() => import('./scene/HeroScene'), { ssr: false })

export default function Hero() {
  const roleRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reduced ? 0 : 0.3 })
      const dur = reduced ? 0.01 : undefined

      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: dur ?? 1, ease: 'power3.out' }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: dur ?? 1.2, ease: 'expo.out' },
          reduced ? '<' : '-=0.6'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: dur ?? 0.9, ease: 'power2.out' },
          reduced ? '<' : '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: dur ?? 0.9, ease: 'power2.out' },
          reduced ? '<' : '-=0.5'
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: dur ?? 0.8 },
          reduced ? '<' : '-=0.3'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      className="relative h-[100dvh] w-full overflow-hidden bg-bg flex items-center"
    >
      <HeroScene />

      {/* Cinematic gradient overlay so text stays legible over the 3D scene */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40 pointer-events-none"
        aria-hidden="true"
      />
      {/* The hero object sits right-of-center; darken the left text column so it stays legible over it */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-bg from-0% via-bg/55 via-40% to-transparent to-72% pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full section-pad">
        <div className="max-w-4xl">
          <p
            ref={roleRef}
            className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm tracking-[0.3em] text-amber uppercase font-medium mb-6"
          >
            <span className="whitespace-nowrap">AI Builder</span>
            <span className="whitespace-nowrap">· AI Associate</span>
            <span className="whitespace-nowrap">· Data → Decisions</span>
          </p>

          <h1
            ref={nameRef}
            className="font-display text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink text-balance"
          >
            Siddardha
            <br />
            Bodavula
          </h1>

          <p
            ref={taglineRef}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted text-balance"
          >
            I build AI-powered websites, automation and agents for clients —
            and bring the same systems thinking to data &amp; AI roles on a team.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Hire me for a project
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-surface-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-cyan hover:text-cyan"
            >
              Hiring for a role? See my work
            </a>
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-muted to-transparent motion-safe:animate-pulse" />
      </div>

      <HeroVideoCard />
    </section>
  )
}
