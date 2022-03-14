import sanityClient from '@sanity/client'
import type { GetStaticPaths, GetStaticProps } from 'next/types'

export const updateCurrentUser = (userData: User): void => {
  if (userData === null) {
    localStorage.removeItem('currentUser')
    return
  }
  if (localStorage.getItem('currentUser')) {
    localStorage.removeItem('currentUser')
  }
  localStorage.setItem('currentUser', JSON.stringify(userData))
}

export const getCurrentUser = (): User => {
  const user = localStorage.getItem('currentUser')
  const currentUser = user ? JSON.parse(user) : null
  return currentUser as User
}

export const siteStaticProps: GetStaticProps = async ({ params }) => {
  const site = params?.site
  const data = (await client(process.env.NEXT_PUBLIC_TOKEN || '').fetch(
    '*[_type == "site" && slug.current == $slug]',
    { slug: site }
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
      return { params: { site: item?.slug.current.toString() } }
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
    useCdn: false,
    ignoreBrowserTokenWarning: true
  })

export default client
