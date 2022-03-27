import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import { siteStaticPaths, siteStaticProps } from '../../../lib/sanityClient'
import Footer from '../../../components/_sites/Footer'
import Header from '../../../components/_sites/header/Header'
import Roadmap from '../../../components/_sites/Roadmap'
import Slider from '../../../components/_sites/Slider'
import Team from '../../../components/_sites/Team'

const Home = (props: Site) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [site] = useState<Site>(props)
  const title = site?.name

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
        <Team members={site?.members} />
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
