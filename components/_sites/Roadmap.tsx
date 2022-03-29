import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { useState } from 'react'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'
import CardModal from './CardModal'

const Roadmap = (props: { milestones: Milestone[] | undefined }) => {
  const [milestones] = useState<Milestone[]>(props.milestones || [])
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [text, setText] = useState<string | undefined>('')
  const [title, setTitle] = useState<string | undefined>('')

  const zeroPad = (num: number | string, places: number) =>
    String(num).padStart(places, '0')

  const activeModal = (milestone: Milestone) => {
    setModalShow(true)
    setText(milestone.description)
    setTitle(milestone.title)
  }

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

  const sortFunction = (a: Milestone, b: Milestone) => {
    if (a.order < b.order) {
      return -1
    }
    if (a.order > b.order) {
      return 1
    }
    return 0
  }

  return (
    <>
      <CardModal
        show={modalShow}
        text={text}
        title={title}
        onHide={() => setModalShow(false)}
      />
      <section className="tf-section live-auctions bg-style2" id="roadmap">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-20">Roadmap</h2>
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
                {milestones.sort(sortFunction).map((milestone, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-container show-shadow carousel auctions">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className="sc-card-product">
                              <div className="card-media">
                                <a
                                  className="cursor-pointer"
                                  onClick={() => activeModal(milestone)}
                                >
                                  <div className="img-wrapper">
                                    <img
                                      src={getImage(milestone.image)}
                                      alt=""
                                    />
                                  </div>
                                </a>
                                <div className="featured-countdown">
                                  <span>{zeroPad(milestone.order, 2)}</span>
                                </div>
                              </div>
                              <div className="card-title mb-0">
                                <h5>
                                  <a
                                    className="cursor-pointer"
                                    onClick={() => activeModal(milestone)}
                                  >
                                    {milestone.title}
                                  </a>
                                </h5>
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
    </>
  )
}

export default Roadmap
