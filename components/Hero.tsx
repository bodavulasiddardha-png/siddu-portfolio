'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fgVideoRef = useRef<HTMLVideoElement>(null)
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const muteRef = useRef<HTMLButtonElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const [muted, setMuted] = useState(true)
  const [showBadge, setShowBadge] = useState(true)

  /* ── Three.js particles ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 5

    /* Create particles */
    const COUNT = 220
    const positions = new Float32Array(COUNT * 3)
    const velocities: { x: number; y: number; z: number }[] = []

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 12
      positions[i3 + 2] = (Math.random() - 0.5) * 8
      velocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: Math.random() * 0.006 + 0.002,
        z: (Math.random() - 0.5) * 0.002,
      })
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    /* Warm orange palette */
    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#ff7040'),
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const pos = geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      const t = clock.getElapsedTime()

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3
        arr[i3] += velocities[i].x + Math.sin(t * 0.3 + i) * 0.0015
        arr[i3 + 1] += velocities[i].y
        arr[i3 + 2] += velocities[i].z

        /* Wrap-around */
        if (arr[i3 + 1] > 7) arr[i3 + 1] = -7
        if (arr[i3] > 11) arr[i3] = -11
        if (arr[i3] < -11) arr[i3] = 11
      }
      pos.needsUpdate = true

      particles.rotation.y = t * 0.012
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  /* ── GSAP entrance animation ── */
  useEffect(() => {
    const role = roleRef.current
    const name = nameRef.current
    const tagline = taglineRef.current
    const mute = muteRef.current
    const scroll = scrollIndicatorRef.current

    if (!role || !name || !tagline || !mute || !scroll) return

    const tl = gsap.timeline({ delay: 0.4 })

    tl.fromTo(
      role,
      { opacity: 0, letterSpacing: '0.6em', y: -20 },
      { opacity: 1, letterSpacing: '0.25em', y: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        name,
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: 'expo.out' },
        '-=0.7'
      )
      .fromTo(
        tagline,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        mute,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        scroll,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
  }, [])

  /* ── Auto-hide "Tap for sound" badge ── */
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  /* ── Mute toggle ── */
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      if (fgVideoRef.current) fgVideoRef.current.muted = next
      return next
    })
    setShowBadge(false)
  }, [])

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Ambient blurred background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Foreground video */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Three.js particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Dark cinematic gradient overlay */}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.vignetteLeft} aria-hidden="true" />
      <div className={styles.vignetteRight} aria-hidden="true" />

      {/* Text content */}
      <div ref={textRef} className={styles.content}>
        <p ref={roleRef} className={styles.role}>
          DATA ANALYST&nbsp;&nbsp;·&nbsp;&nbsp;BUSINESS ANALYST&nbsp;&nbsp;·&nbsp;&nbsp;AI BUILDER
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
        ref={muteRef}
        className={styles.muteBtn}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          /* Speaker muted icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Speaker on icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* Tap for sound badge */}
      <div
        ref={badgeRef}
        className={`${styles.soundBadge} ${showBadge ? styles.soundBadgeVisible : styles.soundBadgeHidden}`}
        aria-hidden="true"
      >
        <span className={styles.soundDot} />
        Tap for sound
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-label="Scroll down">
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  )
}
