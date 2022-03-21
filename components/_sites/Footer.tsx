import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'

const Footer = (props: { site: Site }) => {
  const defaultLogo = getAssetUrl(
    sanityClient(process.env.NEXT_PUBLIC_TOKEN || ''),
    props.site?.logo
  )
  const [logo] = useState<string>(
    defaultLogo ? defaultLogo.width(200).url() : ''
  )

  const accountList = [
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
  const resourcesList = [
    {
      title: 'Help & Support',
      link: '/help-center'
    },
    {
      title: 'Documentation',
      link: '/live-auctions'
    },
    {
      title: 'Item Details',
      link: '/item-details-01'
    },
    {
      title: 'Activity',
      link: '/activity-01'
    }
  ]
  const companyList = [
    {
      title: 'Explore',
      link: '/explore-01'
    },
    {
      title: 'Contact Us',
      link: '/contact-01'
    },
    {
      title: 'Our Blog',
      link: '/blog'
    },
    {
      title: 'FAQ',
      link: '/faq'
    }
  ]
  const socialList = [
    {
      icon: 'fab fa-twitter',
      link: '#'
    },
    {
      icon: 'fab fa-facebook',
      link: '#'
    },
    {
      icon: 'fab fa-telegram-plane',
      link: '#'
    },
    {
      icon: 'fab fa-youtube',
      link: '#'
    },
    {
      icon: 'icon-fl-tik-tok-2',
      link: '#'
    },
    {
      icon: 'icon-fl-vt',
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
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link href="/">
                    <a>
                      <Image
                        className="logo-dark"
                        id="logo_footer"
                        src={logo}
                        layout="fill"
                        alt="nft-gaming"
                      />
                    </a>
                  </Link>
                </div>
                <p className="sub-widget-logo">
                  Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis
                  non, fugit totam vel laboriosam vitae.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu style-1">
                <h5 className="title-widget">My Account</h5>
                <ul>
                  {accountList.map((item, index) => (
                    <li key={index}>
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-7 col-7">
              <div className="widget widget-menu style-2">
                <h5 className="title-widget">Resources</h5>
                <ul>
                  {resourcesList.map((item, index) => (
                    <li key={index}>
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">Company</h5>
                <ul>
                  {companyList.map((item, index) => (
                    <li key={index}>
                      <a href={item.link}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                <h5 className="title-widget">Subscribe Us</h5>
                <div className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit"
                  >
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="info@yourgmail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div>
                <div className="widget-social style-1 mg-t32">
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

      <div
        className="modal fade popup"
        id="popup_bid"
        tab-index="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body space-y-20 pd-40">
              <h3>Place a Bid</h3>
              <p className="text-center">
                You must bid at least{' '}
                <span className="price color-popup">4.89 ETH</span>
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="00.00 ETH"
              />
              <p>
                Enter quantity. <span className="color-popup">5 available</span>
              </p>
              <input type="number" className="form-control" placeholder="1" />
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <a
                href="#"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close"
              >
                {' '}
                Place a bid
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer