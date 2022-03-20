const Subheader = ({ title }: { title: string }) => {
  return (
    <section className="flat-title-page inner">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-title-heading mg-bt-12">
              <h1 className="heading text-center">{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subheader
