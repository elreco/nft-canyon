import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import sanityClient from '../../lib/sanityClient'
import { useWeb3 } from '@3rdweb/hooks'

const Payment = () => {
  const { address } = useWeb3()
  
  const startPayment = async (ether: string) => {
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
        value: ethers.utils.parseEther(ether)
      })
      // save tx to user profile
      sanityClient
        .patch(address) // Document ID to patch
        .set({ plan: 1 }) // Shallow merge
        .commit() // Perform the patch and return a promise
      console.log('tx', tx)
    } catch (err: any) {
      toast.error(
        "Insufficient funds: you probably don't have enough eth to make this transaction 😕",
        {
          style: {
            background: '#04111d',
            color: '#fff',
            fontSize: '15px'
          }
        }
      )
    }
  }

  return (
    <button type="button" onClick={() => startPayment('14')}>
      Make Payment
    </button>
  )
}

export default Payment
