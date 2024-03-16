import { ethers } from "ethers";

export function getEtherFromWei(weis) {
  return weis / 1000000000000000000;
}

export function toWei(value) {
  return ethers.parseEther(value.toString());
}
