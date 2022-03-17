import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'
import formidable, { type Fields, type File, type Files } from 'formidable'
import { basename } from 'path'
import { createReadStream } from 'fs'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

export const config = {
  api: {
    bodyParser: false
  }
}

export default withIronSessionApiRoute(siteRoute, sessionOptions)

async function siteRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({})
    form.parse(req, async (err: any, fields: Fields, files: Files) => {
      if (err) {
        return res.status(500).json({ message: `Couldn't create site`, err })
      }
      const filePath = files.logo as File
      const readStream = createReadStream(filePath.filepath) as any
      const logo = await sanityClient(process.env.TOKEN || '').assets.upload(
        'image',
        readStream as ReadableStream,
        {
          filename: basename(filePath.filepath)
        }
      )

      // Upload image using sanityClient.ts
      const body = {
        _id: fields.slug as string,
        _type: 'site',
        ...fields,
        owner: {
          _id: req.session.user?.walletAddress
        },
        slug: {
          current: fields.slug
        },
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: logo._id
          }
        }
      }

      const site = await sanityClient(process.env.TOKEN || '').createOrReplace(
        body
      )
      return res.status(200).json(site)
    })
  }
}
