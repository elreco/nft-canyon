require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/qqgWTCqUnij3nLqz1g0XKezTt0WAImKx',
      accounts: [
        '896a5e8ab8cb5ee99478b9f0eb437a268667b97ff348ce488e5517190bcd3ef2',
      ],
    },
  },
};
