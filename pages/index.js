import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  List,
  Text
} from '@chakra-ui/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5'
import heroPortrait from '../public/images/rushikesh.webp'
import keepworksLogo from '../public/images/keepworks.webp'
import newtonSchoolLogo from '../public/images/newton-school.webp'
import revealHealthtechLogo from '../public/images/reveal-healthtech.webp'
import ycceLogo from '../public/images/ycce.webp'
import {
  BioEntry,
  BioEntryDate,
  BioEntryDescription,
  BioEntryTitle
} from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const mutedColor = { base: '#525252', _dark: 'rgba(255, 255, 255, 0.68)' }
const accentColor = { base: '#246f6c', _dark: '#81e6d9' }
const hairline = { base: 'blackAlpha.300', _dark: 'whiteAlpha.200' }

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: order => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.08 + order * 0.09,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'FastAPI',
  'NestJS',
  'GraphQL',
  'REST APIs',
  'Prisma',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Azure',
  'Docker',
  'Terraform',
  'Cypress'
]

const education = [
  {
    title: 'YCCE, Nagpur',
    description: 'B.E. in Electronics and Telecommunications',
    meta: '2017 – 2021',
    logo: ycceLogo
  }
]

const certifications = [
  {
    title: 'AWS Certified Developer – Associate',
    meta: 'Valid through June 2027'
  }
]

const socials = [
  {
    label: 'GitHub',
    icon: IoLogoGithub,
    href: 'https://github.com/RUZ4KI'
  },
  {
    label: 'LinkedIn',
    icon: IoLogoLinkedin,
    href: 'https://www.linkedin.com/in/rushikesh-kate-253b9018b'
  },
  {
    label: 'Twitter',
    icon: IoLogoTwitter,
    href: 'https://twitter.com/Rushikesh_23'
  }
]

const sectionLabelStyles = {
  as: 'h2',
  color: accentColor,
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  lineHeight: 1.4,
  textTransform: 'uppercase'
}

const Page = () => {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const portraitY = useTransform(scrollY, [0, 700], [0, 30])

  return (
    <Layout>
      <Box>
        <Box
          as="section"
          minH="calc(100svh - 80px)"
          display="grid"
          gridTemplateAreas={{
            base: '"eyebrow" "name" "portrait" "copy" "action"',
            md: '"eyebrow portrait" "name portrait" "copy portrait" "action portrait"'
          }}
          gridTemplateColumns={{ base: '1fr', md: 'minmax(0, 1fr) 320px' }}
          gridTemplateRows={{
            base: 'auto auto auto auto auto',
            md: 'auto auto auto auto'
          }}
          alignContent="center"
          alignItems="center"
          columnGap={{ md: 14 }}
          rowGap={{ base: 5, md: 6 }}
          py={{ base: 4, md: 8 }}
        >
          <motion.div
            variants={heroItem}
            custom={0}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'eyebrow' }}
          >
            <Text
              color={mutedColor}
              fontSize="12px"
              fontWeight={700}
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              Namaskar · Full-stack developer · India
            </Text>
          </motion.div>

          <motion.div
            variants={heroItem}
            custom={1}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'name' }}
          >
            <Heading
              as="h1"
              maxW="9ch"
              fontSize={{ base: '46px', md: '76px' }}
              fontWeight={700}
              letterSpacing="-0.035em"
              lineHeight={{ base: 1.04, md: 0.98 }}
            >
              Rushikesh Kate
            </Heading>
          </motion.div>

          <motion.div
            variants={heroItem}
            custom={2}
            initial="hidden"
            animate="visible"
            style={{
              gridArea: 'portrait',
              y: shouldReduceMotion ? 0 : portraitY
            }}
          >
            <Box
              overflow="hidden"
              width="100%"
              maxW={{ base: '100%', md: '320px' }}
              aspectRatio={{ base: '16 / 10', md: '3 / 4' }}
              position="relative"
              borderRadius={{ base: '18px', md: '24px' }}
              bg={{ base: 'blackAlpha.200', _dark: 'whiteAlpha.100' }}
            >
              <Image
                src={heroPortrait}
                alt="Rushikesh Kate standing in a forest"
                fill
                preload
                sizes="(max-width: 767px) calc(100vw - 32px), 320px"
                style={{ objectFit: 'cover', objectPosition: 'center 38%' }}
              />
            </Box>
          </motion.div>

          <motion.div
            variants={heroItem}
            custom={3}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'copy' }}
          >
            <Text
              maxW="30ch"
              fontSize={{ base: '23px', md: '31px' }}
              fontWeight={700}
              lineHeight={{ base: 1.35, md: 1.28 }}
            >
              I build scalable web and mobile products from interface to
              infrastructure.
            </Text>
            <Text mt={3} maxW="48ch" color={mutedColor} lineHeight={1.65}>
              Senior Full-Stack Developer at Reveal HealthTech, working on
              healthcare products for patients and care teams.
            </Text>
          </motion.div>

          <motion.div
            variants={heroItem}
            custom={4}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'action' }}
          >
            <Link
              as={NextLink}
              href="/works"
              display="inline-flex"
              alignItems="center"
              gap={2}
              minH="44px"
              color={accentColor}
              fontWeight={700}
              borderBottom="2px solid"
              borderColor={accentColor}
              _hover={{ opacity: 0.72 }}
              _focusVisible={{ outline: '2px solid', outlineOffset: '4px' }}
            >
              Explore my work <Icon as={FiArrowUpRight} />
            </Link>
          </motion.div>
        </Box>

        <Section
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '180px minmax(0, 1fr)' }}
          gap={{ base: 5, md: 10 }}
          py={{ base: 12, md: 18 }}
          borderTop="1px solid"
          borderColor={hairline}
        >
          <Heading {...sectionLabelStyles}>Experience</Heading>
          <Box>
            <Heading
              as="h3"
              maxW="18ch"
              fontSize={{ base: '30px', md: '40px' }}
              lineHeight={1.15}
              mb={5}
            >
              From zero to shipped. Many times over.
            </Heading>
            <Text maxW="58ch" color={mutedColor} lineHeight={1.7} mb={10}>
              I turn complex workflows into focused products across interfaces,
              APIs, data systems, cloud infrastructure, and production releases.
              Outside work, I enjoy cardistry, anime, and robotics.
            </Text>

            <BioEntry>
              <Flex align="flex-start" gap={4}>
                <Image
                  src={revealHealthtechLogo}
                  alt="Reveal HealthTech logo"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <Box>
                  <BioEntryTitle as="h4">Reveal HealthTech</BioEntryTitle>
                  <Text
                    color={accentColor}
                    fontSize="14px"
                    fontWeight={700}
                    my={1}
                  >
                    Senior Full-Stack Developer
                  </Text>
                </Box>
              </Flex>
              <BioEntryDate color={mutedColor}>
                Jul 2023 – Present · 3 yrs 2 mos
              </BioEntryDate>
              <BioEntryDescription color={mutedColor} gridColumn="1" ml="64px">
                Building scheduling and care-management products across web and
                mobile for 1.3M+ patients.
              </BioEntryDescription>
            </BioEntry>
            <BioEntry>
              <Flex align="flex-start" gap={4}>
                <Image
                  src={keepworksLogo}
                  alt="KeepWorks logo"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <Box>
                  <BioEntryTitle as="h4">KeepWorks</BioEntryTitle>
                  <Text
                    color={accentColor}
                    fontSize="14px"
                    fontWeight={700}
                    my={1}
                  >
                    Full-Stack Developer
                  </Text>
                </Box>
              </Flex>
              <BioEntryDate color={mutedColor}>
                Sep 2021 – Jul 2023 · 1 yr 11 mos
              </BioEntryDate>
              <BioEntryDescription color={mutedColor} gridColumn="1" ml="64px">
                Delivered client web and mobile products with React, Next.js,
                React Native, GraphQL, NestJS, and PostgreSQL.
              </BioEntryDescription>
            </BioEntry>
            <BioEntry>
              <Flex align="flex-start" gap={4}>
                <Image
                  src={newtonSchoolLogo}
                  alt="Newton School logo"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <Box>
                  <BioEntryTitle as="h4">Newton School</BioEntryTitle>
                  <Text
                    color={accentColor}
                    fontSize="14px"
                    fontWeight={700}
                    my={1}
                  >
                    Full Stack Web Development Intern
                  </Text>
                </Box>
              </Flex>
              <BioEntryDate color={mutedColor}>
                Apr 2021 – Sep 2021 · 6 mos
              </BioEntryDate>
              <BioEntryDescription color={mutedColor} gridColumn="1" ml="64px">
                Full-stack web development internship.
              </BioEntryDescription>
            </BioEntry>
          </Box>
        </Section>

        <Section
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '180px minmax(0, 1fr)' }}
          gap={{ base: 5, md: 10 }}
          py={{ base: 12, md: 18 }}
          borderTop="1px solid"
          borderColor={hairline}
        >
          <Heading {...sectionLabelStyles}>Skills</Heading>
          <Box
            as="ul"
            listStyleType="none"
            p={0}
            m={0}
            display="flex"
            flexWrap="wrap"
            gap={2}
            alignContent="flex-start"
          >
            {skills.map(skill => (
              <Box
                as="li"
                key={skill}
                px={3}
                py={2}
                bg={{ base: '#1a202c', _dark: '#f4f4f2' }}
                color={{ base: '#ffffff', _dark: '#1a202c' }}
                borderRadius="8px"
                fontSize="14px"
                fontWeight={700}
                lineHeight="20px"
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Section>

        <Section
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '180px minmax(0, 1fr)' }}
          gap={{ base: 5, md: 10 }}
          py={{ base: 12, md: 18 }}
          borderTop="1px solid"
          borderColor={hairline}
        >
          <Heading {...sectionLabelStyles}>Education</Heading>
          <Box>
            {education.map(item => (
              <Box
                key={item.title}
                display={{ md: 'grid' }}
                gridTemplateColumns="minmax(0, 1fr) auto"
                gap={6}
                py={2}
                borderBottom="1px solid"
                borderColor={hairline}
              >
                <Flex align="flex-start" gap={4}>
                  <Image
                    src={item.logo}
                    alt="YCCE logo"
                    width={48}
                    height={48}
                    style={{
                      borderRadius: '10px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <Box>
                    <Heading as="h3" fontSize="19px" lineHeight={1.4}>
                      {item.title}
                    </Heading>
                    <Text mt={1} color={mutedColor} lineHeight={1.6}>
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  mt={{ base: 2, md: 0 }}
                  flexShrink={0}
                  color={mutedColor}
                  fontSize="14px"
                >
                  {item.meta}
                </Text>
              </Box>
            ))}
          </Box>
        </Section>

        <Section
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '180px minmax(0, 1fr)' }}
          gap={{ base: 5, md: 10 }}
          py={{ base: 12, md: 18 }}
          borderTop="1px solid"
          borderColor={hairline}
        >
          <Heading {...sectionLabelStyles}>Certifications</Heading>
          <Box>
            {certifications.map(certification => (
              <Box
                key={certification.title}
                display={{ md: 'flex' }}
                alignItems="baseline"
                justifyContent="space-between"
                gap={6}
                py={4}
                borderBottom="1px solid"
                borderColor={hairline}
              >
                <Text fontWeight={700}>{certification.title}</Text>
                <Text
                  mt={{ base: 1, md: 0 }}
                  flexShrink={0}
                  color={mutedColor}
                  fontSize="14px"
                >
                  {certification.meta}
                </Text>
              </Box>
            ))}
          </Box>
        </Section>

        <Section
          py={{ base: 14, md: 20 }}
          borderTop="1px solid"
          borderColor={hairline}
          mb={0}
        >
          <Text {...sectionLabelStyles} as="p">
            Let&apos;s talk
          </Text>
          <Heading
            as="h2"
            mt={4}
            maxW="18ch"
            fontSize={{ base: '38px', md: '56px' }}
            letterSpacing="-0.025em"
            lineHeight={1.05}
          >
            Building something ambitious? Let’s talk
          </Heading>
          <List.Root
            listStyleType="none"
            p={0}
            m={0}
            mt={8}
            display="flex"
            flexWrap="wrap"
            gap={{ base: 5, md: 7 }}
          >
            {socials.map(social => (
              <List.Item key={social.label}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  minH="44px"
                  color={accentColor}
                  fontWeight={700}
                  _hover={{ opacity: 0.72 }}
                  _focusVisible={{ outline: '2px solid', outlineOffset: '4px' }}
                >
                  <Icon as={social.icon} />
                  {social.label}
                </Link>
              </List.Item>
            ))}
          </List.Root>
          <Text mt={{ base: 10, md: 14 }} fontSize="sm" color={mutedColor}>
            © {new Date().getFullYear()} Rushikesh Kate
          </Text>
        </Section>
      </Box>
    </Layout>
  )
}

export default Page
