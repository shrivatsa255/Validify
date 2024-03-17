
const hre = require("hardhat");

// scripts/deploy.js

async function main() {
  const Central = await ethers.getContractFactory("Central");
  const central = await Central.deploy();
  await central.deployed();

  console.log("Central contract deployed to:", central.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    throw error;
  });
