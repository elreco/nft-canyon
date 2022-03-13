import abi from './Transactions.json'
import abiRinkeby from './Transactions-rinkeby.json'

export const contractAbi = process.env.NEXT_PUBLIC_IS_PRODUCTION ? abi.abi : abiRinkeby.abi
export const contractAddress = process.env.NEXT_PUBLIC_ADDRESS || ''