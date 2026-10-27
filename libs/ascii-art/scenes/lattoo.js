import { FULL_TURN } from '../constants'

export const lattooInfo = {
  caption: 'Settle in. Let the afternoon spin by',
  hint: 'Click near a lattoo to give it another turn.',
  description:
    'Three turned wooden spinning tops, with lacquer rings, revolving woodgrain and ivory inlays, balance on their pins. They precess, wander and gently borrow each other’s orbit.',
  announcement:
    'The nearest lattoo gathers speed and straightens on its wooden pin.',
  missed: 'Nothing close enough to spin. Click nearer a lattoo.'
}

const CAMERA_UP = 0.8351646544
const CAMERA_DEPTH = 0.55
const profile = [
  [0, 0],
  [7, 3.5],
  [15, 5],
  [23, 14],
  [34, 29],
  [48, 43],
  [59, 49],
  [67, 48],
  [76, 41],
  [84, 29],
  [89, 11],
  [94, 7],
  [108, 6],
  [112, 3],
  [114, 0]
]
const segments = profile.slice(1).map(([height, radius], index) => {
  const [lower, lowerRadius] = profile[index]
  const slope = (radius - lowerRadius) / (height - lower)
  return { lower, upper: height, slope, intercept: lowerRadius - slope * lower }
})
const glyphs = ['.', ':', '-', '=', '+', '*', '#', '@', '/', '\\', '|']
const materials = Object.create(null)
for (const tone of [
  'shaft',
  'gold',
  'bronze',
  'clay',
  'clayFold',
  'indigo',
  'jade',
  'paper',
  'shadow'
]) {
  materials[tone] = Array.from({ length: 5 }, (_, density) =>
    glyphs.map(glyph => ({ tone, glyph, density: density / 4, opacity: 1 }))
  )
}
const shadows = Array.from({ length: 5 }, (_, index) => ({
  tone: 'shadow',
  glyph: '.',
  density: 0.25,
  opacity: (index + 1) / 5
}))

function makeTop(horizontal, vertical, scale, offset, lacquer) {
  return {
    homeX: horizontal,
    homeY: vertical,
    horizontal,
    vertical,
    scale,
    offset,
    lacquer,
    phase: offset,
    speed: 5.2,
    boost: 0,
    impulseX: 0,
    impulseY: 0,
    velocityX: 0,
    velocityY: 0,
    coefficients: new Float64Array(segments.length * 2)
  }
}

export class LattooScene {
  constructor() {
    this.time = 0
    this.pointer = { horizontal: 480, vertical: 210, active: false }
    this.tops = [
      makeTop(661, 231, 0.98, 3.8, 'jade'),
      makeTop(316, 277, 1.12, 1.3, 'clay'),
      makeTop(522, 315, 1.4, 0.1, 'indigo')
    ]
    this.update(0)
  }

  update(delta) {
    const step = Number.isFinite(delta) ? Math.max(0, Math.min(delta, 0.1)) : 0
    this.time += step
    for (const top of this.tops) {
      const clock = this.time + top.offset * 3
      top.boost *= Math.exp(-step * 0.64)
      const targetSpeed = 4.6 + 1.1 * Math.sin(clock * 0.19) + top.boost * 8
      top.speed += (targetSpeed - top.speed) * (1 - Math.exp(-step * 4))
      top.phase = (top.phase + top.speed * step) % FULL_TURN
      top.velocityX += (-top.impulseX * 2.1 - top.velocityX * 2.2) * step
      top.velocityY += (-top.impulseY * 2.1 - top.velocityY * 2.2) * step
      top.impulseX += top.velocityX * step
      top.impulseY += top.velocityY * step
      top.horizontal =
        top.homeX +
        27 * Math.sin(clock * 0.29) +
        9 * Math.sin(clock * 0.71) +
        top.impulseX
      top.vertical =
        top.homeY +
        12 * Math.sin(clock * 0.37) +
        5 * Math.cos(clock * 0.63) +
        top.impulseY
      const precession = clock * (1.52 + top.offset * 0.08)
      const tilt =
        (0.12 + 0.085 * (0.5 + 0.5 * Math.sin(clock * 0.44))) /
        (1 + top.boost * 1.7)
      const wobble = tilt + 0.022 * Math.sin(top.phase * 2 + top.offset)
      const sine = Math.sin(wobble)
      const cosine = Math.cos(wobble)
      const headingX = Math.cos(precession)
      const headingZ = Math.sin(precession)
      top.axisX = sine * headingX
      top.axisY = cosine
      top.axisZ = sine * headingZ
      top.sideX = cosine * headingX
      top.sideY = -sine
      top.sideZ = cosine * headingZ
      top.crossX = -headingZ
      top.crossZ = headingX
      top.rayX = top.sideY * CAMERA_DEPTH + top.sideZ * CAMERA_UP
      top.rayY = top.axisY * CAMERA_DEPTH + top.axisZ * CAMERA_UP
      top.rayZ = top.crossZ * CAMERA_UP
      top.screenSideY = -top.sideY * CAMERA_UP + top.sideZ * CAMERA_DEPTH
      top.screenAxisY = -top.axisY * CAMERA_UP + top.axisZ * CAMERA_DEPTH
      top.screenCrossY = top.crossZ * CAMERA_DEPTH
      top.minimumX = top.horizontal - 74 * top.scale
      top.maximumX = top.horizontal + 74 * top.scale
      top.minimumY = top.vertical - 122 * top.scale
      top.maximumY = top.vertical + 8 * top.scale
      for (let index = 0; index < segments.length; index++) {
        const slope = segments[index].slope
        const quadratic =
          top.rayX * top.rayX +
          top.rayZ * top.rayZ -
          slope * slope * top.rayY * top.rayY
        top.coefficients[index * 2] = quadratic
        top.coefficients[index * 2 + 1] =
          Math.abs(quadratic) > 1e-9 ? 0.5 / quadratic : 0
      }
    }
    for (let first = 0; first < this.tops.length; first++) {
      for (let second = first + 1; second < this.tops.length; second++) {
        const left = this.tops[first]
        const right = this.tops[second]
        const distanceX = right.horizontal - left.horizontal
        const distanceY = (right.vertical - left.vertical) * 1.5
        const distance = Math.hypot(distanceX, distanceY)
        const separation = 76 * (left.scale + right.scale)
        if (distance < separation && distance > 1) {
          const push = (separation - distance) * step * 0.7
          left.velocityX -= (distanceX / distance) * push
          right.velocityX += (distanceX / distance) * push
          left.velocityY -= (distanceY / distance) * push * 0.3
          right.velocityY += (distanceY / distance) * push * 0.3
        }
      }
    }
  }

  interact() {
    if (
      !Number.isFinite(this.pointer.horizontal) ||
      !Number.isFinite(this.pointer.vertical)
    )
      return false
    let nearest = null
    let nearestDistance = 150 * 150
    for (const top of this.tops) {
      const distanceX = this.pointer.horizontal - top.horizontal
      const distanceY = this.pointer.vertical - (top.vertical - 57 * top.scale)
      const distance = distanceX * distanceX + distanceY * distanceY
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = top
      }
    }
    if (!nearest) return false
    nearest.boost = Math.min(1.5, nearest.boost + 1)
    nearest.velocityX += Math.max(
      -12,
      Math.min(12, (nearest.horizontal - this.pointer.horizontal) * 0.16)
    )
    nearest.velocityY += 3
    return true
  }

  sample(horizontal, vertical) {
    let selected = null
    let selectedDepth = -Infinity
    let surfaceHeight = 0
    let surfaceX = 0
    let surfaceZ = 0
    let surfaceSlope = 0
    let shadow = 0
    for (const top of this.tops) {
      const shadowX =
        (horizontal - top.horizontal - 17 * top.scale) / (61 * top.scale)
      const shadowY =
        (vertical - top.vertical - 3 * top.scale) / (17 * top.scale)
      const shadowDistance = shadowX * shadowX + shadowY * shadowY
      if (shadowDistance < 1)
        shadow = Math.max(shadow, (1 - shadowDistance) * 0.68)
      const contactX = (horizontal - top.horizontal) / (13 * top.scale)
      const contactY = (vertical - top.vertical) / (5 * top.scale)
      if (contactX * contactX + contactY * contactY < 1)
        shadow = Math.max(shadow, 0.85)
      if (
        horizontal < top.minimumX ||
        horizontal > top.maximumX ||
        vertical < top.minimumY ||
        vertical > top.maximumY
      )
        continue
      const screenX = (horizontal - top.horizontal) / top.scale
      const screenY = (vertical - top.vertical) / top.scale
      const originX = screenX * top.sideX + screenY * top.screenSideY
      const originY = screenX * top.axisX + screenY * top.screenAxisY
      const originZ = screenX * top.crossX + screenY * top.screenCrossY
      for (let index = 0; index < segments.length; index++) {
        const segment = segments[index]
        const radius = segment.slope * originY + segment.intercept
        const quadratic = top.coefficients[index * 2]
        const linear =
          2 *
          (originX * top.rayX +
            originZ * top.rayZ -
            radius * segment.slope * top.rayY)
        const constant = originX * originX + originZ * originZ - radius * radius
        const discriminant = linear * linear - 4 * quadratic * constant
        if (discriminant < 0) continue
        const root = Math.sqrt(discriminant)
        for (let side = -1; side <= 1; side += 2) {
          const depth =
            top.coefficients[index * 2 + 1] === 0
              ? Math.abs(linear) > 1e-9
                ? -constant / linear
                : -Infinity
              : (-linear + side * root) * top.coefficients[index * 2 + 1]
          const height = originY + depth * top.rayY
          if (height < segment.lower || height > segment.upper) continue
          const worldDepth =
            depth * top.scale + (top.vertical * CAMERA_UP) / CAMERA_DEPTH
          if (worldDepth <= selectedDepth) continue
          selectedDepth = worldDepth
          selected = top
          surfaceHeight = height
          surfaceX = originX + depth * top.rayX
          surfaceZ = originZ + depth * top.rayZ
          surfaceSlope = segment.slope
        }
      }
    }
    if (!selected)
      return shadow > 0.12 ? shadows[Math.min(4, Math.floor(shadow * 5))] : null
    const radius = Math.hypot(surfaceX, surfaceZ)
    const normalX = radius > 0.001 ? surfaceX / radius : 0
    const normalZ = radius > 0.001 ? surfaceZ / radius : 0
    const normalLength = Math.sqrt(1 + surfaceSlope * surfaceSlope)
    const worldNormalX =
      normalX * selected.sideX -
      surfaceSlope * selected.axisX +
      normalZ * selected.crossX
    const worldNormalY =
      normalX * selected.sideY - surfaceSlope * selected.axisY
    const worldNormalZ =
      normalX * selected.sideZ -
      surfaceSlope * selected.axisZ +
      normalZ * selected.crossZ
    const light = Math.max(
      0,
      (-0.48 * worldNormalX + 0.76 * worldNormalY + 0.44 * worldNormalZ) /
        normalLength
    )
    const angle = Math.atan2(surfaceZ, surfaceX) - selected.phase
    const grain = Math.sin(
      angle * 9 + surfaceHeight * 0.19 + Math.sin(angle * 3) * 1.3
    )
    const fineGrain = Math.sin(surfaceHeight * 1.55 + Math.sin(angle * 5) * 0.8)
    let tone = 'gold'
    let ink = light < 0.2 ? 6 : light < 0.45 ? 4 : light < 0.72 ? 2 : 0
    if (surfaceHeight < 17 || surfaceHeight > 89) {
      tone = light < 0.22 ? 'bronze' : 'shaft'
      ink = Math.abs(grain) > 0.88 ? 10 : light < 0.3 ? 4 : 1
    } else if (
      (surfaceHeight > 37 && surfaceHeight < 48) ||
      (surfaceHeight > 62 && surfaceHeight < 75)
    ) {
      tone = selected.lacquer
      const inlay = Math.cos(angle * 6 + (surfaceHeight > 62 ? 0.5 : 0))
      if (inlay > 0.94 && surfaceHeight > 65 && surfaceHeight < 72) {
        tone = 'paper'
        ink = 1
      } else {
        ink = grain > 0.45 ? 9 : grain < -0.45 ? 8 : ink
      }
    } else if (
      (surfaceHeight > 48 && surfaceHeight < 51) ||
      (surfaceHeight > 75 && surfaceHeight < 78)
    ) {
      tone = 'paper'
      ink = light < 0.35 ? 2 : 0
    } else if (
      (surfaceHeight > 33 && surfaceHeight < 37) ||
      (surfaceHeight > 59 && surfaceHeight < 62) ||
      surfaceHeight > 83
    ) {
      tone = light < 0.3 ? 'clayFold' : 'bronze'
      ink = 3
    } else {
      tone = light < 0.24 ? 'clayFold' : grain < -0.45 ? 'clay' : 'gold'
      ink = fineGrain > 0.65 ? 2 : grain > 0.5 ? 1 : ink
    }
    const glint =
      (-0.38 * worldNormalX + 0.84 * worldNormalY + 0.38 * worldNormalZ) /
      normalLength
    if (glint > 0.975 && surfaceHeight > 24 && surfaceHeight < 89) {
      tone = 'paper'
      ink = 0
    }
    const density = Math.max(
      1,
      Math.min(4, Math.round(1.4 + light * 2.3 + grain * 0.25))
    )
    return materials[tone][density][ink]
  }
}
