import Head from 'next/head'
import { sessionOptions } from '../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import PaymentForm from '../../components/dashboard/PaymentForm'
import { useState } from 'react'
import { paymentMiddleware } from '../../lib/dashboard'
import Subheader from '../../components/header/Subheader'
import Header from '../../components/header/Header'

const Payment = (props: { currentUser: User }) => {
  const title = 'NFT Canyon - Dashboard'
  const [currentUser] = useState<User>(props.currentUser)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <Header currentUser={currentUser} />
      <Subheader title="My Dashboard" />
      <section className="tf-section authors">
        <div className="themesflat-container">
          <PaymentForm currentUser={currentUser} />
        </div>
      </section>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return paymentMiddleware(req)
  },
  sessionOptions
)

export default Payment
