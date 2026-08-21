import NextLink from 'next/link'
import Image from 'next/image'
import { Global } from '@emotion/react'
import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'

export const WorkGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        sizes="(max-width: 767px) calc(100vw - 32px), 276px"
        style={{ width: '100%', height: 'auto', marginBottom: '6px' }}
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
