import { CELL_HEIGHT, CELL_WIDTH, FULL_TURN } from '../constants'
import { clamp } from '../math'

export const pinwheelInfo = {
  caption: 'Three paper firkis, one passing breeze.',
  hint: 'Brush past the paper. Click to lend it a gust.',
  description:
    'Ivory, indigo, and turmeric paper, folded around little brass pins. A wandering breeze reaches each firki in turn; the heavier folds take their time coming to rest.',
  announcement:
    'Paper pinwheels. Move the pointer to send a breeze, or click for a stronger gust.'
}

const material = (tone, glyph, density = 0.75, opacity = 1) => ({
  tone,
  glyph,
  density,
  opacity
})
const STEM = material('shaft', '|', 0.75)
const PIN = material('gold', '@', 1)
const PIN_LIGHT = material('paper', '.', 1)
const PIN_SHADOW = material('bronze', 'o', 1)
const FOOT = material('shadow', '.', 0.25, 0.4)
const PAPER_EDGE = material('edge', '/', 0.75)
const CREASE_LIGHT = material('paper', '/', 1)
const CREASE_DARK = material('fold', '/', 1)
const COLORED_EDGE = material('bronze', '/', 0.75)
const MARK_LIGHT = material('paper', ':', 0.75)
const MARK_DARK = material('indigo', '.', 0.75)
const GLYPHS = ['.', ':', '-', '+']
const PALETTES = [
  ['gold', 'paper', 'jade', 'paper'],
  ['indigo', 'paper', 'clay', 'paper'],
  ['jade', 'paper', 'gold', 'paper']
]

const NODES = [
  [0, 0, 0.16],
  [-0.08, -0.72, -0.03],
  [0.63, -0.89, 0.01],
  [0.88, -0.56, 0.06],
  [0.41, -0.3, 0.34],
  [0.54, -0.08, 0.16],
  [0.18, 0.19, 0.23]
]
const FACE_NODES = [
  [0, 1, 2, 3, 4],
  [0, 4, 3, 5, 6],
  [0, 6, 4]
]

function makeFace(blade, kind, tone) {
  return {
    blade,
    kind,
    tone,
    points: FACE_NODES[kind].map(() => [0, 0]),
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    uX: 0,
    uY: 0,
    uOffset: 0,
    vX: 0,
    vY: 0,
    vOffset: 0,
    ink: GLYPHS.map(glyph => material(tone, glyph)),
    crease: tone === 'paper' ? CREASE_DARK : CREASE_LIGHT,
    edge: tone === 'paper' ? PAPER_EDGE : COLORED_EDGE
  }
}

function makeWheel(horizontal, vertical, radius, bottom, index) {
  const stemHorizontal =
    Math.floor(horizontal / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2
  const faces = []
  for (let kind = 0; kind < 3; kind++) {
    for (let blade = 0; blade < 4; blade++) {
      const base = PALETTES[index][blade]
      const tone =
        kind === 2
          ? base === 'paper'
            ? 'fold'
            : base === 'clay'
              ? 'clayFold'
              : 'bronze'
          : base
      faces.push(makeFace(blade, kind, tone))
    }
  }
  return {
    horizontal: stemHorizontal,
    vertical,
    radius,
    bottom,
    index,
    faces,
    angle: [-0.24, 0.3, -0.08][index],
    velocity: [0.38, 0.24, 0.16][index],
    wind: 0,
    centerX: stemHorizontal,
    centerY: vertical,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  }
}

export class PinwheelScene {
  constructor() {
    this.time = 0
    this.pointer = { horizontal: 480, vertical: 210, active: false }
    this.wheels = [
      makeWheel(258, 215, 72, 357, 0),
      makeWheel(478, 158, 88, 365, 1),
      makeWheel(704, 220, 65, 352, 2)
    ]
    this.gusts = []
    this.lastPointerX = 480
    this.lastPointerY = 210
    this.pointerWasActive = false
    for (const wheel of this.wheels) this.buildGeometry(wheel)
  }

  interact() {
    const horizontal = Number.isFinite(this.pointer.horizontal)
      ? this.pointer.horizontal
      : 480
    const vertical = Number.isFinite(this.pointer.vertical)
      ? this.pointer.vertical
      : 210
    this.addGust(horizontal, vertical, 1.6, 2.8)
  }

  addGust(horizontal, vertical, strength, duration) {
    if (this.gusts.length >= 14) this.gusts.shift()
    this.gusts.push({
      horizontal,
      vertical,
      strength,
      duration,
      start: this.time
    })
  }

  update(delta = 1 / 60) {
    const elapsed = Number.isFinite(delta) ? clamp(delta, 0, 0.1) : 0
    this.time += elapsed
    const pointer = this.pointer
    if (
      pointer.active &&
      Number.isFinite(pointer.horizontal) &&
      Number.isFinite(pointer.vertical)
    ) {
      if (this.pointerWasActive) {
        const distance = Math.hypot(
          pointer.horizontal - this.lastPointerX,
          pointer.vertical - this.lastPointerY
        )
        if (distance > 5 && elapsed > 0) {
          this.addGust(
            pointer.horizontal,
            pointer.vertical,
            clamp(distance / 90, 0.12, 0.65),
            1.5
          )
        }
      }
      this.lastPointerX = pointer.horizontal
      this.lastPointerY = pointer.vertical
    }
    this.pointerWasActive = Boolean(pointer.active)
    for (let index = this.gusts.length - 1; index >= 0; index--) {
      const gust = this.gusts[index]
      if (this.time - gust.start > gust.duration + 2.5)
        this.gusts.splice(index, 1)
    }
    for (const wheel of this.wheels) {
      const delayedTime = this.time - (wheel.horizontal - 258) / 230
      const cycle = ((delayedTime % 19) + 19) % 19
      const season =
        0.88 + 0.12 * Math.sin(Math.floor(delayedTime / 19) * 2.399 + 0.7)
      let breeze = 0
      if (cycle < 4.7) breeze += 0.95 * Math.sin((Math.PI * cycle) / 4.7) ** 2
      if (cycle > 7.1 && cycle < 10.4)
        breeze += 0.62 * Math.sin((Math.PI * (cycle - 7.1)) / 3.3) ** 2
      if (cycle > 13.9 && cycle < 15.7)
        breeze += 1.15 * Math.sin((Math.PI * (cycle - 13.9)) / 1.8) ** 2
      breeze *=
        season * (0.86 + 0.14 * Math.sin(this.time * 2.7 + wheel.index * 0.7))
      for (const gust of this.gusts) {
        const travel = Math.abs(wheel.horizontal - gust.horizontal) / 310
        const age = this.time - gust.start - travel
        if (age > 0 && age < gust.duration) {
          const proximity = Math.exp(
            -(((wheel.vertical - gust.vertical) / 190) ** 2)
          )
          breeze +=
            gust.strength *
            proximity *
            Math.sin((Math.PI * age) / gust.duration) ** 2
        }
      }
      wheel.wind += (breeze - wheel.wind) * (1 - Math.exp(-elapsed * 3.4))
      const inertia = [1.15, 0.78, 1.45][wheel.index]
      const torque = wheel.wind * [3.0, 2.6, 3.3][wheel.index]
      const drag = 0.75 * wheel.velocity + 0.14 * wheel.velocity ** 2 + 0.075
      wheel.velocity = clamp(
        wheel.velocity + (torque - drag) * elapsed * inertia,
        0,
        4.2
      )
      wheel.angle = (wheel.angle + wheel.velocity * elapsed) % FULL_TURN
      this.buildGeometry(wheel)
    }
  }

  buildGeometry(wheel) {
    const cosine = Math.cos(wheel.angle)
    const sine = Math.sin(wheel.angle)
    const yaw = 0.91 - Math.min(wheel.wind, 2) * 0.035
    const pitch = 0.87
    wheel.centerX = wheel.horizontal
    wheel.centerY = wheel.vertical
    wheel.minX = Infinity
    wheel.maxX = -Infinity
    wheel.minY = Infinity
    wheel.maxY = -Infinity
    for (const face of wheel.faces) {
      const quarter = (face.blade * Math.PI) / 2
      const bladeCosine = Math.cos(quarter)
      const bladeSine = Math.sin(quarter)
      const indices = FACE_NODES[face.kind]
      face.minX = Infinity
      face.maxX = -Infinity
      face.minY = Infinity
      face.maxY = -Infinity
      for (let index = 0; index < indices.length; index++) {
        const node = NODES[indices[index]]
        const localX = node[0] * bladeCosine - node[1] * bladeSine
        const localY = node[0] * bladeSine + node[1] * bladeCosine
        const rotatedX = localX * cosine - localY * sine
        const rotatedY = localX * sine + localY * cosine
        const horizontal =
          wheel.centerX + wheel.radius * (rotatedX * yaw + node[2] * 0.14)
        const vertical =
          wheel.centerY + wheel.radius * (rotatedY * pitch - node[2] * 0.38)
        face.points[index][0] = horizontal
        face.points[index][1] = vertical
        face.minX = Math.min(face.minX, horizontal)
        face.maxX = Math.max(face.maxX, horizontal)
        face.minY = Math.min(face.minY, vertical)
        face.maxY = Math.max(face.maxY, vertical)
      }
      const origin = face.points[0]
      const first = face.points[1]
      const second = face.points[2]
      const firstX = first[0] - origin[0]
      const firstY = first[1] - origin[1]
      const secondX = second[0] - origin[0]
      const secondY = second[1] - origin[1]
      const determinant = firstX * secondY - firstY * secondX
      const source = NODES[indices[0]]
      const sourceFirst = NODES[indices[1]]
      const sourceSecond = NODES[indices[2]]
      face.uX =
        ((sourceFirst[0] - source[0]) * secondY -
          (sourceSecond[0] - source[0]) * firstY) /
        determinant
      face.uY =
        (-(sourceFirst[0] - source[0]) * secondX +
          (sourceSecond[0] - source[0]) * firstX) /
        determinant
      face.uOffset = source[0] - face.uX * origin[0] - face.uY * origin[1]
      face.vX =
        ((sourceFirst[1] - source[1]) * secondY -
          (sourceSecond[1] - source[1]) * firstY) /
        determinant
      face.vY =
        (-(sourceFirst[1] - source[1]) * secondX +
          (sourceSecond[1] - source[1]) * firstX) /
        determinant
      face.vOffset = source[1] - face.vX * origin[0] - face.vY * origin[1]
      const lighting = Math.cos(wheel.angle + quarter - 0.9)
      const density =
        face.kind === 2
          ? 1
          : face.kind === 1
            ? lighting > -0.3
              ? 1
              : 0.75
            : lighting > 0.1
              ? 0.75
              : 0.5
      for (const ink of face.ink) ink.density = density
      wheel.minX = Math.min(wheel.minX, face.minX)
      wheel.maxX = Math.max(wheel.maxX, face.maxX)
      wheel.minY = Math.min(wheel.minY, face.minY)
      wheel.maxY = Math.max(wheel.maxY, face.maxY)
    }
  }

  sample(horizontal, vertical, cellWidth = CELL_WIDTH) {
    const edgeReach = (cellWidth * 0.3) ** 2
    const groundRadiusY = (CELL_HEIGHT * cellWidth) / CELL_WIDTH / 2 + 0.5
    for (
      let wheelIndex = this.wheels.length - 1;
      wheelIndex >= 0;
      wheelIndex--
    ) {
      const wheel = this.wheels[wheelIndex]
      if (
        horizontal < wheel.horizontal - wheel.radius * 1.3 ||
        horizontal > wheel.horizontal + wheel.radius * 1.3 + 20 ||
        vertical < wheel.minY - 4 ||
        vertical > wheel.bottom + 3 + groundRadiusY
      )
        continue
      const pinX = horizontal - wheel.centerX - wheel.radius * 0.0224
      const pinY = vertical - wheel.centerY + wheel.radius * 0.0608
      const pinDistance = pinX * pinX + pinY * pinY
      if (pinDistance < 37) {
        if (pinDistance > 22) return PIN_SHADOW
        return pinX < 1 && pinY < 1 ? PIN_LIGHT : PIN
      }
      if (
        horizontal >= wheel.minX &&
        horizontal <= wheel.maxX &&
        vertical >= wheel.minY &&
        vertical <= wheel.maxY
      ) {
        for (
          let faceIndex = wheel.faces.length - 1;
          faceIndex >= 0;
          faceIndex--
        ) {
          const face = wheel.faces[faceIndex]
          if (
            horizontal < face.minX ||
            horizontal > face.maxX ||
            vertical < face.minY ||
            vertical > face.maxY
          )
            continue
          let contained = false
          for (
            let index = 0, previous = face.points.length - 1;
            index < face.points.length;
            previous = index++
          ) {
            const current = face.points[index]
            const before = face.points[previous]
            if (
              current[1] > vertical !== before[1] > vertical &&
              horizontal <
                ((before[0] - current[0]) * (vertical - current[1])) /
                  (before[1] - current[1]) +
                  current[0]
            ) {
              contained = !contained
            }
          }
          if (!contained) continue
          let nearest = Infinity
          for (let index = 0; index < face.points.length; index++) {
            const start = face.points[index]
            const end = face.points[(index + 1) % face.points.length]
            const deltaX = end[0] - start[0]
            const deltaY = end[1] - start[1]
            const fraction = clamp(
              ((horizontal - start[0]) * deltaX +
                (vertical - start[1]) * deltaY) /
                (deltaX * deltaX + deltaY * deltaY)
            )
            const offsetX = horizontal - start[0] - fraction * deltaX
            const offsetY = vertical - start[1] - fraction * deltaY
            nearest = Math.min(nearest, offsetX * offsetX + offsetY * offsetY)
          }
          if (nearest < edgeReach)
            return face.kind === 0 ? face.edge : face.crease
          const paperX =
            face.uX * horizontal + face.uY * vertical + face.uOffset
          const paperY =
            face.vX * horizontal + face.vY * vertical + face.vOffset
          if (
            face.kind === 0 &&
            paperY < -0.57 &&
            paperY > -0.64 &&
            paperX > 0.12
          ) {
            return face.tone === 'paper' ? MARK_DARK : MARK_LIGHT
          }
          const grainX = Math.floor(paperX * 31)
          const grainY = Math.floor(paperY * 34)
          const grain =
            (((grainX * 13 + grainY * 7 + face.blade * 3) % 17) + 17) % 17
          return face.ink[grain < 11 ? 0 : grain < 14 ? 1 : grain < 16 ? 2 : 3]
        }
      }
      if (vertical >= wheel.centerY && vertical <= wheel.bottom) {
        if (
          Math.floor(horizontal / cellWidth) ===
          Math.floor(wheel.horizontal / cellWidth)
        )
          return STEM
      }
      const groundX = (horizontal - wheel.horizontal) / 23
      const groundY = (vertical - wheel.bottom - 3) / groundRadiusY
      if (groundX * groundX + groundY * groundY < 1) return FOOT
    }
    return null
  }
}
