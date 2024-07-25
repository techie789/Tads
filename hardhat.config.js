require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    zkevm: {
      url: process.env.REACT_APP_ZKEVM_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};
