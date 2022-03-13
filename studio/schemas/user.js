export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'walletAddress',
      title: 'Wallet Address',
      type: 'string',
    },
    {
      name: 'plan', // 0 : not paid yet, 1: premium, 2: {TBD}
      title: 'Plan',
      type: 'number',
    },
    {
      name: 'transactionHash',
      title: 'Transaction Hash',
      type: 'string',
    },
    {
      name: "tx",
      title: "Transactions",
      type: "tx"
    }
  ],
}
