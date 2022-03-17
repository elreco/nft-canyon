import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = await sanityClient(
        process.env.TOKEN || ''
      ).createIfNotExists(JSON.parse(req.body))
      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: `Couldn't create user`, err })
    }
  }
}
