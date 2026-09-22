'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/** Wraps a single interactive child (a link/button) and nudges it toward the cursor
 * on hover — a small, restrained version of the "magnetic button" seen on most
 * Awwwards-tier sites, instead of a plain static pill. */
export default function Magnetic({ children, className, strength = 0.35 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * strength)
      y((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const reset = () => {
      x(0)
      y(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', reset)
    }
  }, [strength])

  return (
    <div ref={ref} className={`inline-block ${className ?? ''}`}>
      {children}
    </div>
  )
}
