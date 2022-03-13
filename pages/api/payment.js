import sanityClient from '../../lib/sanityClient'

export default async function payment(req, res) {
  if (req.method === 'POST') {
    const { _id, name, email, comment } = JSON.parse(req.body)
    try {
      
      await sanityClient(process.env.TOKEN).create({
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: _id
        },
        name,
        email,
        comment
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Couldn't submit comment`, err })
    }
  
    return res.status(200).json({ message: 'Comment submitted' })
  }
}
