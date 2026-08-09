'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/gsap'

const VIDEO_SRC = '/videos/intro.mp4'
const POSTER_SRC = '/videos/intro-poster.jpg'

export default function HeroVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    setReduced(prefersReducedMotion())
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      : window.setTimeout(() => setReady(true), 300)

    return () => {
      mq.removeEventListener('change', onChange)
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready || reduced) return
    video.muted = true
    video.play().catch(() => {})
  }, [ready, reduced])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-16 z-10 w-20 sm:w-32 md:w-40 lg:w-48 aspect-[3/4] rounded-2xl overflow-hidden border border-surface-line bg-surface shadow-glow"
    >
      {ready && !reduced ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
        />
      ) : (
        <Image
          src={POSTER_SRC}
          alt="Siddardha Bodavula — intro"
          fill
          sizes="(max-width: 640px) 5rem, (max-width: 768px) 8rem, 12rem"
          className="object-cover"
        />
      )}

      {!reduced && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute intro video' : 'Mute intro video'}
          className="absolute bottom-2 right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-bg/70 backdrop-blur flex items-center justify-center text-ink hover:bg-bg/90 transition-colors"
        >
          {muted ? <IconMuted /> : <IconSound />}
        </button>
      )}
    </motion.div>
  )
}

function IconMuted() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M17 9l4 6M21 9l-4 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSound() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
