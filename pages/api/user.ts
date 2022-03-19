import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'
import { sessionOptions } from '../../lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userBody = JSON.parse(req.body)
      const user = (await sanityClient(
        process.env.TOKEN || ''
      ).createIfNotExists(userBody)) as User

      req.session.user = user
      await req.session.save()

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: `Couldn't create user`, err })
    }
  } else if (req.method === 'PATCH') {
    try {
      const userBody = JSON.parse(req.body)

      const user = (await sanityClient(process.env.TOKEN || '')
        .patch(req.session.user?.walletAddress as string)
        .set(userBody)
        .commit()) as User

      req.session.user = user
      await req.session.save()

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: `Couldn't update user`, err })
    }
  }
}
