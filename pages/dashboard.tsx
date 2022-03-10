import type { NextPage } from 'next'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import Payment from '../components/Payment'

const Dashboard: NextPage = () => {
  return (
    <div className="home-7">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">My Dashboard</h1>
                <Payment />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Dashboard
