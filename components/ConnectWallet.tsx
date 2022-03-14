import { useState, useEffect } from 'react'
import Image from 'next/image'
import { type ConnectorOptions, useWeb3 } from '@3rdweb/hooks'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import img1 from '../public/images/icon/connect-1.png'
import isWalletConnected from '../lib/isWalletConnected'

const ConnectWallet = ({ redirect }: { redirect: string }) => {
  const { connectWallet } = useWeb3()
  const router = useRouter()
  const [data] = useState<WalletOptions[]>([
    {
      img: img1,
      title: 'Meta Mask',
      description:
        'A crypto wallet & gateway to blockchain apps. Your key to the world of crypto!',
      name: 'injected' as keyof ConnectorOptions
    }
  ])

  useEffect(() => {
    ;(async () => {
      const account = await isWalletConnected()

      if (!account) {
        return
      }

      await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          _type: 'user',
          _id: account,
          userName: 'Unnamed',
          walletAddress: account
        })
      })

      toast.success(`Welcome back! 👋`, {
        style: {
          background: '#04111d',
          color: '#fff',
          fontSize: '15px'
        }
      })

      router.push(redirect)
      return
    })()
  })

  return (
    <>
      <div className="tf-connect-wallet tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-2 mg-bt-12">
                Connect Your Wallet
              </h2>
              <h5 className="sub-title ct style-1 pad-400">
                Connect your wallet with one of the following gateway to start
                creating your minting website!
              </h5>
            </div>
            <div className="col-md-12">
              <div className="sc-box-icon-inner style-2">
                {data.map((item, index) => (
                  <div
                    onClick={() => {
                      window.ethereum
                        ? connectWallet(item.name)
                        : (window.location.href =
                            'https://metamask.io/download/')
                    }}
                    key={index}
                    className="sc-box-icon cursor"
                  >
                    <div className="img">
                      <Image src={item.img} alt="" />
                    </div>
                    <h4 className="heading">
                      <a
                        href="#"
                        onClick={() =>
                          window.ethereum
                            ? connectWallet(item.name)
                            : (window.location.href =
                                'https://metamask.io/download/')
                        }
                      >
                        {item.title}
                      </a>{' '}
                    </h4>
                    <p className="content">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectWallet
