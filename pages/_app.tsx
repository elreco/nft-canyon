import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect } from 'react'
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
import toast from 'react-hot-toast'
config.autoAddCss = false

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    const accountChangedListener = async (redirect: boolean = true) => {
      const account = await isWalletConnected()

      if (account) {
        await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            _type: 'user',
            _id: account,
            userName: 'Unnamed',
            walletAddress: account
          })
        })
        if (redirect) {
          toast.success(`Welcome back! 👋`, {
            duration: 5000,
            style: {
              background: '#04111d',
              color: '#fff',
              fontSize: '15px'
            }
          })
          router.push('/dashboard')
          return
        }
        return
      } else {
        const res = await fetch('/api/logout', {
          method: 'POST'
        })
        const data = await res.json()

        if (redirect || data.wasConnected) {
          router.reload()
        }
        return
      }
    }
    accountChangedListener(false)
    window.ethereum?.on('accountsChanged', accountChangedListener)
    return () =>
      window.ethereum?.removeListener('accountsChanged', accountChangedListener)
  }, [])

  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
