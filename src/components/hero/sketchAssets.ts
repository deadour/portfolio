// Catalog of the hero sketches, each cut on its own from the two master sheets.
// `w`/`h` are the file's pixel size, `size` the display width in rem before any random scale.
// `dense` drawings (second sheet) have heavier hatching, so they're shown a little fainter.

import airplane from '../../assets/hero-sketches/airplane.webp'
import argentina from '../../assets/hero-sketches/argentina.webp'
import astronaut from '../../assets/hero-sketches/astronaut.webp'
import clapperboard from '../../assets/hero-sketches/clapperboard.webp'
import colosseum from '../../assets/hero-sketches/colosseum.webp'
import compass from '../../assets/hero-sketches/compass.webp'
import database from '../../assets/hero-sketches/database.webp'
import eiffel from '../../assets/hero-sketches/eiffel.webp'
import esp32 from '../../assets/hero-sketches/esp32.webp'
import football from '../../assets/hero-sketches/football.webp'
import forest from '../../assets/hero-sketches/forest.webp'
import gameBlock from '../../assets/hero-sketches/game-block.webp'
import guitar from '../../assets/hero-sketches/guitar.webp'
import helmet from '../../assets/hero-sketches/helmet.webp'
import mate from '../../assets/hero-sketches/mate.webp'
import mountains from '../../assets/hero-sketches/mountains.webp'
import neuralNetwork from '../../assets/hero-sketches/neural-network.webp'
import pythonCode from '../../assets/hero-sketches/python-code.webp'
import sigmoid from '../../assets/hero-sketches/sigmoid.webp'
import solarSystem from '../../assets/hero-sketches/solar-system.webp'
import spinningTop from '../../assets/hero-sketches/spinning-top.webp'
import sqlCode from '../../assets/hero-sketches/sql-code.webp'
import vinyl from '../../assets/hero-sketches/vinyl.webp'
import waves from '../../assets/hero-sketches/waves.webp'
import books from '../../assets/hero-sketches/books.webp'
import cathedral from '../../assets/hero-sketches/cathedral.webp'
import cliffs from '../../assets/hero-sketches/cliffs.webp'
import dataPipeline from '../../assets/hero-sketches/data-pipeline.webp'
import david from '../../assets/hero-sketches/david.webp'
import globe from '../../assets/hero-sketches/globe.webp'
import montSaintMichel from '../../assets/hero-sketches/mont-saint-michel.webp'
import obelisco from '../../assets/hero-sketches/obelisco.webp'
import column from '../../assets/hero-sketches/column.webp'
import temple from '../../assets/hero-sketches/temple.webp'
import player from '../../assets/hero-sketches/player.webp'
import sun from '../../assets/hero-sketches/sun.webp'
import symbol from '../../assets/hero-sketches/symbol.webp'
import wave from '../../assets/hero-sketches/wave.webp'
import utn from '../../assets/hero-sketches/utn.webp'
import uml from '../../assets/hero-sketches/uml.webp'
import thermos from '../../assets/hero-sketches/thermos.webp'
import dumbbell from '../../assets/hero-sketches/dumbbell.webp'
import crane from '../../assets/hero-sketches/crane.webp'
import hardHat from '../../assets/hero-sketches/hard-hat.webp'
import drill from '../../assets/hero-sketches/drill.webp'
import leaf from '../../assets/hero-sketches/leaf.webp'
import dataMonitor from '../../assets/hero-sketches/data-monitor.webp'
import dataPie from '../../assets/hero-sketches/data-pie.webp'
import dataServers from '../../assets/hero-sketches/data-servers.webp'
import dataDb from '../../assets/hero-sketches/data-db.webp'
import dataLine from '../../assets/hero-sketches/data-line.webp'
import dataClock from '../../assets/hero-sketches/data-clock.webp'
import abbeyRoad from '../../assets/hero-sketches/abbey-road.webp'
import prism from '../../assets/hero-sketches/prism.webp'
import sumo from '../../assets/hero-sketches/sumo.webp'
import calamaro from '../../assets/hero-sketches/calamaro.webp'

export type Asset = { src: string; w: number; h: number; size: number; dense?: boolean }

export const MAP: Asset = { src: argentina, w: 226, h: 245, size: 11 }

export const SKETCHES = {
  eiffel: { src: eiffel, w: 200, h: 282, size: 6 },
  colosseum: { src: colosseum, w: 267, h: 245, size: 8 },
  helmet: { src: helmet, w: 209, h: 247, size: 5.5 },
  airplane: { src: airplane, w: 245, h: 242, size: 6.5 },
  compass: { src: compass, w: 232, h: 258, size: 6 },
  mate: { src: mate, w: 169, h: 204, size: 5 },
  football: { src: football, w: 186, h: 192, size: 4.5 },
  gameBlock: { src: gameBlock, w: 177, h: 195, size: 4.5 },
  solarSystem: { src: solarSystem, w: 395, h: 195, size: 12 },
  database: { src: database, w: 185, h: 194, size: 4.5 },
  mountains: { src: mountains, w: 262, h: 204, size: 8 },
  astronaut: { src: astronaut, w: 193, h: 214, size: 5.5 },
  spinningTop: { src: spinningTop, w: 185, h: 189, size: 4.5 },
  clapperboard: { src: clapperboard, w: 189, h: 194, size: 5 },
  guitar: { src: guitar, w: 168, h: 240, size: 5 },
  waves: { src: waves, w: 206, h: 210, size: 6 },
  vinyl: { src: vinyl, w: 190, h: 188, size: 5 },
  forest: { src: forest, w: 246, h: 210, size: 8 },
  neuralNetwork: { src: neuralNetwork, w: 196, h: 213, size: 5 },
  esp32: { src: esp32, w: 181, h: 228, size: 5 },
  pythonCode: { src: pythonCode, w: 275, h: 199, size: 9 },
  sqlCode: { src: sqlCode, w: 345, h: 211, size: 10 },
  sigmoid: { src: sigmoid, w: 340, h: 209, size: 10 },
  books: { src: books, w: 368, h: 235, size: 8, dense: true },
  cathedral: { src: cathedral, w: 330, h: 380, size: 7, dense: true },
  cliffs: { src: cliffs, w: 435, h: 245, size: 10, dense: true },
  dataPipeline: { src: dataPipeline, w: 494, h: 175, size: 11, dense: true },
  david: { src: david, w: 302, h: 288, size: 7, dense: true },
  globe: { src: globe, w: 370, h: 325, size: 7.5, dense: true },
  montSaintMichel: { src: montSaintMichel, w: 425, h: 278, size: 9.5, dense: true },
  obelisco: { src: obelisco, w: 269, h: 365, size: 6, dense: true },
  column: { src: column, w: 156, h: 230, size: 4.5, dense: true },
  temple: { src: temple, w: 333, h: 230, size: 8, dense: true },
  player: { src: player, w: 391, h: 355, size: 8, dense: true },
  sun: { src: sun, w: 280, h: 302, size: 6.5, dense: true },
  symbol: { src: symbol, w: 262, h: 284, size: 5.5, dense: true },
  wave: { src: wave, w: 280, h: 240, size: 7, dense: true },
  // Third sheet.
  utn: { src: utn, w: 386, h: 322, size: 6, dense: true },
  uml: { src: uml, w: 332, h: 322, size: 6, dense: true },
  thermos: { src: thermos, w: 186, h: 348, size: 4.5 },
  dumbbell: { src: dumbbell, w: 477, h: 290, size: 8, dense: true },
  crane: { src: crane, w: 398, h: 294, size: 8 },
  hardHat: { src: hardHat, w: 269, h: 214, size: 5.5 },
  drill: { src: drill, w: 313, h: 240, size: 6 },
  leaf: { src: leaf, w: 145, h: 305, size: 4 },
  dataMonitor: { src: dataMonitor, w: 93, h: 83, size: 3 },
  dataPie: { src: dataPie, w: 79, h: 81, size: 3 },
  dataServers: { src: dataServers, w: 100, h: 100, size: 3 },
  dataDb: { src: dataDb, w: 93, h: 82, size: 3 },
  dataLine: { src: dataLine, w: 96, h: 81, size: 3 },
  dataClock: { src: dataClock, w: 97, h: 88, size: 3 },
  abbeyRoad: { src: abbeyRoad, w: 414, h: 160, size: 9 },
  prism: { src: prism, w: 413, h: 167, size: 9 },
} satisfies Record<string, Asset>

// Portraits share a single spot on the page, so at most one shows per visit, and never in the hero.
export const PORTRAITS = {
  sumo: { src: sumo, w: 275, h: 345, size: 6, dense: true },
  calamaro: { src: calamaro, w: 228, h: 293, size: 5.5, dense: true },
} satisfies Record<string, Asset>
