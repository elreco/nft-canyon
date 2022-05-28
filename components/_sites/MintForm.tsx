import { useState } from 'react'
import Image from 'next/image'
/* import Image1 from '../public/images/mint/mint-1.jpg'
import Image2 from '../public/images/mint/mint-2.jpg'
import Image3 from '../public/images/mint/mint-3.jpg' */
import Web3 from 'web3'
import Noty from 'noty'

const MintForm = (props: {
  status: number
  isLoading: boolean
  mintNft: (number: number) => void
}) => {
  const [disabled, setDisabled] = useState(false)

  return (
    <>
      {disabled && (
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="place-bet-area into-banner mt_md--30 mt_sm--30">
              <p>
                <strong>
                  We are minting your NFT 🤘 <br />
                  Open MetaMask, confirm the transaction then please wait a
                  minute...
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row g-5 justify-content-center mt--25">
          <div className="col-xl-4 col-6">
            buttons with loading state and react slider
          </div>
        </div>
      </div>
    </>
  )
}

export default MintForm
