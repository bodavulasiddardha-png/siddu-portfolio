'use client'

import { useEffect, useState } from 'react'

/** Minimal persistent chrome for the chaptered layout: a wordmark and a live
 * chapter counter — not a five-link navbar, since the site is read in sequence. */
export default function TopChrome({ total }: { total: number }) {
  const [active, setActive] = useState(1)

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'))
    if (!chapters.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter))
        })
      },
      { threshold: 0.6 }
    )
    chapters.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 section-pad pointer-events-none">
      <div className="flex items-center justify-between py-6">
        <a href="#top" className="pointer-events-auto font-display text-lg tracking-tight text-ink hover:text-amber-bright transition-colors">
          Siddardha<span className="text-amber">.</span>
        </a>
        <span className="text-xs tracking-[0.3em] uppercase text-muted tabular-nums">
          {String(active).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </header>
  )
}
