import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { PAGE_SPOTS } from './pageSlots'

type Placed = { src: string; x: number; y: number; w: number; opacity: number; anim: string; duration: number }

const ANIMATIONS = ['float', 'drift-slow', 'rotate-slow']

// Wide screens: somewhere in the empty side margin. Narrow screens (no margin to spare):
// the drawing peeks in from the edge of the screen, fainter, so it never sits under the text.
function layout(layer: HTMLElement): Placed[] {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const content = document.getElementById('top')
  if (!content) return []
  const W = layer.clientWidth
  const base = layer.getBoundingClientRect().top
  const gutter = content.getBoundingClientRect().left - layer.getBoundingClientRect().left
  const out: Placed[] = []

  PAGE_SPOTS.forEach((spot, i) => {
    const el = document.querySelectorAll<HTMLElement>(spot.at)[spot.index ?? 0]
    if (!el) return
    const box = el.getBoundingClientRect()
    const asset = spot.asset
    // Drawn larger than in the hero: here each one has a whole margin to itself.
    let w = asset.size * 1.5 * spot.scale * rem
    let x: number
    let opacity = 0.12
    if (gutter - 48 >= Math.min(w, 9 * rem)) {
      w = Math.min(w, gutter - 48)
      const room = gutter - w - 32
      const fromInner = 16 + room * spot.spread
      x = spot.side === 'left' ? gutter - w - fromInner : W - gutter + fromInner
    } else {
      w = Math.min(w, W * 0.55)
      x = spot.side === 'left' ? -w * 0.45 : W - w * 0.55
      opacity = 0.09
    }
    const h = (w * asset.h) / asset.w
    out.push({
      src: asset.src,
      x,
      y: box.top - base + box.height * spot.y - h / 2,
      w,
      opacity: opacity * (asset.dense ? 0.8 : 1),
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
