export type Point = readonly [number, number]

export const point = (cx: number, cy: number, radius: number, angle: number): Point => [
  cx + radius * Math.cos(angle),
  cy + radius * Math.sin(angle),
]

export const regularPolygon = (cx: number, cy: number, radius: number, sides: number, rotation = -Math.PI / 2): Point[] =>
  Array.from({ length: sides }, (_, i) => point(cx, cy, radius, rotation + (i * Math.PI * 2) / sides))

export const ellipsePoints = (cx: number, cy: number, rx: number, ry: number, count = 32, start = 0, end = Math.PI * 2): Point[] =>
  Array.from({ length: count + 1 }, (_, i) => {
    const angle = start + ((end - start) * i) / count
    return [cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)]
  })

export const wavePoints = (x0: number, x1: number, centerY: number, amplitude: number, cycles: number, samples = 48, phase = 0): Point[] =>
  Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples
    return [x0 + (x1 - x0) * t, centerY + amplitude * Math.sin(t * cycles * Math.PI * 2 + phase)]
  })

export const reflectX = (points: Point[], axis = 50): Point[] => points.map(([x, y]) => [axis * 2 - x, y])
export const fmt = (n: number) => Number(n.toFixed(2))

