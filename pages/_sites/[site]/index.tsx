import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { siteStaticPaths, siteStaticProps } from '../../../lib/sanityClient'

const Home = (props: Site) => {
  const title = 'NFT Canyon - Your NFT Minting Website'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-7">{props?.slug.current}</div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return await siteStaticPaths(ctx)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return await siteStaticProps({ params })
}

export default Home
