/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HardhatRuntimeEnvironment } from "hardhat/types";
import deployment from "../deployment/deployments.json";
const deployments: any = deployment;

export async function recordAllDeployments(
  network: string,
  contractname: string,
  proxyAddr: string,
  implementationAddr: string,
) {
  deployments[network][contractname] = {
    proxy: proxyAddr,
    implementation: [implementationAddr],
    creationTime: Date.now(),
    updatedTime: [Date.now()],
  };

  return deployments;
}

export async function verify(proxyAddr: string, hre: HardhatRuntimeEnvironment) {
  const implementationAddr = await hre.upgrades.erc1967.getImplementationAddress(proxyAddr);
  console.log("Contract Verification Started", implementationAddr);
  try {
    await hre.run("verify:verify", {
      address: implementationAddr,
    });
  } catch (err) {
    console.error(err);
  }
  console.log("Contract Verification Ended");
}
