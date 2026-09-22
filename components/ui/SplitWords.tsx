'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/** Each word slides up out of a mask — the headline visibly assembles itself instead of
 * just fading in. Reused per-word (not per-character) so it stays crisp at hero scale. */
export default function SplitWords({
  text,
  className,
  delay = 0,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'h1' | 'p'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const words = root.querySelectorAll<HTMLElement>('.split-word > span')
    if (prefersReducedMotion()) {
      gsap.set(words, { yPercent: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 130, opacity: 0, filter: 'blur(10px)' },
        { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.3, ease: 'power4.out', stagger: 0.09, delay }
      )
    }, root)
    return () => ctx.revert()
  }, [delay])

  return (
    // @ts-expect-error -- Tag is a dynamic intrinsic element
    <Tag ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word">
          <span>{word}</span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
