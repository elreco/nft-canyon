import type { NextPage } from 'next'
import Header from '../../components/header/Header'
import Footer from '../../components/Footer'
import Payment from '../../components/dashboard/Payment'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import sanityClient from '../../lib/sanityClient'
import isWalletConnected from '../../lib/isWalletConnected'
import Head from 'next/head'

const Layout: NextPage = ({ children }) => {
  const title = 'NFT Canyon - Dashboard'
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<User>(null)

  useEffect(() => {
    ;(async () => {
      const account = await isWalletConnected()
      if (!account) {
        setCurrentUser(null)
        router.push('/')
      } else {
        const currentUser = (await sanityClient(
          process.env.NEXT_PUBLIC_TOKEN || ''
        ).getDocument(account)) as User
        setCurrentUser(currentUser)
      }
      setIsLoading(false)
    })()
  }, [router])

  useEffect(() => {
    window.ethereum.once('accountsChanged', async () => {
      const account = await isWalletConnected()
      if (!account) {
        router.push('/')
        return
      }
    })
  })

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
            {currentUser && currentUser.plan !== 1 && (
              <Payment setCurrentUser={setCurrentUser} />
            )}
            {currentUser && currentUser.plan > 0 && children}
          </section>
        )}
        <Footer />
      </div>
    </>
  )
}

export default Layout
