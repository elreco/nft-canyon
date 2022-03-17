/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useRef, useState } from 'react'

const GeneralForm = (props: { site: Site }) => {
  const form = useRef<HTMLFormElement>(null)
  const [site, setSite] = useState<Site>(props.site)
  const [image, setImage] = useState<string>('')
  const [slug, setSlug] = useState<string | undefined>(site?.slug?.current)

  const onNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').slice(0, 200))
  }

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
        <form ref={form} onSubmit={submit}>
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
                  name="logo"
                />
              </label>
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">Website name</h4>
              <input
                onChange={onNameUpdate}
                required
                name="name"
                type="text"
                placeholder="e.g. Azuki"
                defaultValue={site?.name}
              />
              <div className="invalid-feedback">
                Example invalid feedback text
              </div>
            </div>
          </div>

          <h4 className="title-create-item">Preview website url</h4>
          <input
            type="text"
            name="slug[current]"
            value={`${slug}.${process.env.NEXT_PUBLIC_ROOT_URL}`}
            readOnly
            defaultValue={site?.slug.current}
          />

          <div className="row">
            <div className="col-lg-6">
              <h4 className="title-create-item">Twitter Username</h4>
              <input
                name="twitter"
                type="url"
                placeholder="e.g. “https://twitter.com/azukizen”"
                defaultValue={site?.twitter}
              />
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">Instagram Username</h4>
              <input
                name="instagram"
                type="url"
                placeholder="e.g. “https://instagram.com/azuki_zen”"
                defaultValue={site?.instagram}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h4 className="title-create-item">Discord Link</h4>
              <input
                name="discord"
                type="url"
                placeholder="e.g. “https://discord.gg/azuki”"
                defaultValue={site?.discord}
              />
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">OpenSea Link</h4>
              <input
                name="opensea"
                type="url"
                placeholder="e.g. “https://opensea.io/collection/azuki”"
                defaultValue={site?.opensea}
              />
            </div>
          </div>

          <div className="text-right">
            <button className="tf-button-submit mg-t-20" type="submit">
              Update Website
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneralForm
