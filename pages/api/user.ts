import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await sanityClient(process.env.TOKEN || '').create(JSON.parse(req.body))
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Couldn't create user`, err })
    }
    return res.status(200).json({ message: 'User created' })
  } else if (req.method === 'PATCH') {
    await sanityClient(process.env.TOKEN || '').create(JSON.parse(req.body))
  }
}
