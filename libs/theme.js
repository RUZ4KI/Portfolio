import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
      bg: { base: '#f0e7db', _dark: '#202023' },
      color: { base: '#1a202c', _dark: 'rgba(255, 255, 255, 0.92)' }
    }
  },
  theme: {
    tokens: {
      colors: {
        grassTeal: { value: '#88ccca' }
      },
      fonts: {
        heading: { value: 'var(--font-m-plus-rounded)' }
      }
    }
  }
})

const system = createSystem(defaultConfig, config)

export default system
