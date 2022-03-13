/* eslint-disable @next/next/no-img-element */
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { contractAbi, contractAddress } from '../../lib/contract/constants'
import { type SetStateAction, type Dispatch, useEffect, useState } from 'react'
import isWalletConnected from '../../lib/isWalletConnected'

const Payment = ({
  setCurrentUser
}: {
  setCurrentUser: Dispatch<SetStateAction<User>>
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const account = await isWalletConnected()
      setAccount(account)
    })()
  })

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    )

    return transactionContract
  }

  const makePayment = async () => {
    setIsLoading(true)
    try {
      const transactionContract = getContract()
      const to = await transactionContract.getReceiver()
      const value = await transactionContract.getAmount()

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to,
            value: value._hex,
            from: account,
            gas: '0x5208'
          }
        ]
      })

      const transactionHash = await transactionContract.sendMoney(
        'Payment for NFT Canyon'
      )
      await transactionHash.wait()

      const userData = await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          transactionHash: transactionHash.hash
        })
      })

      const user = (await userData.json()) as User
      setCurrentUser(user)

      toast.success('You have successfully subscribed to NFT Canyon!', {
        style: {
          background: '#04111d',
          color: '#fff',
          fontSize: '15px'
        }
      })
      setIsLoading(false)
    } catch (error: any) {
      let message =
        "Insufficient funds: you probably don't have enough eth to make this transaction 😕"
      if (error.code === 4001) {
        message = 'Your transaction has been canceled 😕'
      }
      toast.error(message, {
        style: {
          background: '#04111d',
          color: '#fff',
          fontSize: '15px'
        }
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="tf-section tf-item-details">
      <div className="themesflat-container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="sc-item-details text-center">
              <h2 className="style2">Activate your account</h2>
              <div className="client-infor sc-card-product justify-content-center my-5 mx-25">
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
                        alt=""
                      />
                    </div>
                    <div className="info text-left">
                      <span>Connected with</span>
                      <h6>
                        {' '}
                        {account.slice(0, 8)}...{account.slice(-8)}{' '}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <p className="my-4">
                To activate your NFT Canyon, you need to pay{' '}
                <strong>0.2 ETH</strong> to start your own NFT Minting website!
              </p>
              <button
                type="button"
                disabled={isLoading}
                onClick={makePayment}
                className="sc-button loadmore style rocket fl-button pri-3"
              >
                <span>
                  {isLoading
                    ? 'Transaction is being process...'
                    : 'Create my NFT Website'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
