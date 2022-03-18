import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  let wasConnected = false
  if (req.session.user) {
    wasConnected = true
  }

  req.session.destroy()
  res.json({ wasConnected })
}
