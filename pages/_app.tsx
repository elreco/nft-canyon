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
import toast from 'react-hot-toast'
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
    const accountChangedListener = async () => {
      const account = await isWalletConnected()
      console.log(account)
      if (account) {
        const currentUser = (await sanityClient(
          process.env.NEXT_PUBLIC_TOKEN || ''
        ).getDocument(account)) as User
        updateCurrentUser(currentUser)

        toast.success(`Welcome back! 👋`, {
          style: {
            background: '#04111d',
            color: '#fff',
            fontSize: '15px'
          }
        })
        router.push('/dashboard')
        return
      } else {
        updateCurrentUser(null)
        router.push('/')
        return
      }
    }
    window.ethereum.on('accountsChanged', accountChangedListener)
    return () =>
      window.ethereum.removeListener('accountsChanged', accountChangedListener)
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
