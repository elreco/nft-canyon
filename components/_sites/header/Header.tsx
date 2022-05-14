/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import menus from './menu'
import { Toaster } from 'react-hot-toast'
import { getAssetUrl } from '../../../lib/sanityClient'

const Header = (props: { currentUser: User; site: Site }) => {
  const router = useRouter()
  const headerRef = useRef(null)
  const [currentUser, setCurrentUser] = useState<User>(props.currentUser)
  const [site] = useState<Site>(props.site)

  const defaultLogo = site?.logo ? getAssetUrl(site?.logo).url() : ''

  const [logo] = useState<string>(defaultLogo || '/images/logo/logo_dark.png')
  const [active, setActive] = useState<string>('home')
  const [categoriesHeights, setCategoriesHeights] = useState<
    { label: string; height: number }[]
  >([])

  const getCategoriesHeight = () => {
    const categories = []
    const home = document.getElementById('home')
    if (home) {
      categories.push({
        label: 'home',
        height: home.getBoundingClientRect().top
      })
    }
    const roadmap = document.getElementById('roadmap')
    if (roadmap) {
      categories.push({
        label: 'roadmap',
        height: roadmap.getBoundingClientRect().top - 150
      })
    }
    const team = document.getElementById('team')
    if (team) {
      categories.push({
        label: 'team',
        height: team.getBoundingClientRect().top - 150
      })
    }
    const faq = document.getElementById('faq')
    if (faq) {
      categories.push({
        label: 'faq',
        height: faq.getBoundingClientRect().top - 150
      })
    }
    setCategoriesHeights(categories)
  }

  useEffect(() => {
    getCategoriesHeight()
  }, [])

  useEffect(() => {
    if (router.asPath === '/mint') {
      setActive('mint')
      console.log(active)
    }
  }, [router.asPath])

  const scrollIsHeaderFixed = () => {
    const currentPosY = window.scrollY
    for (let i = 0; i < categoriesHeights.length; i++) {
      if (currentPosY < categoriesHeights[0].height) {
        setActive('home')
      }

      if (
        currentPosY > categoriesHeights[i].height &&
        categoriesHeights[i + 1] &&
        currentPosY < categoriesHeights[i + 1].height
      ) {
        setActive(categoriesHeights[i].label)
      }

      if (
        i + 1 === categoriesHeights.length &&
        currentPosY > categoriesHeights[i].height
      ) {
        setActive(categoriesHeights[i].label)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollIsHeaderFixed)
    return () => {
      window.removeEventListener('scroll', scrollIsHeaderFixed)
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })

  useEffect(() => {
    if (site?.mainColor) {
      document.documentElement.style.setProperty(
        '--main-color',
        site?.mainColor
      )
      if (!site?.secondaryColor) {
        document.documentElement.style.setProperty(
          '--secondary-color',
          site?.mainColor
        )
      }
    }
    if (site?.secondaryColor) {
      document.documentElement.style.setProperty(
        '--secondary-color',
        site?.secondaryColor || '#5142fc'
      )
    }
  })

  useEffect(() => setCurrentUser(props.currentUser), [props.currentUser])

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

  const menuToggle = (slug: string | undefined | null) => {
    menuLeft?.current?.classList.toggle('active')
    btnToggle?.current?.classList.toggle('active')
    if (slug) {
      setActive(slug)
    }
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
                  onClick={() => menuToggle(null)}
                >
                  <span></span>
                </div>
                <nav id="main-nav" className="main-nav" ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data: Menu, index) => (
                      <li
                        key={index}
                        className={`menu-item ${
                          active === data.slug ? 'active' : ''
                        }`}
                      >
                        <Link href={data.links}>
                          <a onClick={() => menuToggle(data.slug)}>
                            {data.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  {!currentUser?.walletAddress && (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link href="/connect">
                        <a className="sc-button header-slider style style-1 wallet fl-button pri-1">
                          <span>Connect Wallet</span>
                        </a>
                      </Link>
                    </div>
                  )}

                  {currentUser?.walletAddress && (
                    <div
                      id="header_admin"
                      className="cursor"
                      onClick={() => router.push('/dashboard')}
                    >
                      <div className="header_avatar">
                        <div className="price">
                          <strong>
                            {currentUser.walletAddress.slice(0, 4)}...
                            {currentUser.walletAddress.slice(-4)}
                          </strong>
                        </div>
                        <img
                          className="avatar"
                          src={`https://avatars.dicebear.com/api/identicon/${currentUser.walletAddress}.svg`}
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
