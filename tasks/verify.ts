import deployment from "../deployment/deployments.json";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { verify } from "./utils";
import { contracts } from "./constants";
const deployments: any = deployment;

task("verify-proxy", "Verify the implementation by providing proxy contract")
  .addParam("proxy", "Address of the proxy contract")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    await verify(taskArguments.proxy, hre);
  });

task("verify-all", "Verify the all the contracts").setAction(async function (_taskArguments: TaskArguments, hre) {
  const network = await hre.getChainId();
  for (const contract in contracts) {
    await verify(deployments[network][contracts[contract]].proxy, hre);
  }
});
