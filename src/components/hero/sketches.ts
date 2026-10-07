// Line drawings for the hero canvas, on a 100×100 grid (stroke only).
// They are rendered with rough.js at low roughness, so they look hand-drawn but tidy.

export type Sketch = { name: string; w: number; h: number; d: string[] }

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}`
const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`
const f = (n: number) => +n.toFixed(1)

// --- Procedural helpers -----------------------------------------------------------

// Colosseum: outer wall with three rows of arches and the broken top on the right.
function colosseum(): string[] {
  const d = ['M6 90 L6 34 Q40 22 70 26 L80 30 L84 40 L94 46 L94 90 Z', 'M6 50 L94 52', 'M6 68 L94 70', 'M6 34 Q40 22 70 26']
  const rows: [number, number][] = [
    [50, 12],
    [68, 13],
    [89, 15],
  ]
  for (const [y, h] of rows)
    for (let x = 10; x < 88; x += 9.5) {
      if (y === 50 && x > 78) continue // collapsed corner
      d.push(`M${f(x)} ${y}L${f(x)} ${f(y - h + 4)}A3.4 3.4 0 0 1 ${f(x + 6.8)} ${f(y - h + 4)}L${f(x + 6.8)} ${y}`)
    }
  // attic windows
  for (let x = 12; x < 66; x += 12) d.push(`M${x} 38h4v4h-4z`)
  return d
}

// Classic soccer ball: pentagon in the middle and seams to the edge.
function soccerBall(): string[] {
  const c = 50
  const r = 40
  const pr = 13
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    return [c + pr * Math.cos(a), c + pr * Math.sin(a)]
  })
  const d = [circle(c, c, r), 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z']
  pts.forEach(([x, y], i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    const ex = c + (r - 1) * Math.cos(a)
    const ey = c + (r - 1) * Math.sin(a)
    d.push(`M${f(x)} ${f(y)}L${f(ex)} ${f(ey)}`)
    // partial pentagons near the rim
    const b = a + Math.PI / 5
    const ox = c + 31 * Math.cos(b)
    const oy = c + 31 * Math.sin(b)
    d.push(`M${f(c + 25 * Math.cos(a))} ${f(c + 25 * Math.sin(a))}L${f(ox)} ${f(oy)}L${f(c + 25 * Math.cos(a + (2 * Math.PI) / 5))} ${f(c + 25 * Math.sin(a + (2 * Math.PI) / 5))}`)
    d.push(`M${f(ox)} ${f(oy)}L${f(c + (r - 1) * Math.cos(b))} ${f(c + (r - 1) * Math.sin(b))}`)
  })
  return d
}

// Vinyl record with grooves and a tonearm.
function vinyl(): string[] {
  const d = [circle(46, 54, 40), circle(46, 54, 13), circle(46, 54, 1.6)]
  for (const r of [19, 25, 31]) d.push(`M${f(46 + r * Math.cos(3.6))} ${f(54 + r * Math.sin(3.6))}A${r} ${r} 0 0 1 ${f(46 + r * Math.cos(5.2))} ${f(54 + r * Math.sin(5.2))}`)
  d.push(circle(88, 12, 4), 'M88 16 L86 50 L74 66', 'M71 63 l6 6 l-3 3 l-6 -6 Z')
  return d
}

// Small neural network: 3 → 4 → 2.
function neuralNet(): string[] {
  const layers = [
    [28, 50, 72],
    [18, 39, 61, 82],
    [36, 64],
  ]
  const xs = [14, 50, 86]
  const d: string[] = []
  for (let l = 0; l < 2; l++)
    for (const a of layers[l]) for (const b of layers[l + 1]) d.push(`M${xs[l] + 5} ${a}L${xs[l + 1] - 5} ${b}`)
  layers.forEach((ys, l) => ys.forEach((y) => d.push(circle(xs[l], y, 5))))
  return d
}

// ESP32 dev board.
function esp32(): string[] {
  const d = ['M30 8h40v84h-40z', 'M36 14h28v20h-28z', 'M38 40h24v24h-24z', 'M44 80h12v8h-12z']
  // PCB antenna meander
  d.push('M39 30v-12h4v12h4v-12h4v12h4v-12h4v12')
  for (let y = 42; y <= 88; y += 6) d.push(`M22 ${y}h8`, `M70 ${y}h8`)
  return d
}

// Rising Patagonian araucaria: straight trunk, umbrella crown made of drooping tiers.
function araucaria(): string[] {
  const d = ['M48 98 L49 30 L51 30 L52 98', 'M40 98 Q50 94 60 98']
  const tiers: [number, number][] = [
    [30, 34],
    [24, 28],
    [18, 21],
    [12, 13],
  ]
  for (const [y, span] of tiers) {
    d.push(`M50 ${y} Q${50 - span * 0.6} ${y - 6} ${50 - span} ${y + 4}`, `M50 ${y} Q${50 + span * 0.6} ${y - 6} ${50 + span} ${y + 4}`)
    for (let s = -1; s <= 1; s += 2)
      for (let k = 0.35; k <= 1; k += 0.32) {
        const x = 50 + s * span * k
        const yy = y - 3 + k * 6
        d.push(`M${f(x)} ${f(yy)}l${s * 1.5} 4`)
      }
  }
  return d
}

// --- The drawings -------------------------------------------------------------------

export const SKETCHES: Sketch[] = [
  // Argentina y Patagonia
  {
    name: 'mate',
    w: 100,
    h: 100,
    d: [
      'M24 40 C14 52 14 72 28 84 C40 94 60 94 72 84 C86 72 86 52 76 40', // gourd
      'M26 34 h48 a3 3 0 0 1 3 3 v4 h-54 v-4 a3 3 0 0 1 3 -3 z', // metal rim
      'M30 34 C36 26 46 23 50 23 C56 23 64 26 70 34', // yerba
      'M22 58 C40 64 60 64 78 58', // engraved band
      'M24 66 C40 72 60 72 76 66',
      'M30 62 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3', // zigzag pattern
      'M56 30 L76 4', // bombilla
      'M73 3 l7 5', // mouthpiece
      'M54 31 l5 3', // filter
    ],
  },
  {
    name: 'obelisco',
    w: 100,
    h: 100,
    d: [
      'M43 86 L46.5 16 L50 4 L53.5 16 L57 86', // shaft + pyramidion
      'M46.5 16 H53.5',
      'M48.6 24 h2.8 v5 h-2.8 z', // top window
      'M38 86 H62 V92 H38 Z', // plinth
      'M30 96 H70', // ground
      'M44.5 60 H55.5',
    ],
  },
  {
    name: 'mountains',
    w: 100,
    h: 100,
    d: [
      'M2 86 L24 52 L32 60 L48 22 L56 36 L62 28 L76 52 L84 46 L98 86 Z', // Fitz Roy-like range
      'M42 36 L48 22 L54 33 L50 31 L47 36 L45 33 Z', // snow cap
      'M58 34 L62 28 L66 36 L63 34 Z',
      'M20 86 L36 66 M60 86 L70 70',
      'M10 92 H90',
    ],
  },
  { name: 'araucaria', w: 100, h: 100, d: araucaria() },
  {
    name: 'lenga', // wind-swept Patagonian tree
    w: 100,
    h: 100,
    d: [
      'M30 96 C34 80 34 66 40 52 C46 40 58 32 74 28',
      'M38 58 C48 54 60 54 70 50',
      'M36 70 C44 68 52 70 58 66',
      'M40 52 C50 42 66 38 86 38 C78 32 68 30 58 32 C66 26 78 24 90 26 C80 18 64 18 52 24 C48 28 44 32 40 40', // canopy pushed by wind
      'M58 50 C66 46 78 46 88 48',
      'M22 96 H44',
    ],
  },
  {
    name: 'backpack',
    w: 100,
    h: 100,
    d: [
      'M28 30 C28 20 36 14 50 14 C64 14 72 20 72 30 L74 86 C74 92 70 94 64 94 H36 C30 94 26 92 26 86 Z', // body
      'M28 32 C36 40 64 40 72 32', // flap
      'M44 14 C44 6 56 6 56 14', // top loop
      'M36 58 H64 V82 C64 86 62 88 58 88 H42 C38 88 36 86 36 82 Z', // front pocket
      'M36 66 H64',
      'M50 38 V46', // buckle
      'M26 46 C18 48 16 60 20 72 C22 78 24 80 26 80', // side strap
      'M74 46 C82 48 84 60 80 72',
    ],
  },

  // Viajes
  {
    name: 'eiffel',
    w: 100,
    h: 100,
    d: [
      'M28 96 C38 76 43 52 47 30 L48.6 12',
      'M72 96 C62 76 57 52 53 30 L51.4 12',
      'M50 12 V2 M48.6 12 H51.4',
      'M33 74 H67 V78 H33 Z', // first platform
      'M38 96 C42 84 58 84 62 96', // arch
      'M41 52 H59 V55 H41 Z', // second platform
      'M46 30 H54', // third platform
      'M36 78 L44 90 M64 78 L56 90', // lattice
      'M42 56 L56 72 M58 56 L44 72',
      'M46.5 34 L53 50 M53.5 34 L47 50',
      'M48.4 14 L51.4 28 M51.6 14 L48.6 28',
    ],
  },
  { name: 'colosseum', w: 100, h: 100, d: colosseum() },
  {
    name: 'bigben',
    w: 100,
    h: 100,
    d: [
      'M40 98 V48 H60 V98', // tower
      'M36 48 H64 V24 H36 Z', // clock stage
      circle(50, 36, 8.5),
      'M50 36 L50 30 M50 36 L54 38',
      'M50 28.5 V29.8 M57.5 36 H56.2 M50 43.5 V42.2 M42.5 36 H43.8',
      'M38 24 L50 6 L62 24', // spire
      'M50 6 V1',
      'M36 24 V18 M64 24 V18', // pinnacles
      'M45 54 V94 M55 54 V94',
      'M40 66 H60 M40 80 H60',
      'M34 98 H66',
    ],
  },
  {
    name: 'airplane',
    w: 100,
    h: 100,
    d: [
      'M50 6 C54 6 56 12 56 20 V40 L92 58 V64 L56 54 V78 L68 86 V90 L50 86 L32 90 V86 L44 78 V54 L8 64 V58 L44 40 V20 C44 12 46 6 50 6 Z',
      'M47 14 H53',
    ],
  },
  {
    name: 'compass',
    w: 100,
    h: 100,
    d: [
      circle(50, 50, 40),
      circle(50, 50, 34),
      'M50 16 L56 44 L84 50 L56 56 L50 84 L44 56 L16 50 L44 44 Z', // rose
      'M50 16 V84 M16 50 H84',
      'M30 30 L47 47 M70 30 L53 47 M30 70 L47 53 M70 70 L53 53',
      'M47 6 L47 2 L53 6 L53 2', // N
    ],
  },

  // Cine
  {
    name: 'astronaut',
    w: 100,
    h: 100,
    d: [
      circle(50, 40, 30),
      'M30 32 C32 22 42 16 54 17 C66 18 74 28 72 40 C70 50 60 54 50 54 C40 54 30 46 30 32 Z', // visor
      'M38 26 C42 22 48 21 52 22', // reflection
      'M26 66 C28 78 38 86 50 86 C62 86 72 78 74 66', // neck ring
      'M24 92 C30 82 40 80 50 80 C60 80 70 82 76 92',
      'M78 30 h6 v14 h-6',
    ],
  },
  {
    name: 'clapperboard',
    w: 100,
    h: 100,
    d: [
      'M14 40 H86 V88 H14 Z',
      'M14 40 L12 26 L84 14 L86 28', // clapper
      'M14 40 H86',
      'M26 24 L34 38 M42 21 L50 36 M58 19 L66 34 M74 16 L80 30',
      'M22 54 H58 M22 66 H48 M22 78 H54',
      'M66 54 H78 M66 66 H78',
    ],
  },
  {
    name: 'filmreel',
    w: 100,
    h: 100,
    d: [
      circle(40, 40, 30),
      circle(40, 40, 5),
      circle(40, 22, 7),
      circle(57, 40, 7),
      circle(40, 58, 7),
      circle(23, 40, 7),
      'M62 60 C72 66 76 78 70 90 L96 92', // strip
      'M66 66 l6 -3 M70 74 l6 -1 M71 82 l6 1',
    ],
  },
  {
    name: 'spinningtop', // Inception
    w: 100,
    h: 100,
    d: [
      'M50 4 V22',
      'M24 36 C24 26 76 26 76 36 C76 46 60 56 50 90 C40 56 24 46 24 36 Z',
      'M24 36 C34 42 66 42 76 36',
      'M46 22 H54',
      'M34 96 C44 92 56 92 66 96',
    ],
  },

  // Música
  {
    name: 'guitar',
    w: 100,
    h: 100,
    d: [
      'M28 96 C14 92 10 76 20 66 C24 62 24 58 22 54 C20 46 26 38 34 38 C40 38 44 42 46 46 L52 50 C58 50 66 56 64 66 C62 72 58 72 56 76 C54 86 42 98 28 96 Z', // body
      circle(36, 64, 6),
      'M24 84 L32 76', // bridge
      'M46 48 L84 10 L88 14 L50 52', // neck
      'M54 40 L58 44 M62 32 L66 36 M70 24 L74 28',
      'M84 10 L90 4 L96 10 L88 14', // headstock
      'M91 3 l2 -2 M95 7 l2 -2',
    ],
  },
  { name: 'vinyl', w: 100, h: 100, d: vinyl() },
  { name: 'soccer', w: 100, h: 100, d: soccerBall() },

  // Un guiño a Mario
  {
    name: 'questionblock',
    w: 100,
    h: 100,
    d: [
      'M14 14 H86 V86 H14 Z',
      'M20 20 h3 v3 h-3 z M77 20 h3 v3 h-3 z M20 77 h3 v3 h-3 z M77 77 h3 v3 h-3 z', // rivets
      'M38 38 C38 28 46 24 52 24 C60 24 64 30 64 36 C64 44 52 46 52 56 V60', // ?
      'M50 68 h4 v4 h-4 z',
    ],
  },
  {
    name: 'pipe',
    w: 100,
    h: 100,
    d: [
      'M16 18 H84 V40 H16 Z', // rim
      'M24 40 V96 M76 40 V96', // body
      'M24 96 H76',
      'M28 22 V36 M32 44 V92', // highlights
    ],
  },
  {
    name: 'coin',
    w: 100,
    h: 100,
    d: [ellipse(50, 50, 26, 38), ellipse(50, 50, 18, 29), 'M50 32 V68'],
  },

  // Ingeniería
  { name: 'neural', w: 100, h: 100, d: neuralNet() },
  { name: 'esp32', w: 100, h: 100, d: esp32() },
  {
    name: 'database',
    w: 100,
    h: 100,
    d: [
      ellipse(50, 18, 30, 10),
      'M20 18 V82 C20 88 34 92 50 92 C66 92 80 88 80 82 V18',
      'M20 40 C20 46 34 50 50 50 C66 50 80 46 80 40',
      'M20 61 C20 67 34 71 50 71 C66 71 80 67 80 61',
    ],
  },
  {
    name: 'code',
    w: 100,
    h: 100,
    d: [
      'M30 26 C22 26 22 30 22 38 V44 C22 48 18 50 14 50 C18 50 22 52 22 56 V62 C22 70 22 74 30 74', // {
      'M70 26 C78 26 78 30 78 38 V44 C78 48 82 50 86 50 C82 50 78 52 78 56 V62 C78 70 78 74 70 74', // }
      'M38 50 h2 M49 50 h2 M60 50 h2', // …
    ],
  },
]
