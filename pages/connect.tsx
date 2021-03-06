import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import ConnectWallet from '../components/ConnectWallet'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../lib/session'

const Connect: NextPage = () => {
  const title = 'NFT Canyon - Connect Wallet'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <Header currentUser={null} />
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
                creating your minting website!
              </h5>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/dashboard'
        }
      }
    }
    return {
      props: {}
    }
  },
  sessionOptions
)

export default Connect
