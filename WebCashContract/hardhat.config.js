require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version:"0.8.18",
  },
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  //   disambiguatePaths: false,
  // },
  etherscan: {
    apiKey: {
      goerli: 'HXPKRFHE5MF6S4RX3AK1VHQEE6JNF6WATM',
      bsc:"KN7DZWI4ZAEF2STC8STWJ9RTK9Y6FVMUNQ"
    }
  },
  networks: {
    // bsc:{
    //   url:"https://rpc-bsc.48.club",
    //   chainId:56,
    //   accounts:[""]
    // },
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/Q1svh7bjqwrEd5tgBKY5fl5QFxeq3KsG",
      chainId:5,
      accounts:["a1beefd9a607443c013a9d08a9941d630f287e55c2a1d35f608c74d09f97282f"]
    },
  }
};