import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../lib/session'
import { useState } from 'react'

const Index = (props: { currentUser: User }) => {
  const title = 'NFT Canyon - Your NFT Minting Website'
  const [currentUser] = useState(props.currentUser)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-7">
        <Header currentUser={currentUser} />
        <Slider currentUser={currentUser} />
        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        currentUser: req.session.user || null
      }
    }
  },
  sessionOptions
)

export default Index
