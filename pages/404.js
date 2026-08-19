import NextLink from 'next/link'
import {
  Box,
  Button,
  Container,
  Heading,
  Separator,
  Text
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container maxW="60ch" px={4}>
      <Heading as="h1" fontSize="36px" fontWeight={700} lineHeight="43.2px">
        Not Found
      </Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Separator my={6} />

      <Box my={6} textAlign="center">
        <Button asChild colorPalette="teal">
          <NextLink href="/">Return to home</NextLink>
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
