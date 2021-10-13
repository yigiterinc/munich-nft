const munichNFT = artifacts.require("./munichNFT.sol");

module.exports = function (deployer) {
	deployer.deploy(munichNFT);
};
