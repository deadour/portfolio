import type { Lang } from '../../content'
import { MAP, PORTRAITS, SKETCHES } from './sketchAssets'

// Tooltips only for sketches that need a name (obvious ones like mountains or a football get none).
// A few music sketches also open a song on YouTube.
type Info = { en?: string; es?: string; song?: { title: string; artist: string; url: string } }

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`

const INFO: Partial<Record<keyof typeof SKETCHES | keyof typeof PORTRAITS | 'map', Info>> = {
  eiffel: { en: 'Eiffel Tower, Paris', es: 'Torre Eiffel, París' },
  colosseum: { en: 'Colosseum, Rome', es: 'Coliseo, Roma' },
  helmet: {
    song: { title: 'Golden Brown (slowed)', artist: 'The Stranglers', url: yt('BTnM71u_v2I') },
  },
  astronaut: { en: 'Astronaut helmet (2001: A Space Odyssey)', es: 'Casco de astronauta (2001: Odisea del espacio)' },
  spinningTop: { en: 'Spinning top (Inception)', es: 'Trompo (El origen)' },
  waves: { en: 'Unknown Pleasures (Joy Division)', es: 'Unknown Pleasures (Joy Division)' },
  esp32: { en: 'ESP32', es: 'ESP32' },
  sigmoid: { en: 'Sigmoid function', es: 'Función sigmoide' },
  cathedral: { en: 'La Plata Cathedral', es: 'Catedral de La Plata' },
  cliffs: { en: 'Étretat cliffs, France', es: 'Acantilados de Étretat, Francia' },
  david: { en: 'Michelangelo’s David', es: 'El David de Miguel Ángel' },
  montSaintMichel: { en: 'Mont-Saint-Michel, France', es: 'Mont-Saint-Michel, Francia' },
  obelisco: { en: 'Obelisco, Buenos Aires', es: 'Obelisco, Buenos Aires' },
  column: { en: 'Ionic column', es: 'Columna jónica' },
  player: { en: 'Diego Maradona', es: 'Diego Maradona' },
  sun: { en: 'Sun of May', es: 'Sol de Mayo' },
  symbol: {
    en: 'Los Piojos',
    es: 'Los Piojos',
    song: { title: 'Luz de marfil', artist: 'Los Piojos', url: yt('cu_iplhEHgM') },
  },
  wave: { en: 'The Great Wave (Hokusai)', es: 'La gran ola (Hokusai)' },
  abbeyRoad: {
    en: 'Abbey Road (The Beatles)',
    es: 'Abbey Road (The Beatles)',
    song: { title: 'Come Together', artist: 'The Beatles', url: yt('45cYwDMibGo') },
  },
  prism: {
    en: 'The Dark Side of the Moon (Pink Floyd)',
    es: 'The Dark Side of the Moon (Pink Floyd)',
    song: { title: 'Money', artist: 'Pink Floyd', url: yt('-0kcet4aPpQ') },
  },
  sumo: {
    en: 'Luca Prodan (Sumo)',
    es: 'Luca Prodan (Sumo)',
    song: { title: 'Mañana en el Abasto', artist: 'Sumo', url: yt('zrXYrql9qyY') },
  },
  calamaro: {
    en: 'Andrés Calamaro',
    es: 'Andrés Calamaro',
    song: { title: 'Donde manda marinero', artist: 'Andrés Calamaro', url: yt('IMCijG-U16w') },
  },
}

const BY_SRC = new Map<string, Info | undefined>(
  Object.entries({ ...SKETCHES, ...PORTRAITS, map: MAP }).map(([key, asset]) => [
    asset.src,
    INFO[key as keyof typeof INFO],
  ]),
)

// Tooltip text and, for music sketches, the song link.
export function sketchLabel(src: string, lang: Lang): { title: string; href?: string } {
  const info = BY_SRC.get(src)
  if (!info) return { title: '' }
  const name = info[lang] ?? ''
  if (!info.song) return { title: name }
  const listen = lang === 'es' ? 'Escuchar' : 'Listen to'
  const song = `▶ ${listen} “${info.song.title}” (${info.song.artist})`
  return { title: name ? `${name} · ${song}` : song, href: info.song.url }
}
