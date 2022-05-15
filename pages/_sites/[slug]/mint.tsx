import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import ConnectWallet from '../../../components/ConnectWallet'
import Countdown from '../../../components/_sites/Countdown'
import Footer from '../../../components/_sites/Footer'
import Header from '../../../components/_sites/header/Header'
import MintForm from '../../../components/_sites/MintForm'
import MintInfo from '../../../components/_sites/MintInfo'
import { siteStaticPaths, siteStaticProps } from '../../../lib/sanityClient'

const Mint = (props: Site) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [alreadyMinted, setAlreadyMinted] = useState<number>(0)
  const [maxSupply, setMaxSupply] = useState<number>(0)
  const [site] = useState<Site>(props)
  const title = site?.name

  const increaseMinted = () => {
    setAlreadyMinted(alreadyMinted + 1)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')
      const user = await res.json()
      setCurrentUser(user)
    }
    fetchUser()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="website">
        <Header site={site} currentUser={currentUser} />
        <section className="flat-title-page inner">
          <div className="overlay"></div>
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-title-heading mg-bt-12">
                  <h1 className="heading text-center">Let&apos;s Mint</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        {!currentUser?.walletAddress ? (
          <div className="tf-connect-wallet tf-section">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h2 className="tf-title-heading ct style-2 mg-bt-12">
                    Connect Your Wallet
                  </h2>
                  <h5 className="sub-title ct style-1 pad-400">
                    Connect your wallet with one of the following gateway to
                    start minting!
                  </h5>
                </div>
                <ConnectWallet />
              </div>
            </div>
          </div>
        ) : (
          <div className="tf-section tf-item-details style-2 mint-section">
            <div className="themesflat-container">
              <div className="row min-vh-100">
                <div
                  className={`${
                    currentUser.walletAddress ? 'col-lg-8' : 'col-lg-12'
                  } col-12 mb-0 pt-5 mb-lg--100 pt-lg--120 d-flex flex-column flex-grow-1`}
                >
                  <h3 className="title text-center">
                    {site?.status === null && 'CONNECT YOUR WALLET'}
                    {site?.status === 0 && ''}
                    {site?.status === 1 && 'WHITELIST MINT'}
                    {site?.status === 2 && 'PUBLIC SALE'}
                  </h3>
                  <h4 className="text-center text-secondary font-tomoe text-lg">
                    Mint price 0.08 eth
                  </h4>
                  {!currentUser.walletAddress && (
                    <div className="row g-5 justify-content-center mt-3">
                      <div className="col-xxl-5 col-lg-6 col-12 col-sm-6 sal-animate">
                        <div className="wallet-wrapper">
                          <div className="inner">
                            <div className="icon">
                              <i className="fa fa-user-lock custom-icon"></i>
                            </div>
                            <div className="content">
                              <h4 className="title">You are not connected</h4>
                              <p className="description">
                                You must be connected to MetaMask to mint a
                                Heiki.
                              </p>
                              <div className="pt--20 text-center">
                                <ConnectWallet />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {site && currentUser.walletAddress && site?.status && (
                    <MintForm
                      status={site.status}
                      increaseMinted={increaseMinted}
                    />
                  )}
                  {site && currentUser.walletAddress && site.status === 0 && (
                    <div
                      className={`${
                        site.status && 'mt-auto mb--25'
                      } text-center`}
                    >
                      <h3 className="text-center mb-0">
                        WHITELIST MINT STARTS IN
                      </h3>
                      <Countdown status={site?.status} />
                    </div>
                  )}
                  {site && currentUser.walletAddress && site.status === 1 && (
                    <div className="mt-md-auto mt--100 mb--25 text-center">
                      <h5 className="text-center mb-0">
                        Public Mint starts in:
                      </h5>
                      <Countdown status={site.status} />
                    </div>
                  )}
                </div>
                {site && currentUser.walletAddress && (
                  <div className="col-lg-4 col-12 pt-5 pb-5">
                    <h3 className="title text-center">MINT INFOS</h3>
                    <MintInfo
                      alreadyMinted={site.alreadyMinted}
                      status={site.status}
                      totalMinted={site.totalMinted}
                      maxSupply={maxSupply}
                      maxMint={site.maxMint}
                      setAlreadyMinted={setAlreadyMinted}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Footer site={site} />
      </div>
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
