import {
  FRAME_INTERVAL,
  MAX_FRAME_DELTA,
  NARROW_CELL_SCALE,
  NARROW_WIDTH,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  SIMULATION_STEP,
  VIEW_HEIGHT,
  VIEW_LEFT,
  VIEW_TOP,
  VIEW_WIDTH
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
    this.onScreen = true
    this.tick = this.tick.bind(this)
    this.syncPlayback = this.syncPlayback.bind(this)
    this.updateLayout = this.updateLayout.bind(this)
    this.handlePixelRatio = this.handlePixelRatio.bind(this)
    this.canvas.dataset.scene = artwork.id
    document.addEventListener('visibilitychange', this.syncPlayback)
    this.resizeObserver = new ResizeObserver(this.updateLayout)
    this.resizeObserver.observe(canvas)
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.onScreen = entries[entries.length - 1].isIntersecting
      this.syncPlayback()
    })
    this.intersectionObserver.observe(canvas)
    this.watchPixelRatio()
    this.updateLayout()
  }

  get canAnimate() {
    return (
      !this.options.paused &&
      !this.options.reducedMotion &&
      !document.hidden &&
      this.onScreen
    )
  }

  watchPixelRatio() {
    this.pixelRatioQuery?.removeEventListener('change', this.handlePixelRatio)
    this.pixelRatioQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio || 1}dppx)`
    )
    this.pixelRatioQuery.addEventListener('change', this.handlePixelRatio)
  }

  handlePixelRatio() {
    this.watchPixelRatio()
    this.updateLayout()
  }

  updateLayout() {
    if (this.disposed) return
    const width = this.canvas.getBoundingClientRect().width
    const scale = width && width < NARROW_WIDTH ? NARROW_CELL_SCALE : 1
    const devicePixels = width * Math.min(window.devicePixelRatio || 1, 2)
    const ratio = Math.min(3, Math.max(1, Math.ceil(devicePixels / VIEW_WIDTH)))
    if (this.renderer.configure(ratio, scale)) this.draw()
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
      VIEW_LEFT + ((clientX - bounds.left) / bounds.width) * VIEW_WIDTH
    this.scene.pointer.vertical =
      VIEW_TOP + ((clientY - bounds.top) / bounds.height) * VIEW_HEIGHT
    this.scene.pointer.active = true
  }

  releasePointer() {
    this.scene.pointer.active = false
  }

  interact(atCenter = false) {
    if (!this.canAnimate) return 'paused'
    if (atCenter) {
      this.scene.pointer.horizontal = SCENE_WIDTH / 2
      this.scene.pointer.vertical = SCENE_HEIGHT / 2
      this.scene.pointer.active = true
    }
    const moved = this.scene.interact() !== false
    if (atCenter) this.releasePointer()
    return moved ? 'played' : 'missed'
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.frame)
    document.removeEventListener('visibilitychange', this.syncPlayback)
    this.pixelRatioQuery.removeEventListener('change', this.handlePixelRatio)
    this.resizeObserver.disconnect()
    this.intersectionObserver.disconnect()
    this.renderer.dispose()
  }
}
