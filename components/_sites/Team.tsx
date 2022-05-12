/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { getAssetUrl } from '../../lib/sanityClient'

const Team = (props: { members: Member[] | undefined }) => {
  const [members] = useState<Member[]>(props.members || [])

  const getImage = (image: any) => {
    if (image) {
      return getAssetUrl(image).width(400).url()
    } else {
      return 'https://dummyimage.com/400x400'
    }
  }

  return (
    <section className="tf-section live-auctions style4 home4" id="team">
      <div className="themesflat-container content-row">
        <div className="row">
          <div className="col-box-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-40 text-left">Team</h2>
            </div>
          </div>
          {members.map((member, index) => (
            <div
              key={index}
              className="fl-collection fl-item3 col-xl-3 col-md-6 mb-5"
            >
              <div className="sc-card-collection style-2 sc-card-style7 h-100">
                <div className="card-media-h7">
                  <img
                    src={getImage(member.image)}
                    className="blur-img w-100 h-100"
                    alt=""
                  />
                </div>
                <div className="sc-author-box style-2">
                  <div className="author-avatar">
                    <img
                      src={getImage(member.image)}
                      alt=""
                      className="avatar"
                    />
                  </div>
                </div>
                <div className="card-bottom">
                  <div className="author">
                    <div className="content w-100">
                      <div className="flex justify-content-between">
                        <div>
                          <h5 className="mt-2">{member.pseudo}</h5>
                          <div className="infor">
                            <span className="name">{member.job}</span>
                          </div>
                        </div>
                        <div className="widget-social style-2 mt-4">
                          <ul>
                            {member.twitter && (
                              <li>
                                <a
                                  href={member.twitter}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fab fa-twitter"></i>
                                </a>
                              </li>
                            )}
                            {member.linkedin && (
                              <li>
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fab fa-linkedin"></i>
                                </a>
                              </li>
                            )}
                            {member.instagram && (
                              <li>
                                <a
                                  href={member.instagram}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="desc">
                        <p>{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
