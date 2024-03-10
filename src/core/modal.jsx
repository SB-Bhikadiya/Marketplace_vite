import { defaultConfig } from "@web3modal/ethers";
import { createWeb3Modal } from "@web3modal/ethers/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "adf6d945216f7148669e46862e8fd42c";

// 2. Set chains

// 2. Set chains
const chain = {
  chainId: parseInt(process.env.WEB3_CHAIN_ID || "1337"), // Chain ID for Ganache (usually 1337)
  name: process.env.WEB3_NAME || "Ganache",
  currency: process.env.WEB3_CURRENCY || "ETH", // Ether is the currency on Ganache by default
  explorerUrl: process.env.WEB3_EXPLORER_URL || "", // No explorer for local Ganache network
  rpcUrl: process.env.WEB3_RPC_URL || "HTTP://127.0.0.1:7545", // Default RPC URL for Ganache
};

// 3. Create modal
const metadata = {
  name: "NFT MARKETPLACE",
  description: "DESCRIPTION",
  url: "http://localhost:3000",
  icons: [],
};


const Web3ModalProvider = ({ children }) =>  {
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [chain],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  })

  return children;
}

export default Web3ModalProvider;
