/* eslint-disable @next/next/no-img-element */
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const ProfileForm = (props: { currentUser: User }) => {
  const form = useRef<HTMLFormElement>(null)

  const [currentUser, setCurrentUser] = useState<User>(props.currentUser)
  const [userName, setUserName] = useState<string>(
    (props.currentUser && props.currentUser.userName) || ''
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ userName })
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
        setCurrentUser(json)
        toast.success(
          'You have successfully updated your NFT Canyon profile!',
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
          <div className="row">
            <div className="col-lg-6">
              <h4 className="title-create-item">My Username</h4>
              <input
                name="userName"
                type="text"
                required
                placeholder="e.g. “John Doe”"
                defaultValue={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="col-lg-6">
              <h4 className="title-create-item">
                My Wallet Address (read only)
              </h4>
              <input
                type="text"
                defaultValue={currentUser?.walletAddress}
                readOnly
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
                  {/* <FontAwesomeIcon spin icon={faSpinner} className="mr-3" /> */}{' '}
                  Loading
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm
