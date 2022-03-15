/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useRef, useState } from 'react'

const GeneralForm = (props: { site: Site }) => {
  const [site, setSite] = useState<Site>(props.site)
  const form = useRef<HTMLFormElement>(null)
  const [image, setImage] = useState<string>('')

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch('/api/site', {
      method: 'POST',
      body: form.current && new FormData(form.current)
    })
    const json = await res.json()
    setSite(json)
  }

  return (
    <div className="create-item tf-create-item tf-section">
      <div className="flat-tabs tab-create-item">
        <form ref={form} onSubmit={submit} encType="multipart/form-data">
          <div className="row">
            <div className="col-lg-6">
              <h4 className="title-create-item">Your logo</h4>
              <label className="uploadFile">
                <span className="filename">
                  {!image && 'PNG, JPG, GIF, WEBP or MP4. Max 200mb.'}
                  {image && (
                    <img className="image-preview p-3" src={image} alt="" />
                  )}
                </span>
                <input
                  type="file"
                  onChange={onImageChange}
                  required
                  className="inputfile form-control"
                  name="file"
                />
              </label>
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">Website name</h4>
              <input required type="text" placeholder="e.g. Azuki" />
              <div className="invalid-feedback">
                Example invalid feedback text
              </div>
            </div>
          </div>

          <h4 className="title-create-item">Preview website url</h4>
          <input
            type="text"
            value={`${site?.slug}.${process.env.NEXT_PUBLIC_ROOT_URL}`}
            disabled
          />

          <div className="row-form style-3">
            <div className="inner-row-form">
              <h4 className="title-create-item">Royalties</h4>
              <input type="text" placeholder="5%" />
            </div>
            <div className="inner-row-form">
              <h4 className="title-create-item">Size</h4>
              <input type="text" placeholder="e.g. “size”" />
            </div>
            <div className="inner-row-form style-2">
              <div className="seclect-box">
                <div id="item-create" className="dropdown">
                  <a href="#" className="btn-selector nolink">
                    Abstraction
                  </a>
                  <ul>
                    <li>
                      <span>Art</span>
                    </li>
                    <li>
                      <span>Music</span>
                    </li>
                    <li>
                      <span>Domain Names</span>
                    </li>
                    <li>
                      <span>Virtual World</span>
                    </li>
                    <li>
                      <span>Trading Cards</span>
                    </li>
                    <li>
                      <span>Sports</span>
                    </li>
                    <li>
                      <span>Utility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneralForm
