import { useEffect, useRef, useState, type CSSProperties } from 'react'

import airplane from '../../assets/hero-sketches/airplane.webp'
import argentina from '../../assets/hero-sketches/argentina.webp'
import astronaut from '../../assets/hero-sketches/astronaut.webp'
import clapperboard from '../../assets/hero-sketches/clapperboard.webp'
import colosseum from '../../assets/hero-sketches/colosseum.webp'
import compass from '../../assets/hero-sketches/compass.webp'
import database from '../../assets/hero-sketches/database.webp'
import eiffel from '../../assets/hero-sketches/eiffel.webp'
import esp32 from '../../assets/hero-sketches/esp32.webp'
import football from '../../assets/hero-sketches/football.webp'
import forest from '../../assets/hero-sketches/forest.webp'
import gameBlock from '../../assets/hero-sketches/game-block.webp'
import guitar from '../../assets/hero-sketches/guitar.webp'
import helmet from '../../assets/hero-sketches/helmet.webp'
import mate from '../../assets/hero-sketches/mate.webp'
import mountains from '../../assets/hero-sketches/mountains.webp'
import neuralNetwork from '../../assets/hero-sketches/neural-network.webp'
import pythonCode from '../../assets/hero-sketches/python-code.webp'
import sigmoid from '../../assets/hero-sketches/sigmoid.webp'
import solarSystem from '../../assets/hero-sketches/solar-system.webp'
import spinningTop from '../../assets/hero-sketches/spinning-top.webp'
import sqlCode from '../../assets/hero-sketches/sql-code.webp'
import vinyl from '../../assets/hero-sketches/vinyl.webp'
import waves from '../../assets/hero-sketches/waves.webp'
import books from '../../assets/hero-sketches/books.webp'
import cathedral from '../../assets/hero-sketches/cathedral.webp'
import cliffs from '../../assets/hero-sketches/cliffs.webp'
import dataPipeline from '../../assets/hero-sketches/data-pipeline.webp'
import david from '../../assets/hero-sketches/david.webp'
import globe from '../../assets/hero-sketches/globe.webp'
import montSaintMichel from '../../assets/hero-sketches/mont-saint-michel.webp'
import obelisco from '../../assets/hero-sketches/obelisco.webp'
import column from '../../assets/hero-sketches/column.webp'
import temple from '../../assets/hero-sketches/temple.webp'
import player from '../../assets/hero-sketches/player.webp'
import sun from '../../assets/hero-sketches/sun.webp'
import symbol from '../../assets/hero-sketches/symbol.webp'
import wave from '../../assets/hero-sketches/wave.webp'

// Each drawing was cut on its own from the master sheet. `w`/`h` are the file's pixel size,
// `size` is the display width in rem before the random scale.
type Asset = { src: string; w: number; h: number; size: number; dense?: boolean }

const MAP: Asset = { src: argentina, w: 226, h: 245, size: 7 }

const POOL: Asset[] = [
  { src: eiffel, w: 200, h: 282, size: 6 },
  { src: colosseum, w: 267, h: 245, size: 8 },
  { src: helmet, w: 209, h: 247, size: 5.5 },
  { src: airplane, w: 245, h: 242, size: 6.5 },
  { src: compass, w: 232, h: 258, size: 6 },
  { src: mate, w: 169, h: 204, size: 5 },
  { src: football, w: 186, h: 192, size: 4.5 },
  { src: gameBlock, w: 177, h: 195, size: 4.5 },
  { src: solarSystem, w: 395, h: 195, size: 12 },
  { src: database, w: 185, h: 194, size: 4.5 },
  { src: mountains, w: 262, h: 204, size: 8 },
  { src: astronaut, w: 193, h: 214, size: 5.5 },
  { src: spinningTop, w: 185, h: 189, size: 4.5 },
  { src: clapperboard, w: 189, h: 194, size: 5 },
  { src: guitar, w: 168, h: 240, size: 5 },
  { src: waves, w: 206, h: 210, size: 6 },
  { src: vinyl, w: 190, h: 188, size: 5 },
  { src: forest, w: 246, h: 210, size: 8 },
  { src: neuralNetwork, w: 196, h: 213, size: 5 },
  { src: esp32, w: 181, h: 228, size: 5 },
  { src: pythonCode, w: 275, h: 199, size: 9 },
  { src: sqlCode, w: 345, h: 211, size: 10 },
  { src: sigmoid, w: 340, h: 209, size: 10 },
  // Second sheet: denser hatching, so they're drawn a little fainter.
  { src: books, w: 368, h: 235, size: 8, dense: true },
  { src: cathedral, w: 330, h: 380, size: 7, dense: true },
  { src: cliffs, w: 435, h: 245, size: 10, dense: true },
  { src: dataPipeline, w: 494, h: 175, size: 11, dense: true },
  { src: david, w: 302, h: 288, size: 7, dense: true },
  { src: globe, w: 370, h: 325, size: 7.5, dense: true },
  { src: montSaintMichel, w: 425, h: 278, size: 9.5, dense: true },
  { src: obelisco, w: 269, h: 365, size: 6, dense: true },
  { src: column, w: 156, h: 230, size: 4.5, dense: true },
  { src: temple, w: 333, h: 230, size: 8, dense: true },
  { src: player, w: 391, h: 355, size: 8, dense: true },
  { src: sun, w: 280, h: 302, size: 6.5, dense: true },
  { src: symbol, w: 262, h: 284, size: 5.5, dense: true },
  { src: wave, w: 280, h: 240, size: 7, dense: true },
]

const ANIMATIONS = ['float', 'drift-slow', 'rotate-slow']

type Placed = { src: string; x: number; y: number; w: number; opacity: number; animation: string; duration: number }
type Rect = { x: number; y: number; w: number; h: number }

const GAP = 24
const overlaps = (a: Rect, b: Rect) =>
  a.x < b.x + b.w + GAP && b.x < a.x + a.w + GAP && a.y < b.y + b.h + GAP && b.y < a.y + a.h + GAP

function shuffle<T>(list: T[]) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Random layout for this visit: no two drawings touch, the Argentina map stays fixed on the right.
function layout(W: number, H: number): Placed[] {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const mobile = W < 640
  const scale = mobile ? 0.75 : 1
  // The text column is 52rem wide and centered; drawings inside it are dimmed.
  const colHalf = Math.min(W, 52 * rem) / 2
  const inColumn = (r: Rect) => r.x + r.w > W / 2 - colHalf && r.x < W / 2 + colHalf

  const mapW = MAP.size * rem * scale
  const mapH = (mapW * MAP.h) / MAP.w
  const mapRect = { x: W - mapW - Math.max(16, W * 0.06), y: H * (mobile ? 0.08 : 0.16), w: mapW, h: mapH }
  const placed: Placed[] = [
    { src: MAP.src, x: mapRect.x, y: mapRect.y, w: mapW, opacity: 0.13, animation: '', duration: 0 },
  ]
  const taken: Rect[] = [mapRect]

  const target = mobile ? 7 : W < 1100 ? 12 : 16
  for (const asset of shuffle(POOL)) {
    if (placed.length > target) break
    const w = asset.size * rem * scale * (0.85 + Math.random() * 0.3)
    const h = (w * asset.h) / asset.w
    if (w > W - 32) continue
    for (let attempt = 0; attempt < 60; attempt++) {
      const r = { x: Math.random() * (W - w), y: Math.random() * (H * 0.85 - h), w, h }
      if (taken.some((t) => overlaps(r, t))) continue
      taken.push(r)
      placed.push({
        src: asset.src,
        x: r.x,
        y: r.y,
        w,
        // Behind the photo and text they stay fainter so the copy reads first.
        opacity: (inColumn(r) ? 0.05 + Math.random() * 0.03 : 0.09 + Math.random() * 0.06) * (asset.dense ? 0.8 : 1),
        animation: ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)],
        duration: 9 + Math.random() * 9,
      })
      break
    }
  }
  return placed
}

export default function HeroSketches({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [sketches, setSketches] = useState<Placed[]>([])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let width = 0
    // Re-layout only when the width changes (mobile toolbars change the height while scrolling).
    const ro = new ResizeObserver(([entry]) => {
      const { width: W, height: H } = entry.contentRect
      if (Math.abs(W - width) < 1) return
      width = W
      setSketches(layout(W, H))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`} aria-hidden="true">
      <div className="absolute inset-0 hero-sketch-mask pointer-events-none">
        {sketches.map((s, i) => (
          <div
            key={s.src + i}
            className={`absolute pointer-events-auto ${s.animation ? `anim-${s.animation}` : ''}`}
            style={{ left: s.x, top: s.y, width: s.w, '--d': `${s.duration}s` } as CSSProperties}
          >
            <img src={s.src} alt="" decoding="async" className="block w-full hero-sketch" style={{ opacity: `calc(${s.opacity.toFixed(3)} * var(--sketch-boost, 1))` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
