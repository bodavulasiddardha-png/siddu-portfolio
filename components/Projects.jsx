'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    number: '01',
    title: 'Unknown Bhaarath',
    subtitle: 'Autonomous Instagram Facts Agent',
    year: '2026',
    description:
      'Zero-touch AI pipeline that researches, fact-checks, designs, and publishes 3 daily Instagram posts with no human input.',
    highlights: [
      'Multi-model AI (Groq Llama 3.3 + Claude)',
      '4-layer content fallback chain',
      '20+ production edge cases fixed',
    ],
    tech: ['Node.js', 'Claude API', 'Groq', 'GitHub Actions', 'Puppeteer'],
    accent: '#ff6b35',
  },
  {
    number: '02',
    title: 'N8N AI Automation',
    subtitle: 'Intelligent Workflow Orchestration',
    year: '2026',
    description:
      'Production-grade AI automation workflows: Gmail triage agent with urgent Telegram alerts, and AI job-match scoring bot.',
    highlights: [
      'Gmail AI classify & auto-label',
      'Urgent Telegram alerts pipeline',
      'Job-match scoring out of 10',
    ],
    tech: ['n8n', 'Claude API', 'Gmail API', 'Telegram Bot', 'JavaScript'],
    accent: '#4fc3f7',
  },
  {
    number: '03',
    title: 'Driver Drowsiness Detection',
    subtitle: 'Published IoT Research System',
    year: '2026',
    description:
      'Real-time embedded IoT system using ESP32 and blink sensor to detect driver drowsiness and trigger smartphone alerts.',
    highlights: [
      'ESP32 + blink sensor hardware',
      'Smartphone alert trigger',
      'Published IJIRSET May 2026',
    ],
    tech: ['ESP32', 'Embedded C', 'Arduino IDE', 'IoT', 'IJIRSET'],
    accent: '#a78bfa',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const gridRef    = useRef(null)

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

      // Cards stagger from bottom
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 70,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: gridRef.current,
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
    <section className={styles.projects} ref={sectionRef} id="projects">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={titleRef}>
          <span className={styles.eyebrow}>PROJECTS</span>
          <h2 className={styles.title}>What I&apos;ve Built</h2>
        </div>

        {/* Cards grid */}
        <div className={styles.grid} ref={gridRef}>
          {PROJECTS.map((project) => (
            <article
              key={project.number}
              className={styles.card}
              style={{
                '--accent': project.accent,
                '--accent-glow': project.accent + '33',
              }}
            >
              {/* Colored top accent bar */}
              <div className={styles.accentBar} />

              {/* Dimmed card number */}
              <span className={styles.cardNumber}>{project.number}</span>

              {/* Card header */}
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardSubtitle}>{project.subtitle}</p>
                <span className={styles.year}>{project.year}</span>
              </div>

              {/* Description */}
              <p className={styles.description}>{project.description}</p>

              {/* Highlights */}
              <ul className={styles.highlights}>
                {project.highlights.map(h => (
                  <li key={h} className={styles.highlight}>{h}</li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className={styles.techRow}>
                {project.tech.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
