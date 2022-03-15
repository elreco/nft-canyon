import Layout from './layout'
import Head from 'next/head'
import DashboardHeader from '../../components/dashboard/Header'
import { type ReactElement } from 'react'
import GeneralForm from '../../components/GeneralForm'

const Dashboard = () => {
  const title = 'NFT Canyon - Dashboard'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <section className="tf-section authors">
        <div className="themesflat-container">
          <DashboardHeader />
          <GeneralForm />
        </div>
      </section>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
