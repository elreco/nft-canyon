import type { NextPage } from 'next'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'

const Home: NextPage = () => {
  return (
    <div className="home-7">
      <Header />
      <Slider />
      <Footer />
    </div>
  )
}

export default Home
