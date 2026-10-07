import { useEffect, useState } from 'react'

// Import all assets
import eiffel from '../../assets/hero-sketches/sketch_r0_c0.webp'
import colosseum from '../../assets/hero-sketches/sketch_r0_c1.webp'
import helmet from '../../assets/hero-sketches/sketch_r0_c2.webp'
import airplane from '../../assets/hero-sketches/sketch_r0_c3.webp'
import compass from '../../assets/hero-sketches/sketch_r0_c4.webp'
import argentina from '../../assets/hero-sketches/sketch_r0_c5.webp'
import mate from '../../assets/hero-sketches/sketch_r1_c0.webp'
import football from '../../assets/hero-sketches/sketch_r1_c1.webp'
import block from '../../assets/hero-sketches/sketch_r1_c2.webp'
import database from '../../assets/hero-sketches/sketch_r1_c5.webp' // Maybe mountains? We'll just use the ones we know
import astronaut from '../../assets/hero-sketches/sketch_r2_c0.webp'
import top from '../../assets/hero-sketches/sketch_r2_c1.webp'
import clapper from '../../assets/hero-sketches/sketch_r2_c2.webp'
import guitar from '../../assets/hero-sketches/sketch_r2_c3.webp'
import waves from '../../assets/hero-sketches/sketch_r2_c4.webp'
import vinyl from '../../assets/hero-sketches/sketch_r2_c5.webp'
import neural from '../../assets/hero-sketches/sketch_r3_c0.webp'
import esp32 from '../../assets/hero-sketches/sketch_r3_c1.webp'
import mathFunc from '../../assets/hero-sketches/sketch_r3_c5.webp'
import solarSystem from '../../assets/hero-sketches/sketch_solar_system_joined.webp'
import pythonCode from '../../assets/hero-sketches/sketch_python_joined.webp'
import sqlCode from '../../assets/hero-sketches/sketch_sql_joined.webp'

// Define the full pool of assets
const allAssets = [
  { src: eiffel, alt: 'Eiffel' },
  { src: colosseum, alt: 'Colosseum' },
  { src: helmet, alt: 'Helmet' },
  { src: airplane, alt: 'Airplane' },
  { src: compass, alt: 'Compass' },
  { src: argentina, alt: 'Argentina' },
  { src: mate, alt: 'Mate' },
  { src: football, alt: 'Football' },
  { src: block, alt: 'Block' },
  { src: database, alt: 'Database' },
  { src: astronaut, alt: 'Astronaut' },
  { src: top, alt: 'Top' },
  { src: clapper, alt: 'Clapper' },
  { src: guitar, alt: 'Guitar' },
  { src: waves, alt: 'Waves' },
  { src: vinyl, alt: 'Vinyl' },
  { src: neural, alt: 'Neural Net' },
  { src: esp32, alt: 'ESP32' },
  { src: mathFunc, alt: 'Math Func' },
  { src: solarSystem, alt: 'Solar System', wide: true },
  { src: pythonCode, alt: 'Python Code', wide: true },
  { src: sqlCode, alt: 'SQL Code', wide: true },
]

const animations = ['float', 'drift-slow', 'rotate-slow']

export default function HeroSketches({ className = '' }: { className?: string }) {
  const [sketches, setSketches] = useState<any[]>([])

  useEffect(() => {
    // Pick 8 to 12 random assets
    const shuffled = [...allAssets].sort(() => 0.5 - Math.random())
    const isMobile = window.innerWidth < 640
    const count = isMobile ? Math.floor(Math.random() * 3) + 4 : Math.floor(Math.random() * 5) + 8
    const selected = shuffled.slice(0, count)

    const randomized = selected.map((asset) => {
      // Random positions avoiding edges slightly
      const top = 5 + Math.random() * 80
      const left = 5 + Math.random() * 80
      
      // Much smaller sizes (between 4rem and 8rem)
      const baseWidth = asset.wide ? 8 : 4
      const sizeVariability = Math.random() * 4
      const width = `${baseWidth + sizeVariability}rem`
      
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
