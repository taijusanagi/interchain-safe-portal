import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

import { HARDHAT_CHAINID, TIMEOUT } from "./config";
import { getMnemonic } from "./lib/dev/mnemonic";

dotenv.config();

const mnemonic = getMnemonic("../../mnemonic.txt");

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: HARDHAT_CHAINID,
      accounts: {
        mnemonic,
      },
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API || "",
    },
  },
  gasReporter: {
    enabled: process.env.IS_GAS_REPORTER_ENABLED === "true",
  },
  mocha: {
    timeout: TIMEOUT,
  },
};

export default config;
