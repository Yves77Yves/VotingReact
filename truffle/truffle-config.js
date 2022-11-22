require('dotenv').config();
const { MNEMONIC, PROJECT_ID } = process.env; 
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {

  contracts_build_directory: "../client/src/contracts",
  networks: {

    
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
      network_id: 5,       // Goerli's id
  },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",     
    }
  },
  
};
