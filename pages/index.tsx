import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'

const Home: NextPage = () => {
  const title = 'NFT Canyon - Your NFT Minting Website'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-7">
        <Header />
        <Slider />
        <Footer />
      </div>
    </>
  )
}

export default Home
