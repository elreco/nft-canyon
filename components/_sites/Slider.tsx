/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'

const Slider = (props: { site: Site }) => {
  const [site] = useState<Site>(props.site)
  const [images] = useState<any[] | undefined>(props.site?.collection)

  const getImage = (number: number) => {
    if (images?.length && images[number - 1]) {
      return getAssetUrl(
        sanityClient(process.env.NEXT_PUBLIC_TOKEN || ''),
        images[number - 1]
      )
        .width(300)
        .url()
    } else {
      return 'https://dummyimage.com/300x400'
    }
  }

  return (
    <section className="flat-title-page home5">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="wrap-heading flat-slider flex align-items-center">
          <div className="content">
            <h2 className="heading mt-15">
              {site?.mainTitle ? site.mainTitle : 'My Awesome'}
            </h2>
            <h1 className="heading mb-style">
              <span className="tf-text s1">
                {site?.mainSubtitle ? site.mainSubtitle : 'NFT Collection'}
              </span>
            </h1>
            <p className="sub-heading mt-19 mb-40">
              {site?.about
                ? site.about
                : '8000 unique NFT pieces on the metaverse.'}
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
