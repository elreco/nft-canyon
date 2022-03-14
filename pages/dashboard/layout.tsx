import type { NextPage } from 'next'
import Header from '../../components/header/Header'
import Footer from '../../components/Footer'
import Payment from '../../components/dashboard/Payment'
import { getCurrentUser } from '../../lib/sanityClient'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import router from 'next/router'

const Layout: NextPage = ({ children }) => {
  const title = 'NFT Canyon - Dashboard'
  const [currentUser, setCurrentUser] = useState<User>(null)
  
  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/")
      return
    }
    setCurrentUser(user)
  }, [])

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
            {currentUser && currentUser.plan !== 1 && 
              <Payment />
            }
            {currentUser &&
              currentUser.plan &&
              currentUser.plan > 0 &&
              children}
          </section>
    
        <Footer />
      </div>
    </>
  )
}

export default Layout
