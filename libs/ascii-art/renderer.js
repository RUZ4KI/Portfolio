import { clamp } from './math'
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  VIEW_HEIGHT,
  VIEW_LEFT,
  VIEW_TOP,
  VIEW_WIDTH
} from './constants'

const light = {
  jade: ['#397b60', '#154d42', '#a9c2a5'],
  teal: ['#287c7b', '#084956', '#8eb9ab'],
  blue: ['#246587', '#103b59', '#8ab9be'],
  indigo: ['#1c3557', '#091f33', '#547d92'],
  gold: ['#aa843d', '#67471f', '#e0c99a'],
  bronze: ['#8d703b', '#554325', '#c7b784'],
  shaft: ['#ad925f', '#65512f', '#e6d5af'],
  paper: ['#d5ccb3', '#5e594b', '#faf8ed'],
  fold: ['#aaa58e', '#53594d', '#e1decd'],
  edge: ['#888d79', '#3f4c43', '#d0cdb9'],
  clay: ['#b78257', '#6f492f', '#e0bf9b'],
  clayFold: ['#946745', '#5b3d29', '#cda27c'],
  shadow: ['#bcc5b6', '#a1b0a4', '#dbe0d3']
}
const dark = {
  ...light,
  jade: ['#326e5c', '#8bc6a3', '#558f76'],
  teal: ['#23646b', '#82c8be', '#428e8c'],
  blue: ['#285f7b', '#8dbbcf', '#53899f'],
  indigo: ['#11263b', '#2f546c', '#365e80'],
  gold: ['#957a43', '#e5c88d', '#b39b65'],
  bronze: ['#73623d', '#c4b07b', '#998451'],
  shaft: ['#8e7b55', '#dac59d', '#ac9870'],
  paper: ['#b7b8a7', '#f4f2de', '#d5d3bd'],
  fold: ['#737f76', '#b9c6b7', '#94a498'],
  edge: ['#52685e', '#a3b9a5', '#758a78'],
  clay: ['#9e7053', '#e4b48b', '#bd8a64'],
  clayFold: ['#78583f', '#c59b78', '#9c7655'],
  shadow: ['#1c2b25', '#2a3d32', '#26392f']
}

export class CharacterRenderer {
  constructor(canvas, darkMode = false) {
    this.canvas = canvas
    this.context = canvas.getContext('2d', { alpha: false })
    this.darkMode = darkMode
    this.atlas = new Map()
    this.ratio = null
    this.scale = null
  }

  configure(ratio, scale) {
    if (ratio === this.ratio && scale === this.scale) return false
    this.ratio = ratio
    this.scale = scale
    this.cellWidth = CELL_WIDTH * scale
    this.cellHeight = CELL_HEIGHT * scale
    this.canvas.width = VIEW_WIDTH * ratio
    this.canvas.height = VIEW_HEIGHT * ratio
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0)
    this.context.imageSmoothingEnabled = false
    this.atlas.clear()
    return true
  }

  getGlyphTile(material) {
    const opacity = Math.round(clamp(material.opacity ?? 1) * 5) / 5
    const density = Math.round(clamp(material.density ?? 0.5) * 4) / 4
    const key = `${material.tone}:${material.glyph}:${opacity}:${density}:${this.darkMode}`
    if (this.atlas.has(key)) return this.atlas.get(key)
    const sprite = document.createElement('canvas')
    sprite.width = this.cellWidth * this.ratio
    sprite.height = this.cellHeight * this.ratio
    const context = sprite.getContext('2d')
    context.scale(this.ratio, this.ratio)
    const palette = (this.darkMode ? dark : light)[material.tone]
    context.globalAlpha = opacity * (0.18 + density * 0.66)
    context.fillStyle = palette[0]
    context.fillRect(0.15, 0.15, this.cellWidth - 0.3, this.cellHeight - 0.3)
    context.globalAlpha = opacity
    context.fillStyle = palette[1]
    context.font = `${8 * this.scale}px Menlo, Consolas, monospace`
    context.textAlign = 'center'
    context.textBaseline = 'alphabetic'
    context.fillText(
      material.glyph,
      this.cellWidth / 2,
      this.cellHeight - this.scale
    )
    this.atlas.set(key, sprite)
    return sprite
  }

  draw(scene) {
    const start = performance.now()
    const context = this.context
    const { cellWidth, cellHeight } = this
    context.fillStyle = this.darkMode ? '#202023' : '#f0e7db'
    context.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
    let cells = 0
    for (let vertical = 0; vertical < VIEW_HEIGHT; vertical += cellHeight) {
      for (
        let horizontal = 0;
        horizontal < VIEW_WIDTH;
        horizontal += cellWidth
      ) {
        const material = scene.sample(
          VIEW_LEFT + horizontal + cellWidth / 2,
          VIEW_TOP + vertical + cellHeight / 2,
          cellWidth
        )
        if (!material || (material.opacity ?? 1) < 0.08) continue
        context.drawImage(
          this.getGlyphTile(material),
          horizontal,
          vertical,
          cellWidth,
          cellHeight
        )
        cells++
      }
    }
    this.canvas.dataset.cells = cells
    this.canvas.dataset.renderMs = (performance.now() - start).toFixed(2)
  }

  dispose() {
    this.atlas.clear()
  }
}
