import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  List,
  Icon
} from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import Section from '../components/section'
import NextLink from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5'

const Page = () => {
  return (
    <Layout>
      <Container maxW="60ch" px={4}>
        <Box
          borderRadius="lg"
          bg={{ base: 'whiteAlpha.500', _dark: 'whiteAlpha.300' }}
          p={3}
          mb={6}
          mt={16}
          textAlign="center"
        >
          Namaste, I&apos;m a full-stack developer based in India!
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading
              as="h2"
              fontSize={{ base: '30px', md: '36px' }}
              fontWeight={700}
              lineHeight={{ base: '39.9px', md: '43.2px' }}
            >
              Rushikesh Kate
            </Heading>
            <p>Digital Builder (Artist / Developer / Designer)</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
            pb={{ base: '6px', md: 0 }}
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/rushikesh.jpg"
              alt="Profile Image"
            />
          </Box>
        </Box>
        <Section delay={0.1}>
          <Heading as="h3" {...sectionTitleStyles}>
            Work
          </Heading>
          <Paragraph>
            Rushikesh Kate is an energetic and creative person looking for a
            challenging role in a reputable organization to utilize his
            technical and management skills to contribute towards the growth of
            the organization and along the way enhance his knowledge .
          </Paragraph>
          <Box textAlign="center" my={4}>
            <Button
              asChild
              bg={{ base: '#edf2f7', _dark: 'rgba(255, 255, 255, 0.08)' }}
              color={{ base: '#1a202c', _dark: 'rgba(255, 255, 255, 0.92)' }}
              borderRadius="6px"
              fontSize="16px"
              fontWeight={600}
              lineHeight="19.2px"
              _hover={{
                bg: { base: '#e2e8f0', _dark: 'rgba(255, 255, 255, 0.12)' }
              }}
              _icon={{ width: '1em', height: '1em' }}
            >
              <NextLink href="/works">
                My portfolio
                <FiChevronRight />
              </NextLink>
            </Button>
          </Box>
        </Section>
        <Section delay={0.2}>
          <Heading as="h3" {...sectionTitleStyles}>
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
          <Heading as="h3" {...sectionTitleStyles}>
            I ❤️
          </Heading>
          <Paragraph>Cardistry, Anime, Robotics</Paragraph>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" {...sectionTitleStyles}>
            On the web
            <List.Root listStyleType="none" p={0} m={0}>
              <List.Item>
                <Button asChild {...socialButtonStyles}>
                  <a target="_blank" rel="noreferrer" href="https://github.com/RUZ4KI">
                    <Icon as={IoLogoGithub} />
                    @RUZ4KI
                  </a>
                </Button>
              </List.Item>
              <List.Item>
                <Button asChild {...socialButtonStyles}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/rushikesh-kate-253b9018b"
                  >
                    <Icon as={IoLogoLinkedin} />
                    @rushikesh-kate
                  </a>
                </Button>
              </List.Item>
              <List.Item>
                <Button asChild {...socialButtonStyles}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/Rushikesh_23"
                  >
                    <Icon as={IoLogoTwitter} />
                    @Rushikesh_23
                  </a>
                </Button>
              </List.Item>
            </List.Root>
          </Heading>
        </Section>
      </Container>
    </Layout>
  )
}

const sectionTitleStyles = {
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: { base: '26.6px', md: '24px' },
  textDecoration: 'underline',
  textUnderlineOffset: '6px',
  textDecorationColor: '#525252',
  textDecorationThickness: '4px',
  mt: 3,
  mb: 4
}

const socialButtonStyles = {
  variant: 'ghost',
  justifyContent: 'flex-start',
  color: { base: '#319795', _dark: '#81e6d9' },
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '19.2px',
  _icon: { width: '1em', height: '1em' },
  _hover: { bg: { base: '#e6fffa', _dark: 'rgba(129, 230, 217, 0.12)' } }
}

export default Page
