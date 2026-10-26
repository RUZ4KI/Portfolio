import { clamp } from './math'
import { CELL_WIDTH, CELL_HEIGHT, SCENE_WIDTH, SCENE_HEIGHT } from './constants'

const light = {
  jade: ['#5a937b', '#1d6258', '#a9c2a5'],
  teal: ['#4a9695', '#0d5d69', '#8eb9ab'],
  blue: ['#347e9c', '#144c70', '#8ab9be'],
  indigo: ['#213e62', '#0c273f', '#547d92'],
  gold: ['#c2a363', '#8b6b35', '#e0c99a'],
  bronze: ['#a58b56', '#74603d', '#c7b784'],
  shaft: ['#c7b388', '#87724d', '#e6d5af'],
  paper: ['#e7e1ce', '#8c8979', '#faf8ed'],
  fold: ['#c7c4b3', '#757a70', '#e1decd'],
  edge: ['#a4a595', '#59665e', '#d0cdb9'],
  clay: ['#cb9c73', '#916646', '#e0bf9b'],
  clayFold: ['#ab805f', '#77563e', '#cda27c'],
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
    this.ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = SCENE_WIDTH * this.ratio
    canvas.height = SCENE_HEIGHT * this.ratio
    this.context.scale(this.ratio, this.ratio)
    this.context.imageSmoothingEnabled = false
  }

  getGlyphTile(material) {
    const opacity = Math.round(clamp(material.opacity ?? 1) * 5) / 5
    const density = Math.round(clamp(material.density ?? 0.5) * 4) / 4
    const key = `${material.tone}:${material.glyph}:${opacity}:${density}:${this.darkMode}`
    if (this.atlas.has(key)) return this.atlas.get(key)
    const sprite = document.createElement('canvas')
    sprite.width = CELL_WIDTH * this.ratio
    sprite.height = CELL_HEIGHT * this.ratio
    const context = sprite.getContext('2d')
    context.scale(this.ratio, this.ratio)
    const palette = (this.darkMode ? dark : light)[material.tone]
    context.globalAlpha = opacity * (0.18 + density * 0.66)
    context.fillStyle = palette[0]
    context.fillRect(0.15, 0.15, CELL_WIDTH - 0.3, CELL_HEIGHT - 0.3)
    context.globalAlpha = opacity
    context.fillStyle = palette[1]
    context.font = '8px Menlo, Consolas, monospace'
    context.textAlign = 'center'
    context.textBaseline = 'alphabetic'
    context.fillText(material.glyph, CELL_WIDTH / 2, CELL_HEIGHT - 1)
    this.atlas.set(key, sprite)
    return sprite
  }

  draw(scene) {
    const start = performance.now()
    const context = this.context
    context.fillStyle = this.darkMode ? '#202023' : '#f0e7db'
    context.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT)
    let cells = 0
    for (let vertical = 0; vertical < SCENE_HEIGHT; vertical += CELL_HEIGHT) {
      for (
        let horizontal = 0;
        horizontal < SCENE_WIDTH;
        horizontal += CELL_WIDTH
      ) {
        const material = scene.sample(
          horizontal + CELL_WIDTH / 2,
          vertical + CELL_HEIGHT / 2
        )
        if (!material || (material.opacity ?? 1) < 0.08) continue
        context.drawImage(
          this.getGlyphTile(material),
          horizontal,
          vertical,
          CELL_WIDTH,
          CELL_HEIGHT
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
