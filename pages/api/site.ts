import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'
import formidable from 'formidable'
import { basename } from 'path'
import { createReadStream } from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function site(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({})
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: `Couldn't create site`, err })
      }
      console.log(files.logo.path)
      const logo = await sanityClient(process.env.TOKEN || '').assets.upload(
        'image',
        createReadStream(files.upload.path),
        {
          filename: basename(files.logo.name)
        }
      )

      // Upload image using sanityClient.ts
      const body = {
        _id: fields['slug[current]'] as string,
        _type: 'site',
        ...fields,
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
