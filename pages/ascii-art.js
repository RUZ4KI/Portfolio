import { Box } from '@chakra-ui/react'
import AsciiGallery from '../components/ascii-art/gallery'
import Layout from '../components/layouts/article'

const AsciiArt = () => (
  <Layout title="ASCII Art">
    <Box
      w="full"
      minH="calc(100svh - 112px)"
      display="grid"
      alignItems="center"
      py={{ base: 4, md: 8 }}
    >
      <AsciiGallery />
    </Box>
  </Layout>
)

export default AsciiArt
