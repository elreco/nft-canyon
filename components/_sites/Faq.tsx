/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

const Faq = (props: { questions: Question[] | undefined }) => {
  const [questions] = useState<Question[]>(props.questions || [])

  return (
    <section className="tf-section live-auctions bg-style2" id="faq">
      <div className="themesflat-container content-row">
        <div className="row">
          <div className="col-box-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-40 text-left">Faq</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
