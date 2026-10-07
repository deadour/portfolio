import { useEffect, useRef, useState, type CSSProperties } from 'react'

import books from '../../assets/hero-sketches/books.webp'
import cathedral from '../../assets/hero-sketches/cathedral.webp'
import cliffs from '../../assets/hero-sketches/cliffs.webp'
import column from '../../assets/hero-sketches/column.webp'
import dataPipeline from '../../assets/hero-sketches/data-pipeline.webp'
import database from '../../assets/hero-sketches/database.webp'
import david from '../../assets/hero-sketches/david.webp'
import esp32 from '../../assets/hero-sketches/esp32.webp'
import globe from '../../assets/hero-sketches/globe.webp'
import mate from '../../assets/hero-sketches/mate.webp'
import montSaintMichel from '../../assets/hero-sketches/mont-saint-michel.webp'
import neuralNetwork from '../../assets/hero-sketches/neural-network.webp'
import obelisco from '../../assets/hero-sketches/obelisco.webp'
import player from '../../assets/hero-sketches/player.webp'
import solarSystem from '../../assets/hero-sketches/solar-system.webp'
import sun from '../../assets/hero-sketches/sun.webp'
import symbol from '../../assets/hero-sketches/symbol.webp'
import temple from '../../assets/hero-sketches/temple.webp'
import waves from '../../assets/hero-sketches/waves.webp'

// One drawing per spot along the page, tied to the section it relates to.
// `at` is a CSS selector (+ index when it matches several elements) and `y` the point
// inside that element, from 0 (top) to 1 (bottom). Sides alternate down the page and
// drawings of the same theme are kept a few sections apart.
type Spot = {
  src: string
  w: number
  h: number
  size: number
  at: string
  index?: number
  y: number
  side: 'left' | 'right'
  dense?: boolean
}

const SPOTS: Spot[] = [
  { src: obelisco, w: 269, h: 365, size: 9, at: '#about', y: 0, side: 'left', dense: true },
  { src: david, w: 302, h: 288, size: 10, at: '#about', y: 0.9, side: 'right', dense: true },
  { src: symbol, w: 262, h: 284, size: 8, at: '#work article', index: 0, y: 0.15, side: 'left', dense: true },
  { src: waves, w: 206, h: 210, size: 9, at: '#work article', index: 0, y: 0.6, side: 'right' },
  { src: dataPipeline, w: 494, h: 175, size: 15, at: '#work h3.uppercase', index: 0, y: 0, side: 'left', dense: true },
  { src: database, w: 185, h: 194, size: 7, at: '#work article', index: 1, y: 0.55, side: 'right' },
  { src: mate, w: 169, h: 204, size: 7, at: '#work article', index: 3, y: 0.2, side: 'left' },
  { src: player, w: 391, h: 355, size: 12, at: '#work h3.uppercase', index: 1, y: 0, side: 'right', dense: true },
  { src: neuralNetwork, w: 196, h: 213, size: 8, at: '#work article', index: 5, y: 0.2, side: 'left' },
  { src: esp32, w: 181, h: 228, size: 7, at: '#work article', index: 6, y: 0.5, side: 'right' },
  { src: montSaintMichel, w: 425, h: 278, size: 13, at: '#experience', y: 0.15, side: 'left', dense: true },
  { src: temple, w: 333, h: 230, size: 12, at: '#experience', y: 0.75, side: 'right', dense: true },
  { src: cathedral, w: 330, h: 380, size: 10, at: '#education', y: 0.05, side: 'left', dense: true },
  { src: cliffs, w: 435, h: 245, size: 13, at: '#education', y: 0.5, side: 'right', dense: true },
  { src: globe, w: 370, h: 325, size: 10, at: '#education', y: 0.95, side: 'left', dense: true },
  { src: column, w: 156, h: 230, size: 6, at: '#tech', y: 0.1, side: 'right', dense: true },
  { src: solarSystem, w: 395, h: 195, size: 13, at: '#tech', y: 0.8, side: 'left' },
  { src: books, w: 368, h: 235, size: 11, at: '#certifications', y: 0.4, side: 'right', dense: true },
  { src: sun, w: 280, h: 302, size: 10, at: '#contact', y: 0.35, side: 'left', dense: true },
]

type Placed = { src: string; x: number; y: number; w: number; opacity: number; anim: string; duration: number }

const ANIMATIONS = ['float', 'drift-slow', 'rotate-slow']

// Wide screens: centered in the empty side margin. Narrow screens (no margin to spare):
// the drawing peeks in from the edge of the screen, fainter, so it never sits under the text.
function layout(layer: HTMLElement): Placed[] {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const content = document.getElementById('top')
  if (!content) return []
  const W = layer.clientWidth
  const base = layer.getBoundingClientRect().top
  const gutter = content.getBoundingClientRect().left - layer.getBoundingClientRect().left
  const out: Placed[] = []

  SPOTS.forEach((spot, i) => {
    const el = document.querySelectorAll<HTMLElement>(spot.at)[spot.index ?? 0]
    if (!el) return
    const box = el.getBoundingClientRect()
    let w = spot.size * rem
    let x: number
    let opacity = 0.12
    if (gutter - 48 >= Math.min(w, 9 * rem)) {
      w = Math.min(w, gutter - 48)
      x = spot.side === 'left' ? (gutter - w) / 2 : W - gutter + (gutter - w) / 2
    } else {
      w = Math.min(w, W * 0.55)
      x = spot.side === 'left' ? -w * 0.45 : W - w * 0.55
      opacity = 0.09
    }
    const h = (w * spot.h) / spot.w
    out.push({
      src: spot.src,
      x,
      y: box.top - base + box.height * spot.y - h / 2,
      w,
      opacity: opacity * (spot.dense ? 0.8 : 1),
      anim: ANIMATIONS[i % ANIMATIONS.length],
      duration: 12 + ((i * 7) % 10),
    })
  })
  return out
}

export default function PageSketches() {
  const ref = useRef<HTMLDivElement>(null)
  const [placed, setPlaced] = useState<Placed[]>([])

  useEffect(() => {
    const layer = ref.current
    const main = document.getElementById('main')
    if (!layer || !main) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setPlaced(layout(layer)))
    }
    // Sections change height when images load or a disclosure opens, so follow them.
    const ro = new ResizeObserver(update)
    ro.observe(main)
    ro.observe(layer)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [])

  // Each drawing fades in the first time it scrolls into view.
  useEffect(() => {
    const layer = ref.current
    if (!layer) return
    const items = layer.querySelectorAll<HTMLElement>('.page-sketch:not([data-visible])')
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => (el.dataset.visible = 'true'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.visible = 'true'
          io.unobserve(entry.target)
        }),
      { rootMargin: '0px 0px -15% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [placed])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {placed.map((s) => (
        <div
          key={s.src}
          className="page-sketch absolute"
          style={{ left: s.x, top: s.y, width: s.w, '--o': s.opacity } as CSSProperties}
        >
          <div className={`anim-${s.anim}`} style={{ '--d': `${s.duration}s` } as CSSProperties}>
            <img src={s.src} alt="" loading="lazy" decoding="async" className="hero-sketch block w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
