'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CinematicLayer() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: mountRef.current,
      alpha: true,
      antialias: false,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    // Particle counts
    const warmCount = 180
    const coolCount = 60
    const totalCount = warmCount + coolCount

    // Geometry
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(totalCount * 3)
    const colors = new Float32Array(totalCount * 3)
    const velocities = new Float32Array(totalCount * 3)
    const phases = new Float32Array(totalCount)
    const amplitudes = new Float32Array(totalCount)

    // Warm orange particles (0 to warmCount-1)
    for (let i = 0; i < warmCount; i++) {
      const ix = i * 3
      positions[ix] = (Math.random() - 0.5) * 12
      positions[ix + 1] = (Math.random() - 0.5) * 8
      positions[ix + 2] = (Math.random() - 0.5) * 4

      // Orange tones: #ff6b35 variants
      colors[ix] = 1.0
      colors[ix + 1] = 0.3 + Math.random() * 0.3
      colors[ix + 2] = 0.05 + Math.random() * 0.15

      velocities[ix] = 0
      velocities[ix + 1] = 0.005 + Math.random() * 0.012
      velocities[ix + 2] = 0

      phases[i] = Math.random() * Math.PI * 2
      amplitudes[i] = 0.3 + Math.random() * 0.6
    }

    // Cool white/blue particles (warmCount to totalCount-1)
    for (let i = warmCount; i < totalCount; i++) {
      const ix = i * 3
      positions[ix] = (Math.random() - 0.5) * 12
      positions[ix + 1] = (Math.random() - 0.5) * 8
      positions[ix + 2] = (Math.random() - 0.5) * 4

      // Blue-white tones: #4fc3f7 variants
      const whiteness = Math.random()
      colors[ix] = whiteness > 0.5 ? 0.7 + whiteness * 0.3 : 0.31
      colors[ix + 1] = whiteness > 0.5 ? 0.7 + whiteness * 0.3 : 0.76
      colors[ix + 2] = whiteness > 0.5 ? 0.9 : 0.97

      velocities[ix] = 0
      velocities[ix + 1] = 0.004 + Math.random() * 0.008
      velocities[ix + 2] = 0

      phases[i] = Math.random() * Math.PI * 2
      amplitudes[i] = 0.2 + Math.random() * 0.4
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Material with vertex colors and additive blending
    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse parallax
    const mouse = { x: 0, y: 0 }
    const targetCamPos = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation
    const clock = new THREE.Clock()
    let elapsed = 0
    let rafId

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      elapsed += delta

      const pos = geometry.attributes.position.array

      for (let i = 0; i < totalCount; i++) {
        const ix = i * 3

        // Float upward
        pos[ix + 1] += velocities[ix + 1]

        // Sine drift on X
        pos[ix] += Math.sin(elapsed * 0.5 + phases[i]) * amplitudes[i] * 0.003

        // Wrap Y (top boundary)
        if (pos[ix + 1] > 4.5) {
          pos[ix + 1] = -4.5
          pos[ix] = (Math.random() - 0.5) * 12
        }

        // Wrap X edges
        if (pos[ix] > 6) pos[ix] = -6
        if (pos[ix] < -6) pos[ix] = 6
      }

      geometry.attributes.position.needsUpdate = true

      // Lerp camera toward mouse with parallax
      targetCamPos.x += (mouse.x * 0.5 - targetCamPos.x) * 0.04
      targetCamPos.y += (mouse.y * 0.5 - targetCamPos.y) * 0.04
      camera.position.x = targetCamPos.x
      camera.position.y = targetCamPos.y

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  )
}
