const AidTracker = artifacts.require("AidTracker");

module.exports = function (deployer) {
  deployer.deploy(AidTracker);
};
