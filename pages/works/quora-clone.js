import { LuExternalLink } from 'react-icons/lu'
import { Badge, Container, Link, List } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Paragraph from '../../components/paragraph'
import { Meta, Title, WorkImage } from '../../components/work'

const Work = () => {
  return (
    <Layout title="Quora Clone">
      <Container maxW="60ch" px={4}>
        <Title>
          Quora Clone <Badge>2021</Badge>
        </Title>
        <Paragraph>A basic quora clone.</Paragraph>
        <List.Root ml={4} my={4}>
          <List.Item>
            <Meta>Website</Meta>
            <Link
              color={{ base: '#3d7aed', _dark: '#ff63c3' }}
              textUnderlineOffset="3px"
              href="https://quora-clone-422c8.web.app/"
            >
              https://quora-clone-422c8.web.app/{' '}
              <LuExternalLink style={{ marginInline: 2 }} />
            </Link>
          </List.Item>
          <List.Item>
            <Meta>Stack</Meta>
            <span>React</span>
          </List.Item>
        </List.Root>
        <WorkImage src="/images/quora-clone.png" alt="Quora Clone" />
      </Container>
    </Layout>
  )
}

export default Work
