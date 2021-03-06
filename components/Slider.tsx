/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'

const Slider = (props: { currentUser: User }) => {
  const [account] = useState<string>(props.currentUser?.walletAddress || '')

  return (
    <div>
      <section className="flat-title-page style3 mainslider">
        <img
          className="bgr-gradient gradient1"
          src="/images/backgroup-secsion/bg-gradient1.png"
          alt=""
        />
        <img
          className="bgr-gradient gradient2"
          src="/images/backgroup-secsion/bg-gradient2.png"
          alt=""
        />
        <img
          className="bgr-gradient gradient3"
          src="/images/backgroup-secsion/bg-gradient3.png"
          alt=""
        />
        <div className="overlay"></div>
        <div className="themesflat-container ">
          <div className="wrap-heading flat-slider flex">
            <div className="content">
              <h2 className="heading mt-15">Create and deploy</h2>
              <h1 className="heading mb-style">
                <span className="tf-text s1">Your NFT Minting</span>
              </h1>
              <h1 className="heading">Website easily</h1>
              <p className="sub-heading mt-19 mb-40">
                The 1st CMS platform to create your mint web app.
              </p>
              <div className="flat-bt-slider flex style2">
                <Link href={account ? '/dashboard' : '/connect'}>
                  <a className="sc-button header-slider style style-1 rocket fl-button pri-1">
                    <span>{account ? 'My dashboard' : 'Get Started'}</span>
                  </a>
                </Link>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              direction={'vertical'}
              spaceBetween={25}
              slidesPerView={5}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              speed={2000}
            >
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item1.png"
                  alt="Minting website 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item2.png"
                  alt="Minting website 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item3.png"
                  alt="Minting website 3"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item2.png"
                  alt="Minting website 4"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item3.png"
                  alt="Minting website 5"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              modules={[Autoplay]}
              direction={'vertical'}
              spaceBetween={25}
              slidesPerView={5}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              speed={1800}
            >
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item3.png"
                  alt="Minting website 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item2.png"
                  alt="Minting website 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item3.png"
                  alt="Minting website 3"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item1.png"
                  alt="Minting website 4"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item2.png"
                  alt="Minting website 5"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              modules={[Autoplay]}
              direction={'vertical'}
              spaceBetween={25}
              slidesPerView={5}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              speed={2200}
            >
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item2.png"
                  alt="Minting website 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item1.png"
                  alt="Minting website 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item3.png"
                  alt="Minting website 3"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item2.png"
                  alt="Minting website 4"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/box-item/img_item1.png"
                  alt="Minting website 5"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Slider
