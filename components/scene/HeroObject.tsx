'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const AMBER = '#ffa538'
const CYAN = '#3fe7d6'

function useGlowTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
      gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.25)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 128, 128)
    }
    return new THREE.CanvasTexture(canvas)
  }, [])
}

type Props = {
  progressRef: React.MutableRefObject<number>
  pointerRef: React.MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

export default function HeroObject({ progressRef, pointerRef, reducedMotion }: Props) {
  const groupRef = useRef<THREE.Group>(null)
  const keyLightRef = useRef<THREE.DirectionalLight>(null)
  const rimLightRef = useRef<THREE.DirectionalLight>(null)
  const rotation = useRef({ x: 0.4, y: 0.2 })
  const glowTexture = useGlowTexture()

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), [])

  useFrame((state, delta) => {
    const t = progressRef.current
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      if (!reducedMotion) {
        rotation.current.y += delta * (0.18 + t * 0.22)
        rotation.current.x += delta * 0.05
        groupRef.current.rotation.y = rotation.current.y + pointerRef.current.x * 0.35
        groupRef.current.rotation.x = rotation.current.x + pointerRef.current.y * 0.2
        groupRef.current.position.y = Math.sin(time * 0.35) * 0.12 - t * 0.3
        groupRef.current.position.x = 1.1 + t * 0.15
      } else {
        groupRef.current.rotation.set(0.45, 0.65, 0)
        groupRef.current.position.set(1.1, 0, 0)
      }
    }

    if (keyLightRef.current && rimLightRef.current) {
      // Amber key light stays dominant at rest; cyan rim brightens as the
      // page scrolls into the "structured/active" state.
      keyLightRef.current.intensity = reducedMotion ? 3.4 : 3 + (1 - t) * 0.8
      rimLightRef.current.intensity = reducedMotion ? 2.2 : 1.6 + t * 2.2
    }
  })

  return (
    <>
      <fog attach="fog" args={['#06070d', 5, 13]} />
      <ambientLight intensity={0.8} color="#4a5070" />
      <directionalLight ref={keyLightRef} position={[3, 2.5, 4]} color={AMBER} intensity={3} />
      <directionalLight ref={rimLightRef} position={[-3, -1, -2.5]} color={CYAN} intensity={1.6} />
      <directionalLight position={[0, 4, -2]} color="#ffffff" intensity={0.5} />

      {/* Soft nebula-glow backdrops, cheap sprites instead of a particle field */}
      <sprite position={[-2.2, 1.2, -4]} scale={[7, 7, 1]}>
        <spriteMaterial
          map={glowTexture}
          color={AMBER}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <sprite position={[2.6, -1.4, -5]} scale={[8, 8, 1]}>
        <spriteMaterial
          map={glowTexture}
          color={CYAN}
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <group ref={groupRef} position={[1.1, 0, 0]}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#282c3a"
            flatShading
            metalness={0.45}
            roughness={0.38}
            emissive="#2a1608"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </>
  )
}
