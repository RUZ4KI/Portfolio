import { AnimatePresence } from 'framer-motion'
import Fonts from '../components/fonts'
import Main from '../components/layouts/main'
import Provider from '../components/provider'

const Website = ({ Component, pageProps, router }) => {
  return (
    <Provider>
      <Fonts />
      <Main router={router}>
        <AnimatePresence mode="wait" initial={true}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Main>
    </Provider>
  )
}

export default Website
