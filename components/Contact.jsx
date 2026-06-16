'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

const contactItems = [
  {
    label: 'Email',
    value: 'bodavulasiddardha@gmail.com',
    href: 'mailto:bodavulasiddardha@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 8374234110',
    href: 'tel:+918374234110',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/bodavulasiddardha-png',
    href: 'https://github.com/bodavulasiddardha-png',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Hyderabad / Chennai / Remote',
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function Contact() {
  const headerRef = useRef(null)
  const cardRef = useRef(null)
  const footerRef = useRef(null)

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

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>GET IN TOUCH</span>
          <h2 className={styles.title}>Let&apos;s Build Something</h2>
        </div>

        <div ref={cardRef} className={styles.card}>
          <div className={styles.availBadge}>
            <span className={styles.availDot} />
            <span className={styles.availText}>Available — June 2026</span>
          </div>

          <p className={styles.tagline}>
            Open to Data Analyst, Business Analyst &amp; AI Automation roles in
            Hyderabad, Chennai, or Remote.
          </p>

          <div className={styles.contactGrid}>
            {contactItems.map((item) => (
              <div key={item.label} className={styles.contactItem}>
                <span className={styles.iconWrap}>{item.icon}</span>
                <div>
                  <p className={styles.contactLabel}>{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={styles.contactValue}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className={styles.contactValue}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href="mailto:bodavulasiddardha@gmail.com"
            className={styles.ctaBtn}
          >
            Send an Email
          </a>
        </div>

        <p ref={footerRef} className={styles.footer}>
          Built with Next.js &middot; Three.js &middot; GSAP &middot; Designed &amp; developed by Siddardha
        </p>
      </div>
    </section>
  )
}
