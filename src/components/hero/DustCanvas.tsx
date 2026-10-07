import { useEffect, useRef } from 'react'

/*
 * Very faint dust that slowly rises behind the whole page (the hero has its own, denser layer).
 * A single fixed canvas the size of the viewport: cost doesn't grow with page length.
 * Pauses while the tab is hidden; runs at half speed with prefers-reduced-motion.
 */
export default function DustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const speedFactor = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.5 : 1
    let W = 0
    let H = 0
    let ink = '#fff'
    let raf = 0
    let last = performance.now()
    let time = 0
    let dots: { x: number; y: number; r: number; a: number; vy: number; vx: number; phase: number }[] = []

    function build() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ink = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff'
      const count = Math.max(18, Math.min(70, Math.round((W * H) / 22000)))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.4 + Math.random() * 0.9,
        a: 0.06 + Math.random() * 0.12,
        vy: -(0.003 + Math.random() * 0.007),
        vx: (Math.random() - 0.5) * 0.003,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function draw(dt: number) {
      time += dt
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)
      ctx!.fillStyle = ink
      for (const d of dots) {
        d.x += d.vx * dt
        d.y += d.vy * dt
        if (d.y < -4) {
          d.y = H + 4
          d.x = Math.random() * W
        }
        if (d.x < -4) d.x = W + 4
        else if (d.x > W + 4) d.x = -4
        ctx!.globalAlpha = d.a * (0.7 + 0.3 * Math.sin(time * 0.0015 + d.phase))
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function loop(now: number) {
      draw(Math.min(64, now - last) * speedFactor)
      last = now
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    // Rebuild on real width changes only (mobile toolbars change the height while scrolling).
    let lastWidth = window.innerWidth
    let resizeTimer = 0
    const onResize = () => {
      if (window.innerWidth === lastWidth && Math.abs(window.innerHeight - H) < 120) return
      lastWidth = window.innerWidth
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 150)
    }
    // Follow light/dark theme changes.
    const themeObserver = new MutationObserver(() => {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || ink
    })

    build()
    start()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 size-full" />
}
