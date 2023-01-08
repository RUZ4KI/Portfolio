import { ChakraProvider } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import Fonts from "../components/fonts"
import Main from "../components/layouts/main"
import theme from "../libs/theme"

const Website = ({Component, pageProps, router}) => {
    return (
        <ChakraProvider theme={theme}>
            <Fonts/>
            <Main router={router}>
                <AnimatePresence mode="wait" initial={true}>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </Main>
        </ChakraProvider>
    )
}

export default Website