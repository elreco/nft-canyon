import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import Footer from '../../../components/_sites/Footer'
import Header from '../../../components/_sites/header/Header'
import {
  getAssetUrl,
  siteStaticPaths,
  siteStaticProps
} from '../../../lib/sanityClient'
import ConnectWallet from '../../../components/ConnectWallet'

const Mint = (props: Site) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [site] = useState<Site>(props)
  const [image] = useState<string | undefined>(site?.collection[0])
  const title = site?.name

  const getImage = () => {
    if (image) {
      return getAssetUrl(image).width(800).url()
    } else {
      return 'https://dummyimage.com/300x400'
    }
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
      <Header site={site} currentUser={null} />
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
      {!currentUser ? (
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
      ) : (
        <div className="tf-section tf-item-details style-2 pb--75">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-xl-4 col-md-12">
                <div className="content-left">
                  <div className="media">
                    <img src={getImage()} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-md-12">
                <div className="content-right">
                  <div className="sc-item-details">
                    <div className="meta-item">
                      <div className="left">
                        <h2>MINT</h2>
                      </div>
                      <div className="right">
                        <span className="viewed eye mg-r-8">225</span>
                        <span className="liked heart wishlist-button">
                          <span className="number-like">100</span>
                        </span>
                      </div>
                    </div>
                    <div className="client-infor sc-card-product">
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            <img src="" alt="Axies" />
                          </div>
                          <div className="info">
                            <span>Owned By</span>
                            <h6> test </h6>
                          </div>
                        </div>
                      </div>
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            <img src="" alt="Axies" />
                          </div>
                          <div className="info">
                            <span>Create By</span>
                            <h6> test </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>
                      Habitant sollicitudin faucibus cursus lectus pulvinar
                      dolor non ultrices eget. Facilisi lobortisal morbi
                      fringilla urna amet sed ipsum vitae ipsum malesuada.
                      Habitant sollicitudin faucibus cursus lectus pulvinar
                      dolor non ultrices eget. Facilisi lobortisal morbi
                      fringilla urna amet sed ipsum
                    </p>
                    <div className="meta-item-details">
                      <div className="item-style-2 item-details">
                        <ul className="list-details">
                          <li>
                            <span>Artist : </span>
                            <h6>Ralph Garraway</h6>{' '}
                          </li>
                          <li>
                            <span>Size : </span>
                            <h6>3000 x 3000</h6>{' '}
                          </li>
                          <li>
                            <span>Create : </span>
                            <h6>04 April , 2021</h6>{' '}
                          </li>
                          <li>
                            <span>Collection : </span>
                            <h6>Cyberpunk City Art</h6>{' '}
                          </li>
                        </ul>
                      </div>
                      <div className="item-style-2">
                        <div className="item meta-price">
                          <span className="heading">Current Bid</span>
                          <div className="price">
                            <div className="price-box">
                              <h5> 4.89 ETH</h5>
                              <span>= $12.246</span>
                            </div>
                          </div>
                        </div>
                        <div className="item count-down">
                          {/* <Countdown date={Date.now() + 500000000}>
                                         <span>You are good to go!</span>
                                     </Countdown> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
