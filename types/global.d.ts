interface Window {
  ethereum: any
  web3: any
}

type User = {
  walletAddress?: string
} | null

type WalletOptions = {
  img: StaticImageData
  description: string
  title: string
  name: ConnectorOptions
}
