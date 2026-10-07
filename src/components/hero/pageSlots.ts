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
}

const SLOTS: Slot[] = [
  { options: [S.obelisco, S.colosseum], at: '#about', y: 0, side: 'left' },
  { options: [S.david, S.helmet], at: '#about', y: 0.9, side: 'right' },
  { options: [S.symbol, S.guitar, S.abbeyRoad, P.sumo, P.calamaro], at: '#work article', index: 0, y: 0.15, side: 'left' },
  { options: [S.waves, S.vinyl, S.prism], at: '#work article', index: 0, y: 0.6, side: 'right' },
  { options: [S.dataPipeline, S.pythonCode, S.uml], at: '#work h3.uppercase', index: 0, y: 0, side: 'left' },
  { options: [S.dataMonitor, S.dataLine], at: '#work article', index: 1, y: 0.2, side: 'left' },
  { options: [S.database, S.sqlCode, S.dataServers, S.dataDb], at: '#work article', index: 1, y: 0.5, side: 'right' },
  { options: [S.dataPie, S.dataClock], at: '#work article', index: 1, y: 0.8, side: 'left' },
  { options: [S.crane, S.drill], at: '#work article', index: 2, y: 0.3, side: 'right' },
  { options: [S.hardHat], at: '#work article', index: 2, y: 0.75, side: 'left' },
  { options: [S.mate, S.thermos], at: '#work article', index: 3, y: 0.2, side: 'right' },
  { options: [S.leaf], at: '#work article', index: 3, y: 0.7, side: 'left' },
  { options: [S.player, S.football], at: '#work h3.uppercase', index: 1, y: 0, side: 'right' },
  { options: [S.dumbbell], at: '#work article', index: 4, y: 0.6, side: 'left' },
  { options: [S.neuralNetwork, S.sigmoid], at: '#work article', index: 5, y: 0.2, side: 'left' },
  { options: [S.esp32, S.gameBlock], at: '#work article', index: 6, y: 0.5, side: 'right' },
  { options: [S.montSaintMichel, S.eiffel], at: '#experience', y: 0.15, side: 'left' },
  { options: [S.temple, S.airplane], at: '#experience', y: 0.75, side: 'right' },
  { options: [S.utn, S.cathedral], at: '#education', y: 0.05, side: 'left' },
  { options: [S.cliffs, S.wave], at: '#education', y: 0.5, side: 'right' },
  { options: [S.globe, S.compass], at: '#education', y: 0.95, side: 'left' },
  { options: [S.column, S.astronaut], at: '#tech', y: 0.1, side: 'right' },
  { options: [S.solarSystem, S.spinningTop], at: '#tech', y: 0.8, side: 'left' },
  { options: [S.books, S.clapperboard], at: '#certifications', y: 0.4, side: 'right' },
  { options: [S.sun, S.mountains, S.forest], at: '#contact', y: 0.35, side: 'left' },
]

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

// This visit's layout: one drawing per spot, the y point nudged a little and, half the
// time, every side mirrored, so the page doesn't look the same on each visit.
const mirror = Math.random() < 0.5
export const PAGE_SPOTS = SLOTS.map((slot) => ({
  ...slot,
  asset: pick(slot.options),
  y: Math.min(1, Math.max(0, slot.y + (Math.random() - 0.5) * 0.24)),
  side: mirror ? (slot.side === 'left' ? 'right' : 'left') : slot.side,
  // Where it sits across the free margin (0 = inner edge, 1 = outer edge) and a size nudge.
  spread: Math.random(),
  scale: 0.85 + Math.random() * 0.25,
}))

export const PAGE_PICKS = new Set(PAGE_SPOTS.map((spot) => spot.asset.src))
