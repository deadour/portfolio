import { PORTRAITS as P, SKETCHES as S, type Asset } from './sketchAssets'
import type { Page } from '../../content/types'
import { parseRoute } from '../../route'

// Spots along each page, each tied to the section it relates to. Every visit, each spot shows
// one drawing picked from its own theme, so over several visits the whole set shows up.
// No drawing belongs to two spots, and spots of the same theme sit a few sections apart.
// `at` is a CSS selector (projects have #project-<id>) (+ index when it matches several elements) and `y` the point inside
// that element, from 0 (top) to 1 (bottom). Sides alternate down the page. Missing elements are skipped.
export type Slot = {
  options: Asset[]
  at: string
  index?: number
  y: number
  side: 'left' | 'right'
  // How far `y` may wander on each visit (fraction of the element). Small icons stay close.
  jitter?: number
}

// Spots per page. Home follows the sections top to bottom; the other pages have their own few.
const SLOTS: Record<Page, Slot[]> = {
  home: [
    { options: [S.dataPipeline, S.pythonCode, S.uml], at: '#work', y: 0.02, side: 'left' },
    { options: [S.database, S.sqlCode], at: '#project-reports', y: 0.6, side: 'right', jitter: 0.08 },
    { options: [S.dataMonitor], at: '#project-reports', y: 0.15, side: 'left', jitter: 0.08 },
    { options: [S.dataServers], at: '#project-reports', y: 0.25, side: 'right', jitter: 0.08 },
    { options: [S.dataLine], at: '#project-reports', y: 0.8, side: 'left', jitter: 0.08 },
    { options: [S.crane, S.drill], at: '#project-rentalia', y: 0.3, side: 'right' },
    { options: [S.hardHat], at: '#project-rentalia', y: 0.75, side: 'left' },
    { options: [S.neuralNetwork, S.sigmoid], at: '#project-sales', y: 0.35, side: 'right' },
    { options: [S.dataDb], at: '#project-sales', y: 0.75, side: 'left', jitter: 0.08 },
    { options: [S.symbol, S.guitar, S.abbeyRoad, P.sumo, P.calamaro], at: '#project-lastfm', y: 0.15, side: 'left' },
    { options: [S.waves, S.vinyl, S.prism], at: '#project-lastfm', y: 0.6, side: 'right' },
    { options: [S.dataPie], at: '#project-lastfm', y: 0.9, side: 'left', jitter: 0.08 },
    { options: [S.mate], at: '#more-projects', y: 0.15, side: 'right' },
    { options: [S.dumbbell, S.player, S.football], at: '#more-projects', y: 0.5, side: 'left' },
    { options: [S.utn, S.esp32, S.gameBlock], at: '#more-projects', y: 0.85, side: 'right' },
    { options: [S.obelisco, S.colosseum, S.helmet], at: '#experience', y: 0.2, side: 'left' },
    { options: [S.temple, S.airplane], at: '#experience', y: 0.75, side: 'right' },
    { options: [S.montSaintMichel, S.eiffel], at: '#education', y: 0.1, side: 'left' },
    { options: [S.cathedral, S.cliffs, S.wave], at: '#education', y: 0.6, side: 'right' },
    { options: [S.column, S.astronaut, S.david], at: '#skills', y: 0.3, side: 'left' },
    { options: [S.solarSystem, S.spinningTop], at: '#certifications', y: 0.3, side: 'right' },
    { options: [S.books, S.clapperboard, S.dataClock], at: '#certifications', y: 0.9, side: 'left' },
    { options: [S.compass, S.globe], at: '#companies', y: 0.5, side: 'right' },
    { options: [S.sun, S.mountains, S.forest], at: '#contact', y: 0.35, side: 'left' },
  ],
  services: [
    { options: [S.crane, S.drill], at: '#solution-software', y: 0.4, side: 'left' },
    { options: [S.hardHat, S.uml], at: '#solution-software', y: 0.85, side: 'right' },
    { options: [S.database, S.pythonCode], at: '#solution-reporting', y: 0.35, side: 'right' },
    { options: [S.dataMonitor, S.dataLine], at: '#solution-reporting', y: 0.8, side: 'left', jitter: 0.08 },
    { options: [S.mate, S.leaf], at: '#solution-ecommerce', y: 0.3, side: 'left' },
    { options: [S.thermos, S.compass], at: '#solution-ecommerce', y: 0.8, side: 'right' },
    { options: [S.neuralNetwork, S.sigmoid], at: '#solution-ai', y: 0.4, side: 'right' },
    { options: [S.books, S.globe], at: '#process', y: 0.4, side: 'left' },
    { options: [S.sun, S.mountains, S.forest], at: '#contact', y: 0.35, side: 'right' },
  ],
  cv: [
    { options: [S.books, S.compass], at: '#cv-preview', y: 0.12, side: 'left' },
    { options: [S.globe, S.eiffel, S.airplane], at: '#cv-preview', y: 0.4, side: 'right' },
    { options: [S.dataPipeline, S.database], at: '#cv-preview', y: 0.7, side: 'left' },
    { options: [S.mate, S.utn], at: '#cv-preview', y: 0.92, side: 'right' },
  ],
}

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

// One layout: a drawing per spot, the y point nudged a little and, half the time, every
// side mirrored, so the page doesn't look the same on each visit.
function makeSpots() {
  const mirror = Math.random() < 0.5
  const used = new Set<string>()
  return SLOTS[parseRoute(window.location.pathname).page].flatMap((slot) => {
    const options = slot.options.filter((asset) => !used.has(asset.src))
    if (options.length === 0) return []
    const asset = pick(options)
    used.add(asset.src)
    return [{ ...slot, asset }]
  }).map((slot) => ({
    ...slot,
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
