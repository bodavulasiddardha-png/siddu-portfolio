'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { prefersReducedMotion } from '@/lib/gsap'

const VIDEO_SRC = '/videos/background.mp4'
const POSTER_SRC = '/videos/background-poster.jpg'

export default function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(prefersReducedMotion())
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.play().catch(() => {})
    }
  }, [reduced])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {reduced ? (
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
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
        />
      )}
    </div>
  )
}
