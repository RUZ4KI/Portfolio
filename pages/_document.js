import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            href="/favicon-light.svg"
            type="image/svg+xml"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="icon"
            href="/favicon-dark.svg"
            type="image/svg+xml"
            media="(prefers-color-scheme: dark)"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
