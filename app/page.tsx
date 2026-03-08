'use client'

import dynamic from 'next/dynamic'
import SakuraCanvas from '@/components/SakuraCanvas'
import MainCard from '@/components/MainCard'

// Загружаем Three.js только на клиенте (нет SSR)
const FloatingHearts = dynamic(() => import('@/components/FloatingHearts'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden select-none">

      {/* Слой 0 — анимированный градиентный фон */}
      <div className="absolute inset-0 animated-bg" style={{ zIndex: 0 }} />

      {/* Слой 1 — лепестки сакуры (canvas) */}
      <SakuraCanvas />

      {/* Слой 2 — 3D сердечки (Three.js) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <FloatingHearts />
      </div>

      {/* Слой 10 — главная карточка */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4"
        style={{ zIndex: 10 }}
      >
        <MainCard />
      </div>

    </main>
  )
}
