import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";

task("deploy:Lock", "deploys lock contract").setAction(async function (
  taskArgs: TaskArguments,
  hre: HardhatRuntimeEnvironment
) {
  const factory = await hre.ethers.getContractFactory("Lock");
  const contract = await factory.deploy("1000000000000");
  console.log(contract.address);
});
