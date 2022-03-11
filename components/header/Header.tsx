/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import menus from './menu'
import logodark2x from '../../public/images/logo/logo_dark@2x.png'
import logodark from '../../public/images/logo/logo_dark.png'
import Image from 'next/image'
import { useWeb3 } from '@3rdweb/hooks'
import { Toaster } from 'react-hot-toast'

const Header = () => {
  const router = useRouter()
  const pathname = router.pathname
  const { address, balance } = useWeb3()
  const headerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })

  useEffect(() => {
    if (!balance) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [balance, address])

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
    <header id="header_main" className="header_1 js-header" ref={headerRef}>
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
                        <Image
                          className="logo-dark"
                          id="logo_header"
                          src={logodark}
                          src-set={`${logodark2x}`}
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
                  {!isLoading && !address && (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link href="/connect">
                        <a className="sc-button header-slider style style-1 wallet fl-button pri-1">
                          <span>Connect Wallet</span>
                        </a>
                      </Link>
                    </div>
                  )}

                  {!isLoading && address && (
                    <div
                      id="header_admin"
                      className="cursor"
                      onClick={() => router.push('/dashboard')}
                    >
                      <div className="header_avatar">
                        <div className="price">
                          <strong>
                            {address.slice(0, 4)}...{address.slice(-4)}
                          </strong>
                        </div>
                        <img
                          className="avatar"
                          src={`https://avatars.dicebear.com/api/identicon/${address}.svg`}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  )}
                  {isLoading && (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <a className="sc-button header-slider style style-1 rocket fl-button pri-1">
                        <span>Chargement...</span>
                      </a>
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
