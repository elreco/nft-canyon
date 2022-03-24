/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import toast from 'react-hot-toast'
import Menu from './Menu'

const Header = (props: { site: Site; currentUser: User }) => {
  const [currentUser] = useState(props.currentUser)
  const [site] = useState(props.site)

  const viewWebsite = () => {
    return site
      ? window
          .open(
            `https://${site.slug.current}.${process.env.NEXT_PUBLIC_ROOT_URL}`
          )
          ?.focus()
      : toast.error('Please fill the general form to create your website 😊', {
          style: {
            background: '#04111d',
            color: '#fff',
            fontSize: '15px'
          }
        })
  }

  return (
    <div className="flat-tabs tab-authors  authors-2">
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
            Welcome to your dashboard, you can fully manage your NFT Minting
            website here.
          </p>
          {site ? (
            <a
              className="font-lg"
              href={`https://${site?.slug.current}.${process.env.NEXT_PUBLIC_ROOT_URL}`}
            >
              {site?.slug.current}.{process.env.NEXT_PUBLIC_ROOT_URL}
            </a>
          ) : (
            'Fill in the form below to see your website URL'
          )}
        </div>
        <div className="widget-social style-3">
          <div className="btn-profile">
            <a
              href="#"
              onClick={viewWebsite}
              type="button"
              className="sc-button style-1 follow"
            >
              View website
            </a>
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
