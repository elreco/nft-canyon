/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'

const Footer = (props: { site: Site }) => {
  const [site] = useState<Site>(props.site)

  const defaultLogo = site?.logo
    ? getAssetUrl(sanityClient(process.env.NEXT_PUBLIC_TOKEN || ''), site?.logo)
        .width(200)
        .url()
    : ''

  const [logo] = useState<string>(defaultLogo || '/images/logo/logo_dark.png')

  const items = [
    {
      title: 'My website',
      link: '/authors-01'
    },
    {
      title: 'My Collection',
      link: '/wallet-connect'
    },
    {
      title: 'Author Profile',
      link: '/edit-profile'
    },
    {
      title: 'Create Item',
      link: '/create-item'
    }
  ]

  const socialList = [
    {
      icon: 'fab fa-twitter',
      link: '#'
    },
    {
      icon: 'fab fa-discord',
      link: '#'
    },
    {
      icon: 'fab fa-instagram',
      link: '#'
    },
    {
      icon: 'opensea-icon',
      link: '#'
    }
  ]

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12 d-flex">
              <div className="widget widget-logo my-auto">
                <div className="logo-footer mb-0" id="logo-footer">
                  <Link href="/">
                    <a>
                      <img
                        className="logo-dark"
                        id="logo_footer"
                        src={logo}
                        alt="nft-gaming"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12 d-flex">
              <div className="widget widget-menu pt-0 my-auto">
                <ul>
                  {items.map((item, index) => (
                    <li key={index} className="d-inline-block mx-3 mb-0">
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-7 col-12 d-flex">
              <div className="widget widget-subcribe p-0 my-auto">
                <div className="widget-social style-1">
                  <ul>
                    {socialList.map((item, index) => (
                      <li key={index}>
                        <a href={item.link}>
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isVisible && <a onClick={scrollToTop} href="#" id="scroll-top"></a>}
    </div>
  )
}

export default Footer
