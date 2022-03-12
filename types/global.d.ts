interface Window {
  ethereum: any
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
