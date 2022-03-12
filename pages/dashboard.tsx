import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Payment from '../components/dashboard/Payment'
import { useEffect, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { useRouter } from 'next/router'
import sanityClient from '../lib/sanityClient'
import Web3 from 'web3'

const Dashboard: NextPage = () => {
  const title = 'NFT Canyon - Dashboard'
  const { address, balance } = useWeb3()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<User>(null)

  const fetchCurrentUser = async (): Promise<void> => {
    if (address) {
      const currentUser = (await sanityClient.getDocument(address)) as User
      setCurrentUser(currentUser)
    }
    return
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)

      const web3 = new Web3(window.ethereum)
      const connected = await web3.eth.getAccounts()
      if (connected.length) {
        if (address) {
          const currentUser = (await sanityClient.getDocument(address)) as User
          setCurrentUser(currentUser)
        }
      } else {
        router.push('/')
      }
      setIsLoading(false)
    })()
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
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Payment fetchCurrentUser={fetchCurrentUser} />
        </section>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
