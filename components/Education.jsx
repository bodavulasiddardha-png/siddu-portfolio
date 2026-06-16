'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Education.module.css'

const entries = [
  {
    year: '2022 – 2026',
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Bharath University',
    location: 'Chennai, Tamil Nadu',
    badge: 'Final Year',
    badgeColor: '#ff6b35',
    note: 'Specialisation: Data Analytics · AI · Business Intelligence',
  },
  {
    year: '2020 – 2022',
    degree: 'Intermediate — MPC (Maths, Physics, Chemistry)',
    institution: 'Sri Chaitanya Junior College',
    location: 'Eluru, Andhra Pradesh',
    badge: 'Completed',
    badgeColor: '#86efac',
    note: null,
  },
  {
    year: '2020',
    degree: 'SSC — Secondary School Certificate',
    institution: 'ZPHS Bhujabalapatnam',
    location: 'Andhra Pradesh',
    badge: 'Completed',
    badgeColor: '#86efac',
    note: null,
  },
]

export default function Education() {
  const headerRef = useRef(null)
  const entryRefs = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    entryRefs.current.forEach((entry, i) => {
      if (!entry) return
      gsap.fromTo(
        entry,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className={styles.education}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>EDUCATION</span>
          <h2 className={styles.title}>Academic Foundation</h2>
        </div>

        <div className={styles.timeline}>
          {entries.map((entry, i) => (
            <div
              key={entry.institution}
              ref={(el) => (entryRefs.current[i] = el)}
              className={styles.entry}
            >
              <div className={styles.dotWrapper}>
                <div className={styles.dotGlow} />
                <div className={styles.dot} />
                {i < entries.length - 1 && <div className={styles.connector} />}
              </div>

              <div className={styles.card}>
                <p className={styles.year}>{entry.year}</p>

                <div className={styles.cardHeader}>
                  <h3 className={styles.degree}>{entry.degree}</h3>
                  <span
                    className={styles.badge}
                    style={{
                      color: entry.badgeColor,
                      borderColor: entry.badgeColor,
                      background: `${entry.badgeColor}18`,
                    }}
                  >
                    {entry.badge}
                  </span>
                </div>

                <p className={styles.institution}>{entry.institution}</p>
                <p className={styles.location}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {entry.location}
                </p>

                {entry.note && <p className={styles.note}>{entry.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
