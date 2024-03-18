import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { NFTFactoryContract, NFTMarketplaceContract } from "contracts";
import { NFT__factory } from "contracts/typechain-types";
import { BrowserProvider } from "ethers";

import { createContext, useEffect } from "react";
import { ADDRESS_KEY, ADDRESS_REGEX_KEY } from "../constants/keys";
import { useAuth } from "./auth";

export const MarketplaceContext = createContext({});

export const MarketplaceProvider = ({ children }) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { fetchUser } = useAuth();
  const { open } = useWeb3Modal();

  useEffect(() => {
    open().then(() => {
      fetchUser(address).then(() => {
        console.log("WALLET FETCHED");
      });
    });
    address &&
      localStorage.setItem(ADDRESS_KEY, address);
  }, [address]);

  const contextValue = {
    marketplace: undefined,
    factory: undefined,
    nft: undefined,
    signer: undefined,
    intract: connectWithSmartContract,
    checkWallet: checkIfWalletConnected,
    connectWallet: () => {},
    provideCollection,
    provideNFTFactory,
    provideNFTMarketplace,
  };

  async function connectWithSmartContract() {
    try {
      if (walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        contextValue.signer = await ethersProvider.getSigner();

        contextValue.marketplace = NFTMarketplaceContract.connect(
          contextValue.signer
        );
        contextValue.factory = NFTFactoryContract.connect(contextValue.signer);
        console.log(NFTFactoryContract.target);
        console.log(NFTMarketplaceContract.target);

        console.log("WALLET INTRACTION");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function provideCollection(address) {
    if (walletProvider) {
      const contract = new NFT__factory();
      const NFTContract = contract.attach(address);
      const ethersProvider = new BrowserProvider(walletProvider);
      contextValue.signer = await ethersProvider.getSigner();

      contextValue.nft = NFTContract.connect(contextValue.signer);
      return contextValue.nft;
    }
  }

  async function provideNFTFactory() {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      contextValue.signer = await ethersProvider.getSigner();
      contextValue.factory = NFTFactoryContract.connect(contextValue.signer);
      return contextValue.factory;
    }
  }

  async function provideNFTMarketplace() {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      contextValue.signer = await ethersProvider.getSigner();

      contextValue.marketplace = NFTMarketplaceContract.connect(
        contextValue.signer
      );
      return contextValue.marketplace;
    }
  }

  async function checkIfWalletConnected() {
    return isConnected;
  }

  return (
    <MarketplaceContext.Provider value={contextValue}>
      {children}
    </MarketplaceContext.Provider>
  );
};
