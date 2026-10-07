import { useEffect, useState } from 'react'

import cluster0 from '../../assets/hero-sketches/smart_crop_0.webp'
import cluster1 from '../../assets/hero-sketches/smart_crop_1.webp'
import cluster2 from '../../assets/hero-sketches/smart_crop_2.webp'
import cluster3 from '../../assets/hero-sketches/smart_crop_3.webp'
import cluster4 from '../../assets/hero-sketches/smart_crop_4.webp'
import cluster5 from '../../assets/hero-sketches/smart_crop_5.webp'
import cluster6 from '../../assets/hero-sketches/smart_crop_6.webp'
import cluster7 from '../../assets/hero-sketches/smart_crop_7.webp'
import cluster8 from '../../assets/hero-sketches/smart_crop_8.webp'

const allAssets = [
  { src: cluster0, alt: 'Sketches 0', wide: true },
  { src: cluster1, alt: 'Sketches 1', wide: true },
  { src: cluster2, alt: 'Sketches 2', wide: true },
  { src: cluster3, alt: 'Sketches 3', wide: true },
  { src: cluster4, alt: 'Sketches 4', wide: true },
  { src: cluster5, alt: 'Sketches 5', wide: true },
  { src: cluster6, alt: 'Sketches 6', wide: true },
  { src: cluster7, alt: 'Sketches 7', wide: true },
  { src: cluster8, alt: 'Sketches 8', wide: true },
]

const animations = ['float', 'drift-slow', 'rotate-slow']

export default function HeroSketches({ className = '' }: { className?: string }) {
  const [sketches, setSketches] = useState<any[]>([])

  useEffect(() => {
    const shuffled = [...allAssets].sort(() => 0.5 - Math.random())
    const isMobile = window.innerWidth < 640
    // Use fewer elements because each cluster contains multiple drawings
    const count = isMobile ? Math.floor(Math.random() * 2) + 2 : Math.floor(Math.random() * 3) + 4
    const selected = shuffled.slice(0, count)

    const randomized = selected.map((asset) => {
      // Random positions avoiding edges slightly
      const top = 5 + Math.random() * 80
      const left = 5 + Math.random() * 80
      
      // Larger sizes because these are clusters of multiple drawings
      const width = `${14 + Math.random() * 8}rem`
      
      // Extremely subtle opacity (0.03 to 0.09)
      const opacity = 0.03 + (Math.random() * 0.06)
      
      const animation = animations[Math.floor(Math.random() * animations.length)]
      
      // Also randomize animation duration to make them feel organic
      const animDuration = 8 + Math.random() * 10
      
      return {
        ...asset,
        top: `${top}%`,
        left: `${left}%`,
        width,
        opacity,
        animation,
        animDuration: `${animDuration}s`
      }
    })
    
    setSketches(randomized)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`} aria-hidden="true">
      <div className="absolute inset-0 hero-sketch-mask pointer-events-none">
        {sketches.map((s, i) => (
          <div
            key={i}
            className={`absolute pointer-events-auto anim-${s.animation}`}
            style={{
              top: s.top,
              left: s.left,
              width: s.width,
              animationDuration: s.animDuration,
            }}
          >
            <img
              src={s.src}
              alt=""
              className="w-full h-full hero-sketch"
              style={{ opacity: s.opacity }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
