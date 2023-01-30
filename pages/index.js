import { Box, Button, Container, Heading, Image, Link, ListItem, useColorModeValue, Icon, List } from "@chakra-ui/react"
import Paragraph from "../components/paragraph"
import Section from "../components/section"
import NextLink from 'next/link'
import { ChevronRightIcon } from "@chakra-ui/icons"
import { BioSection, BioYear } from "../components/bio"
import Layout from "../components/layouts/article"
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5'

const Page = () => {
    return (
        <Layout>
            <Container>
                <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.300')} p={3} mb={6} mt={16} align='center'>
                    Namaste, I&apos;m a full-stack developer based in India!
                </Box>

                <Box display={{ md: 'flex' }}>
                    <Box flexGrow={1}>
                        <Heading as="h2" variant="page-title">
                            Rushikesh Kate
                        </Heading>
                        <p>Digital Builder (Artist / Developer / Designer)</p>
                    </Box>
                    <Box flexShrink={0} mt={{base:4, md:0}} ml={{md:6}} align="center">
                        <Image borderColor="whiteAlpha.800" borderWidth={2} borderStyle="solid" maxWidth="100px" display="inline-block" borderRadius="full" src="/images/rushikesh.jpg" alt="Profile Image"/>
                    </Box>
                </Box>
                <Section delay={0.1}>
                    <Heading as="h3" variant="section-title">
                        Work
                    </Heading>
                    <Paragraph>
                        Rushikesh Kate is an energetic and creative person looking for a challenging role in a reputable organization to
                        utilize his technical and management skills to contribute towards the growth of the organization and along the
                        way enhance his knowledge .
                    </Paragraph>
                    <Box align="center" my={4}>
                        <NextLink href="/works">
                            <Button rightIcon={<ChevronRightIcon/>}>
                                My portfolio
                            </Button>
                        </NextLink>
                    </Box>
                </Section>
                <Section delay={0.2}>
                    <Heading as="h3" variant="section-title">
                        Bio
                    </Heading>
                    <BioSection>
                        <BioYear>1999</BioYear>
                        Born in Nagpur, India.
                    </BioSection>
                    <BioSection>
                        <BioYear>2021</BioYear>
                        Completed the Bachelor&apos;s of Engineering from YCCE Nagpur
                    </BioSection>
                    <BioSection>
                        <BioYear>2021 to present</BioYear>
                        Working at KeepWorks
                    </BioSection>
                </Section>
                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        I ❤️
                    </Heading>
                    <Paragraph>
                        Cardistry, Anime, Robotics
                    </Paragraph>
                </Section>
                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        On the web
                        <List>
                            <ListItem>
                            <Link target="_blank" href="https://github.com/RUZ4KI">
                                <Button variant="ghost" colorScheme="teal" leftIcon={<Icon as={IoLogoGithub}/>} >
                                    @RUZ4KI
                                </Button>
                            </Link>
                            </ListItem>
                            <ListItem>
                            <Link target="_blank" href="www.linkedin.com/in/rushikesh-kate-253b9018b">
                                    <Button variant="ghost" colorScheme="teal" leftIcon={<Icon as={IoLogoLinkedin} />} >
                                    @rushikesh-kate
                                </Button>
                            </Link>
                            </ListItem>
                            <ListItem>
                            <Link target="_blank" href="https://twitter.com/Rushikesh_23">
                                <Button variant="ghost" colorScheme="teal" leftIcon={<Icon as={IoLogoTwitter}/>} >
                                    @Rushikesh_23
                                </Button>
                            </Link>
                            </ListItem>
                        </List>
                    </Heading>
                </Section>
            </Container>
        </Layout>
    )
}

export default Page