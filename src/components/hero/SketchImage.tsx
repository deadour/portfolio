import type { CSSProperties } from 'react'
import { useLang } from '../../i18n'
import { sketchLabel } from './sketchInfo'

// A sketch with its name as a tooltip. Music sketches link to a song on YouTube in a new tab.
// The layers are decorative (aria-hidden), so the link stays out of the tab order.
export default function SketchImage({ src, style }: { src: string; style?: CSSProperties }) {
  const { lang } = useLang()
  const { title, href } = sketchLabel(src, lang)
  const img = <img src={src} alt="" loading="lazy" decoding="async" title={title} className="hero-sketch block w-full" style={style} />
  if (!href) return img
  return (
    <a href={href} target="_blank" rel="noreferrer" tabIndex={-1} className="sketch-song block">
      {img}
    </a>
  )
}
