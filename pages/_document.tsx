import Document, {
  Html,
  Main,
  Head,
  NextScript,
  type DocumentContext
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const description =
      'Create and deploy your NFT Minting Website easily. The 1st CMS Platform To Create Your Mint Web App.'
    const image = '/images/og-image.png'

    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:url" content="https://www.nftcanyon.io" />
          <meta property="og:site_name" content="NFT Canyon" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:site" content="@nftcanyonio" />
          <meta name="twitter:creator" content="@nftcanyonio" />
        </Head>
        <body className="body is_dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
