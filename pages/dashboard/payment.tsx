import Head from 'next/head'
import { sessionOptions } from '../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import PaymentForm from '../../components/dashboard/PaymentForm'

const Payment = ({ currentUser }: { currentUser: User }) => {
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
          <PaymentForm currentUser={currentUser} />
        </div>
      </section>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        currentUser: req.session.user
      }
    }
  },
  sessionOptions
)

export default Payment
