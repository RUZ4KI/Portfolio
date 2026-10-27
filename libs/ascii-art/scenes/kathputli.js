import { CELL_WIDTH } from '../constants'
import { clamp, smooth } from '../math'

const DANCE_DURATION = 4.8
const DANCE_FADE_IN = 0.5
const DANCE_FADE_OUT = 4.1
const DANCE_FREQUENCY = 4.2
const FOREARM_LENGTH = 30
const ELLIPSE = 0
const POLYGON = 1
const LIMB = 2

export const kathputliInfo = {
  caption: 'Two kathputlis, one quiet conversation.',
  hint: 'Move gently to lead the strings · click for a synchronized dance',
  description:
    'Carved wooden faces, wrapped turbans and block-printed cloth. A pair of Rajasthani string puppets trade small gestures, with their hems arriving a little later.',
  announcement:
    'Both kathputlis sway together, bending their forearms at the elbows: left hands up and right hands down, then switching in sync.'
}

const material = (tone, glyph, density = 0.5, opacity = 1) =>
  Object.freeze({ tone, glyph, density, opacity })

const ink = {
  wood: material('clay', ':', 0.65),
  woodLight: material('shaft', ':', 0.6),
  woodShade: material('clayFold', ';', 0.65),
  dark: material('indigo', '-', 0.75),
  eye: material('indigo', '*', 0.8),
  ivory: material('paper', '.', 0.5),
  gold: material('gold', '=', 0.7),
  goldLight: material('shaft', '-', 0.6),
  rust: material('clayFold', ':', 0.7),
  rustLight: material('clay', ':', 0.6),
  blue: material('indigo', ':', 0.65),
  blueLight: material('blue', ':', 0.55),
  jade: material('jade', ':', 0.6),
  jadeShade: material('teal', ':', 0.6),
  motif: material('shaft', '+', 0.55),
  string: material('bronze', '|', 0.15, 0.42),
  stringSlant: material('bronze', '/', 0.15, 0.42),
  joint: material('bronze', 'o', 0.55)
}

const BODICE = [
  [-17, 19],
  [17, 19],
  [20, 36],
  [11, 60],
  [-12, 60],
  [-21, 34]
]
const BODICE_SHADE = [
  [-15, 20],
  [-7, 19],
  [9, 58],
  [2, 59]
]
const NECKLINE = [
  [-16, 18],
  [-9, 19],
  [1, 33],
  [11, 19],
  [17, 19],
  [1, 40]
]
const WAISTBAND = [
  [-13, 56],
  [13, 56],
  [15, 62],
  [-14, 62]
]
const NOSE = [
  [5, -10],
  [11, 2],
  [5, 3]
]
const VEIL = [
  [-15, -25],
  [-8, -35],
  [7, -34],
  [16, -23],
  [19, 17],
  [13, 21],
  [11, -18],
  [-9, -20],
  [-14, 15],
  [-20, 20]
]
const VEIL_BORDER = [
  [-15, -25],
  [-8, -30],
  [9, -29],
  [16, -23],
  [12, -18],
  [-12, -20]
]
const TURBAN = [
  [-14, -17],
  [-18, -27],
  [-11, -36],
  [3, -39],
  [15, -31],
  [17, -20],
  [9, -17]
]
const TURBAN_LIGHT = [
  [-16, -27],
  [6, -35],
  [14, -30],
  [-14, -20]
]
const TURBAN_BAND = [
  [-12, -18],
  [15, -26],
  [17, -20],
  [10, -16]
]
const TURBAN_TAIL = [
  [-13, -23],
  [-19, -20],
  [-21, 16],
  [-15, 24],
  [-13, 3]
]

const pair = () => [0, 0]
const set = (target, horizontal, vertical) => {
  target[0] = horizontal
  target[1] = vertical
  return target
}

export class KathputliScene {
  constructor() {
    this.time = 0
    this.pointer = { horizontal: 480, vertical: 210, active: false }
    this.pull = 0
    this.lift = 0
    this.isDancing = false
    this.danceStartedAt = 0
    this.shapes = []
    this.strings = []
    this.shapeCount = 0
    this.stringCount = 0
    this.pose = { horizontal: 0, vertical: 0, angle: 0, cosine: 1, sine: 0 }
    this.center = pair()
    this.joints = {
      leftShoulder: pair(),
      rightShoulder: pair(),
      leftElbow: pair(),
      rightElbow: pair(),
      leftHand: pair(),
      rightHand: pair(),
      leftTemple: pair(),
      rightTemple: pair()
    }
    this.skirt = Array.from({ length: 9 }, pair)
    this.hem = Array.from({ length: 6 }, pair)
    this.buildGeometry()
  }

  update(delta) {
    const elapsed = Number.isFinite(delta) ? Math.max(0, delta) : 0
    this.time += elapsed
    const response = 1 - Math.exp(-elapsed * 3.8)
    const target = this.pointer.active
      ? clamp((this.pointer.horizontal - 480) / 300, -1, 1)
      : 0
    const lift = this.pointer.active
      ? clamp((210 - this.pointer.vertical) / 210, -0.6, 0.7)
      : 0
    this.pull += (target - this.pull) * response
    this.lift += (lift - this.lift) * response
    if (this.time - this.danceStartedAt >= DANCE_DURATION)
      this.isDancing = false
    this.buildGeometry()
  }

  interact() {
    if (this.isDancing) return
    this.isDancing = true
    this.danceStartedAt = this.time
  }

  shape(kind, paint) {
    const index = this.shapeCount++
    const shape = this.shapes[index] || (this.shapes[index] = { vertices: [] })
    shape.kind = kind
    shape.paint = paint
    shape.pattern = false
    return shape
  }

  ellipse(horizontal, vertical, radiusX, radiusY, angle, paint) {
    const shape = this.shape(ELLIPSE, paint)
    shape.horizontal = horizontal
    shape.vertical = vertical
    shape.cosine = Math.cos(angle)
    shape.sine = Math.sin(angle)
    shape.inverseX = 1 / (radiusX * radiusX)
    shape.inverseY = 1 / (radiusY * radiusY)
    const extent = Math.max(radiusX, radiusY)
    shape.left = horizontal - extent
    shape.right = horizontal + extent
    shape.top = vertical - extent
    shape.bottom = vertical + extent
    return shape
  }

  place(localX, localY, target) {
    const pose = this.pose
    return set(
      target,
      pose.horizontal + localX * pose.cosine - localY * pose.sine,
      pose.vertical + localX * pose.sine + localY * pose.cosine
    )
  }

  oval(localX, localY, radiusX, radiusY, paint, tilt = 0) {
    const center = this.place(localX, localY, this.center)
    return this.ellipse(
      center[0],
      center[1],
      radiusX,
      radiusY,
      this.pose.angle + tilt,
      paint
    )
  }

  poly(points, paint) {
    const shape = this.shape(POLYGON, paint)
    shape.left = shape.top = Infinity
    shape.right = shape.bottom = -Infinity
    shape.vertices.length = points.length
    for (let index = 0; index < points.length; index++) {
      const point = points[index]
      const vertex = this.place(
        point[0],
        point[1],
        shape.vertices[index] || (shape.vertices[index] = pair())
      )
      shape.left = Math.min(shape.left, vertex[0])
      shape.right = Math.max(shape.right, vertex[0])
      shape.top = Math.min(shape.top, vertex[1])
      shape.bottom = Math.max(shape.bottom, vertex[1])
    }
    return shape
  }

  limb(start, end, width, paint) {
    const shape = this.shape(LIMB, paint)
    shape.horizontal = start[0]
    shape.vertical = start[1]
    shape.deltaX = end[0] - start[0]
    shape.deltaY = end[1] - start[1]
    shape.inverseLength =
      1 / Math.max(0.001, shape.deltaX ** 2 + shape.deltaY ** 2)
    shape.radiusSquared = width * width
    shape.left = Math.min(start[0], end[0]) - width
    shape.right = Math.max(start[0], end[0]) + width
    shape.top = Math.min(start[1], end[1]) - width
    shape.bottom = Math.max(start[1], end[1]) + width
  }

  thread(startX, startY, end) {
    const index = this.stringCount++
    const string = this.strings[index] || (this.strings[index] = {})
    string.top = startY
    string.bottom = end[1]
    string.horizontal = startX
    string.slope = (end[0] - startX) / (end[1] - startY)
    string.paint = Math.abs(string.slope) > 0.22 ? ink.stringSlant : ink.string
  }

  buildGeometry() {
    this.shapeCount = 0
    this.stringCount = 0
    this.buildPuppet(0)
    this.buildPuppet(1)
  }

  buildPuppet(index) {
    const feminine = index === 1
    const phase = this.time * 0.67 + index * 1.9
    const performanceTime = this.time - this.danceStartedAt
    const dance = this.isDancing
      ? smooth(0, DANCE_FADE_IN, performanceTime) *
        (1 - smooth(DANCE_FADE_OUT, DANCE_DURATION, performanceTime))
      : 0
    const idle = 1 - dance
    const gesture =
      (Math.sin(phase) * 0.55 + Math.sin(phase * 0.47 + 1) * 0.45) * idle
    const beat = Math.sin(performanceTime * DANCE_FREQUENCY)
    const angle = gesture * 0.045 + this.pull * 0.075 + dance * beat * 0.055
    const horizontal =
      (feminine ? 566 : 387) +
      gesture * 5 +
      this.pull * ((feminine ? 11 : 15) * idle + 13 * dance) +
      dance * beat * 22
    const vertical = 171 + Math.sin(phase * 0.82) * 3 * idle - this.lift * 7
    const pose = this.pose
    pose.horizontal = horizontal
    pose.vertical = vertical
    pose.angle = angle
    pose.cosine = Math.cos(angle)
    pose.sine = Math.sin(angle)
    const joints = this.joints
    const fabric = feminine ? ink.rustLight : ink.blue
    const fabricShade = feminine ? ink.rust : ink.blueLight
    const lag =
      Math.sin(phase - 0.8) * 5 * idle -
      this.pull * 5 -
      dance * Math.sin(performanceTime * DANCE_FREQUENCY - 0.8) * 13
    const leftShoulder = this.place(-17, 20, joints.leftShoulder)
    const rightShoulder = this.place(17, 20, joints.rightShoulder)
    const leftElbowX = -35 - gesture * 4 - dance * 8
    const leftElbowY = 42 - dance * 15
    const rightElbowX = 33 + gesture * 4 + dance * 8
    const rightElbowY = 37 - dance * 10
    const leftElbow = this.place(leftElbowX, leftElbowY, joints.leftElbow)
    const rightElbow = this.place(rightElbowX, rightElbowY, joints.rightElbow)
    const forearmAngle = beat * 0.95
    const forearmX = Math.cos(forearmAngle) * FOREARM_LENGTH
    const forearmY = Math.sin(forearmAngle) * FOREARM_LENGTH
    const leftHand = this.place(
      leftElbowX + (-10 - gesture) * idle - forearmX * dance,
      leftElbowY + (-15 - gesture * 7) * idle - forearmY * dance,
      joints.leftHand
    )
    const rightHand = this.place(
      rightElbowX + 15 * idle + forearmX * dance,
      rightElbowY + (-20 + gesture * 10) * idle + forearmY * dance,
      joints.rightHand
    )
    const controlX = horizontal + this.pull * 19
    const controlY = 49 - this.lift * 8 + Math.sin(phase * 0.82) * 2
    this.thread(controlX - 13, controlY, this.place(-7, -22, joints.leftTemple))
    this.thread(
      controlX + 13,
      controlY + 2,
      this.place(7, -22, joints.rightTemple)
    )
    this.thread(controlX - 27, controlY + 5, leftHand)
    this.thread(controlX + 27, controlY + 3, rightHand)

    this.limb(leftShoulder, leftElbow, 6, fabricShade)
    this.limb(rightShoulder, rightElbow, 6, fabricShade)
    this.oval(0, 13, 7, 12, ink.woodShade)

    const hemWidth = (feminine ? 48 : 35) + dance * (8 + beat * 4)
    const skirtPoints = this.skirt
    set(skirtPoints[0], -12, 58)
    set(skirtPoints[1], 12, 58)
    set(skirtPoints[2], hemWidth * 0.7 + lag * 0.4, 104)
    set(skirtPoints[3], hemWidth + lag, 129)
    set(skirtPoints[4], hemWidth * 0.5 + lag, 134)
    set(skirtPoints[5], lag, 136)
    set(skirtPoints[6], -hemWidth * 0.55 + lag, 133)
    set(skirtPoints[7], -hemWidth + lag, 127)
    set(skirtPoints[8], -hemWidth * 0.7 + lag * 0.4, 102)
    const skirt = this.poly(skirtPoints, fabric)
    skirt.pattern = true
    skirt.originX = horizontal
    skirt.originY = vertical
    skirt.cosine = pose.cosine
    skirt.sine = pose.sine
    skirt.lag = lag
    skirt.feminine = feminine
    skirt.alternate = fabricShade
    const hem = this.hem
    set(hem[0], -hemWidth + lag, 124)
    set(hem[1], lag, 130)
    set(hem[2], hemWidth + lag, 126)
    set(hem[3], hemWidth + lag, 129)
    set(hem[4], lag, 136)
    set(hem[5], -hemWidth + lag, 127)
    this.poly(hem, ink.gold)
    this.poly(BODICE, feminine ? ink.jade : ink.blue)
    this.poly(BODICE_SHADE, feminine ? ink.jadeShade : ink.blueLight)
    this.poly(NECKLINE, ink.gold)
    this.poly(WAISTBAND, ink.gold)
    this.oval(1, 42, 2.6, 2.8, ink.goldLight)
    this.oval(2, 51, 2.2, 2.2, ink.goldLight)

    this.limb(leftElbow, leftHand, 3.4, ink.wood)
    this.limb(rightElbow, rightHand, 3.4, ink.wood)
    this.ellipse(leftElbow[0], leftElbow[1], 4, 4, angle, ink.joint)
    this.ellipse(rightElbow[0], rightElbow[1], 4, 4, angle, ink.joint)
    this.ellipse(leftHand[0], leftHand[1], 5, 4, angle - 0.5, ink.woodLight)
    this.ellipse(rightHand[0], rightHand[1], 5, 4, angle + 0.5, ink.woodLight)

    this.oval(-13, -2, 4, 6, ink.woodShade)
    this.oval(13, -2, 4, 6, ink.woodShade)
    this.oval(0, -5, 13, 19, ink.wood)
    this.oval(-3, -7, 8.5, 14, ink.woodLight)
    this.poly(NOSE, ink.woodShade)
    this.oval(-6, -8, 3.2, 2.2, ink.ivory)
    this.oval(6, -8, 3.2, 2.2, ink.ivory)
    this.oval(-5, -8, 1.8, 1.8, ink.eye)
    this.oval(7, -8, 1.8, 1.8, ink.eye)
    if (feminine) {
      this.oval(0, -14, 1.9, 2.4, ink.rust)
      this.oval(1, 6, 3.6, 1.8, ink.rust)
      this.oval(-15, 4, 2.5, 4.2, ink.gold)
      this.oval(15, 4, 2.5, 4.2, ink.gold)
      this.poly(VEIL, ink.rust)
      this.poly(VEIL_BORDER, ink.gold)
      this.oval(0, -25, 2.8, 3.5, ink.goldLight)
    } else {
      this.oval(-4, 4, 5.5, 2.7, ink.dark, -0.2)
      this.oval(5, 4, 5.5, 2.7, ink.dark, 0.2)
      this.poly(TURBAN, ink.gold)
      this.poly(TURBAN_LIGHT, ink.goldLight)
      this.poly(TURBAN_BAND, ink.rust)
      this.poly(TURBAN_TAIL, ink.gold)
      this.oval(7, -25, 3, 4, ink.jade)
    }
  }

  sample(horizontal, vertical, cellWidth = CELL_WIDTH) {
    if (horizontal < 240 || horizontal > 720 || vertical < 30 || vertical > 355)
      return null
    for (let index = this.shapeCount - 1; index >= 0; index--) {
      const shape = this.shapes[index]
      if (
        horizontal < shape.left ||
        horizontal > shape.right ||
        vertical < shape.top ||
        vertical > shape.bottom
      )
        continue
      const deltaX = horizontal - shape.horizontal
      const deltaY = vertical - shape.vertical
      if (shape.kind === ELLIPSE) {
        const localX = deltaX * shape.cosine + deltaY * shape.sine
        const localY = deltaY * shape.cosine - deltaX * shape.sine
        if (
          localX * localX * shape.inverseX + localY * localY * shape.inverseY <=
          1
        )
          return shape.paint
      } else if (shape.kind === LIMB) {
        const fraction = clamp(
          (deltaX * shape.deltaX + deltaY * shape.deltaY) * shape.inverseLength,
          0,
          1
        )
        const offsetX = deltaX - shape.deltaX * fraction
        const offsetY = deltaY - shape.deltaY * fraction
        if (offsetX * offsetX + offsetY * offsetY <= shape.radiusSquared)
          return shape.paint
      } else {
        const vertices = shape.vertices
        let contained = false
        for (
          let current = 0, previous = vertices.length - 1;
          current < vertices.length;
          previous = current++
        ) {
          const start = vertices[current]
          const end = vertices[previous]
          if (
            start[1] > vertical !== end[1] > vertical &&
            horizontal <
              ((end[0] - start[0]) * (vertical - start[1])) /
                (end[1] - start[1]) +
                start[0]
          )
            contained = !contained
        }
        if (!contained) continue
        if (!shape.pattern) return shape.paint
        const offsetX = horizontal - shape.originX
        const offsetY = vertical - shape.originY
        const localY = offsetY * shape.cosine - offsetX * shape.sine
        const localX =
          offsetX * shape.cosine +
          offsetY * shape.sine -
          (shape.lag * (localY - 58)) / 75
        const spread = Math.max(0.3, (localY - 35) / 90)
        const pleat = localX / spread
        const column = Math.floor((pleat + 100) / 13)
        const row = Math.floor((localY - 65) / 15)
        const motifX = (((pleat + 100 + (row % 2) * 6.5) % 13) + 13) % 13
        const motifY = (((localY - 65) % 15) + 15) % 15
        if (
          localY > 77 &&
          localY < 121 &&
          Math.abs(motifX - 6.5) / 2.6 + Math.abs(motifY - 7.5) / 3 < 1
        )
          return ink.motif
        return column % 3 === 0 ? shape.alternate : shape.paint
      }
    }
    const stringReach = Math.max(1.65, cellWidth * 0.33)
    for (let index = 0; index < this.stringCount; index++) {
      const string = this.strings[index]
      if (
        vertical >= string.top &&
        vertical <= string.bottom &&
        Math.abs(
          horizontal -
            string.horizontal -
            string.slope * (vertical - string.top)
        ) < stringReach
      )
        return string.paint
    }
    return null
  }
}
