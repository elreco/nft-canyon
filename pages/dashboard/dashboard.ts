import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import sanityClient from '../../lib/sanityClient'

export const middleware = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => {
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
        destination: '/dashboard/payment'
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
}

export const paymentMiddleware = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => {
  const user = req.session.user

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  if (user.plan && user.plan > 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      }
    }
  }

  return {
    props: {
      currentUser: user
    }
  }
}
