import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'
import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/37421431258648c4beb1ee9596143116"));

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { transactionHash } = JSON.parse(req.body)
    try {
      const hash = await web3.eth.getTransaction(transactionHash)
      await sanityClient(process.env.TOKEN || '').patch(hash.from).set({ plan: 1, transactionHash }).commit()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Couldn't update payment`, err })
    }
  
    return res.status(200).json({ message: 'Payment updated' })
  }
}
