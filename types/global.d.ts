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

type Milestone = {
  image: any
  order: string
  description?: string
  title?: string
}

type Member = {
  pseudo: any
  realName: string
  job: string
  description?: string
  image: string
  linkedin?: string
  twitter?: string
  instagram?: string
}

type Question = {
  question: string
  answer: string
}

type Menu = {
  name: string
  slug?: string
  links: string
  namesub?: [
    {
      id: number
      links: string
      sub: string
    }
  ]
}

type Site = {
  _id: string
  _type: string
  slug: {
    _type: string
    current: string
  }
  collection: any[]
  logo: any
  name: string
  owner: User
  totalMinted: number
  alreadyMinted: number
  about?: string
  mainTitle?: string
  mainSubtitle?: string
  mainColor?: string
  secondaryColor?: string
  contractMintFunction?: string
  maxMint: number
  status: number
  contract?: any
  contractParameter?: boolean
  instagram?: string
  twitter?: string
  opensea?: string
  discord?: string
  milestones?: Milestone[]
  members?: Member[]
  questions?: Question[]
} | null

type Timeleft = {
  days: string
  hours: string
  minutes: string
  seconds: string
}
