import type { Lang } from '../../content'
import { MAP, PORTRAITS, SKETCHES } from './sketchAssets'

// What each sketch shows, for the tooltip. A few music sketches also open a song on YouTube.
type Info = { en: string; es: string; song?: { title: string; artist: string; url: string } }

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`

const INFO: Record<keyof typeof SKETCHES | keyof typeof PORTRAITS | 'map', Info> = {
  map: { en: 'Argentina', es: 'Argentina' },
  eiffel: { en: 'Eiffel Tower, Paris', es: 'Torre Eiffel, París' },
  colosseum: { en: 'Colosseum, Rome', es: 'Coliseo, Roma' },
  helmet: {
    en: 'Medieval helmet',
    es: 'Casco medieval',
    song: { title: 'Golden Brown (slowed)', artist: 'The Stranglers', url: yt('BTnM71u_v2I') },
  },
  airplane: { en: 'Airplane', es: 'Avión' },
  compass: { en: 'Compass', es: 'Brújula' },
  mate: { en: 'Mate', es: 'Mate' },
  football: { en: 'Football', es: 'Pelota de fútbol' },
  gameBlock: { en: '“?” block', es: 'Bloque “?”' },
  solarSystem: { en: 'Solar system', es: 'Sistema solar' },
  database: { en: 'Database', es: 'Base de datos' },
  mountains: { en: 'Mountains', es: 'Montañas' },
  astronaut: { en: 'Astronaut helmet (2001: A Space Odyssey)', es: 'Casco de astronauta (2001: Odisea del espacio)' },
  spinningTop: { en: 'Spinning top (Inception)', es: 'Trompo (El origen)' },
  clapperboard: { en: 'Clapperboard', es: 'Claqueta' },
  guitar: { en: 'Electric guitar', es: 'Guitarra eléctrica' },
  waves: { en: 'Unknown Pleasures (Joy Division)', es: 'Unknown Pleasures (Joy Division)' },
  vinyl: { en: 'Vinyl record', es: 'Disco de vinilo' },
  forest: { en: 'Forest', es: 'Bosque' },
  neuralNetwork: { en: 'Neural network', es: 'Red neuronal' },
  esp32: { en: 'ESP32', es: 'ESP32' },
  pythonCode: { en: 'Python', es: 'Python' },
  sqlCode: { en: 'SQL', es: 'SQL' },
  sigmoid: { en: 'Sigmoid function', es: 'Función sigmoide' },
  books: { en: 'Books', es: 'Libros' },
  cathedral: { en: 'La Plata Cathedral', es: 'Catedral de La Plata' },
  cliffs: { en: 'Étretat cliffs, France', es: 'Acantilados de Étretat, Francia' },
  dataPipeline: { en: 'Data pipeline', es: 'Pipeline de datos' },
  david: { en: 'Michelangelo’s David', es: 'El David de Miguel Ángel' },
  globe: { en: 'Globe', es: 'Globo terráqueo' },
  montSaintMichel: { en: 'Mont-Saint-Michel, France', es: 'Mont-Saint-Michel, Francia' },
  obelisco: { en: 'Obelisco, Buenos Aires', es: 'Obelisco, Buenos Aires' },
  column: { en: 'Ionic column', es: 'Columna jónica' },
  temple: { en: 'Greek temple', es: 'Templo griego' },
  player: { en: 'Diego Maradona', es: 'Diego Maradona' },
  sun: { en: 'Sun of May', es: 'Sol de Mayo' },
  symbol: {
    en: 'Los Piojos',
    es: 'Los Piojos',
    song: { title: 'Luz de marfil', artist: 'Los Piojos', url: yt('cu_iplhEHgM') },
  },
  wave: { en: 'The Great Wave (Hokusai)', es: 'La gran ola (Hokusai)' },
  utn: { en: 'UTN', es: 'UTN' },
  uml: { en: 'UML', es: 'UML' },
  thermos: { en: 'Thermos', es: 'Termo' },
  dumbbell: { en: 'Dumbbell', es: 'Mancuerna' },
  crane: { en: 'Tower crane', es: 'Grúa torre' },
  hardHat: { en: 'Hard hat', es: 'Casco de obra' },
  drill: { en: 'Drill', es: 'Taladro' },
  leaf: { en: 'Herb sprig', es: 'Ramita de yuyo' },
  dataMonitor: { en: 'Dashboard', es: 'Tablero' },
  dataPie: { en: 'Pie chart', es: 'Gráfico de torta' },
  dataServers: { en: 'Servers', es: 'Servidores' },
  dataDb: { en: 'Database', es: 'Base de datos' },
  dataLine: { en: 'Line chart', es: 'Gráfico de líneas' },
  dataClock: { en: 'Scheduled jobs', es: 'Tareas programadas' },
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

const BY_SRC = new Map<string, Info>(
  Object.entries({ ...SKETCHES, ...PORTRAITS, map: MAP }).map(([key, asset]) => [
    asset.src,
    INFO[key as keyof typeof INFO],
  ]),
)

// Tooltip text and, for music sketches, the song link.
export function sketchLabel(src: string, lang: Lang): { title: string; href?: string } {
  const info = BY_SRC.get(src)
  if (!info) return { title: '' }
  const name = info[lang]
  if (!info.song) return { title: name }
  const listen = lang === 'es' ? 'Escuchar' : 'Listen to'
  return { title: `${name} · ▶ ${listen} “${info.song.title}” (${info.song.artist})`, href: info.song.url }
}
