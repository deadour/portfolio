import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { MAP, SKETCHES, type Asset } from './sketchAssets'
import { PAGE_PICKS } from './pageSlots'

// The hero draws from every sketch except the ones already placed further down the page on this visit.
const POOL: Asset[] = Object.values(SKETCHES).filter((asset) => !PAGE_PICKS.has(asset.src))

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

  const target = mobile ? 5 : W < 1100 ? 8 : 11
  for (const asset of shuffle(POOL)) {
    if (placed.length > target) break
    const w = asset.size * rem * scale * (0.85 + Math.random() * 0.3)
    const h = (w * asset.h) / asset.w
    if (w > W - 32) continue
    for (let attempt = 0; attempt < 60; attempt++) {
      const r = { x: Math.random() * (W - w), y: Math.random() * (H * 0.7 - h), w, h }
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
