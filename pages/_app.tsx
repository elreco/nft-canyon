import type { AppProps } from 'next/app'
import '../styles/style.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
