import {
  Box,
  Container,
  Flex,
  IconButton,
  Link,
  Menu,
  Stack
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import NextLink from 'next/link'
import Logo from './logo'
import ThemeToggleButton from './themeToggleButton'
import { IoLogoGithub } from 'react-icons/io5'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  return (
    <Link
      asChild
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={
        active
          ? '#202023'
          : { base: '#1a202c', _dark: 'rgba(255, 255, 255, 0.92)' }
      }
      {...props}
    >
      <NextLink href={href} target={target} scroll={false}>
        {children}
      </NextLink>
    </Link>
  )
}

const Navbar = props => {
  const { path } = props
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={{ base: '#ffffff40', _dark: '#20202380' }}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="960px"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Box
            fontSize="30px"
            fontWeight={700}
            lineHeight="36px"
            letterSpacing="tighter"
          >
            <Logo />
          </Box>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/RUZ4KI"
            path={path}
            display="flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoGithub />
            Source
          </LinkItem>
        </Stack>
        <Box flex={1} textAlign="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  variant="outline"
                  aria-label="Options"
                  fontSize="16px"
                  lineHeight="19.2px"
                  borderRadius="6px"
                  _icon={{ width: '1em', height: '1em' }}
                >
                  <FiMenu />
                </IconButton>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="about" asChild>
                    <NextLink href="/">About</NextLink>
                  </Menu.Item>
                  <Menu.Item value="works" asChild>
                    <NextLink href="/works">Works</NextLink>
                  </Menu.Item>
                  <Menu.Item value="github" asChild>
                    <NextLink href="https://github.com/RUZ4KI" target="_blank">
                      Github
                    </NextLink>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
