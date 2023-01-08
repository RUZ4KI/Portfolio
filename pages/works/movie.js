import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Badge, Container, Link, List, ListItem } from "@chakra-ui/react"
import Layout from "../../components/layouts/article"
import Paragraph from "../../components/paragraph"
import { Meta, Title, WorkImage } from "../../components/work"

const Work = () => {
    return (
        <Layout title="Movie">
            <Container>
                <Title>
                    Movie Database <Badge>2021</Badge>
                </Title>
                <Paragraph>A movie database that provides various details regarding a movie or a series.</Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href="https://capable-pika-201ef1.netlify.app/">
                        https://capable-pika-201ef1.netlify.app/ <ExternalLinkIcon mx="2px"/>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>TypeScript, React</span>
                    </ListItem>
                </List>
                <WorkImage src="/images/movie-database.png" alt="Movie Database" />
            </Container>
        </Layout>
    )
}

export default Work