/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import menus from './menu'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import sanityClient, { getAssetUrl } from '../../../lib/sanityClient'

const Header = (props: { currentUser: User; site: Site }) => {
  const router = useRouter()
  const pathname = router.pathname
  const headerRef = useRef(null)
  const [account] = useState<string>(props.currentUser?.walletAddress || '')
  const defaultLogo = getAssetUrl(
    sanityClient(process.env.NEXT_PUBLIC_TOKEN || ''),
    props.site?.logo
  )
  const [logo] = useState<string>(defaultLogo ? defaultLogo.url() : '')

  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })

  const isSticky = () => {
    const header = document.querySelector('.js-header')
    const scrollTop = window.scrollY
    scrollTop >= 300
      ? header?.classList.add('is-fixed')
      : header?.classList.remove('is-fixed')
    scrollTop >= 400
      ? header?.classList.add('is-small')
      : header?.classList.remove('is-small')
  }

  const menuLeft = useRef<HTMLDivElement>(null)
  const btnToggle = useRef<HTMLDivElement>(null)

  const menuToggle = () => {
    menuLeft?.current?.classList.toggle('active')
    btnToggle?.current?.classList.toggle('active')
  }

  const [activeIndex, setActiveIndex] = useState(null)
  const handleOnClick = (index: unknown) => {
    setActiveIndex(index as null)
  }

  return (
    <header
      id="header_main"
      className="header_1 header_2 style2 js-header"
      ref={headerRef}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link href="/">
                      <a rel="home" className="main-logo">
                        <img
                          className="logo-dark"
                          id="logo_header"
                          src={logo}
                          alt="nft canyon"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
                <div
                  className="mobile-button"
                  ref={btnToggle}
                  onClick={menuToggle}
                >
                  <span></span>
                </div>
                <nav id="main-nav" className="main-nav" ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data, index) => (
                      <li
                        key={index}
                        onClick={() => handleOnClick(index)}
                        className={`menu-item ${
                          data.namesub ? 'menu-item-has-children' : ''
                        } ${activeIndex === index ? 'active' : ''} `}
                      >
                        <a href={data.links}>{data.name}</a>
                        {data.namesub && (
                          <ul className="sub-menu">
                            {data.namesub.map((submenu) => (
                              <li
                                key={submenu.id}
                                className={
                                  pathname === submenu.links
                                    ? 'menu-item current-item'
                                    : 'menu-item'
                                }
                              >
                                <Link href={submenu.links}>
                                  <a>{submenu.sub}</a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  {!account && (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link href="/connect">
                        <a className="sc-button header-slider style style-1 wallet fl-button pri-1">
                          <span>Connect Wallet</span>
                        </a>
                      </Link>
                    </div>
                  )}

                  {account && (
                    <div
                      id="header_admin"
                      className="cursor"
                      onClick={() => router.push('/dashboard')}
                    >
                      <div className="header_avatar">
                        <div className="price">
                          <strong>
                            {account.slice(0, 4)}...{account.slice(-4)}
                          </strong>
                        </div>
                        <img
                          className="avatar"
                          src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
