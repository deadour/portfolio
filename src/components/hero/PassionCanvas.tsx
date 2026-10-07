import { useEffect, useRef } from 'react'
import { DOODLES, type Doodle } from './doodles'

/*
 * "Lienzo de pasiones": hand-drawn doodles floating behind the hero, plus faint dust particles.
 *
 * Performance strategy:
 * - One <canvas>, no DOM nodes per element and no React re-renders while animating (all state lives in refs).
 * - Every doodle is rasterized once into an offscreen sprite; each frame only does drawImage + a few arcs.
 * - Device pixel ratio capped at 2, element counts scale with the hero area (fewer on phones).
 * - The loop pauses when the hero is off-screen (IntersectionObserver) or the tab is hidden.
 * - prefers-reduced-motion: a single static frame, no loop and no pointer tracking.
 */

type Sprite = { canvas: HTMLCanvasElement; w: number; h: number }
type Item = {
  sprite: Sprite
  x: number
  y: number
  rot: number
  depth: number // 0.35 (far) … 1 (near): drives alpha, parallax and drift
  alpha: number
  amp: number
  speed: number
  phase: number
}
type Particle = { x: number; y: number; r: number; depth: number; vx: number; vy: number; phase: number }

const FONTS = {
  mono: 'ui-monospace, "SFMono-Regular", Consolas, monospace',
  serif: 'Georgia, "Times New Roman", serif',
}

// Small deterministic RNG so the layout is the same on every visit.
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeSprite(doodle: Doodle, size: number, dpr: number, ink: string): Sprite {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  if (doodle.type === 'text') {
    const fontSize = doodle.size * (size / 90)
    const font = `${fontSize}px ${FONTS[doodle.font]}`
    ctx.font = font
    const w = Math.ceil(ctx.measureText(doodle.text).width + 8)
    const h = Math.ceil(fontSize * 1.5)
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)
    ctx.font = font
    ctx.fillStyle = ink
    ctx.textBaseline = 'middle'
    ctx.fillText(doodle.text, 4, h / 2)
    return { canvas, w, h }
  }

  canvas.width = canvas.height = Math.ceil(size * dpr)
  const k = (size * dpr) / 100
  ctx.scale(k, k)
  ctx.strokeStyle = ink
  ctx.fillStyle = ink
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const lineWidth = 1.3 * (100 / size) // ~1.3 CSS px whatever the sprite size

  // Two slightly offset passes give the strokes a sketched, hand-drawn feel.
  const pass = (offset: number, alpha: number) => {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.translate(offset, offset * 0.6)
    ctx.rotate(offset * 0.004)
    ctx.lineWidth = lineWidth
    if (doodle.type === 'path') doodle.d.forEach((d) => ctx.stroke(new Path2D(d)))
    else doodle.draw(ctx)
    ctx.restore()
  }
  pass(0, 1)
  pass(1.1 * (100 / size), 0.45)
  return { canvas, w: size, h: size }
}

export default function PassionCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0
    let H = 0
    let items: Item[] = []
    let particles: Particle[] = []
    let raf = 0
    let visible = true
    let last = performance.now()
    let time = 0
    // Pointer in hero coordinates; parallax uses a smoothed, normalized copy.
    const pointer = { x: -9999, y: -9999, inside: false }
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 }

    // Drawings use the theme's text color, so they work on light and dark backgrounds.
    let ink = '#fff'

    function build() {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff'
      const rect = canvas!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)

      const rand = rng(2026)
      const order = DOODLES.map((_, i) => i).sort(() => rand() - 0.5)
      const count = Math.min(DOODLES.length, Math.max(14, Math.round((W * H) / 30000)))
      const base = Math.max(46, Math.min(104, W / 13))

      // Jittered grid so the doodles spread evenly without piling up.
      const cols = Math.max(3, Math.round(Math.sqrt((count * W) / H)))
      const rows = Math.ceil(count / cols)
      const cells = Array.from({ length: cols * rows }, (_, i) => i).sort(() => rand() - 0.5)
      const cw = W / cols
      const ch = H / rows

      items = order.slice(0, count).map((d, i) => {
        const cell = cells[i]
        const depth = 0.35 + rand() * 0.65
        const size = base * (0.7 + depth * 0.5)
        const x = (cell % cols) * cw + cw / 2 + (rand() - 0.5) * cw * 0.6
        const y = Math.floor(cell / cols) * ch + ch / 2 + (rand() - 0.5) * ch * 0.6
        // 5–10% opacity, a bit lower right behind the centered text.
        const dx = (x - W / 2) / (W * 0.3)
        const dy = (y - H / 2) / (H * 0.32)
        const behindText = dx * dx + dy * dy < 1
        const sprite = makeSprite(DOODLES[d], size, dpr, ink)
        // Keep wide sprites (code snippets) fully on screen.
        const half = Math.min(sprite.w / 2 + 6, W / 2)
        return {
          sprite,
          x: Math.min(Math.max(x, half), W - half),
          y,
          rot: (rand() - 0.5) * 0.5,
          depth,
          alpha: (0.05 + depth * 0.05) * (behindText ? 0.6 : 1),
          amp: 5 + rand() * 9,
          speed: 0.00012 + rand() * 0.00018,
          phase: rand() * Math.PI * 2,
        }
      })

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

    function draw(dt: number) {
      time += dt
      parallax.x += (parallax.tx - parallax.x) * Math.min(1, dt * 0.004)
      parallax.y += (parallax.ty - parallax.y) * Math.min(1, dt * 0.004)

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)

      // Doodles
      for (const it of items) {
        const t = time * it.speed + it.phase
        const x = it.x + Math.sin(t) * it.amp - parallax.x * 18 * it.depth
        const y = it.y + Math.cos(t * 0.8) * it.amp - parallax.y * 12 * it.depth
        let alpha = it.alpha
        if (pointer.inside) {
          // A soft "flashlight": doodles near the cursor show up a little more.
          const d = Math.hypot(x - pointer.x, y - pointer.y)
          if (d < 180) alpha += (1 - d / 180) * 0.06
        }
        ctx!.save()
        ctx!.globalAlpha = alpha
        ctx!.translate(x, y)
        ctx!.rotate(it.rot + Math.sin(t * 0.6) * 0.03)
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
      const dt = Math.min(64, now - last)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }
    function start() {
      if (reduced || raf || !visible || document.hidden) return
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

    let resizeTimer = 0
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        build()
        draw(0)
      }, 150)
    })

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })

    // Rebuild the sprites when the light/dark theme changes.
    const themeObserver = new MutationObserver(() => {
      build()
      draw(0)
    })

    build()
    draw(0)
    resizeObserver.observe(canvas)
    io.observe(canvas)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
      document.addEventListener('visibilitychange', onVisibility)
      start()
    }

    return () => {
      stop()
      themeObserver.disconnect()
      window.clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
