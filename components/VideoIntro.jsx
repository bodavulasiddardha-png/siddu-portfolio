'use client'

import { useEffect, useRef, useState } from 'react'
import CinematicLayer from './CinematicLayer'
import styles from './VideoIntro.module.css'

export default function VideoIntro() {
  const bgVideoRef = useRef(null)
  const fgVideoRef = useRef(null)
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const roleRef = useRef(null)
  const scrollRef = useRef(null)
  const navRef = useRef(null)

  const [muted, setMuted] = useState(true)

  /* ── Scroll unlock ── */
  useEffect(() => {
    document.documentElement.style.overflowY = 'scroll'
    document.documentElement.style.height = 'auto'
    document.body.style.overflowY = 'visible'
    document.body.style.height = 'auto'
    return () => {
      document.documentElement.style.overflowY = ''
      document.documentElement.style.height = ''
      document.body.style.overflowY = ''
      document.body.style.height = ''
    }
  }, [])

  /* ── GSAP entrance ── */
  useEffect(() => {
    let gsap, tl
    import('gsap').then(({ gsap: g }) => {
      gsap = g
      tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo(navRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .fromTo(eyebrowRef.current, { opacity: 0, letterSpacing: '0.6em' }, { opacity: 1, letterSpacing: '0.25em', duration: 1, ease: 'power3.out' }, '-=0.3')
        .fromTo(line1Ref.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, '-=0.6')
        .fromTo(line2Ref.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out' }, '-=1.0')
        .fromTo(roleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
    })
    return () => { tl && tl.kill() }
  }, [])

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    if (fgVideoRef.current) fgVideoRef.current.muted = next
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      {/* Blurred ambient bg video */}
      <video ref={bgVideoRef} className={styles.bgVideo}
        src="/hero-video.mp4" autoPlay loop muted playsInline preload="auto" aria-hidden="true" />

      {/* Foreground video */}
      <video ref={fgVideoRef} className={styles.fgVideo}
        src="/hero-video.mp4" autoPlay loop muted playsInline preload="auto" />

      {/* Particles */}
      <CinematicLayer />

      {/* Overlays */}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.overlayLeft} aria-hidden="true" />
      <div className={styles.overlayRight} aria-hidden="true" />
      <div className={styles.overlayBottom} aria-hidden="true" />

      {/* ── NAV ── */}
      <nav ref={navRef} className={styles.nav}>
        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('about')} className={styles.navLink}>ABOUT</button>
          <button onClick={() => scrollToSection('projects')} className={styles.navLink}>PROJECTS</button>
          <button onClick={() => scrollToSection('contact')} className={styles.navLink}>CONTACT</button>
        </div>
        <div className={styles.navRight}>
          <a href="mailto:bodavulasiddardha@gmail.com" className={styles.emailBtn}>EMAIL ME</a>
          <button onClick={toggleMute} className={styles.muteBtn} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── HERO TEXT ── */}
      <div className={styles.content}>
        <p ref={eyebrowRef} className={styles.eyebrow}>PORTFOLIO &nbsp;·&nbsp; 2026</p>

        <div className={styles.nameBlock}>
          <h1 ref={line1Ref} className={styles.nameLine1}>BODAVULA</h1>
          <h1 ref={line2Ref} className={styles.nameLine2}>SIDDARDHA</h1>
        </div>

        <p ref={roleRef} className={styles.role}>
          DATA ANALYST &nbsp;·&nbsp; BUSINESS ANALYST &nbsp;·&nbsp; AI BUILDER
        </p>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div ref={scrollRef} className={styles.scrollIndicator}>
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  )
}
