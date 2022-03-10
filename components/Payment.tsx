import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { Exception } from 'sass'

const Payment = () => {
  const startPayment = async (ether: string) => {
    const addr = '0xe0C5123B0FD1A7D94bB8D84bBAF1026B699C6dC6'
    try {
      if (!window.ethereum) {
        throw new Error('No crypto wallet found. Please install it.')
      }
      await window.ethereum.send('eth_requestAccounts')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      ethers.utils.getAddress(addr)
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      })

      console.log('tx', tx)
    } catch (err: any) {
      console.log(err)
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
