import { AnimatePresence } from 'framer-motion'
import localFont from 'next/font/local'
import Main from '../components/layouts/main'
import Provider from '../components/provider'

const mPlusRounded = localFont({
  src: [
    {
      path: '../assets/fonts/m-plus-rounded-300-latin.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../assets/fonts/m-plus-rounded-700-latin.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  fallback: ['Arial']
})

const Website = ({ Component, pageProps, router }) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-m-plus-rounded: ${mPlusRounded.style.fontFamily};
        }
      `}</style>
      <Provider>
        <Main router={router}>
          <AnimatePresence mode="wait" initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Main>
      </Provider>
    </>
  )
}

export default Website
