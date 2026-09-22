'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/** The gate's own atmosphere: the real foggy-gate video, warm-graded to the dark-gold
 * theme, with a sweeping light ray, grain and cursor-parallax on top — real footage, not
 * procedural geometry, kept dim enough that the text stays the focal point. */
export default function GateAtmosphere() {
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !videoRef.current) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    const xTo = gsap.quickTo(videoRef.current, 'x', { duration: 1.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(videoRef.current, 'y', { duration: 1.4, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      xTo(-nx * 16)
      yTo(-ny * 12)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={videoRef} className="absolute inset-[-4%] gate-kenburns">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover gate-photo-grade">
          <source src="/videos/gate-fog.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="gate-colorwash absolute inset-0" />
      <div className="gate-rays" />
      <div className="gate-grain" />
      <div className="gate-vignette absolute inset-0" />
    </div>
  )
}
