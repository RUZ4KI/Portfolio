import NextLink from 'next/link'
import Image from 'next/image'
import { Badge, Box, Heading, Link } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'

export const Title = ({ children }) => (
  <Box>
    <Link
      asChild
      color={{ base: '#3d7aed', _dark: '#ff63c3' }}
      textUnderlineOffset="3px"
    >
      <NextLink href="/works">Works</NextLink>
    </Link>
    <span>
      {' '}
      <FiChevronRight />{' '}
    </span>
    <Heading
      display="inline-block"
      as="h3"
      fontSize={20}
      fontWeight={700}
      lineHeight={{ base: '26.6px', md: '24px' }}
      mb={4}
    >
      {children}
    </Heading>
  </Box>
)

export const WorkImage = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    placeholder="blur"
    sizes="(max-width: 640px) calc(100vw - 32px), 576px"
    style={{
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '16px'
    }}
  />
)

export const Meta = ({ children }) => (
  <Badge colorPalette="green" mr={2}>
    {children}
  </Badge>
)
