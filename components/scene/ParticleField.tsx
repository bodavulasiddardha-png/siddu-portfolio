'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 1400
const AMBER = new THREE.Color('#ffa538')
const CYAN = new THREE.Color('#3fe7d6')

function buildFlowSeeds(count: number) {
  const seeds = new Float32Array(count * 4)
  for (let i = 0; i < count; i++) {
    const i4 = i * 4
    seeds[i4] = Math.random() // phase x
    seeds[i4 + 1] = Math.random() // phase y
    seeds[i4 + 2] = Math.random() // phase z
    seeds[i4 + 3] = 0.6 + Math.random() * 0.8 // per-particle speed/amplitude variance
  }
  return seeds
}

function buildChaos(count: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = 3.4 + Math.random() * 2.2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7
    positions[i3 + 2] = radius * Math.cos(phi)
  }
  return positions
}

function buildLattice(count: number) {
  const positions = new Float32Array(count * 3)
  const side = Math.round(Math.cbrt(count))
  const spacing = 4.6 / Math.max(side - 1, 1)
  let i = 0
  for (let x = 0; x < side && i < count; x++) {
    for (let y = 0; y < side && i < count; y++) {
      for (let z = 0; z < side && i < count; z++) {
        const i3 = i * 3
        positions[i3] = (x - (side - 1) / 2) * spacing
        positions[i3 + 1] = (y - (side - 1) / 2) * spacing
        positions[i3 + 2] = (z - (side - 1) / 2) * spacing
        i++
      }
    }
  }
  while (i < count) {
    const i3 = i * 3
    positions[i3] = 0
    positions[i3 + 1] = 0
    positions[i3 + 2] = 0
    i++
  }
  return positions
}

function useDotTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.55)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
    }
    return new THREE.CanvasTexture(canvas)
  }, [])
}

type Props = {
  progressRef: React.MutableRefObject<number>
  pointerRef: React.MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

export default function ParticleField({ progressRef, pointerRef, reducedMotion }: Props) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const rotation = useRef(0)
  const dotTexture = useDotTexture()

  const { chaos, lattice, flowSeeds } = useMemo(
    () => ({ chaos: buildChaos(COUNT), lattice: buildLattice(COUNT), flowSeeds: buildFlowSeeds(COUNT) }),
    []
  )

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(chaos.slice(), 3))
    return geo
  }, [chaos])

  const target = useMemo(() => new Float32Array(COUNT * 3), [])

  useFrame((state, delta) => {
    const pos = geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    const t = progressRef.current
    const time = state.clock.elapsedTime
    // Flow amplitude fades out as particles settle into the structured lattice,
    // so the pre-scroll state reads as a drifting current rather than a static starfield.
    const flowAmp = reducedMotion ? 0 : 0.4 * (1 - t)

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const i4 = i * 4
      let fx = 0
      let fy = 0
      let fz = 0
      if (flowAmp > 0.001) {
        const speed = flowSeeds[i4 + 3]
        const px = flowSeeds[i4] * Math.PI * 2
        const py = flowSeeds[i4 + 1] * Math.PI * 2
        const pz = flowSeeds[i4 + 2] * Math.PI * 2
        fx = Math.sin(time * 0.32 * speed + px) * flowAmp
        fy = Math.cos(time * 0.26 * speed + py) * flowAmp * 0.85
        fz = Math.sin(time * 0.21 * speed + pz) * flowAmp
      }
      target[i3] = chaos[i3] + (lattice[i3] - chaos[i3]) * t + fx
      target[i3 + 1] = chaos[i3 + 1] + (lattice[i3 + 1] - chaos[i3 + 1]) * t + fy
      target[i3 + 2] = chaos[i3 + 2] + (lattice[i3 + 2] - chaos[i3 + 2]) * t + fz
    }

    const lerpSpeed = reducedMotion ? 1 : Math.min(1, delta * 2.4)
    for (let i = 0; i < arr.length; i++) {
      arr[i] += (target[i] - arr[i]) * lerpSpeed
    }
    pos.needsUpdate = true

    if (materialRef.current) {
      materialRef.current.color.lerpColors(AMBER, CYAN, t)
    }

    if (pointsRef.current && !reducedMotion) {
      rotation.current += delta * 0.045
      pointsRef.current.rotation.y = rotation.current + pointerRef.current.x * 0.25
      pointsRef.current.rotation.x = pointerRef.current.y * 0.12
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        map={dotTexture}
        size={0.1}
        color="#ffa538"
        sizeAttenuation
        transparent
        opacity={0.92}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
