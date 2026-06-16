'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

const STATS = [
  { number: '3+', label: 'Projects' },
  { number: '4',  label: 'Certifications' },
  { number: '1',  label: 'Research Paper' },
]

const HIGHLIGHTS = [
  '50+ students counselled on admissions',
  'Deployed full production website from scratch',
  'Published research paper (IJIRSET 2026)',
  'Multi-cloud AI automation workflows built',
]

export default function About() {
  const sectionRef   = useRef(null)
  const titleRef     = useRef(null)
  const leftRef      = useRef(null)
  const rightRef     = useRef(null)
  const statsRef     = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Title fade-in
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

      // Left column slide up
      gsap.from(leftRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 80%',
        },
      })

      // Right column slide up with slight delay
      gsap.from(rightRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        delay: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
        },
      })

      // Stat cards pop in with stagger
      gsap.from(statsRef.current.children, {
        opacity: 0,
        scale: 0.82,
        y: 30,
        duration: 0.7,
        ease: 'back.out(1.6)',
        stagger: 0.14,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 88%',
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className={styles.about} ref={sectionRef} id="about">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={titleRef}>
          <span className={styles.eyebrow}>ABOUT ME</span>
          <h2 className={styles.title}>The Analyst Behind the Data</h2>
        </div>

        {/* Two-column grid */}
        <div className={styles.grid}>
          {/* LEFT — Profile card */}
          <div ref={leftRef}>
            <div className={styles.profileCard}>
              <div className={styles.monogram}>SB</div>
              <div className={styles.nameBlock}>
                <p className={styles.fullName}>Bodavula Naga Venkata Siddardha</p>
                <div className={styles.chips}>
                  <span className={styles.chip}>Data Analyst</span>
                  <span className={styles.chip}>Business Analyst</span>
                  <span className={styles.chip}>AI Builder</span>
                </div>
              </div>
              <blockquote className={styles.quote}>
                &ldquo;Turning data into decisions &mdash; one dashboard at a time.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* RIGHT — Bio text */}
          <div className={styles.content} ref={rightRef}>
            <p className={styles.para}>
              Final-year B.Tech CSE student at Bharath University, Chennai (2026),
              specialising in Data Analysis, Business Intelligence, and AI Automation.
            </p>
            <p className={styles.para}>
              Hands-on with Excel, SQL, Power BI, Tableau, and Python. I bridge the gap
              between raw data and strategic decisions.
            </p>
            <p className={styles.para}>
              As a founder, I built and deployed{' '}
              <a
                href="https://edunovaconsultancy.in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                edunovaconsultancy.in
              </a>{' '}
              &mdash; an AI-assisted platform with Google Analytics tracking. Published
              researcher in driver drowsiness detection (IJIRSET, May 2026).
            </p>

            <ul className={styles.highlights}>
              {HIGHLIGHTS.map(h => (
                <li key={h} className={styles.highlight}>
                  <span className={styles.dot} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stat cards */}
        <div className={styles.stats} ref={statsRef}>
          {STATS.map(s => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statNumber}>{s.number}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
