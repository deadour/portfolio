import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'

import { MAP, SKETCHES, type Asset } from './sketchAssets'
import { getSketchState, subscribeSketches } from './pageSlots'

const ANIMATIONS = ['float', 'drift-slow', 'rotate-slow']

type Placed = { src: string; x: number; y: number; w: number; opacity: number; animation: string; duration: number; home?: boolean }

// Where Resistencia, Chaco sits on the map drawing, as a fraction of its width and height.
const HOME = { x: 0.557, y: 0.237 }
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
function layout(W: number, H: number, picks: Set<string>): Placed[] {
  // Every sketch except the ones already placed further down the page.
  const pool: Asset[] = Object.values(SKETCHES).filter((asset) => !picks.has(asset.src))
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
    { src: MAP.src, x: mapRect.x, y: mapRect.y, w: mapW, opacity: 0.13, animation: '', duration: 0, home: true },
  ]
  const taken: Rect[] = [mapRect]

  const place = (asset: Asset, region: { x0: number; x1: number; y0: number; y1: number }, clear = false) => {
    const w = asset.size * rem * scale * (0.85 + Math.random() * 0.3)
    const h = (w * asset.h) / asset.w
    if (w > region.x1 - region.x0 || h > region.y1 - region.y0) return false
    for (let attempt = 0; attempt < 60; attempt++) {
      const r = {
        x: region.x0 + Math.random() * (region.x1 - region.x0 - w),
        y: region.y0 + Math.random() * (region.y1 - region.y0 - h),
        w,
        h,
      }
      if (taken.some((t) => overlaps(r, t))) continue
      taken.push(r)
      placed.push({
        src: asset.src,
        x: r.x,
        y: r.y,
        w,
        // Behind the photo and text they stay fainter so the copy reads first; `clear` spots cover no text.
        opacity: (inColumn(r) && !clear ? 0.05 + Math.random() * 0.03 : 0.09 + Math.random() * 0.06) * (asset.dense ? 0.8 : 1),
        animation: ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)],
        duration: 9 + Math.random() * 9,
      })
      return true
    }
    return false
  }

  const target = mobile ? 6 : W < 1100 ? 8 : 11
  const queue = shuffle(pool)
  // On phones the gap between the portrait and the map, above the name, always gets one drawing.
  if (mobile) {
    const gap = { x0: Math.min(W * 0.38, 9 * rem), x1: mapRect.x, y0: 4.5 * rem, y1: 15 * rem }
    const index = queue.findIndex((asset) => place(asset, gap, true))
    if (index >= 0) queue.splice(index, 1)
  }
  const everywhere = { x0: 0, x1: W, y0: 0, y1: H * 0.7 }
  for (const asset of queue) {
    if (placed.length > target) break
    place(asset, everywhere)
  }
  return placed
}

export default function HeroSketches({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [sketches, setSketches] = useState<Placed[]>([])
  const { picks } = useSyncExternalStore(subscribeSketches, getSketchState)
  const size = useRef({ W: 0, H: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Re-layout only when the width changes (mobile toolbars change the height while scrolling).
    const ro = new ResizeObserver(([entry]) => {
      const { width: W, height: H } = entry.contentRect
      if (Math.abs(W - size.current.W) < 1) return
      size.current = { W, H }
      setSketches(layout(W, H, getSketchState().picks))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // A shuffle brings a new set of picks: lay the hero out again.
  useEffect(() => {
    const { W, H } = size.current
    if (W) setSketches(layout(W, H, picks))
  }, [picks])

  return (
    <div ref={ref} className={`sketch-layer absolute inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`} aria-hidden="true">
      <div className="absolute inset-0 hero-sketch-mask pointer-events-none">
        {sketches.map((s, i) => (
          <div
            key={s.src + i}
            className={`absolute pointer-events-auto ${s.animation ? `anim-${s.animation}` : ''}`}
            style={{ left: s.x, top: s.y, width: s.w, '--d': `${s.duration}s` } as CSSProperties}
          >
            <img src={s.src} alt="" decoding="async" className="block w-full hero-sketch" style={{ opacity: `calc(${s.opacity.toFixed(3)} * var(--sketch-boost, 1))` }} />
            {s.home && (
              // Accent dot on Resistencia plus a small blueprint-style label pointing at it.
              <span className="absolute" style={{ left: `${HOME.x * 100}%`, top: `${HOME.y * 100}%` }}>
                <span className="hero-home absolute size-2 -translate-1/2 rounded-full bg-accent" />
                <span className="hero-home-label absolute right-2 bottom-2 flex items-center gap-1 font-mono text-[10px] whitespace-nowrap text-accent">
                  Resistencia
                  <span aria-hidden="true" className="block h-px w-4 rotate-[30deg] bg-current" />
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
