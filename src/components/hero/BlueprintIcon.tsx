import type { ReactNode } from 'react'
import { ellipsePoints, fmt, point, regularPolygon, reflectX, wavePoints, type Point } from './blueprintGeometry'

type IconProps = { className?: string; style?: React.CSSProperties }
const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.7, vectorEffect: 'non-scaling-stroke' as const }
const line = (a: Point, b: Point) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...common} />
const poly = (points: Point[], closed = false) => {
  const values = points.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(' ')
  return closed ? <polygon points={values} {...common} /> : <polyline points={values} {...common} />
}
const ellipse = (cx: number, cy: number, rx: number, ry: number) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...common} />
const circle = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} {...common} />
const rect = (x: number, y: number, width: number, height: number) => <rect x={x} y={y} width={width} height={height} {...common} />

function Eiffel() {
  return <>{line([28, 94], [72, 94])}{line([28, 94], [50, 5])}{line([72, 94], [50, 5])}{line([40, 61], [60, 61])}{line([35, 77], [65, 77])}{line([44, 42], [56, 42])}{line([40, 61], [58, 77])}{line([60, 61], [42, 77])}{line([35, 77], [50, 94])}{line([65, 77], [50, 94])}{line([44, 42], [54, 61])}{line([56, 42], [46, 61])}{line([47, 24], [53, 42])}{line([53, 24], [47, 42])}{line([50, 5], [50, 94])}{line([45, 94], [55, 94])}</>
}

function Colosseum() {
  const arches = Array.from({ length: 3 }, (_, row) => Array.from({ length: 7 }, (_, i) => {
    const x = 12 + i * 12.7
    const y = 29 + row * 20
    return <g key={`${row}-${i}`}>{line([x, y + 17], [x, y + 5])}{ellipse(x + 6.35, y + 6, 6.35, 6)}{line([x + 12.7, y + 5], [x + 12.7, y + 17])}</g>
  }))
  return <>{ellipse(50, 25, 38, 8)}{ellipse(50, 32, 38, 8)}{line([12, 25], [12, 89])}{line([88, 25], [88, 89])}{line([12, 89], [88, 89])}{arches}</>
}

function Helmet() {
  return <>{poly(regularPolygon(50, 48, 39, 16), true)}{poly(regularPolygon(50, 43, 22, 8, Math.PI / 8), true)}{line([50, 9], [50, 87])}{line([29, 43], [71, 43])}{line([40, 23], [60, 23])}{line([50, 15], [50, 31])}{line([43, 23], [57, 23])}{line([30, 75], [70, 75])}{line([38, 84], [62, 84])}</>
}

function Compass() {
  return <>{circle(50, 50, 40)}{circle(50, 50, 34)}{poly(regularPolygon(50, 50, 30, 4, 0), true)}{poly([[50, 16], [56, 44], [84, 50], [56, 56], [50, 84], [44, 56], [16, 50], [44, 44]], true)}{line([50, 10], [50, 90])}{line([10, 50], [90, 50])}{circle(50, 50, 3)}</>
}

function Airplane() {
  return <>{line([50, 8], [50, 91])}{line([50, 34], [88, 58])}{line([50, 34], [12, 58])}{line([50, 48], [76, 75])}{line([50, 48], [24, 75])}{line([43, 86], [50, 91])}{line([57, 86], [50, 91])}{circle(50, 50, 4)}</>
}

function Mate() {
  const upper = ellipsePoints(50, 59, 25, 31, 24, 0, Math.PI)
  const lower = reflectX(upper.slice(1, -1), 50).reverse()
  return <>{poly([...upper, ...lower], true)}{ellipse(50, 32, 25, 5)}{ellipse(50, 34, 20, 3)}{line([62, 31], [82, 7])}{line([82, 7], [89, 10])}{line([64, 35], [70, 29])}{ellipse(50, 62, 21, 6)}{ellipse(50, 72, 18, 5)}</>
}

function Soccer() {
  const pentagon = regularPolygon(50, 50, 14, 5)
  const outer = regularPolygon(50, 50, 39, 10)
  return <>{circle(50, 50, 40)}{poly(pentagon, true)}{outer.map((p, i) => <g key={i}>{line(pentagon[i % 5], p)}{circle(p[0], p[1], 4.5)}</g>)}</>
}

function QuestionBlock() {
  return <>{rect(14, 14, 72, 72)}{rect(20, 20, 60, 60)}{line([37, 38], [37, 31])}{line([37, 31], [43, 25])}{line([43, 25], [57, 25])}{line([57, 25], [63, 31])}{line([63, 31], [63, 39])}{line([63, 39], [55, 47])}{line([55, 47], [50, 53])}{line([50, 53], [50, 59])}{rect(48, 68, 4, 4)}</>
}

function Astronaut() { return <>{circle(50, 43, 34)}{ellipse(50, 43, 23, 16)}{ellipse(50, 43, 17, 11)}{ellipse(50, 78, 27, 8)}{line([26, 78], [20, 92])}{line([74, 78], [80, 92])}</> }
function Top() { return <>{line([50, 6], [50, 27])}{ellipse(50, 37, 27, 10)}{poly([[23, 37], [77, 37], [50, 91]], true)}{ellipse(50, 92, 17, 4)}{circle(50, 37, 3)}</> }
function Clock() { return <>{circle(50, 50, 39)}{circle(50, 50, 34)}{circle(50, 50, 4)}{line([50, 50], [50, 24])}{line([50, 50], [69, 61])}{Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return line(point(50, 50, 30, a), point(50, 50, 34, a)) })}</> }
function CasinoChip() { const p = regularPolygon(50, 50, 34, 8, Math.PI / 8); return <>{poly(p, true)}{poly(p.map(([x, y]) => [x + 5, y + 8]), true)}{circle(50, 50, 19)}{Array.from({ length: 8 }, (_, i) => line(point(50, 50, 19, i * Math.PI / 4), point(50, 50, 30, i * Math.PI / 4)))}</> }
function Taxi() { return <>{poly([[14, 70], [22, 52], [38, 52], [46, 37], [69, 37], [82, 52], [90, 58], [86, 75], [14, 75]], true)}{line([38, 52], [69, 52])}{line([46, 37], [46, 52])}{line([69, 37], [69, 52])}{circle(29, 75, 7)}{circle(75, 75, 7)}{line([49, 44], [64, 44])}</> }
function Clapper() { return <>{rect(15, 38, 70, 50)}{poly([[13, 28], [84, 16], [87, 31], [16, 43]], true)}{line([26, 26], [34, 40])}{line([43, 23], [51, 37])}{line([60, 20], [68, 34])}{line([77, 17], [84, 30])}{line([25, 55], [64, 55])}{line([25, 68], [55, 68])}{line([25, 81], [70, 81])}</> }
function Guitar() { const body = Array.from({ length: 25 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI * 2) / 24; const r = 25 + 7 * Math.cos(2 * a); return point(38, 61, r, a) }); return <>{poly(body, true)}{circle(38, 61, 6)}{line([47, 49], [85, 11])}{line([51, 45], [89, 9])}{poly([[85, 11], [95, 5], [99, 10], [89, 17]], true)}{line([54, 42], [58, 46])}{line([62, 34], [66, 38])}{line([70, 26], [74, 30])}{line([29, 80], [43, 80])}</> }
function Waves() { return <>{[0, 1, 2, 3, 4, 5].map((i) => poly(wavePoints(10, 90, 20 + i * 12, 3 + i * 0.8, 2.5, 64, i * 0.12)))}</> }
function Vinyl() { return <>{[39, 32, 25, 18, 11].map((r) => circle(45, 52, r))}{circle(45, 52, 3)}{line([45, 52], [84, 22])}{circle(84, 22, 3)}</> }
function Neural() { const layers = [[22, 50, 78], [16, 38, 62, 84], [30, 50, 70]]; const xs = [18, 50, 82]; return <>{layers.slice(0, -1).flatMap((layer, l) => layer.flatMap((y) => layers[l + 1].map((next) => line([xs[l] + 4, y], [xs[l + 1] - 4, next]))))}{layers.flatMap((layer, l) => layer.map((y) => circle(xs[l], y, 4)))}</> }
function Esp32() { return <>{rect(30, 8, 40, 84)}{rect(37, 17, 26, 19)}{rect(39, 42, 22, 22)}{rect(43, 73, 14, 12)}{Array.from({ length: 8 }, (_, i) => <g key={i}>{line([22, 18 + i * 10], [30, 18 + i * 10])}{line([70, 18 + i * 10], [78, 18 + i * 10])}</g>)}{poly([[39, 32], [39, 14], [44, 14], [44, 32], [49, 32], [49, 14], [54, 14], [54, 32], [59, 32], [59, 14], [64, 14]])}</> }
function Code() { return <text x="14" y="46" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="0.2">{'{ }'}<tspan x="14" dy="13">def optimize():</tspan><tspan x="14" dy="13">  return loss &lt; ε</tspan></text> }
function MathFormula() { return <text x="10" y="45" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="9">{'∫ f(x) dx = σ(z)'}</text> }

const ICONS: Record<string, () => ReactNode> = { eiffel: Eiffel, colosseum: Colosseum, helmet: Helmet, airplane: Airplane, compass: Compass, mate: Mate, soccer: Soccer, questionblock: QuestionBlock, astronaut: Astronaut, top: Top, clock: Clock, chip: CasinoChip, taxi: Taxi, clapper: Clapper, guitar: Guitar, waves: Waves, vinyl: Vinyl, neural: Neural, esp32: Esp32, code: Code, math: MathFormula }
export type BlueprintIconName = keyof typeof ICONS

export default function BlueprintIcon({ name, className = '', style }: IconProps & { name: BlueprintIconName }) {
  const Icon = ICONS[name]
  return <svg aria-hidden="true" viewBox="0 0 100 100" className={`blueprint-icon ${className}`} style={style}>{Icon()}</svg>
}
