import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'
import Web3 from 'web3'
import { sessionOptions } from '../../lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.INFURA_URL || '')
)

export default withIronSessionApiRoute(paymentRoute, sessionOptions)

async function paymentRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { transactionHash } = JSON.parse(req.body)
    try {
      const hash = await web3.eth.getTransaction(transactionHash)
      if (hash.to !== process.env.NEXT_PUBLIC_ADDRESS) {
        return res.status(500).json({ message: `Couldn't update payment` })
      }
      const user = (await sanityClient(process.env.TOKEN || '')
        .patch(hash.from.toLowerCase())
        .set({ plan: 1, transactionHash })
        .commit()) as User

      req.session.user = user
      await req.session.save()

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: `Couldn't update payment`, err })
    }
  }
}
