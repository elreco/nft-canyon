const MintInfo = (props: {
  status: number
  maxSupply: number
  totalMinted: number
  maxMint: number
  alreadyMinted: number
  setAlreadyMinted: (number: number) => void
}) => {
  const displayMinted = () => {
    if (props.status === 0) {
      return '-'
    } else if (props.status === 1) {
      return `${props.alreadyMinted} / 2`
    } else {
      return props.alreadyMinted || '-'
    }
  }

  return (
    <div className="meta-item-details style2">
      {props.status !== 0 && (
        <div className="item meta-price">
          <span className="heading">You minted</span>
          <div className="price">
            <div className="price-box">
              <h5>
                {displayMinted()}{' '}
                {props.status === 2 && `(${props.maxMint} per transactions)`}
              </h5>
            </div>
          </div>
        </div>
      )}
      <div className="item meta-price">
        <span className="heading">Max supply</span>
        <div className="price">
          <div className="price-box">
            <h5>{props.maxSupply || '-'}</h5>
          </div>
        </div>
      </div>
      <div className="item meta-price">
        <span className="heading">Total minted</span>
        <div className="price">
          <div className="price-box">
            <h5> {props.totalMinted || '-'}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintInfo
