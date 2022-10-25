const { ethers } = require("hardhat");
require("dotenv").config();

const ChainId = {
  MAINNET: "1",
  POLYGON: "137",
  ARBITRUM: "42161",
  FANTOM: "250",
  BSC: "56",
  HARMONY: "1666600000",
  AVALANCHE: "43114",
  OPTIMISM: "10",
  AURORA: "1313161554",
  CRONOS: "25",
};

const ProviderURLs = {
  [ChainId.POLYGON]: process.env.MATIC_RPC,
  [ChainId.BSC]: process.env.BSC_RPC,
  [ChainId.AVALANCHE]: process.env.AVALANCHE_RPC,
  [ChainId.FANTOM]: process.env.FTM_RPC,
  [ChainId.ARBITRUM]: process.env.ARBITRUM_RPC,
  [ChainId.OPTIMISM]: process.env.OPTIMISM_RPC,
  [ChainId.MAINNET]: process.env.MAINNET_RPC,
  [ChainId.HARMONY]: process.env.HARMONY_RPC,
  [ChainId.AURORA]: process.env.AURORA_RPC,
  [ChainId.CRONOS]: process.env.CRONOS_RPC,
};

const adminPkVars = {
  [ChainId.POLYGON]: process.env.ADMIN_PK_MATIC,
  [ChainId.BSC]: process.env.ADMIN_PK_BSC,
  [ChainId.AVALANCHE]: process.env.ADMIN_PK_AVALANCHE,
  [ChainId.FANTOM]: process.env.ADMIN_PK_FTM,
  [ChainId.ARBITRUM]: process.env.ADMIN_PK_ARBITRUM,
  [ChainId.OPTIMISM]: process.env.ADMIN_PK_OPTIMISM,
  [ChainId.MAINNET]: process.env.ADMIN_PK_MAINNET,
  [ChainId.HARMONY]: process.env.ADMIN_PK_HARMONY,
  [ChainId.AURORA]: process.env.ADMIN_PK_AURORA,
  [ChainId.CRONOS]: process.env.ADMIN_PK_CRONOS,
};

const relayerAddresses = {
  [ChainId.POLYGON]: ["0x6c7E6e9985f97278DcA3aa6C4Be999CD13C128fD"],
  [ChainId.BSC]: [""],
  [ChainId.AVALANCHE]: [""],
  [ChainId.FANTOM]: [""],
  [ChainId.ARBITRUM]: [""],
  [ChainId.OPTIMISM]: [""],
  [ChainId.MAINNET]: [""],
  [ChainId.HARMONY]: [""],
  [ChainId.AURORA]: [""],
  [ChainId.CRONOS]: [""],
};

const minAmounts = {
  [ChainId.POLYGON]: "10",
  [ChainId.BSC]: "",
  [ChainId.AVALANCHE]: "",
  [ChainId.FANTOM]: "",
  [ChainId.ARBITRUM]: "",
  [ChainId.OPTIMISM]: "",
  [ChainId.MAINNET]: "",
  [ChainId.HARMONY]: "",
  [ChainId.AURORA]: "",
  [ChainId.CRONOS]: "",
};

const amountToSend = {
  [ChainId.POLYGON]: "0.09",
  [ChainId.BSC]: "",
  [ChainId.AVALANCHE]: "",
  [ChainId.FANTOM]: "",
  [ChainId.ARBITRUM]: "",
  [ChainId.OPTIMISM]: "",
  [ChainId.MAINNET]: "",
  [ChainId.HARMONY]: "",
  [ChainId.AURORA]: "",
  [ChainId.CRONOS]: "",
};

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId.toString();
  const providerUrl = ProviderURLs[chainId];
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const relayerAddressses = relayerAddresses[chainId];
  const minAmount = ethers.utils.parseEther(minAmounts[chainId]);
  const tokensToSend = amountToSend[chainId];

  for (const relayerAddress of relayerAddressses) {
    const balance = await provider.getBalance(relayerAddress);
    const balanceInEther = ethers.utils.formatEther(balance);

    if (balance.lt(minAmount)) {
      const adminPk = adminPkVars[chainId];
      const adminWallet = new ethers.Wallet(adminPk);
      const signer = adminWallet.connect(provider);
      const nonce = await provider.getTransactionCount(adminWallet.address, "latest");
      const gasPrice = await provider.getGasPrice();

      console.log(`\nRelayer ${relayerAddress} has balance ${balanceInEther} tokens`);
      console.log(`Sending ${tokensToSend} tokens to the relayer ${relayerAddress}`);

      const tx = {
        from: adminWallet.address,
        to: relayerAddress,
        value: ethers.utils.parseEther(tokensToSend),
        nonce: nonce,
        gasLimit: ethers.utils.hexlify(100000),
        gasPrice: gasPrice,
      };

      signer.sendTransaction(tx).then(transaction => {
        console.log(`Transaction: `);
        console.dir(transaction);
        console.log("Send finished!");
      });
    }
  }
}

main();
