'use client'

import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
  color: string
  wobble: number
  wobbleSpeed: number
  wobbleAmount: number
}

const PETAL_COLORS = [
  '#ffb7c5',
  '#ffc1cc',
  '#ffadc7',
  '#ffd6e7',
  '#f9a8c9',
  '#e8a0bf',
  '#fbb6ce',
]

function createPetal(width: number, height: number, initial: boolean): Petal {
  return {
    x: Math.random() * width,
    y: initial ? Math.random() * height : -20,
    size: Math.random() * 9 + 5,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: Math.random() * 1.2 + 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    opacity: Math.random() * 0.55 + 0.35,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.02 + 0.01,
    wobbleAmount: Math.random() * 1.2 + 0.4,
  }
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save()
  ctx.translate(petal.x, petal.y)
  ctx.rotate(petal.rotation)
  ctx.globalAlpha = petal.opacity
  ctx.fillStyle = petal.color

  // Petal: two bezier lobes meeting at a point
  const s = petal.size
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(s * 0.6, -s * 0.3, s * 1.2, s * 0.2, s, s * 0.9)
  ctx.bezierCurveTo(s * 0.7, s * 1.4, s * 0.1, s * 1.1, 0, s * 0.9)
  ctx.bezierCurveTo(-s * 0.1, s * 1.1, -s * 0.7, s * 1.4, -s, s * 0.9)
  ctx.bezierCurveTo(-s * 1.2, s * 0.2, -s * 0.6, -s * 0.3, 0, 0)
  ctx.fill()

  // Subtle inner highlight
  ctx.globalAlpha = petal.opacity * 0.3
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(s * 0.3, -s * 0.1, s * 0.6, s * 0.3, s * 0.4, s * 0.7)
  ctx.bezierCurveTo(s * 0.2, s * 0.5, s * 0.1, s * 0.2, 0, 0)
  ctx.fill()

  ctx.restore()
}

export default function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const petals: Petal[] = []
    const TOTAL = 65

    for (let i = 0; i < TOTAL; i++) {
      petals.push(createPetal(width, height, true))
    }

    let animId: number

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i]
        p.wobble += p.wobbleSpeed
        p.x += p.speedX + Math.sin(p.wobble) * p.wobbleAmount
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        if (p.y > height + 25 || p.x < -40 || p.x > width + 40) {
          petals[i] = createPetal(width, height, false)
        }

        drawPetal(ctx!, p)
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width
      canvas!.height = height
    }

    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
