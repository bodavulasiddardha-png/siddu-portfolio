'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroObject from './HeroObject'

export default function HeroScene() {
  const progressRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onMotionChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onMotionChange)

    const heroHeight = window.innerHeight
    const onScroll = () => {
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / (heroHeight * 1.1)))
    }
    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      mq.removeEventListener('change', onMotionChange)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <Suspense fallback={null}>
        <HeroObject progressRef={progressRef} pointerRef={pointerRef} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  )
}
