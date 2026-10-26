import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VisuallyHidden
} from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiPause, FiPlay, FiRotateCcw } from 'react-icons/fi'
import { artworks, getArtwork } from '../../libs/ascii-art/artworks'
import AsciiCanvas from './canvas'
import useReducedMotionPreference from './use-reduced-motion'

const mutedColor = { base: '#525252', _dark: 'rgba(255, 255, 255, 0.68)' }
const hairline = { base: 'blackAlpha.300', _dark: 'whiteAlpha.200' }

const AsciiGallery = () => {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const reducedMotion = useReducedMotionPreference()
  const artwork = getArtwork(router.query.scene)
  const [paused, setPaused] = useState(false)
  const [slow, setSlow] = useState(false)
  const [replay, setReplay] = useState(0)
  const [announcement, setAnnouncement] = useState('')

  const selectArtwork = selected => {
    setAnnouncement(`${selected.label} selected. ${selected.hint}`)
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, scene: selected.id }
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  const handleKeyDown = event => {
    if (
      /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) ||
      event.target.isContentEditable ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    )
      return
    const number = Number(event.key)
    if (number >= 1 && number <= artworks.length) {
      event.preventDefault()
      selectArtwork(artworks[number - 1])
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const direction = event.key === 'ArrowLeft' ? -1 : 1
      const index = artworks.indexOf(artwork)
      selectArtwork(
        artworks[(index + direction + artworks.length) % artworks.length]
      )
    } else if (event.key.toLowerCase() === 'r') {
      event.preventDefault()
      setReplay(value => value + 1)
      setAnnouncement(`${artwork.label} reset.`)
    }
  }

  return (
    <Box
      as="section"
      aria-label="Interactive ASCII art gallery"
      onKeyDown={handleKeyDown}
    >
      <Text fontSize="xs" letterSpacing="0.18em" color={mutedColor} mb={3}>
        ASCII PLAYGROUND
      </Text>
      <Heading as="h1" fontSize={{ base: '28px', md: '36px' }} mb={3}>
        Small things, in motion.
      </Heading>

      <Flex
        role="group"
        aria-label="Choose artwork"
        flexWrap="wrap"
        gap={2}
        mb={5}
      >
        {artworks.map((item, index) => (
          <Button
            key={item.id}
            size="sm"
            variant={item.id === artwork.id ? 'solid' : 'outline'}
            bg={item.id === artwork.id ? 'grassTeal' : 'transparent'}
            color={item.id === artwork.id ? '#202023' : undefined}
            borderColor={hairline}
            aria-pressed={item.id === artwork.id}
            onClick={() => selectArtwork(item)}
          >
            <Box as="span" opacity={0.6} fontSize="xs">
              0{index + 1}
            </Box>
            {item.label}
          </Button>
        ))}
      </Flex>

      <Box borderTopWidth="1px" borderBottomWidth="1px" borderColor={hairline}>
        <AsciiCanvas
          artwork={artwork}
          replay={replay}
          paused={paused}
          reducedMotion={reducedMotion}
          darkMode={resolvedTheme === 'dark'}
          playbackRate={slow ? 0.5 : 1}
          onInteract={setAnnouncement}
        />
      </Box>
      <Flex justify="space-between" gap={4} flexWrap="wrap" mt={4} mb={5}>
        <Text fontSize="sm" fontStyle="italic" color={mutedColor}>
          {artwork.caption}
        </Text>
        <Text id="artwork-instructions" fontSize="xs" color={mutedColor}>
          {artwork.hint}
        </Text>
      </Flex>

      <Flex gap={2} align="center" flexWrap="wrap">
        <Button
          size="sm"
          variant="ghost"
          disabled={reducedMotion}
          aria-pressed={paused || reducedMotion}
          onClick={() => setPaused(value => !value)}
        >
          {paused || reducedMotion ? <FiPlay /> : <FiPause />}
          {reducedMotion ? 'Reduced motion' : paused ? 'Resume' : 'Pause'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={reducedMotion}
          aria-pressed={slow}
          onClick={() => setSlow(value => !value)}
        >
          ½ speed
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setReplay(value => value + 1)
            setAnnouncement(`${artwork.label} reset.`)
          }}
        >
          <FiRotateCcw /> Reset
        </Button>
      </Flex>
      <VisuallyHidden role="status" aria-live="polite">
        {announcement}
      </VisuallyHidden>
    </Box>
  )
}

export default AsciiGallery
