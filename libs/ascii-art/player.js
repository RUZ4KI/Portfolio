import {
  FRAME_INTERVAL,
  MAX_FRAME_DELTA,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  SIMULATION_STEP
} from './constants'
import { CharacterRenderer } from './renderer'

export class ScenePlayer {
  constructor(canvas, artwork) {
    this.canvas = canvas
    this.scene = new artwork.Scene()
    this.renderer = new CharacterRenderer(canvas)
    this.options = { paused: true, reducedMotion: true, playbackRate: 1 }
    this.frame = null
    this.previousTimestamp = null
    this.lastDraw = 0
    this.accumulator = 0
    this.disposed = false
    this.tick = this.tick.bind(this)
    this.syncPlayback = this.syncPlayback.bind(this)
    this.canvas.dataset.scene = artwork.id
    document.addEventListener('visibilitychange', this.syncPlayback)
    this.draw()
  }

  get canAnimate() {
    return (
      !this.options.paused && !this.options.reducedMotion && !document.hidden
    )
  }

  setOptions(options) {
    this.options = options
    this.renderer.darkMode = options.darkMode
    this.syncPlayback()
  }

  draw() {
    this.renderer.draw(this.scene)
    this.canvas.dataset.time = this.scene.time.toFixed(3)
  }

  syncPlayback() {
    if (this.disposed) return
    cancelAnimationFrame(this.frame)
    this.frame = null
    this.previousTimestamp = null
    this.lastDraw = 0
    this.accumulator = 0
    this.draw()
    if (this.canAnimate) this.frame = requestAnimationFrame(this.tick)
  }

  tick(timestamp) {
    if (this.disposed || !this.canAnimate) return
    const elapsed =
      this.previousTimestamp === null
        ? 0
        : Math.min((timestamp - this.previousTimestamp) / 1000, MAX_FRAME_DELTA)
    this.previousTimestamp = timestamp
    this.accumulator += elapsed * this.options.playbackRate
    while (this.accumulator >= SIMULATION_STEP) {
      this.scene.update(SIMULATION_STEP)
      this.accumulator -= SIMULATION_STEP
    }
    if (timestamp - this.lastDraw >= FRAME_INTERVAL) {
      this.draw()
      this.lastDraw = timestamp
    }
    this.frame = requestAnimationFrame(this.tick)
  }

  movePointer(clientX, clientY) {
    if (!this.canAnimate) return
    const bounds = this.canvas.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    this.scene.pointer.horizontal =
      ((clientX - bounds.left) / bounds.width) * SCENE_WIDTH
    this.scene.pointer.vertical =
      ((clientY - bounds.top) / bounds.height) * SCENE_HEIGHT
    this.scene.pointer.active = true
  }

  releasePointer() {
    this.scene.pointer.active = false
  }

  interact(atCenter = false) {
    if (!this.canAnimate) return false
    if (atCenter) {
      this.scene.pointer.horizontal = SCENE_WIDTH / 2
      this.scene.pointer.vertical = SCENE_HEIGHT / 2
      this.scene.pointer.active = true
    }
    this.scene.interact()
    return true
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.frame)
    document.removeEventListener('visibilitychange', this.syncPlayback)
    this.renderer.dispose()
  }
}
