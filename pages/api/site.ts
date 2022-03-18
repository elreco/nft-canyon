import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../lib/sanityClient'
import formidable, { type Fields, type File, type Files } from 'formidable'
import { basename } from 'path'
import { createReadStream } from 'fs'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { SanityImageAssetDocument } from '@sanity/client'

export const config = {
  api: {
    bodyParser: false
  }
}

export default withIronSessionApiRoute(siteRoute, sessionOptions)

async function siteRoute(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({})
  let logo = null as SanityImageAssetDocument | null

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      return res.status(500).json({ message: `Couldn't create site`, err })
    }
    const filePath = files.logo as File
    if (filePath.size > 0) {
      const readStream = createReadStream(filePath.filepath) as any
      logo = await sanityClient(process.env.TOKEN || '').assets.upload(
        'image',
        readStream as ReadableStream,
        {
          filename: basename(filePath.filepath)
        }
      )
    }

    const body = {
      _type: 'site',
      ...fields,
      owner: {
        _ref: req.session.user?.walletAddress
      },
      slug: {
        current: fields.slug
      },
      ...(logo && {
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: logo._id
          }
        }
      })
    }

    try {
      if (req.method === 'POST') {
        const slugExists = (await sanityClient(process.env.TOKEN || '').fetch(
          '*[_type == "site" && slug.current == $slug] {slug}',
          { slug: fields.slug }
        )) as Site[]
        if (slugExists.length > 0) {
          return res
            .status(400)
            .json({
              message: 'Website already exists, please change the name.'
            })
        }

        const site = await sanityClient(process.env.TOKEN || '').create(body)
        return res.status(200).json(site)
      } else if (req.method === 'PATCH') {
        const slugExists = (await sanityClient(process.env.TOKEN || '').fetch(
          '*[_type == "site" && slug.current == $slug && _id != $id] {slug, id}',
          { slug: fields.slug, id: fields._id }
        )) as Site[]

        if (slugExists.length > 0) {
          return res
            .status(400)
            .json({
              message: 'Website already exists, please change the name.'
            })
        }

        const site = await sanityClient(process.env.TOKEN || '')
          .patch(fields._id as string)
          .set(body)
          .commit()
        return res.status(200).json(site)
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  })
}
