import { IconButton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={mounted ? resolvedTheme : 'unmounted'}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          bg={isDark ? '#fbd38d' : '#805ad5'}
          color={isDark ? '#1a202c' : 'white'}
          borderRadius="6px"
          fontSize="16px"
          _hover={{ bg: isDark ? '#f6ad55' : '#6b46c1' }}
          _icon={{ width: '1em', height: '1em' }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
