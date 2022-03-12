import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import sanityClient from '../../lib/sanityClient'
import { useWeb3 } from '@3rdweb/hooks'

const Payment = ({ fetchCurrentUser }) => {
  const { address } = useWeb3()

  const startPayment = async () => {
    const addr = '0xe0C5123B0FD1A7D94bB8D84bBAF1026B699C6dC6'
    try {
      if (!window.ethereum || !address) {
        toast.error(
          "We didn't find any wallet 😕, please connect with MetaMask!",
          {
            style: {
              background: '#04111d',
              color: '#fff',
              fontSize: '15px'
            }
          }
        )
        return
      }

      await window.ethereum.send('eth_requestAccounts')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      ethers.utils.getAddress(addr)
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther('0.01')
      })
      // save tx to user profile
      await sanityClient.patch(address).set({ plan: 1 }).commit()
      fetchCurrentUser()
    } catch (err: any) {
      let message =
        "Insufficient funds: you probably don't have enough eth to make this transaction 😕"
      if (err.code === 4001) {
        message = 'Your transaction has been canceled 😕'
      }
      toast.error(message, {
        style: {
          background: '#04111d',
          color: '#fff',
          fontSize: '15px'
        }
      })
    }
  }

  return (
    <button type="button" onClick={() => startPayment()}>
      Make Payment
    </button>
  )
}

export default Payment
