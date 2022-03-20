import sanityClient, { SanityClient } from '@sanity/client'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const siteStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const data = (await client(process.env.NEXT_PUBLIC_TOKEN || '').fetch(
    '*[_type == "site" && slug.current == $slug]',
    { slug }
  )) as Site[]

  return {
    props: { ...data[0] },
    revalidate: 10
  }
}

export const siteStaticPaths: GetStaticPaths = async (ctx) => {
  const subdomains = (await client(process.env.NEXT_PUBLIC_TOKEN || '').fetch(
    '*[_type == "site"]'
  )) as Site[]

  const paths = [
    ...subdomains.map((item) => {
      return { params: { slug: item?.slug.current.toString().toLowerCase() } }
    })
  ]

  return {
    paths: paths,
    fallback: true
  }
}

const client = (token: string) =>
  sanityClient({
    projectId: 'kgcey8h5',
    dataset: 'production',
    apiVersion: '2022-03-08',
    token,
    useCdn: false
  })

// Get a pre-configured url-builder from your sanity client

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function getAssetUrl(
  currentClient: SanityClient,
  source: SanityImageSource
) {
  const builder = imageUrlBuilder(currentClient)
  return builder.image(source)
}

export default client
