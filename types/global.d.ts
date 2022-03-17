interface Window {
  ethereum: any
  web3: any
}

type User = {
  plan?: number
  userName: string
  transactionHash?: string
  walletAddress?: string
} | null

type WalletOptions = {
  img: StaticImageData
  description: string
  title: string
  name: ConnectorOptions
}

type Site = {
  slug: {
    _type: string
    current: string
  }
  logo: any
  name: string
  owner: User
  contractMintFunction: string
  maxMintNumber: number
  instagram?: string
  twitter?: string
  opensea?: string
  discord?: string
} | null
