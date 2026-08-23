import { LuExternalLink } from 'react-icons/lu'
import { Badge, Container, Link, List } from '@chakra-ui/react'
import sarathi from '../../public/images/sarathi.webp'
import Layout from '../../components/layouts/article'
import Paragraph from '../../components/paragraph'
import { Meta, Title, WorkImage } from '../../components/work'

const Work = () => {
  return (
    <Layout title="Sarathi">
      <Container maxW="60ch" px={4}>
        <Title>
          Sarathi <Badge>2026</Badge>
        </Title>
        <Paragraph>
          A small, inspectable coding-agent CLI that can explore and edit
          files, run commands, fetch public web content, require approval for
          mutating actions, and save or resume interactive sessions.
        </Paragraph>
        <List.Root ml={4} my={4}>
          <List.Item>
            <Meta>Repository</Meta>
            <Link
              color={{ base: '#3d7aed', _dark: '#ff63c3' }}
              textUnderlineOffset="3px"
              href="https://github.com/RUZ4KI/sarathi"
            >
              github.com/RUZ4KI/sarathi{' '}
              <LuExternalLink style={{ marginInline: 2 }} />
            </Link>
          </List.Item>
          <List.Item>
            <Meta>Stack</Meta>
            <span>TypeScript, Bun</span>
          </List.Item>
        </List.Root>
        <WorkImage src={sarathi} alt="Sarathi CLI help screen" />
      </Container>
    </Layout>
  )
}

export default Work
