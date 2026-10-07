import { PORTRAITS as P, SKETCHES as S, type Asset } from './sketchAssets'

// Spots along the page, each tied to the section it relates to. Every visit, each spot shows
// one drawing picked from its own theme, so over several visits the whole set shows up.
// No drawing belongs to two spots, and spots of the same theme sit a few sections apart.
// `at` is a CSS selector (+ index when it matches several elements) and `y` the point inside
// that element, from 0 (top) to 1 (bottom). Sides alternate down the page.
export type Slot = {
  options: Asset[]
  at: string
  index?: number
  y: number
  side: 'left' | 'right'
  // How far `y` may wander on each visit (fraction of the element). Small icons stay close.
  jitter?: number
}

const SLOTS: Slot[] = [
  { options: [S.obelisco, S.colosseum], at: '#about', y: 0.4, side: 'left', jitter: 0.08 },
  { options: [S.david, S.helmet], at: '#about', y: 0.9, side: 'right' },
  { options: [S.symbol, S.guitar, S.abbeyRoad, P.sumo, P.calamaro], at: '#work article', index: 0, y: 0.15, side: 'left' },
  { options: [S.waves, S.vinyl, S.prism], at: '#work article', index: 0, y: 0.6, side: 'right' },
  { options: [S.dataPipeline, S.pythonCode, S.uml], at: '#work h3.uppercase', index: 0, y: 0, side: 'left' },
  { options: [S.database, S.sqlCode], at: '#work article', index: 1, y: 0.6, side: 'right', jitter: 0.08 },
  { options: [S.crane, S.drill], at: '#work article', index: 2, y: 0.3, side: 'right' },
  { options: [S.hardHat], at: '#work article', index: 2, y: 0.75, side: 'left' },
  { options: [S.mate], at: '#work article', index: 3, y: 0.2, side: 'right' },
  { options: [S.thermos, S.leaf], at: '#work article', index: 3, y: 0.7, side: 'left' },
  { options: [S.player, S.football], at: '#work h3.uppercase', index: 1, y: 0, side: 'right' },
  { options: [S.dumbbell], at: '#work article', index: 4, y: 0.6, side: 'left' },
  { options: [S.utn], at: '#work article', index: 5, y: 0.35, side: 'right' },
  { options: [S.neuralNetwork, S.sigmoid], at: '#work article', index: 6, y: 0.2, side: 'left' },
  { options: [S.esp32, S.gameBlock], at: '#work article', index: 7, y: 0.5, side: 'right' },
  { options: [S.montSaintMichel, S.eiffel], at: '#experience', y: 0.15, side: 'left' },
  { options: [S.temple, S.airplane], at: '#experience', y: 0.75, side: 'right' },
  { options: [S.cathedral], at: '#education', y: 0.05, side: 'left' },
  { options: [S.cliffs, S.wave], at: '#education', y: 0.5, side: 'right' },
  { options: [S.globe, S.compass], at: '#education', y: 0.95, side: 'left' },
  { options: [S.column, S.astronaut], at: '#tech', y: 0.1, side: 'right' },
  { options: [S.solarSystem, S.spinningTop], at: '#tech', y: 0.8, side: 'left' },
  { options: [S.books, S.clapperboard], at: '#certifications', y: 0.4, side: 'right' },
  { options: [S.sun, S.mountains, S.forest], at: '#contact', y: 0.35, side: 'left' },
  // The small data icons: most of them around the BIAMAQ reports, a couple further away.
  { options: [S.dataMonitor], at: '#work article', index: 1, y: 0.12, side: 'left', jitter: 0.08 },
  { options: [S.dataServers], at: '#work article', index: 1, y: 0.2, side: 'right', jitter: 0.08 },
  { options: [S.dataDb], at: '#work article', index: 1, y: 0.42, side: 'left', jitter: 0.08 },
  { options: [S.dataLine], at: '#work article', index: 1, y: 0.75, side: 'left', jitter: 0.08 },
  { options: [S.dataPie], at: '#work article', index: 0, y: 0.85, side: 'left', jitter: 0.08 },
  { options: [S.dataClock], at: '#certifications', y: 0.75, side: 'left', jitter: 0.08 },
]

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

// One layout: a drawing per spot, the y point nudged a little and, half the time, every
// side mirrored, so the page doesn't look the same on each visit.
function makeSpots() {
  const mirror = Math.random() < 0.5
  return SLOTS.map((slot) => ({
    ...slot,
    asset: pick(slot.options),
    y: Math.min(1, Math.max(0, slot.y + (Math.random() - 0.5) * 2 * (slot.jitter ?? 0.12))),
    side: mirror ? (slot.side === 'left' ? 'right' : 'left') : slot.side,
    // Where it sits across the free margin (0 = inner edge, 1 = outer edge) and a size nudge.
    spread: Math.random(),
    scale: 0.85 + Math.random() * 0.25,
  }))
}

export type PageSpot = ReturnType<typeof makeSpots>[number]
// `picks` lets the hero skip the drawings already used further down. `shuffled` is
// set once the visitor reshuffles, so the page shows the new drawings right away.
export type SketchState = { spots: PageSpot[]; picks: Set<string>; shuffled: boolean }

function makeState(shuffled: boolean): SketchState {
  const spots = makeSpots()
  return { spots, picks: new Set(spots.map((spot) => spot.asset.src)), shuffled }
}

// Tiny shared store so the hero, the page layer and the shuffle button stay in sync.
let state = makeState(false)
const listeners = new Set<() => void>()

export const getSketchState = () => state
export function subscribeSketches(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// New drawings and positions for the hero and the page. The layers fade out, swap and
// fade back in (see [data-shuffling] in index.css); with reduced motion it's instant.
export function shuffleSketches() {
  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const swap = () => {
    state = makeState(true)
    listeners.forEach((listener) => listener())
    requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.shuffling))
  }
  if (reduced) return swap()
  root.dataset.shuffling = 'true'
  window.setTimeout(swap, 250)
}
