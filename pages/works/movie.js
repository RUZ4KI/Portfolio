import { LuExternalLink } from 'react-icons/lu'
import { Badge, Container, Link, List } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Paragraph from '../../components/paragraph'
import { Meta, Title, WorkImage } from '../../components/work'

const Work = () => {
  return (
    <Layout title="Movie">
      <Container maxW="60ch" px={4}>
        <Title>
          Movie Database <Badge>2021</Badge>
        </Title>
        <Paragraph>
          A movie database that provides various details regarding a movie or a
          series.
        </Paragraph>
        <List.Root ml={4} my={4}>
          <List.Item>
            <Meta>Website</Meta>
            <Link
              color={{ base: '#3d7aed', _dark: '#ff63c3' }}
              textUnderlineOffset="3px"
              href="https://capable-pika-201ef1.netlify.app/"
            >
              https://capable-pika-201ef1.netlify.app/{' '}
              <LuExternalLink style={{ marginInline: 2 }} />
            </Link>
          </List.Item>
          <List.Item>
            <Meta>Stack</Meta>
            <span>TypeScript, React</span>
          </List.Item>
        </List.Root>
        <WorkImage src="/images/movie-database.png" alt="Movie Database" />
      </Container>
    </Layout>
  )
}

export default Work
