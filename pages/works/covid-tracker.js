import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Badge, Container, Link, List, ListItem } from "@chakra-ui/react"
import Layout from "../../components/layouts/article"
import Paragraph from "../../components/paragraph"
import { Meta, Title, WorkImage } from "../../components/work"

const Work = () => {
    return (
        <Layout title="Covid Tracker">
            <Container>
                <Title>
                Covid Tracker <Badge>2021</Badge>
                </Title>
                <Paragraph>Tracker for coronavirus cases ,deaths and recovered patients.</Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href="https://covid-19-tracker-9c8d8.web.app/">
                        https://covid-19-tracker-9c8d8.web.app/ <ExternalLinkIcon mx="2px"/>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React</span>
                    </ListItem>
                </List>
                <WorkImage src="/images/covid-tracker.png" alt="Covid Tracker" />
            </Container>
        </Layout>
    )
}

export default Work