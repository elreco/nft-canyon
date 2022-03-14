import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect } from 'react'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import '../styles/style.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import isWalletConnected from '../lib/isWalletConnected'
import router from 'next/router'
import sanityClient, { updateCurrentUser } from '../lib/sanityClient'
config.autoAddCss = false

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const supportedChainIds = [1, 4]
const connectors = {
  injected: {}
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    window.ethereum.once('accountsChanged', async () => {
      const account = await isWalletConnected()
      if (account) {
        const currentUser = (await sanityClient(
          process.env.NEXT_PUBLIC_TOKEN || ''
        ).getDocument(account)) as User
        updateCurrentUser(currentUser)
      } else {
        updateCurrentUser(null)
        router.push('/')
      }
    })
  })

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      {getLayout(<Component {...pageProps} />)}
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
