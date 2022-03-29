const isWalletConnected = async () => {
  const { ethereum } = window
  try {
    if (!ethereum) return
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length) {
      return accounts[0].toLowerCase()
    }
  } catch (error) {
    throw new Error('No ethereum object.')
  }
}

export default isWalletConnected
