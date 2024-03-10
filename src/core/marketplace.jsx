import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { NFTFactoryContract, NFTMarketplaceContract } from "contracts";
import { NFT__factory } from "contracts/typechain-types";
import { BrowserProvider } from "ethers";

import React, { createContext, useEffect } from "react";
import { ADDRESS_KEY, CHAIN_ID_KEY, CONNECTION_KEY } from "../constants/keys";

export const MarketplaceContext = createContext({});

export const MarketplaceProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    localStorage.setItem(ADDRESS_KEY, address);
    localStorage.setItem(CHAIN_ID_KEY, `${chainId}`);
    localStorage.setItem(CONNECTION_KEY, `${isConnected}`);
    return () => {};
  }, [address, chainId, isConnected]);

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
