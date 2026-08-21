import { ChakraProvider } from '@chakra-ui/react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import system from '../libs/theme'

const Provider = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <MotionConfig reducedMotion="user">
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </MotionConfig>
  </ThemeProvider>
)

export default Provider
