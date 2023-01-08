import { Container, Heading, SimpleGrid } from "@chakra-ui/react"
import { WorkGridItem } from "../components/gridItems"
import Layout from "../components/layouts/article"
import Section from "../components/section"
import covidTracker from "../public/images/covid-tracker.png"
import movieDatabase from "../public/images/movie-database.png"
import quoraClone from "../public/images/quora-clone.png"

const Works = () => {
    return (
        <Layout>
            <Container>
                <Heading as="h3" fontSize={20} mb={4}>
                    Works
                </Heading>

                <SimpleGrid columns={[1, 1, 2]} gap={6}>
                    <Section>
                        <WorkGridItem id="movie" title="Movie Database" thumbnail={movieDatabase}>
                            A movie database site that allows you to view data of various movies like budget, rating etc.
                        </WorkGridItem>
                    </Section>
                    <Section>
                        <WorkGridItem id="covid-tracker" title="Covid Tracker" thumbnail={covidTracker}>
                            A covid tracker site that allows you to moniter data of various countries.
                        </WorkGridItem>
                    </Section>
                    <Section>
                        <WorkGridItem id="quora-clone" title="Quora Clone" thumbnail={quoraClone}>
                            A quora clone.
                        </WorkGridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Works