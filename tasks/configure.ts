// import { task } from "hardhat/config";
// import { TaskArguments } from "hardhat/types";
// import fs from "fs";

// task("Configure:Bridge").setAction(async function (_taskArguments: TaskArguments, hre) {
//   const network = await hre.getChainId();
//   const C1 = await hre.ethers.getContractFactory("BridgeUpgradeable");
//   const C11 = await C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
//   const Handler = await hre.ethers.getContractFactory("ERC20HandlerUpgradeable");
//   const handler = await Handler.attach(deployments[network][contracts["ERC20HANDLER"]].proxy);
// });

