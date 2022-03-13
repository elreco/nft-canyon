import sanityClient from '@sanity/client'

const client = (token: string) => sanityClient({
  projectId: 'kgcey8h5',
  dataset: 'production',
  apiVersion: '2022-03-08',
  token,
  useCdn: false,
  ignoreBrowserTokenWarning: true
})

export default client
