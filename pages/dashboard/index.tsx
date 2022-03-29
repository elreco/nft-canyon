import Head from 'next/head'
import DashboardHeader from '../../components/dashboard/Header'
import GeneralForm from '../../components/dashboard/GeneralForm'
import { middleware } from '../../lib/dashboard'
import { sessionOptions } from '../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import Footer from '../../components/Footer'
import Header from '../../components/header/Header'
import Subheader from '../../components/header/Subheader'
import { useState } from 'react'

const Dashboard = (props: { currentUser: User; site: Site }) => {
  const title = 'NFT Canyon - Dashboard'
  const [currentUser] = useState<User>(props.currentUser)
  const [site] = useState<Site>(props.site)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-7">
        <Header currentUser={currentUser} />
        <Subheader title="My Dashboard" />
        <section className="tf-section authors">
          <div className="themesflat-container">
            <DashboardHeader site={site} currentUser={currentUser} />
            <GeneralForm site={site} />
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return middleware(req)
  },
  sessionOptions
)

export default Dashboard
