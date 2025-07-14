//deploy.js
//deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Correct balance check for ethers v6
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`Deployer balance: ${hre.ethers.formatEther(balance)} ETH`);

  const P2P = await hre.ethers.getContractFactory("P2P");
  const p2p = await P2P.deploy();

  await p2p.waitForDeployment();

  const contractAddress = await p2p.getAddress();
  console.log("P2P deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
