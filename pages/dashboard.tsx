import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Payment from '../components/dashboard/Payment'
import { useEffect, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { useRouter } from 'next/router'
import sanityClient from '../lib/sanityClient'
import isWalletConnected from '../lib/isWalletConnected'

const Dashboard: NextPage = () => {
  const title = 'NFT Canyon - Dashboard'
  const { address } = useWeb3()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<User>(null)

  const fetchCurrentUser = async (): Promise<void> => {
    const account = await isWalletConnected()
    if (account) {
      const currentUser = (await sanityClient(
        process.env.NEXT_PUBLIC_TOKEN || ''
      ).getDocument(account)) as User
      setCurrentUser(currentUser)
    } else {
      router.push('/')
      return
    }
  }

  useEffect(() => {
    ;(async () => {
      const account = await isWalletConnected()

      if (!account) {
        router.push('/')
        return
      }

      const currentUser = (await sanityClient(
        process.env.NEXT_PUBLIC_TOKEN || ''
      ).getDocument(account)) as User
      setCurrentUser(currentUser)
      console.log(account)
      console.log(currentUser)
      setIsLoading(false)
      return
    })()
  }, [address, router])

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
        {!isLoading && (
          <section>
            {currentUser?.plan !== 1 && (
              <Payment setCurrentUser={setCurrentUser} />
            )}
          </section>
        )}
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
