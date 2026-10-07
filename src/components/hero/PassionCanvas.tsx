import { useEffect, useRef } from 'react'
import rough from 'roughjs'
import { SKETCHES, type Sketch } from './sketches'
import { ARGENTINA } from './argentina'

/*
 * "Lienzo de pasiones": hand-drawn sketches drifting slowly behind the hero, plus faint dust.
 *
 * - Sketches are drawn once with rough.js (low roughness: hand-drawn but tidy) into offscreen sprites;
 *   each frame only does drawImage + a few arcs. One <canvas>, no DOM nodes, no React re-renders.
 * - Random positions on every visit; the sketches drift and gently bounce off each other
 *   (and off the map) instead of overlapping. The map of Argentina stays fixed.
 * - Device pixel ratio capped at 2; counts scale with the hero area (fewer on phones).
 * - Pauses when the hero is off-screen or the tab is hidden.
 * - prefers-reduced-motion: the drift is slow enough to keep, at half speed and without pointer effects.
 */

type Sprite = { canvas: HTMLCanvasElement; w: number; h: number }
type Item = {
  sprite: Sprite
  x: number
  y: number
  vx: number // px per ms
  vy: number
  speed: number
  r: number // collision radius
  rot: number
  depth: number // 0.35 (far) … 1 (near): drives alpha and parallax
  alpha: number
  phase: number
}
type Particle = { x: number; y: number; r: number; depth: number; vx: number; vy: number; phase: number }

const STROKE = 0.85 // CSS px: thin, so the drawings stay in the background

function sketchSprite(sketch: Sketch, size: number, dpr: number, ink: string, seed: number): Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = Math.ceil(size * dpr)
  const ctx = canvas.getContext('2d')!
  const k = (size * dpr) / 100
  ctx.scale(k, k)
  const rc = rough.canvas(canvas)
  for (const d of sketch.d)
    rc.path(d, {
      stroke: ink,
      strokeWidth: (STROKE * dpr) / k,
      roughness: 0.7,
      bowing: 0.6,
      maxRandomnessOffset: 1.2,
      disableMultiStroke: true,
      seed,
    })
  return { canvas, w: size, h: size }
}

// The map is drawn with a plain, precise stroke so the borders stay accurate.
function mapSprite(height: number, dpr: number, ink: string): Sprite {
  const width = (height * ARGENTINA.w) / ARGENTINA.h
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(width * dpr)
  canvas.height = Math.ceil(height * dpr)
  const ctx = canvas.getContext('2d')!
  const k = (height * dpr) / ARGENTINA.h
  ctx.scale(k, k)
  ctx.strokeStyle = ink
  ctx.lineWidth = (0.75 * dpr) / k
  ctx.lineJoin = 'round'
  for (const d of ARGENTINA.d) ctx.stroke(new Path2D(d))
  return { canvas, w: width, h: height }
}

export default function PassionCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speedFactor = reduced ? 0.5 : 1
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0
    let H = 0
    let items: Item[] = []
    let map: { sprite: Sprite; x: number; y: number; r: number } | null = null
    let particles: Particle[] = []
    let raf = 0
    let visible = true
    let last = performance.now()
    let time = 0
    // Drawings use the theme's text color, so they work on light and dark backgrounds.
    let ink = '#fff'
    const pointer = { x: -9999, y: -9999, inside: false }
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 }

    function build() {
      const rect = canvas!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ink = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff'
      const rand = Math.random

      // Map of Argentina: fixed on the right, where there's no text.
      const mapH = Math.min(H * 0.42, Math.max(150, W * 0.16))
      const mapSpriteNow = mapSprite(mapH, dpr, ink)
      map = {
        sprite: mapSpriteNow,
        x: W - Math.max(mapSpriteNow.w / 2 + 24, W * 0.12),
        y: H * 0.42,
        r: mapH * 0.42,
      }

      const pool = [...SKETCHES].sort(() => rand() - 0.5)
      const count = Math.min(pool.length, Math.max(9, Math.round((W * H) / 48000)))
      const base = Math.max(46, Math.min(80, W / 16))

      // Random start positions without overlaps (simple rejection sampling).
      items = []
      for (const sketch of pool.slice(0, count)) {
        const depth = 0.35 + rand() * 0.65
        const size = base * (0.8 + depth * 0.4)
        const r = size * 0.55
        let x = 0
        let y = 0
        for (let tries = 0; tries < 40; tries++) {
          x = r + rand() * (W - 2 * r)
          y = r + rand() * (H - 2 * r)
          const clear =
            Math.hypot(x - map.x, y - map.y) > r + map.r &&
            items.every((o) => Math.hypot(x - o.x, y - o.y) > r + o.r + 12)
          if (clear) break
        }
        const angle = rand() * Math.PI * 2
        const speed = 0.004 + rand() * 0.006 // ~4–10 px per second
        items.push({
          sprite: sketchSprite(sketch, size, dpr, ink, 1 + Math.floor(rand() * 1000)),
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          speed,
          r,
          rot: (rand() - 0.5) * 0.35,
          depth,
          alpha: 0.06 + depth * 0.06, // 6–12%
          phase: rand() * Math.PI * 2,
        })
      }

      const pCount = Math.max(28, Math.min(110, Math.round((W * H) / 13000)))
      particles = Array.from({ length: pCount }, () => ({
        x: rand() * W,
        y: rand() * H,
        r: 0.4 + rand() * 1.1,
        depth: 0.2 + rand() * 0.8,
        vx: (rand() - 0.5) * 0.004,
        vy: -(0.003 + rand() * 0.008),
        phase: rand() * Math.PI * 2,
      }))
    }

    // Moves the sketches; they bounce off the edges, the map and each other instead of overlapping.
    function step(dt: number) {
      for (const it of items) {
        it.x += it.vx * dt
        it.y += it.vy * dt
        if (it.x < it.r || it.x > W - it.r) {
          it.vx = Math.abs(it.vx) * (it.x < it.r ? 1 : -1)
          it.x = Math.min(Math.max(it.x, it.r), W - it.r)
        }
        if (it.y < it.r || it.y > H - it.r) {
          it.vy = Math.abs(it.vy) * (it.y < it.r ? 1 : -1)
          it.y = Math.min(Math.max(it.y, it.r), H - it.r)
        }
      }
      const bodies = map ? [...items, { x: map.x, y: map.y, r: map.r, fixed: true }] : items
      for (let i = 0; i < items.length; i++) {
        const a = items[i]
        for (let j = i + 1; j < bodies.length; j++) {
          const b = bodies[j] as Item & { fixed?: boolean }
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy) || 0.001
          const min = a.r + b.r
          if (dist >= min) continue
          const nx = dx / dist
          const ny = dy / dist
          const overlap = min - dist
          if (b.fixed) {
            a.x -= nx * overlap
            a.y -= ny * overlap
            const vn = a.vx * nx + a.vy * ny
            if (vn > 0) {
              a.vx -= 2 * vn * nx
              a.vy -= 2 * vn * ny
            }
          } else {
            a.x -= (nx * overlap) / 2
            a.y -= (ny * overlap) / 2
            b.x += (nx * overlap) / 2
            b.y += (ny * overlap) / 2
            // Swap the velocity components along the contact normal (equal masses).
            const va = a.vx * nx + a.vy * ny
            const vb = b.vx * nx + b.vy * ny
            if (va - vb > 0) {
              a.vx += (vb - va) * nx
              a.vy += (vb - va) * ny
              b.vx += (va - vb) * nx
              b.vy += (va - vb) * ny
            }
          }
        }
      }
      // Keep each sketch at its own calm speed after bounces.
      for (const it of items) {
        const v = Math.hypot(it.vx, it.vy) || 1
        it.vx = (it.vx / v) * it.speed
        it.vy = (it.vy / v) * it.speed
      }
    }

    function draw(dt: number) {
      time += dt
      step(dt)
      parallax.x += (parallax.tx - parallax.x) * Math.min(1, dt * 0.004)
      parallax.y += (parallax.ty - parallax.y) * Math.min(1, dt * 0.004)

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)

      if (map) {
        ctx!.globalAlpha = 0.12
        const mx = map.x - parallax.x * 10
        const my = map.y - parallax.y * 6
        ctx!.drawImage(map.sprite.canvas, mx - map.sprite.w / 2, my - map.sprite.h / 2, map.sprite.w, map.sprite.h)
      }

      for (const it of items) {
        const x = it.x - parallax.x * 22 * it.depth
        const y = it.y - parallax.y * 14 * it.depth
        let alpha = it.alpha
        // A bit fainter while passing behind the text block.
        const dx = (x - W * 0.42) / (W * 0.3)
        const dy = (y - H * 0.5) / (H * 0.34)
        if (dx * dx + dy * dy < 1) alpha *= 0.6
        if (pointer.inside) {
          // A soft "flashlight": drawings near the cursor show up a little more.
          const d = Math.hypot(x - pointer.x, y - pointer.y)
          if (d < 200) alpha += (1 - d / 200) * 0.08
        }
        ctx!.save()
        ctx!.globalAlpha = alpha
        ctx!.translate(x, y)
        ctx!.rotate(it.rot + Math.sin(time * 0.0003 + it.phase) * 0.04)
        ctx!.drawImage(it.sprite.canvas, -it.sprite.w / 2, -it.sprite.h / 2, it.sprite.w, it.sprite.h)
        ctx!.restore()
      }

      // Dust / stars
      const near: { x: number; y: number }[] = []
      ctx!.fillStyle = ink
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.y < -4) p.y = H + 4
        if (p.x < -4) p.x = W + 4
        if (p.x > W + 4) p.x = -4
        const x = p.x - parallax.x * 8 * p.depth
        const y = p.y - parallax.y * 6 * p.depth
        ctx!.globalAlpha = (0.12 + p.depth * 0.25) * (0.7 + 0.3 * Math.sin(time * 0.0015 + p.phase))
        ctx!.beginPath()
        ctx!.arc(x, y, p.r, 0, Math.PI * 2)
        ctx!.fill()
        if (pointer.inside && Math.hypot(x - pointer.x, y - pointer.y) < 150) near.push({ x, y })
      }

      // Near the cursor, close particles link up into faint "nodes".
      if (near.length > 1) {
        ctx!.strokeStyle = ink
        ctx!.lineWidth = 0.6
        for (let i = 0; i < near.length; i++)
          for (let j = i + 1; j < near.length; j++) {
            const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y)
            if (d < 90) {
              ctx!.globalAlpha = (1 - d / 90) * 0.16
              ctx!.beginPath()
              ctx!.moveTo(near[i].x, near[i].y)
              ctx!.lineTo(near[j].x, near[j].y)
              ctx!.stroke()
            }
          }
      }
      ctx!.globalAlpha = 1
    }

    function loop(now: number) {
      const dt = Math.min(64, now - last) * speedFactor
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }
    function start() {
      if (raf || !visible || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      pointer.x = x
      pointer.y = y
      if (pointer.inside) {
        parallax.tx = (x / rect.width - 0.5) * 2
        parallax.ty = (y / rect.height - 0.5) * 2
      }
    }
    function onPointerLeave() {
      pointer.inside = false
      parallax.tx = 0
      parallax.ty = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const rebuild = () => {
      build()
      draw(0)
    }
    let resizeTimer = 0
    let lastWidth = Math.round(canvas.getBoundingClientRect().width)
    const resizeObserver = new ResizeObserver(([entry]) => {
      // Mobile browsers change the viewport height while scrolling; only rebuild on real width changes.
      const width = Math.round(entry.contentRect.width)
      if (width === lastWidth) return
      lastWidth = width
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(rebuild, 150)
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    // Re-tint the sprites when the light/dark theme changes.
    const themeObserver = new MutationObserver(rebuild)

    rebuild()
    resizeObserver.observe(canvas)
    io.observe(canvas)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
