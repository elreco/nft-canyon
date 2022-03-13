/* eslint-disable @next/next/no-img-element */
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import isWalletConnected from '../../lib/isWalletConnected'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'

const Header = () => {
  const [account, setAccount] = useState<string>('')

  const [menuTab] = useState([
    {
      class: 'active',
      name: 'GENERAL SETTINGS'
    },
    {
      class: '',
      name: 'COLLECTION'
    },
    {
      class: '',
      name: 'CUSTOM DOMAIN'
    },
    {
      class: '',
      name: 'MY PROFILE'
    }
  ])

  useEffect(() => {
    ;(async () => {
      const account = await isWalletConnected()
      setAccount(account)
    })()
  })

  return (
    <div className="flat-tabs tab-authors">
      <div className="author-profile flex">
        <div className="feature-profile">
          <img
            src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
            alt=""
            className="avatar"
          />
        </div>
        <div className="infor-profile">
          <span>Author Profile</span>
          <h2 className="title">Trista Francis</h2>
          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
            asperiores sit.
          </p>
          <form>
            <input
              type="text"
              className="inputcopy"
              defaultValue="DdzFFzCqrhshMSxABCdfrge"
              readOnly
            />
            <button type="button" className="btn-copycode">
              <i className="icon-fl-file-1"></i>
            </button>
          </form>
        </div>
        <div className="widget-social style-3">
          <div className="btn-profile">
            <Link href="/my-website">
              <a className="sc-button style-1 follow">View website</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="react-tabs">
        <Menu />
      </div>
    </div>
  )
}

export default Header
