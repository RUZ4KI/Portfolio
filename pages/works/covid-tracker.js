import { LuExternalLink } from 'react-icons/lu'
import { Badge, Container, Link, List } from '@chakra-ui/react'
import covidTracker from '../../public/images/covid-tracker.webp'
import Layout from '../../components/layouts/article'
import Paragraph from '../../components/paragraph'
import { Meta, Title, WorkImage } from '../../components/work'

const Work = () => {
  return (
    <Layout title="Covid Tracker">
      <Container maxW="60ch" px={4}>
        <Title>
          Covid Tracker <Badge>2021</Badge>
        </Title>
        <Paragraph>
          Tracker for coronavirus cases ,deaths and recovered patients.
        </Paragraph>
        <List.Root ml={4} my={4}>
          <List.Item>
            <Meta>Website</Meta>
            <Link
              color={{ base: '#3d7aed', _dark: '#ff63c3' }}
              textUnderlineOffset="3px"
              href="https://covid-19-tracker-9c8d8.web.app/"
            >
              https://covid-19-tracker-9c8d8.web.app/{' '}
              <LuExternalLink style={{ marginInline: 2 }} />
            </Link>
          </List.Item>
          <List.Item>
            <Meta>Stack</Meta>
            <span>React</span>
          </List.Item>
        </List.Root>
        <WorkImage src={covidTracker} alt="Covid Tracker" />
      </Container>
    </Layout>
  )
}

export default Work
