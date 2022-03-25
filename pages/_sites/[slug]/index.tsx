import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import Footer from '../../../components/_sites/Footer'
import Header from '../../../components/_sites/header/Header'
import Roadmap from '../../../components/_sites/Roadmap'
import Slider from '../../../components/_sites/Slider'
import { siteStaticPaths, siteStaticProps } from '../../../lib/sanityClient'

const Home = (props: Site) => {
  const title = 'NFT Canyon - Your NFT Minting Website'
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [site] = useState(props)
  const [data] = useState([
    {
      key: '0',
      show: 'show',
      title: 'What is an NFT?',
      text: 'NFTs or non-fungible tokens, are cryptographic assets on blockchain with unique identification codes and metadata that distinguish them from each other. NFTs are unique and not mutually interchangeable, which means no two NFTs are the same.'
    },
    {
      key: '1',
      title: 'Customer support is available ?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      key: '2',
      title: 'How do I find my transaction hash?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      key: '3',
      title: 'What are gas fees on Axies?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      key: '4',
      title: 'What is the effective staking amount?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    }
  ])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')
      const user = await res.json()
      setCurrentUser(user)
    }
    fetchUser()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
      <div className="home-5 website">
        <Header site={site} currentUser={currentUser} />
        <Slider site={site} />
        <Roadmap milestones={site?.milestones} />
        <Footer site={site} />
      </div>
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
