import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import system from '../libs/theme'

const Provider = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <ChakraProvider value={system}>{children}</ChakraProvider>
  </ThemeProvider>
)

export default Provider
