import Layout from './layout'
import Head from 'next/head'
import DashboardHeader from '../../components/dashboard/Header'
import { type ReactElement } from 'react'

const Dashboard = () => {
  const title = 'NFT Canyon - Dashboard'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <section className="tf-section authors authors-2">
        <div className="themesflat-container">
          <DashboardHeader />
          <div className="row">
            <div className="col-md-12">test</div>
          </div>
        </div>
      </section>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard
