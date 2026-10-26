import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { SCENE_HEIGHT, SCENE_WIDTH } from '../../libs/ascii-art/constants'
import { ScenePlayer } from '../../libs/ascii-art/player'

const AsciiCanvas = ({
  artwork,
  replay,
  paused,
  reducedMotion,
  darkMode,
  playbackRate,
  onInteract
}) => {
  const canvasRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const player = new ScenePlayer(canvasRef.current, artwork)
    playerRef.current = player
    return () => {
      player.dispose()
      playerRef.current = null
    }
  }, [artwork, replay])

  useEffect(() => {
    playerRef.current?.setOptions({
      paused,
      reducedMotion,
      darkMode,
      playbackRate
    })
  }, [artwork, replay, paused, reducedMotion, darkMode, playbackRate])

  const interact = atCenter => {
    const played = playerRef.current?.interact(atCenter)
    onInteract(
      played
        ? artwork.announcement
        : 'Motion is paused. The artwork stays still.'
    )
  }

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      width={SCENE_WIDTH}
      height={SCENE_HEIGHT}
      role="button"
      tabIndex={0}
      aria-label={`${artwork.label}. ${artwork.description}`}
      aria-describedby="artwork-instructions"
      display="block"
      w="full"
      h="auto"
      aspectRatio={`${SCENE_WIDTH} / ${SCENE_HEIGHT}`}
      cursor="crosshair"
      touchAction="pan-y"
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'grassTeal',
        outlineOffset: '4px'
      }}
      onPointerMove={event =>
        playerRef.current?.movePointer(event.clientX, event.clientY)
      }
      onPointerLeave={() => playerRef.current?.releasePointer()}
      onBlur={() => playerRef.current?.releasePointer()}
      onClick={event => {
        playerRef.current?.movePointer(event.clientX, event.clientY)
        interact(false)
      }}
      onKeyDown={event => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        interact(true)
      }}
    >
      {artwork.description}
    </Box>
  )
}

export default AsciiCanvas
