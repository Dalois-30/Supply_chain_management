require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');



module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://rinkeby.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`
      ),
      gasPrice: 25000000000,
      network_id: 4
    }
  },
}