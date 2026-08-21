import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../navbar'
import NoSsr from '../noSsr'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rushikesh Kate - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="960px" px={{ base: 4, md: 6 }} pt={{ base: 20, md: 20 }}>
        <NoSsr></NoSsr>
        {children}
      </Container>
    </Box>
  )
}

export default Main
