import type { CSSProperties } from 'react'

import eiffel from '../../assets/hero-sketches/sketch_r0_c0.webp'
import compass from '../../assets/hero-sketches/sketch_r0_c4.webp'
import argentina from '../../assets/hero-sketches/sketch_r0_c5.webp'
import mate from '../../assets/hero-sketches/sketch_r1_c0.webp'
import database from '../../assets/hero-sketches/sketch_r1_c4.webp'
import pythonCode from '../../assets/hero-sketches/sketch_python_joined.webp'
import astronaut from '../../assets/hero-sketches/sketch_r2_c0.webp'
import guitar from '../../assets/hero-sketches/sketch_r2_c3.webp'
import waves from '../../assets/hero-sketches/sketch_r2_c4.webp'
import neural from '../../assets/hero-sketches/sketch_r3_c0.webp'
import mathFunc from '../../assets/hero-sketches/sketch_r3_c5.webp'

type SketchConfig = {
  src: string
  alt: string
  // position in % relative to the container
  top?: string
  left?: string
  right?: string
  bottom?: string
  width: string
  opacity: number
  animation?: 'drift-slow' | 'rotate-slow' | 'float'
  hideOnMobile?: boolean
}

// 8-12 elements for desktop
const sketches: SketchConfig[] = [
  { src: argentina, alt: 'Argentina map', right: '5%', top: '10%', width: '12rem', opacity: 0.14, animation: 'float' },
  { src: mate, alt: 'Mate', left: '8%', top: '25%', width: '10rem', opacity: 0.12, animation: 'drift-slow' },
  { src: eiffel, alt: 'Eiffel tower', right: '15%', bottom: '20%', width: '14rem', opacity: 0.08, animation: 'float', hideOnMobile: true },
  { src: neural, alt: 'Neural network', left: '12%', bottom: '15%', width: '16rem', opacity: 0.10, animation: 'rotate-slow' },
  { src: guitar, alt: 'Guitar', left: '40%', top: '5%', width: '11rem', opacity: 0.07, animation: 'float', hideOnMobile: true },
  { src: waves, alt: 'Waves', right: '25%', top: '35%', width: '15rem', opacity: 0.10, animation: 'drift-slow' },
  { src: mathFunc, alt: 'Math function', left: '35%', bottom: '5%', width: '12rem', opacity: 0.09, hideOnMobile: true },
  { src: compass, alt: 'Compass', right: '8%', bottom: '45%', width: '9rem', opacity: 0.15, animation: 'rotate-slow' },
  { src: astronaut, alt: 'Astronaut', left: '5%', top: '55%', width: '11rem', opacity: 0.12, animation: 'float', hideOnMobile: true },
  { src: database, alt: 'Database', left: '55%', bottom: '25%', width: '10rem', opacity: 0.12 },
  { src: pythonCode, alt: 'Python snippet', right: '5%', top: '65%', width: '18rem', opacity: 0.08, hideOnMobile: true },
]

export default function HeroSketches({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`} aria-hidden="true">
      {/* A fade mask to blend the edges if necessary */}
      <div className="absolute inset-0 hero-sketch-mask pointer-events-none">
        {sketches.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt=""
            className={`absolute hero-sketch ${s.animation ? `anim-${s.animation}` : ''} ${s.hideOnMobile ? 'hidden sm:block' : ''}`}
            style={
              {
                top: s.top,
                bottom: s.bottom,
                left: s.left,
                right: s.right,
                width: s.width,
                opacity: s.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}
