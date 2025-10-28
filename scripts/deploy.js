const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Starting deployment...");
  
  // Deploy Governance contract first
  console.log("Deploying Governance...");
  const Governance = await ethers.getContractFactory("Governance");
  const governance = await Governance.deploy();
  await governance.deployed();
  console.log("Governance deployed to:", governance.address);
  
  // Deploy Bank contract
  console.log("Deploying Bank...");
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();
  await bank.deployed();
  console.log("Bank deployed to:", bank.address);
  
  // Deploy Mock Bank for testing
  console.log("Deploying BankMock...");
  const BankMock = await ethers.getContractFactory("BankMock");
  const bankMock = await BankMock.deploy();
  await bankMock.deployed();
  console.log("BankMock deployed to:", bankMock.address);
  
  // Save deployment info
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    network: "localhost",
    contracts: {
      governance: {
        address: governance.address,
        abi: "Governance.json",
      },
      bank: {
        address: bank.address,
        abi: "Bank.json",
      },
      bankMock: {
        address: bankMock.address,
        abi: "BankMock.json",
      },
    },
  };
  
  fs.writeFileSync(
    "contracts/deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\nDeployment completed successfully!");
  console.log("\nDeployed contracts:");
  console.log("  Governance:", governance.address);
  console.log("  Bank:", bank.address);
  console.log("  BankMock:", bankMock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

