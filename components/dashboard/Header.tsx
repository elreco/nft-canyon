/* eslint-disable @next/next/no-img-element */
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Menu from './Menu'
import sanityClient, { getCurrentUser } from '../../lib/sanityClient'

const Header = () => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [site, setSite] = useState<Site>(null)
  
  const viewWebsite = () => {
    return site ? window.open(`https://${site.slug.current}.${process.env.ROOT_URL}`, '_blank')?.focus() : toast.error("Please fill the general form to create your website 😊", {
      style: {
        background: '#04111d',
        color: '#fff',
        fontSize: '15px'
      }
    })
  }

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    
    ;(async () => {
      if (user) {
        const siteData = await sanityClient(process.env.NEXT_PUBLIC_TOKEN || '').fetch(
          '*[_type == "site" && owner._ref == $id]',
          { id: user.walletAddress }
        )
        setSite(siteData[0])
      }
    })()
  }, [])

  return (
    <div className="flat-tabs tab-authors">
      <div className="author-profile flex">
        <div className="feature-profile">
          <img
            src={`https://avatars.dicebear.com/api/identicon/${currentUser?.walletAddress}.svg`}
            alt=""
            className="avatar"
          />
        </div>
        <div className="infor-profile">
          <span>Welcome back 👋</span>
          <h2 className="title">{currentUser?.userName || 'Unnamed'}</h2>
          <p className="content">
            Welcome to your dashboard, you can fully manage your NFT Minting website here.
          </p>
          {site && (<a className="font-lg" href={`https://${site?.slug.current}.${process.env.ROOT_URL}`}>{site?.slug.current}.{process.env.ROOT_URL}</a>)}
        </div>
        <div className="widget-social style-3">
          <div className="btn-profile">
            <a href="#" onClick={viewWebsite} type="button" className="sc-button style-1 follow">View website</a>
          </div>
        </div>
      </div>
      <div className="react-tabs">
        <Menu />
      </div>
    </div>
  )
}

export default Header
