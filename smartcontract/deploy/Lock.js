const { Deployer } = require("@matterlabs/hardhat-zksync");
const { Wallet } = require("zksync-ethers");

module.exports = async function (hre) {
  // Initialize the wallet.
  const wallet = new Wallet("");

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);

  // Load contract
  const artifact = await deployer.loadArtifact("DreamContest");

  const greeterContract = await deployer.deploy(artifact);

  // Show the contract info.
  console.log(
    `${
      artifact.contractName
    } was deployed to ${await greeterContract.getAddress()}`
  );
};
