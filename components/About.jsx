'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

const SKILLS = [
  {
    category: 'DATA & ANALYSIS',
    tags: ['Excel (Advanced)', 'Pivot Tables', 'Power Query', 'SQL', 'Python', 'Pandas', 'NumPy'],
  },
  {
    category: 'VISUALISATION',
    tags: ['Power BI', 'Tableau', 'Dashboard Design', 'Data Storytelling'],
  },
  {
    category: 'AI & AUTOMATION',
    tags: ['Claude API', 'Groq', 'n8n', 'Prompt Engineering', 'API Integration', 'GitHub Actions', 'Puppeteer'],
  },
  {
    category: 'BUSINESS',
    tags: ['Client Counselling', 'Stakeholder Communication', 'Requirements Gathering', 'P&L Basics'],
  },
  {
    category: 'SOFT SKILLS',
    tags: ['Analytical Thinking', 'Problem Solving', 'Entrepreneurship', 'Research Writing'],
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const bioRef = useRef(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }
    )
    .fromTo(bioRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(skillsRef.current?.querySelectorAll('[data-row]') || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
      '-=0.3'
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>

        {/* Giant heading — Harsh Goyal style */}
        <h2 ref={headingRef} className={styles.heading}>ABOUT ME</h2>

        {/* Bio */}
        <p ref={bioRef} className={styles.bio}>
          Final-year B.Tech CSE student at Bharath University, Chennai (2026).
          I specialise in <strong>Data Analysis</strong>, <strong>Business Intelligence</strong>, and{' '}
          <strong>AI Automation</strong> — turning raw data into strategic decisions.
          As an entrepreneur, I built and deployed{' '}
          <a href="https://edunovaconsultancy.in" target="_blank" rel="noopener noreferrer" className={styles.link}>
            edunovaconsultancy.in
          </a>{' '}
          and published research on driver drowsiness detection in IJIRSET (May 2026).
          Open to Data Analyst, Business Analyst &amp; AI roles in Hyderabad, Chennai, or Remote.
        </p>

        {/* Categorised skill rows */}
        <div ref={skillsRef} className={styles.skillsTable}>
          {SKILLS.map(({ category, tags }) => (
            <div key={category} data-row className={styles.skillRow}>
              <span className={styles.catLabel}>{category}</span>
              <div className={styles.tags}>
                {tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
