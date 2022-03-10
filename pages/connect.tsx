import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import { type ConnectorOptions, useWeb3 } from '@3rdweb/hooks'
import toast from 'react-hot-toast'
import sanityClient from '../lib/sanityClient'
import { useRouter } from 'next/router'

import img1 from '../public/images/icon/connect-1.png'
import img4 from '../public/images/icon/connect-4.png'
import img5 from '../public/images/icon/connect-5.png'

const WalletConnect: NextPage = () => {
  const router = useRouter()
  const [data] = useState([
    {
      img: img1,
      title: 'Meta Mask',
      description:
        'A crypto wallet & gateway to blockchain apps Your key to the world of crypto',
      name: 'injected' as keyof ConnectorOptions
    },
    {
      img: img4,
      title: 'Wallet Connect',
      description:
        'WalletConnect is the web3 standard to connect blockchain wallets to dapps. Your key to the world of crypto',
      name: 'walletconnect' as keyof ConnectorOptions
    },
    {
      img: img5,
      title: 'Coinbase Wallet',
      description:
        'Your key to the world of crypto Your key to the world of crypto Your key to the world of crypto',
      name: 'walletlink' as keyof ConnectorOptions
    }
  ])

  const { address, connectWallet } = useWeb3()

  useEffect(() => {
    if (!address) return
    ;(async () => {
      await sanityClient.createIfNotExists({
        _type: 'user',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address
      })

      toast.success(`Welcome back! 👋`, {
        style: {
          background: '#04111d',
          color: '#fff',
          fontSize: '15px'
        }
      })

      router.push('/dashboard')
    })()
  }, [address, router])

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Get Started</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                    onClick={() => connectWallet(item.name)}
                    key={index}
                    className="sc-box-icon cursor"
                  >
                    <div className="img">
                      <Image src={item.img} alt="" />
                    </div>
                    <h4 className="heading">
                      <a href="#" onClick={() => connectWallet(item.name)}>
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
      <Footer />
    </div>
  )
}

export default WalletConnect
