interface Window {
  ethereum: any
  web3: any
}

type User = {
  plan: number
  walletAddress?: string
} | null

type WalletOptions = {
  img: StaticImageData
  description: string
  title: string
  name: ConnectorOptions
}
