import Head from 'next/head'
import DashboardHeader from '../../components/dashboard/Header'
import GeneralForm from '../../components/GeneralForm'
import sanityClient from '../../lib/sanityClient'
import { sessionOptions } from '../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import Footer from '../../components/Footer'
import Header from '../../components/header/Header'
import Subheader from '../../components/header/Subheader'

const Dashboard = ({
  currentUser,
  site
}: {
  currentUser: User
  site: Site
}) => {
  const title = 'NFT Canyon - Dashboard'

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
    const user = req.session.user

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }

    if (user?.plan !== 1) {
      return {
        redirect: {
          permanent: false,
          destination: '/payment'
        }
      }
    }

    const siteData = (await sanityClient(
      process.env.NEXT_PUBLIC_TOKEN || ''
    ).fetch('*[_type == "site" && owner._ref == $id]', {
      id: user?.walletAddress
    })) as Site[]

    return {
      props: {
        currentUser: user,
        site: siteData.length ? siteData[0] : null
      }
    }
  },
  sessionOptions
)

export default Dashboard
