import React from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// const contract = new ethers.Contract(address, abi, provider);
console.log(provider);

const Contract = () => {
  // const signContract = async () => {

  // }

  return <h1>Production Agreement #1</h1>;
};

export default Contract;
