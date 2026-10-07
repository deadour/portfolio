import { useEffect, useRef } from 'react'
import { ARGENTINA, ICONS, type Art } from './art'

/*
 * "Lienzo de pasiones": line illustrations drifting slowly behind the hero, plus faint dust particles.
 *
 * Performance strategy:
 * - One <canvas>, no DOM nodes per element and no React re-renders while animating (all state lives in refs).
 * - Every illustration is rasterized once into an offscreen sprite; each frame only does drawImage + a few arcs.
 * - Device pixel ratio capped at 2, element counts scale with the hero area (fewer on phones).
 * - The loop pauses when the hero is off-screen (IntersectionObserver) or the tab is hidden.
 * - prefers-reduced-motion: the drift is so slow it keeps running, at half speed and without pointer effects.
 */

type Sprite = { image: CanvasImageSource; w: number; h: number }
type Item = {
  sprite: Sprite
  x: number
  y: number
  vx: number // px per ms: a slow, steady drift across the hero
  vy: number
  rot: number
  spin: number
  depth: number // 0.35 (far) … 1 (near): drives alpha, speed and parallax
  alpha: number
  phase: number
}
type Particle = { x: number; y: number; r: number; depth: number; vx: number; vy: number; phase: number }

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

// Rasterizes an SVG illustration in the given color at the given CSS width.
function makeSprite(art: Art, width: number, dpr: number, ink: string): Promise<Sprite> {
  const height = (width * art.h) / art.w
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.w} ${art.h}" ` +
    `width="${Math.round(width * dpr)}" height="${Math.round(height * dpr)}" color="${ink}">${art.body}</svg>`
  const image = new Image()
  image.decoding = 'async'
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
  return image.decode().then(() => ({ image, w: width, h: height }))
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
    let particles: Particle[] = []
    let raf = 0
    let visible = true
    let last = performance.now()
    let time = 0
    let generation = 0 // ignores sprite batches from an outdated build
    // Drawings use the theme's text color, so they work on light and dark backgrounds.
    let ink = '#fff'
    const pointer = { x: -9999, y: -9999, inside: false }
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 }

    async function build() {
      const gen = ++generation
      const rect = canvas!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ink = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff'

      const rand = rng(2026)
      const icons = [...ICONS].sort(() => rand() - 0.5)
      const count = Math.min(icons.length, Math.max(10, Math.round((W * H) / 44000)))
      const base = Math.max(40, Math.min(78, W / 17))

      // Start positions on a jittered grid so nothing piles up; then everything drifts.
      const cols = Math.max(3, Math.round(Math.sqrt((count * W) / H)))
      const rows = Math.ceil(count / cols)
      const cells = Array.from({ length: cols * rows }, (_, i) => i).sort(() => rand() - 0.5)
      const cw = W / cols
      const ch = H / rows

      const specs = icons.slice(0, count).map((art, i) => {
        const depth = 0.35 + rand() * 0.65
        const angle = rand() * Math.PI * 2
        const speed = (0.004 + rand() * 0.006) * (0.5 + depth * 0.5) // ~4–10 px per second
        const cell = cells[i]
        return {
          art,
          size: base * (0.75 + depth * 0.5),
          x: (cell % cols) * cw + cw / 2 + (rand() - 0.5) * cw * 0.6,
          y: Math.floor(cell / cols) * ch + ch / 2 + (rand() - 0.5) * ch * 0.6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: (rand() - 0.5) * 0.4,
          spin: (rand() - 0.5) * 0.00004,
          depth,
          alpha: 0.07 + depth * 0.07, // 7–14%
          phase: rand() * Math.PI * 2,
        }
      })
      // The map of Argentina: larger and almost still, on the right side where there's no text.
      specs.push({
        art: ARGENTINA,
        size: Math.min(W * 0.22, base * (ARGENTINA.size ?? 3)),
        x: W * (W < 640 ? 0.82 : 0.86),
        y: H * 0.42,
        vx: 0,
        vy: 0,
        rot: 0.04,
        spin: 0,
        depth: 0.9,
        alpha: 0.13,
        phase: 0,
      })

      const sprites = await Promise.all(specs.map((s) => makeSprite(s.art, s.size, dpr, ink).catch(() => null)))
      if (gen !== generation) return // a newer build (resize / theme change) took over

      items = specs.flatMap((s, i) => {
        const sprite = sprites[i]
        if (!sprite) return []
        return [
          {
            sprite,
            x: s.x,
            y: s.y,
            vx: s.vx,
            vy: s.vy,
            rot: s.rot,
            spin: s.spin,
            depth: s.depth,
            alpha: s.alpha,
            phase: s.phase,
          },
        ]
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
      draw(0)
    }

    // Items that drift off one edge come back from the opposite one.
    function wrap(it: Item) {
      const mx = it.sprite.w / 2 + 20
      const my = it.sprite.h / 2 + 20
      if (it.x < -mx) it.x = W + mx
      else if (it.x > W + mx) it.x = -mx
      if (it.y < -my) it.y = H + my
      else if (it.y > H + my) it.y = -my
    }

    function draw(dt: number) {
      time += dt
      parallax.x += (parallax.tx - parallax.x) * Math.min(1, dt * 0.004)
      parallax.y += (parallax.ty - parallax.y) * Math.min(1, dt * 0.004)

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)

      for (const it of items) {
        it.x += it.vx * dt
        it.y += it.vy * dt
        it.rot += it.spin * dt
        wrap(it)
        const x = it.x - parallax.x * 22 * it.depth
        const y = it.y - parallax.y * 14 * it.depth + Math.sin(time * 0.0004 + it.phase) * 3
        let alpha = it.alpha
        // A bit fainter while passing behind the text block.
        const dx = (x - W * 0.42) / (W * 0.3)
        const dy = (y - H * 0.5) / (H * 0.34)
        if (dx * dx + dy * dy < 1) alpha *= 0.65
        if (pointer.inside) {
          // A soft "flashlight": drawings near the cursor show up a little more.
          const d = Math.hypot(x - pointer.x, y - pointer.y)
          if (d < 200) alpha += (1 - d / 200) * 0.08
        }
        ctx!.save()
        ctx!.globalAlpha = alpha
        ctx!.translate(x, y)
        ctx!.rotate(it.rot)
        ctx!.drawImage(it.sprite.image, -it.sprite.w / 2, -it.sprite.h / 2, it.sprite.w, it.sprite.h)
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

    let resizeTimer = 0
    let lastWidth = Math.round(canvas.getBoundingClientRect().width)
    const resizeObserver = new ResizeObserver(([entry]) => {
      // Mobile browsers change the viewport height while scrolling; only rebuild on real width changes.
      const width = Math.round(entry.contentRect.width)
      if (width === lastWidth) return
      lastWidth = width
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 150)
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    // Re-tint the sprites when the light/dark theme changes.
    const themeObserver = new MutationObserver(() => build())

    build()
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
      generation++
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
