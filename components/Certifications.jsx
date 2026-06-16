'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Certifications.module.css'

const certs = [
  {
    issuer: 'Deloitte Australia',
    via: 'Forage Job Simulation',
    name: 'Data Analytics Job Simulation',
    date: 'Mar 2026',
    color: '#86efac',
    description:
      'Analyzed 160,704 rows of factory telemetry data. Built Tableau downtime dashboard. Conducted Excel forensic analysis.',
  },
  {
    issuer: 'Tata Group',
    via: 'Forage Job Simulation',
    name: 'Data Visualisation Job Simulation',
    date: 'Mar 2026',
    color: '#4fc3f7',
    description:
      'Created 4 Tableau visualizations on retail revenue data presented to CEO/CMO stakeholders.',
  },
  {
    issuer: 'HackerRank',
    via: 'Verified Credential',
    name: 'SQL Basic & Intermediate',
    date: 'Mar 2026',
    color: '#ff6b35',
    description:
      'Verified proficiency: JOINs, aggregates, GROUP BY/HAVING, subqueries, multi-table analysis.',
  },
  {
    issuer: 'Anthropic',
    via: 'Official Certification',
    name: 'AI Fluency: Framework & Foundations + Claude 101',
    date: '2026',
    color: '#c084fc',
    description:
      'Comprehensive AI literacy: prompting, AI systems design, Claude API usage, responsible AI principles.',
  },
]

export default function Certifications() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardRefs = useRef([])

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

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
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
    <section ref={sectionRef} className={styles.certifications}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>CERTIFICATIONS</span>
          <h2 className={styles.title}>Verified Skills</h2>
        </div>

        <div className={styles.grid}>
          {certs.map((cert, i) => (
            <div
              key={cert.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
              style={{ '--accent-color': cert.color }}
            >
              <div className={styles.cardTop}>
                <span
                  className={styles.accent}
                  style={{ background: cert.color }}
                />
                <div>
                  <p className={styles.issuer}>{cert.issuer}</p>
                  <p className={styles.via}>{cert.via}</p>
                </div>
              </div>

              <p className={styles.certName}>{cert.name}</p>

              <span className={styles.datePill}>{cert.date}</span>

              <p className={styles.description}>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
