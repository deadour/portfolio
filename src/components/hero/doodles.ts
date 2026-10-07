// Hand-drawn style doodles for the hero canvas ("lienzo de pasiones").
// Paths use a 100×100 box and are only stroked, never filled.
// Procedural doodles draw themselves on a context already scaled to that box.

export type Doodle =
  | { type: 'path'; d: string[] }
  | { type: 'draw'; draw: (ctx: CanvasRenderingContext2D) => void }
  | { type: 'text'; text: string; font: 'mono' | 'serif'; size: number }

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`

// --- Procedural doodles -------------------------------------------------------

// Stacked pulse lines, in the spirit of the "Unknown Pleasures" cover.
function pulseWaves(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 8; i++) {
    const y = 22 + i * 8.5
    ctx.beginPath()
    ctx.moveTo(8, y)
    for (let x = 8; x <= 92; x += 1.5) {
      const peak = Math.exp(-((x - 50) ** 2) / 140) * (9 + (i % 3) * 4)
      const jitter = 0.6 + 0.4 * Math.sin(x * 0.9 + i * 1.7)
      ctx.lineTo(x, y - peak * jitter)
    }
    ctx.stroke()
  }
}

// Topographic contour lines.
function topoLines(ctx: CanvasRenderingContext2D) {
  for (const r of [8, 16, 24, 32, 40]) {
    ctx.beginPath()
    for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.12) {
      const rr = r * (1 + 0.14 * Math.sin(3 * a + r) + 0.07 * Math.sin(5 * a - r / 3))
      const x = 50 + rr * Math.cos(a)
      const y = 50 + rr * Math.sin(a) * 0.8
      if (a === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
  }
}

// Small neural network: 3 → 4 → 2.
function neuralNet(ctx: CanvasRenderingContext2D) {
  const layers = [
    [30, 50, 70],
    [20, 40, 60, 80],
    [38, 62],
  ]
  const xs = [16, 50, 84]
  for (let l = 0; l < layers.length - 1; l++)
    for (const y1 of layers[l])
      for (const y2 of layers[l + 1]) {
        ctx.beginPath()
        ctx.moveTo(xs[l] + 4, y1)
        ctx.lineTo(xs[l + 1] - 4, y2)
        ctx.stroke()
      }
  layers.forEach((ys, l) =>
    ys.forEach((y) => {
      ctx.beginPath()
      ctx.arc(xs[l], y, 4, 0, Math.PI * 2)
      ctx.stroke()
    }),
  )
}

// ESP32 dev board pinout sketch.
function esp32(ctx: CanvasRenderingContext2D) {
  ctx.strokeRect(30, 10, 40, 80)
  ctx.strokeRect(36, 16, 28, 18)
  // PCB antenna zigzag
  ctx.beginPath()
  ctx.moveTo(39, 30)
  for (let i = 0; i < 6; i++) ctx.lineTo(41 + i * 4, i % 2 ? 30 : 20)
  ctx.stroke()
  for (let y = 40; y <= 86; y += 6) {
    ctx.beginPath()
    ctx.moveTo(22, y)
    ctx.lineTo(30, y)
    ctx.moveTo(70, y)
    ctx.lineTo(78, y)
    ctx.stroke()
  }
  ctx.font = '7px ui-monospace, monospace'
  ctx.fillText('ESP32', 39, 56)
  ctx.font = '4.5px ui-monospace, monospace'
  ctx.fillText('GPIO 4', 4, 41.5)
  ctx.fillText('3V3', 80, 41.5)
  ctx.fillText('GND', 80, 59.5)
}

// Colosseum: curved outer wall with three tiers of arches.
function colosseum(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(6, 88)
  ctx.lineTo(6, 34)
  ctx.quadraticCurveTo(50, 18, 94, 34)
  ctx.lineTo(94, 88)
  ctx.closePath()
  ctx.stroke()
  for (const [y, h] of [
    [50, 14],
    [68, 16],
    [88, 18],
  ] as const) {
    ctx.beginPath()
    ctx.moveTo(6, y - h - 2)
    ctx.lineTo(94, y - h - 2)
    ctx.stroke()
    for (let x = 12; x < 92; x += 10) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y - h + 6)
      ctx.arc(x + 3.5, y - h + 6, 3.5, Math.PI, 0)
      ctx.lineTo(x + 7, y)
      ctx.stroke()
    }
  }
}

// --- The canvas ----------------------------------------------------------------

export const DOODLES: Doodle[] = [
  // Cultura y argentinidad
  {
    type: 'path', // mate con bombilla
    d: [
      'M30 42 C20 58 24 82 50 88 C76 82 80 58 70 42',
      'M30 42 C40 35 60 35 70 42 C60 47 40 47 30 42',
      'M56 40 L74 6 M72 5 L79 8',
      'M36 60 C44 64 56 64 64 60',
    ],
  },
  {
    type: 'path', // Obelisco
    d: ['M44 96 L47 20 L50 6 L53 20 L56 96', 'M47 20 L53 20', 'M38 96 L62 96', 'M49 13 L51 13 L51 17 L49 17 Z'],
  },
  {
    type: 'path', // pelota de gajos
    d: [
      circle(50, 50, 40),
      'M50 10 C40 30 40 70 50 90',
      'M50 10 C60 30 60 70 50 90',
      'M12 38 C35 46 65 46 88 38',
      'M12 62 C35 54 65 54 88 62',
      'M47 40 L53 40 M47 60 L53 60',
    ],
  },
  {
    type: 'path', // Sudamérica
    d: [
      'M34 6 C46 2 60 6 68 14 C80 18 92 28 90 38 C88 48 76 54 72 62 C68 70 62 74 58 82 C56 90 52 98 48 96 C46 88 48 78 44 70 C40 60 32 54 28 44 C24 34 24 16 34 6 Z',
    ],
  },

  // Cine de culto
  {
    type: 'path', // astronauta
    d: [
      circle(50, 24, 15),
      'M40 20 C44 15 56 15 60 20 C60 28 40 28 40 20',
      'M36 42 L64 42 L66 74 L34 74 Z',
      'M36 48 L20 62 L24 66 M64 48 L80 36 L76 32',
      'M40 74 L38 94 M60 74 L62 94',
      'M44 54 L56 54 L56 62 L44 62 Z',
    ],
  },
  {
    type: 'path', // claqueta
    d: [
      'M14 42 L86 42 L86 88 L14 88 Z',
      'M14 42 L18 24 L86 14 L84 32 L14 42',
      'M30 21 L34 39 M48 18 L52 36 M66 16 L70 34',
      'M22 56 L50 56 M22 68 L42 68',
    ],
  },
  {
    type: 'path', // taxi (Taxi Driver)
    d: [
      'M8 66 L92 66 L92 54 L78 50 L68 36 L32 36 L22 50 L8 54 Z',
      'M34 40 L48 40 L48 50 L28 50 Z M54 40 L66 40 L72 50 L54 50 Z',
      'M40 36 L40 30 L58 30 L58 36',
      circle(28, 68, 7),
      circle(72, 68, 7),
    ],
  },
  {
    type: 'path', // trompo (Inception)
    d: ['M50 6 L50 22', 'M28 32 C28 22 72 22 72 32 L50 88 Z', 'M34 40 L66 40', 'M44 94 L56 94'],
  },
  {
    type: 'path', // reloj (Interstellar)
    d: [circle(50, 50, 22), 'M50 36 L50 50 L60 57', 'M40 8 L60 8 L58 28 L42 28 Z', 'M42 72 L58 72 L60 92 L40 92 Z'],
  },

  // Música y rock
  {
    type: 'path', // guitarra criolla
    d: [
      'M40 52 C24 52 20 72 30 82 C38 94 62 94 70 82 C80 72 76 52 60 52 C64 42 62 34 50 34 C38 34 36 42 40 52 Z',
      circle(50, 62, 6),
      'M50 34 L50 6 M45 4 L55 4 L55 12 L45 12',
      'M44 78 L56 78',
    ],
  },
  {
    type: 'path', // guitarra eléctrica
    d: [
      'M28 94 C14 90 14 70 28 66 C22 56 30 46 40 52 L48 48 L82 10 L88 14 L56 54 C66 58 62 74 52 76 C52 90 42 96 28 94 Z',
      'M34 78 L54 62',
      'M38 84 L42 80 M30 72 L34 68',
    ],
  },
  {
    type: 'path', // vinilo
    d: [circle(50, 50, 40), circle(50, 50, 30), circle(50, 50, 13), circle(50, 50, 2.5), 'M24 30 C30 22 40 18 50 18'],
  },
  { type: 'draw', draw: pulseWaves },

  // Viajes y arquitectura
  {
    type: 'path', // Torre Eiffel
    d: [
      'M50 4 L45 36 L36 64 L22 96',
      'M50 4 L55 36 L64 64 L78 96',
      'M42 36 L58 36 M34 64 L66 64',
      'M38 96 C40 80 60 80 62 96',
      'M46 46 L54 56 M54 46 L46 56',
    ],
  },
  {
    type: 'path', // avión
    d: [
      'M8 54 L84 40 C92 38 94 46 86 48 L60 54 L46 80 L40 80 L46 56 L24 60 L18 68 L13 68 L16 58 Z',
      'M30 56 L34 50',
    ],
  },
  {
    type: 'path', // brújula
    d: [circle(50, 50, 38), 'M50 22 L57 50 L50 78 L43 50 Z', 'M43 50 L57 50', 'M50 8 L50 14 M50 86 L50 92 M8 50 L14 50 M86 50 L92 50'],
  },
  { type: 'draw', draw: topoLines },
  { type: 'draw', draw: colosseum },
  {
    type: 'path', // Big Ben
    d: [
      'M38 96 L38 42 L62 42 L62 96',
      'M35 42 L65 42 L65 22 L35 22 Z',
      circle(50, 32, 7),
      'M50 32 L50 27 M50 32 L54 34',
      'M35 22 L50 3 L65 22',
      'M44 48 L44 92 M56 48 L56 92 M38 62 L62 62 M38 78 L62 78',
      'M32 96 L68 96',
    ],
  },

  // Ingeniería y tech
  { type: 'draw', draw: neuralNet },
  { type: 'draw', draw: esp32 },
  { type: 'text', text: 'def optimize():', font: 'mono', size: 18 },
  { type: 'text', text: '{ ... }', font: 'mono', size: 22 },
  { type: 'text', text: 'SELECT * FROM gold', font: 'mono', size: 16 },
  { type: 'text', text: '∇f(x) = 0', font: 'serif', size: 24 },
  { type: 'text', text: 'σ(x) = 1 / (1 + e⁻ˣ)', font: 'serif', size: 20 },
  { type: 'text', text: 'Σ xᵢ / n', font: 'serif', size: 24 },
  { type: 'text', text: 'bronze → silver → gold', font: 'mono', size: 15 },
]
