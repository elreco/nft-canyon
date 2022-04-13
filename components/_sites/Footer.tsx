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
          <div className="d-flex justify-content-between">
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
            <div className="widget widget-subcribe p-0 my-auto">
              <div className="widget-social style-1">
                <ul>
                  {site?.twitter && (
                    <li>
                      <a href={site?.twitter}>
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                  )}
                  {site?.instagram && (
                    <li>
                      <a href={site?.instagram}>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  )}
                  {site?.discord && (
                    <li>
                      <a href={site?.discord}>
                        <i className="fab fa-discord"></i>
                      </a>
                    </li>
                  )}
                  {site?.opensea && (
                    <li>
                      <a href={site?.opensea}>
                        <i className="opensea-icon"></i>
                      </a>
                    </li>
                  )}
                </ul>
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
