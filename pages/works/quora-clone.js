import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Badge, Container, Link, List, ListItem } from "@chakra-ui/react"
import Layout from "../../components/layouts/article"
import Paragraph from "../../components/paragraph"
import { Meta, Title, WorkImage } from "../../components/work"

const Work = () => {
    return (
        <Layout title="Quora Clone">
            <Container>
                <Title>
                Quora Clone <Badge>2021</Badge>
                </Title>
                <Paragraph>A basic quora clone.</Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href="https://quora-clone-422c8.web.app/">
                        https://quora-clone-422c8.web.app/ <ExternalLinkIcon mx="2px"/>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React</span>
                    </ListItem>
                </List>
                <WorkImage src="/images/quora-clone.png" alt="Quora Clone" />
            </Container>
        </Layout>
    )
}

export default Work