import Document, { Html, Main, Head, NextScript, type DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="body is_dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument