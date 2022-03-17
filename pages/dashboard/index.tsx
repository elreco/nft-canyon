import Layout from './layout'
import Head from 'next/head'
import Header from '../../components/dashboard/Header'
import { useEffect, useState, type ReactElement } from 'react'
import GeneralForm from '../../components/GeneralForm'
import sanityClient, { getCurrentUser } from '../../lib/sanityClient'

const Dashboard = () => {
  const title = 'NFT Canyon - Dashboard'
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [site, setSite] = useState<Site>(null)

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    ;(async () => {
      if (user) {
        const siteData = await sanityClient(
          process.env.NEXT_PUBLIC_TOKEN || ''
        ).fetch('*[_type == "site" && owner._ref == $id]', {
          id: user.walletAddress
        })
        setSite(siteData[0])
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <section className="tf-section authors">
        <div className="themesflat-container">
          <Header site={site} currentUser={currentUser} />
          <GeneralForm site={site} />
        </div>
      </section>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
