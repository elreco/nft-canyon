import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import ConnectWallet from '../components/ConnectWallet'
import { useEffect } from 'react'
import isWalletConnected from '../lib/isWalletConnected'
import router from 'next/router'

const Connect: NextPage = () => {
  const title = 'NFT Canyon - Connect Wallet'

  useEffect(() => {
    ;(async () => {
      const account = await isWalletConnected()
      if (account) {
        router.push('/dashboard')
        return
      }
    })()
  })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Get Started</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConnectWallet />
      <Footer />
    </>
  )
}

export default Connect
