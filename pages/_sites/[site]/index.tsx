import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const title = 'NFT Canyon - Your NFT Minting Website'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-7">subdomain</div>
    </>
  )
}

export default Home
