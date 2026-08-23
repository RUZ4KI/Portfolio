import NextLink from 'next/link'
import Image from 'next/image'
import { Badge, Box, Flex, Heading, Link } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'

export const Title = ({ children }) => (
  <Flex align="center" flexWrap="wrap" gap={2} mb={4}>
    <Link
      asChild
      color={{ base: '#3d7aed', _dark: '#ff63c3' }}
      fontSize={14}
      fontWeight={500}
      lineHeight="short"
      textUnderlineOffset="3px"
    >
      <NextLink href="/works">Works</NextLink>
    </Link>
    <Box color="fg.muted" display="flex" flexShrink={0} aria-hidden="true">
      <FiChevronRight />
    </Box>
    <Heading
      alignItems="center"
      as="h3"
      display="flex"
      flexWrap="wrap"
      fontSize={20}
      fontWeight={700}
      gap={2}
      lineHeight={{ base: '26.6px', md: '24px' }}
      m={0}
    >
      {children}
    </Heading>
  </Flex>
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
