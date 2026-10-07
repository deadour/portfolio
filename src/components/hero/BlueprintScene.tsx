import { useEffect, useRef } from 'react'
import { ARGENTINA } from './argentina'
import BlueprintIcon, { type BlueprintIconName } from './BlueprintIcon'

type Item = { name: BlueprintIconName; x: number; y: number; size: number; delay: number; duration: number }
const ITEMS: Item[] = [
  { name: 'eiffel', x: 8, y: 13, size: 112, delay: 0, duration: 18 }, { name: 'compass', x: 76, y: 10, size: 104, delay: -7, duration: 22 },
  { name: 'colosseum', x: 82, y: 42, size: 128, delay: -12, duration: 25 }, { name: 'mate', x: 8, y: 57, size: 96, delay: -4, duration: 20 },
  { name: 'neural', x: 68, y: 69, size: 128, delay: -9, duration: 24 }, { name: 'vinyl', x: 35, y: 75, size: 102, delay: -15, duration: 26 },
  { name: 'guitar', x: 52, y: 20, size: 104, delay: -5, duration: 21 }, { name: 'astronaut', x: 24, y: 31, size: 94, delay: -11, duration: 23 },
  { name: 'esp32', x: 45, y: 58, size: 100, delay: -2, duration: 19 }, { name: 'waves', x: 2, y: 83, size: 150, delay: -14, duration: 28 },
  { name: 'top', x: 87, y: 80, size: 82, delay: -8, duration: 17 }, { name: 'clapper', x: 24, y: 84, size: 110, delay: -18, duration: 27 },
  { name: 'taxi', x: 88, y: 21, size: 100, delay: -3, duration: 23 }, { name: 'helmet', x: 59, y: 80, size: 90, delay: -16, duration: 21 },
  { name: 'code', x: 3, y: 35, size: 120, delay: -6, duration: 24 }, { name: 'math', x: 70, y: 91, size: 140, delay: -10, duration: 29 },
]

export default function BlueprintScene({ className = '' }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const node = root.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { node.dataset.reduced = reduced.matches ? 'true' : 'false' }
    update()
    reduced.addEventListener('change', update)
    return () => reduced.removeEventListener('change', update)
  }, [])

  return <svg ref={root} aria-hidden="true" className={`blueprint-scene pointer-events-none ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
    <g className="blueprint-map" transform="translate(91 45) scale(.22) translate(-23.6 -50)">{ARGENTINA.d.map((d, i) => <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />)}</g>
    {ITEMS.map((item) => <g key={`${item.name}-${item.x}`} className="blueprint-item" transform={`translate(${item.x} ${item.y}) scale(${item.size / 800})`} style={{ ['--delay' as string]: `${item.delay}s`, ['--duration' as string]: `${item.duration}s` }}><BlueprintIcon name={item.name} /></g>)}
  </svg>
}
