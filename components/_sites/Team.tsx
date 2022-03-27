import { useState } from 'react'
import sanityClient, { getAssetUrl } from '../../lib/sanityClient'

const Team = (props: { members: Member[] | undefined }) => {
  const [members] = useState<Member[]>(props.members || [])

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
    <section
      className="tf-section live-auctions style4 home4 live-auctions-style7"
      id="team"
    >
      <div className="themesflat-container">
        <div className="row">
          <div className="col-box-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-40 text-left">Team</h2>
            </div>
          </div>
          {members.map((member, index) => (
            <div
              key={index}
              className="fl-collection fl-item3 col-xl-4 col-md-6"
            >
              <div className="sc-card-collection style-2 sc-card-style7">
                <div
                  className="card-media-h7"
                  style={{ width: '100%', height: '200px' }}
                >
                  <img
                    src={getImage(member.image)}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                <div className="card-bottom">
                  <div className="author">
                    <div className="content">
                      <h5>{member.pseudo}</h5>
                      <div className="infor">
                        <span>Created by</span>
                        <span className="name">{member.realName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sc-author-box style-2">
                  <div className="author-avatar">
                    <img
                      src={getImage(member.image)}
                      alt="Axies"
                      className="avatar"
                    />
                    <div className="badge">
                      <i className="ripple"></i>
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
