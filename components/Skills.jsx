'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Skills.module.css'

const categories = [
  {
    name: 'Data & Analysis',
    color: '#ff6b35',
    skills: ['Excel (Advanced)', 'Pivot Tables', 'Power Query', 'SQL', 'Python', 'Pandas', 'NumPy'],
  },
  {
    name: 'Visualisation',
    color: '#4fc3f7',
    skills: ['Power BI', 'Tableau', 'Dashboard Design', 'Data Storytelling'],
  },
  {
    name: 'AI & Automation',
    color: '#c084fc',
    skills: ['Claude API', 'Groq', 'n8n', 'Prompt Engineering', 'API Integration', 'GitHub Actions', 'Puppeteer'],
  },
  {
    name: 'Business',
    color: '#86efac',
    skills: ['Client Counselling', 'Stakeholder Communication', 'Requirements Gathering', 'P&L Basics', 'Admissions Consulting'],
  },
  {
    name: 'Soft Skills',
    color: '#fde047',
    skills: ['Analytical Thinking', 'Problem Solving', 'Entrepreneurship', 'Research Writing', 'Self-Management'],
  },
]

export default function Skills() {
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: i * 0.1,
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
    <section className={styles.skills}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>SKILLS</span>
          <h2 className={styles.title}>My Toolkit</h2>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
              style={{ '--cat-color': cat.color }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.icon} style={{ color: cat.color }}>
                  ◆
                </span>
                <span className={styles.categoryName}>{cat.name}</span>
              </div>

              <div className={styles.pills}>
                {cat.skills.map((skill) => (
                  <span key={skill} className={styles.pill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
