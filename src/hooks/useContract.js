import { ethers } from "ethers";
import { useEffect } from "react";
import { abi } from "../abis/ContractSign.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const _contract = new ethers.Contract(contractAddress, abi, provider);
const signer = provider.getSigner();
const contract = _contract.connect(signer);

console.log(provider);

const useContract = () => {
  return [contract];
};

export default useContract;
