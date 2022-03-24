/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'

const Slider = (props: { collection: any[] }) => {
  const [images] = useState<any[]>(props.collection)

  const getImage = (number: number) => {
    if (images[number - 1]) {
      return getAssetUrl(
        sanityClient(process.env.NEXT_PUBLIC_TOKEN || ''),
        images[number - 1]
      )
        .width(300)
        .url()
    } else {
      return `/images/box-item/img_item${number}.png`
    }
  }

  return (
    <section className="flat-title-page home5">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="wrap-heading flat-slider flex align-items-center">
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
              <Link href="/mint">
                <a className="sc-button header-slider style style-1 rocket fl-button pri-1">
                  <span>Mint</span>
                </a>
              </Link>
            </div>
          </div>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
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
              <img src={getImage(1)} alt="Minting website 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(2)} alt="Minting website 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(3)} alt="Minting website 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(4)} alt="Minting website 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(5)} alt="Minting website 5" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={5}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={2100}
          >
            <SwiperSlide>
              <img src={getImage(3)} alt="Minting website 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(2)} alt="Minting website 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(4)} alt="Minting website 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(1)} alt="Minting website 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(2)} alt="Minting website 2" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
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
              <img src={getImage(5)} alt="Minting website 5" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(4)} alt="Minting website 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(1)} alt="Minting website 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(2)} alt="Minting website 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(3)} alt="Minting website 3" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={5}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={2000}
            className="end"
          >
            <SwiperSlide>
              <img src={getImage(2)} alt="Minting website 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(3)} alt="Minting website 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(4)} alt="Minting website 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(1)} alt="Minting website 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={getImage(5)} alt="Minting website 5" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Slider
