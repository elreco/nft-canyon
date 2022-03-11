import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Payment from '../components/Payment'
import { useEffect, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { useRouter } from 'next/router'

const Dashboard: NextPage = () => {
  const title = 'NFT Canyon - Dashboard'
  const { address, balance } = useWeb3()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!balance) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      if (!address) {
        router.push('/')
        return
      }
    }
  }, [balance, address, router])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-7">
        <Header />
        <section className="flat-title-page inner">
          <div className="overlay"></div>
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-title-heading mg-bt-12">
                  <h1 className="heading text-center">My Dashboard</h1>
                  <Payment />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
