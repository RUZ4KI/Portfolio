import NextLink from 'next/link'
import Image from 'next/image'
import { Global } from '@emotion/react'
import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'

export const GridItems = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
        style={{ marginBottom: '6px' }}
      />
      <LinkOverlay asChild target="_blank">
        <a href={href}>
          <Text fontSize={14}>{children}</Text>
        </a>
      </LinkOverlay>
    </LinkBox>
  </Box>
)

export const WorkGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        style={{ marginBottom: '6px' }}
      />
      <LinkOverlay asChild>
        <NextLink href={`/works/${id}`}>
          <Text ml={2} fontSize={20}>
            {title}
          </Text>
        </NextLink>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const GridItemStyle = () => (
  <Global
    styles={`
        .grid-item-thumbnail {
            border-radius: 12px;
        }
    `}
  />
)
