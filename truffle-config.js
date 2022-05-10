require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const express = require('express');
//const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 8080


//log request
//app.use(morgan('tiny'))

//mongodb connection
//connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set view engine
app.set("views engine", "ejs")
    //app.set("views", path.resolve(__dirname),"views/ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname, "src/assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "src/assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "src/assets/js")))

//load routers
app.use('/', require('./src/server/routes/router'))

app.listen(PORT, () => {
    console.log(`Srever is running on http://localhost:${PORT}`)
})


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    develop: {
      port: 8545
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

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
