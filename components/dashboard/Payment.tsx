import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { useWeb3 } from '@3rdweb/hooks'
import { contractAbi, contractAddress } from '../../lib/contract/constants'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { useState } from 'react'
const web3 = createAlchemyWeb3("https://eth-rinkeby.alchemyapi.io/v2/qqgWTCqUnij3nLqz1g0XKezTt0WAImKx");

const Payment = ({ fetchCurrentUser }: { fetchCurrentUser(): Promise<void> }) => {
  const { address } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)

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
      const nonce = await web3.eth.getTransactionCount(to, 'latest')
      const value = await transactionContract.getAmount()

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to,
            value: value._hex,
            nonce,
            from: address,
            gas: '0x5208',
          },
        ],
      })
  
      const transactionHash = await transactionContract.sendMoney("Payment for NFT Canyon")
      await transactionHash.wait()
      await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          transactionHash: transactionHash.hash
        })
      })

      await fetchCurrentUser()
      toast.success("You have successfully subscribed to NFT Canyon!", {
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
    <button type="button" onClick={() => makePayment()}>
      Make Payment
    </button>
  )
}

export default Payment
