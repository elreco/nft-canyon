import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { useState } from 'react'
import Footer from '../../../components/_sites/Footer'
import Header from '../../../components/_sites/header/Header'
import { siteStaticPaths, siteStaticProps } from '../../../lib/sanityClient'
import ConnectWallet from '../../../components/ConnectWallet'

const Mint = (props: Site) => {
  const [site] = useState<Site>(props)
  const title = site?.name

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <Header site={site} currentUser={null} />
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
      <div className="tf-connect-wallet tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-2 mg-bt-12">
                Connect Your Wallet
              </h2>
              <h5 className="sub-title ct style-1 pad-400">
                Connect your wallet with one of the following gateway to start
                minting!
              </h5>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </div>
      <Footer site={site} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return await siteStaticPaths(ctx)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return await siteStaticProps({ params })
}

export default Mint
