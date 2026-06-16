'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Experience.module.css'

const ENTRIES = [
  {
    period: '2024 – 2025',
    role: 'Independent Admissions Consultant',
    company: 'Self-employed · Bharath University, Chennai',
    badge: 'Part-time',
    bullets: [
      'Counselled 50+ students and parents on engineering college admissions',
      'Built Excel enrollment database; analyzed admission & lead conversion trends',
      'Designed and deployed edunovaconsultancy.in from scratch (AI-assisted dev)',
      'Integrated Google Sheets enquiry form, college listings, printable PDF brochure',
      'Set up Google Analytics 4 (GA4) tracking for visitor behaviour analysis',
    ],
  },
  {
    period: '2025 – Present',
    role: 'Web Developer & Digital Solutions',
    company: 'Edunova Consultancy · Freelance',
    badge: 'Freelance',
    bullets: [
      'End-to-end web development: design, development, deployment (GitHub Pages)',
      'AI-assisted development workflow for rapid iteration',
      'SEO optimisation and conversion-focused UI design',
    ],
  },
]

export default function Experience() {
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const entriesRef  = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      })

      // Timeline entries stagger
      gsap.from(entriesRef.current.children, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.22,
        scrollTrigger: {
          trigger: entriesRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className={styles.experience} ref={sectionRef} id="experience">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={titleRef}>
          <span className={styles.eyebrow}>EXPERIENCE</span>
          <h2 className={styles.title}>Where I&apos;ve Worked</h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true" />

          <div ref={entriesRef} className={styles.entries}>
            {ENTRIES.map((entry) => (
              <div key={entry.role} className={styles.entry}>
                {/* Orange dot on the line */}
                <div className={styles.dot} aria-hidden="true" />

                <div className={styles.entryContent}>
                  <div className={styles.meta}>
                    <span className={styles.period}>{entry.period}</span>
                    <span className={styles.badge}>{entry.badge}</span>
                  </div>

                  <h3 className={styles.role}>{entry.role}</h3>
                  <p className={styles.company}>{entry.company}</p>

                  <ul className={styles.bullets}>
                    {entry.bullets.map(b => (
                      <li key={b} className={styles.bullet}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
