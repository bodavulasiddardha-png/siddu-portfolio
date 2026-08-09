'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react/dist/ssr'
import { prefersReducedMotion } from '@/lib/gsap'

const VIDEO_SRC = '/videos/intro.mp4'
const POSTER_SRC = '/videos/intro-poster.jpg'
const SKIP_DELAY_MS = 3000

export default function IntroSequence() {
  const [visible, setVisible] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [muted, setMuted] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const landmarksRef = useRef<Element[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDismissed(true)
      return
    }

    setVisible(true)
    document.body.style.overflow = 'hidden'
    landmarksRef.current = Array.from(document.querySelectorAll('header, main, footer'))
    landmarksRef.current.forEach((el) => el.setAttribute('inert', ''))

    const skipTimer = window.setTimeout(() => setCanSkip(true), SKIP_DELAY_MS)
    return () => window.clearTimeout(skipTimer)
  }, [])

  useEffect(() => {
    if (!visible) return
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play().catch(() => {})
    }
  }, [visible])

  const dismiss = () => {
    document.body.style.overflow = ''
    landmarksRef.current.forEach((el) => el.removeAttribute('inert'))
    setVisible(false)
  }

  useEffect(() => {
    if (!canSkip) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSkip])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
  }

  if (dismissed) return null

  return (
    <AnimatePresence onExitComplete={() => setDismissed(true)}>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-bg"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onError={dismiss}
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/30"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute intro video' : 'Mute intro video'}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 h-11 w-11 rounded-full bg-bg/60 backdrop-blur flex items-center justify-center text-ink hover:bg-bg/80 hover:text-cyan transition-colors"
          >
            {muted ? (
              <SpeakerSlash size={20} weight="regular" aria-hidden="true" />
            ) : (
              <SpeakerHigh size={20} weight="regular" aria-hidden="true" />
            )}
          </button>

          <AnimatePresence>
            {canSkip && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={dismiss}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 rounded-full border border-surface-line bg-bg/60 backdrop-blur px-6 py-3 text-sm font-semibold text-ink hover:border-cyan hover:text-cyan transition-colors"
              >
                Skip intro
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
