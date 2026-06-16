'use client'

import { useEffect, useRef, useState } from 'react'
import CinematicLayer from './CinematicLayer'
import styles from './VideoIntro.module.css'

export default function VideoIntro() {
  const bgVideoRef = useRef(null)
  const fgVideoRef = useRef(null)
  const roleRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const muteBtnRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const [muted, setMuted] = useState(true)
  const [showBadge, setShowBadge] = useState(true)

  // Runtime scroll unlock
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    html.style.overflowY = 'scroll'
    html.style.height = 'auto'
    body.style.overflowY = 'visible'
    body.style.height = 'auto'

    return () => {
      html.style.overflowY = ''
      html.style.height = ''
      body.style.overflowY = ''
      body.style.height = ''
    }
  }, [])

  // Sound badge auto-hide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // GSAP entrance timeline
  useEffect(() => {
    let gsap
    let tl

    const initGSAP = async () => {
      const mod = await import('gsap')
      gsap = mod.gsap || mod.default

      tl = gsap.timeline({ delay: 0.4 })

      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { letterSpacing: '0.6em', opacity: 0 },
          {
            letterSpacing: '0.25em',
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
          }
        )
      }

      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          { y: 80, skewY: 4, opacity: 0 },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'expo.out',
          },
          '-=0.8'
        )
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
          '-=0.6'
        )
      }

      if (muteBtnRef.current) {
        tl.fromTo(
          muteBtnRef.current,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' },
          '-=0.4'
        )
      }

      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
      }
    }

    initGSAP()

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  const handleMuteToggle = () => {
    const newMuted = !muted
    setMuted(newMuted)
    if (bgVideoRef.current) bgVideoRef.current.muted = newMuted
    if (fgVideoRef.current) fgVideoRef.current.muted = newMuted
  }

  return (
    <section className={styles.hero} id="home">
      {/* Background blurred ambient video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
        src="/videos/hero-bg.mp4"
      />

      {/* Foreground crisp video */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        autoPlay
        loop
        muted
        playsInline
        src="/videos/hero-fg.mp4"
      />

      {/* Cinematic overlays */}
      <div className={styles.overlay} />
      <div className={styles.vignetteLeft} />
      <div className={styles.vignetteRight} />

      {/* Three.js particles */}
      <CinematicLayer />

      {/* Hero content */}
      <div className={styles.content}>
        <p ref={roleRef} className={styles.role}>
          DATA ANALYST &middot; BUSINESS ANALYST &middot; AI BUILDER
        </p>

        <h1 ref={nameRef} className={styles.name}>
          SIDDARDHA
        </h1>

        <p ref={taglineRef} className={styles.tagline}>
          Turning Data into Decisions
        </p>
      </div>

      {/* Mute / Unmute button */}
      <button
        ref={muteBtnRef}
        className={styles.muteBtn}
        onClick={handleMuteToggle}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          /* Muted speaker icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Active speaker icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* Sound badge */}
      <div
        className={`${styles.soundBadge} ${showBadge ? styles.soundBadgeVisible : styles.soundBadgeHidden}`}
      >
        <span className={styles.soundDot} />
        <span>Tap for sound</span>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  )
}
