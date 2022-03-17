/* eslint-disable @next/next/no-img-element */
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faRocket } from '@fortawesome/free-solid-svg-icons'
import router from 'next/router'

const PaymentForm = ({ currentUser }: { currentUser: User }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState<string>(
    currentUser?.walletAddress || ''
  )
  const [btnMessage, setBtnMessage] = useState<string>(
    'Confirm the transaction on MetaMask'
  )

  const makePayment = async () => {
    setIsLoading(true)
    try {
      await window.ethereum.send('eth_requestAccounts')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const tx = await signer.sendTransaction({
        to: process.env.NEXT_PUBLIC_ADDRESS,
        value: ethers.utils.parseEther('0.2')
      })
      setBtnMessage('Transaction is being processed. Please wait...')
      await tx.wait()

      const userData = await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          transactionHash: tx.hash
        })
      })

      const user = (await userData.json()) as User

      toast.success('You have successfully subscribed to NFT Canyon!', {
        style: {
          background: '#04111d',
          color: '#fff',
          fontSize: '15px'
        }
      })
      setBtnMessage('Confirm the transaction on MetaMask')
      setIsLoading(false)
      router.reload()
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
    <div className="tf-section">
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
                className="style fl-button pri-3"
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon spin icon={faSpinner} className="mr-3" />{' '}
                    {btnMessage}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faRocket} className="mr-3" /> Create
                    my NFT Website
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm
