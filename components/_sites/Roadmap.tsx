import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { useState } from 'react'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'

const Roadmap = (props: { milestones: Milestone[] | undefined }) => {
  const [milestones] = useState<Milestone[]>(props.milestones || [])

  const getImage = (image: any) => {
    if (image) {
      return getAssetUrl(
        sanityClient(process.env.NEXT_PUBLIC_TOKEN || ''),
        image
      )
        .width(300)
        .url()
    } else {
      return 'https://dummyimage.com/400x400'
    }
  }

  return (
    <section className="tf-section live-auctions" id="roadmap">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-20">Roadmap</h2>
              <Link href="/">
                <a className="exp style2">EXPLORE MORE</a>
              </Link>
            </div>
          </div>
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={30}
              breakpoints={{
                0: {
                  slidesPerView: 1
                },
                767: {
                  slidesPerView: 2
                },
                991: {
                  slidesPerView: 3
                },
                1300: {
                  slidesPerView: 4
                }
              }}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {milestones.map((milestone, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-container show-shadow carousel auctions">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="sc-card-product">
                            <div className="card-media">
                              <Link href="/item-details-01">
                                <img
                                  src={getImage(milestone.image)}
                                  alt="axies"
                                />
                              </Link>
                              <Link href="/login">
                                <a className="wishlist-button heart">
                                  <span className="number-like">Whitelist</span>
                                </a>
                              </Link>
                              <div className="featured-countdown">
                                <span className="slogan"></span>
                                <span>You are good to go!</span>
                              </div>
                            </div>
                            <div className="card-title">
                              <h5>
                                <Link href="/item-details-01">
                                  {milestone.title}
                                </Link>
                              </h5>
                              <div className="tags">test</div>
                            </div>
                            <div className="meta-info">
                              <div className="author">
                                <div className="avatar">
                                  {/* <img src={item.imgAuthor} alt="axies" /> */}
                                </div>
                                <div className="info">
                                  <span>Creator</span>
                                  <h6>
                                    {' '}
                                    <Link href="/authors-02">
                                      {milestone.description}
                                    </Link>{' '}
                                  </h6>
                                </div>
                              </div>
                              <div className="price">
                                <span>Current Bid</span>
                                <h5>12</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap
