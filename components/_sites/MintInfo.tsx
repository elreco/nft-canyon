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
      return
    } else if (props.status === 1) {
      return `${props.alreadyMinted} / 2`
    } else {
      return props.alreadyMinted
    }
  }

  return (
    <div className="container">
      {props.status !== 0 && (
        <div className="single-counter-up text-center mb--20">
          <div className="number">{displayMinted()}</div>
          <div className="botton-title font-tomoe text-xs">You minted</div>
          {props.status === 2 && `(${props.maxMint} per transactions)`}
        </div>
      )}
      <div className="single-counter-up text-center mt--20 mb--20">
        <div className="number">{props.maxSupply}</div>
        <div className="botton-title font-tomoe text-xs">Max supply</div>
      </div>
      <div className="single-counter-up text-center">
        <div className="number">{props.totalMinted}</div>
        <div className="botton-title font-tomoe text-xs">Total minted</div>
      </div>
    </div>
  )
}

export default MintInfo
