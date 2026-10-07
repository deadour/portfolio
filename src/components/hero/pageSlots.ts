import { SKETCHES as S, type Asset } from './sketchAssets'

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
  { options: [S.symbol, S.guitar], at: '#work article', index: 0, y: 0.15, side: 'left' },
  { options: [S.waves, S.vinyl], at: '#work article', index: 0, y: 0.6, side: 'right' },
  { options: [S.dataPipeline, S.pythonCode], at: '#work h3.uppercase', index: 0, y: 0, side: 'left' },
  { options: [S.database, S.sqlCode], at: '#work article', index: 1, y: 0.55, side: 'right' },
  { options: [S.mate], at: '#work article', index: 3, y: 0.2, side: 'left' },
  { options: [S.player, S.football], at: '#work h3.uppercase', index: 1, y: 0, side: 'right' },
  { options: [S.neuralNetwork, S.sigmoid], at: '#work article', index: 5, y: 0.2, side: 'left' },
  { options: [S.esp32, S.gameBlock], at: '#work article', index: 6, y: 0.5, side: 'right' },
  { options: [S.montSaintMichel, S.eiffel], at: '#experience', y: 0.15, side: 'left' },
  { options: [S.temple, S.airplane], at: '#experience', y: 0.75, side: 'right' },
  { options: [S.cathedral], at: '#education', y: 0.05, side: 'left' },
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
