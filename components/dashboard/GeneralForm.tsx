/* eslint-disable @next/next/no-img-element */
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const GeneralForm = (props: { site: Site }) => {
  const form = useRef<HTMLFormElement>(null)
  const [site, setSite] = useState<Site>(props.site)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')
  const [slug, setSlug] = useState<string>(site?.slug?.current || '')

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
    setIsLoading(true)

    const res = await fetch('/api/site', {
      method: site?._id ? 'PATCH' : 'POST',
      body: form.current && new FormData(form.current)
    })
    const json = await res.json()
    switch (res.status) {
      case 400:
        toast.error(json.message, {
          style: {
            background: '#04111d',
            color: '#fff',
            fontSize: '15px'
          }
        })
        break
      default:
        setSite(json)
        toast.success(
          'You have successfully updated your NFT Canyon website!',
          {
            style: {
              background: '#04111d',
              color: '#fff',
              fontSize: '15px'
            }
          }
        )
    }

    setIsLoading(false)
  }

  return (
    <div className="create-item tf-create-item tf-section">
      <div className="flat-tabs tab-create-item">
        <form ref={form} onSubmit={submit}>
          <input type="hidden" name="_id" defaultValue={site?._id} />
          <div className="row">
            <div className="col-lg-6">
              <h4 className="title-create-item">Your logo</h4>
              <label className="uploadFile">
                <span className="filename">
                  {!image ? (
                    'PNG, JPG, GIF, WEBP or MP4. Max 200mb.'
                  ) : (
                    <img className="image-preview p-3" src={image} alt="" />
                  )}
                </span>
                <input
                  type="file"
                  onChange={onImageChange}
                  required={!site?.logo}
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
            </div>
          </div>

          <h4 className="title-create-item">Preview website url</h4>
          <input
            type="text"
            defaultValue={`${slug}.${process.env.NEXT_PUBLIC_ROOT_URL}`}
            readOnly
          />
          <input type="hidden" name="slug" defaultValue={slug} />

          <div className="row">
            <div className="col-lg-6">
              <h4 className="title-create-item">Twitter Username</h4>
              <input
                name="twitter"
                type="url"
                placeholder="e.g. “https://twitter.com/azukizen” (Optional)"
              />
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">Instagram Username</h4>
              <input
                name="instagram"
                type="url"
                placeholder="e.g. “https://instagram.com/azuki_zen” (Optional)"
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
                placeholder="e.g. “https://discord.gg/azuki” (Optional)"
                defaultValue={site?.discord}
              />
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">OpenSea Link</h4>
              <input
                name="opensea"
                type="url"
                placeholder="e.g. “https://opensea.io/collection/azuki” (Optional)"
                defaultValue={site?.opensea}
              />
            </div>
          </div>

          <div className="text-right">
            <button
              disabled={isLoading}
              className="tf-button-submit mg-t-20"
              type="submit"
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon spin icon={faSpinner} className="mr-3" />{' '}
                  Loading
                </>
              ) : (
                'Update Website'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneralForm
