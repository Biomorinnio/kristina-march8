'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Build a centered heart geometry ───────────────────────────────────────
function buildHeartGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()

  // Coordinates from Three.js official heart example, scaled to ~unit size
  const x = 0, y = 0
  shape.moveTo(x + 0.5, y + 0.5)
  shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y)
  shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7)
  shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9)
  shape.bezierCurveTo(x + 1.3, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7)
  shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y)
  shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5)

  const extrudeSettings = {
    depth: 0.22,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  }

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geo.center()        // center at origin
  geo.computeVertexNormals()
  return geo
}

// ─── Shared geometry (created once) ───────────────────────────────────────
let sharedGeo: THREE.BufferGeometry | null = null
function getSharedGeo() {
  if (!sharedGeo) sharedGeo = buildHeartGeometry()
  return sharedGeo
}

// ─── Single heart ──────────────────────────────────────────────────────────
interface HeartProps {
  position: [number, number, number]
  scale: number
  speed: number
  phase: number
  color: string
}

function Heart({ position, scale, speed, phase, color }: HeartProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => getSharedGeo(), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    meshRef.current.rotation.y = Math.sin(t * speed + phase) * 0.45
    meshRef.current.rotation.z = Math.sin(t * speed * 0.4 + phase) * 0.08
    meshRef.current.position.y =
      position[1] + Math.sin(t * speed * 0.6 + phase) * 0.28
  })

  return (
    <mesh ref={meshRef} geometry={geo} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.35}
        transparent
        opacity={0.82}
      />
    </mesh>
  )
}

// ─── Transparent background setter ────────────────────────────────────────
function ClearBackground() {
  const { gl } = useThree()
  useEffect(() => {
    gl.setClearColor(0x000000, 0)
  }, [gl])
  return null
}

// ─── Heart positions (avoid center of screen) ─────────────────────────────
const HEARTS: HeartProps[] = [
  { position: [-3.8,  0.4, -1.5], scale: 0.38, speed: 0.75, phase: 0.0,  color: '#ff6b9d' },
  { position: [ 3.5, -0.2, -1.5], scale: 0.44, speed: 0.60, phase: 1.1,  color: '#ff8fab' },
  { position: [-2.8, -1.8, -2.0], scale: 0.28, speed: 0.95, phase: 2.3,  color: '#e8789c' },
  { position: [ 2.8,  1.8, -2.0], scale: 0.32, speed: 0.68, phase: 3.5,  color: '#d46fa0' },
  { position: [ 0.2,  2.8, -2.5], scale: 0.22, speed: 0.88, phase: 4.1,  color: '#ff7eb3' },
  { position: [-4.2, -0.8, -2.5], scale: 0.30, speed: 0.72, phase: 5.0,  color: '#f573a0' },
  { position: [ 4.0,  0.9, -3.0], scale: 0.24, speed: 0.83, phase: 0.8,  color: '#c96fa8' },
  { position: [-1.5,  3.0, -3.5], scale: 0.18, speed: 1.00, phase: 2.0,  color: '#ff9ec6' },
]

// ─── Main export ───────────────────────────────────────────────────────────
export default function FloatingHearts() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 52 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <ClearBackground />

      <ambientLight intensity={0.7} color="#fff0f5" />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, 4, 3]} intensity={0.9} color="#ffb7d5" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#d4a0ff" />

      {HEARTS.map((h, i) => (
        <Heart key={i} {...h} />
      ))}
    </Canvas>
  )
}
