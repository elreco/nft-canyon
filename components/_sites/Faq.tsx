/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useContext, useState } from 'react'
import {
  Accordion,
  AccordionContext,
  useAccordionButton
} from 'react-bootstrap'

const Faq = (props: { questions: Question[] | undefined }) => {
  const [questions] = useState<Question[]>(props.questions || [])

  const CustomToggle = ({
    children,
    eventKey,
    callback
  }: {
    children: any
    eventKey: any
    callback: any
  }) => {
    const { activeEventKey } = useContext(AccordionContext)

    const isCurrentEventKey = activeEventKey === eventKey

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    )

    return (
      <button
        type="button"
        className={`accordion-button ${isCurrentEventKey ? '' : 'collapsed'}`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    )
  }
  return (
    <section
      className="tf-section live-auctions bg-style2"
      id="faq"
      style={{ minHeight: '1500px' }}
    >
      <div className="themesflat-container content-row">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-40 text-left">Faq</h2>
            </div>
          </div>
          <div className="col-md-12">
            <div className="flat-accordion2">
              {questions.map((question, index) => (
                <Accordion defaultActiveKey="0" key={index}>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <CustomToggle
                        eventKey={index.toString()}
                        callback={undefined}
                      >
                        {question.question}
                      </CustomToggle>
                    </h2>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <div className="accordion-collapse">
                        <div className="accordion-body">
                          <p>{question.answer}</p>
                        </div>
                      </div>
                    </Accordion.Collapse>
                  </div>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
