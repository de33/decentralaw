import React, { useState } from "react";
import { utils } from "ethers";

const initialState = {
  contracts: {
    QmS3ZHX3Ngeu7CsNQzXDJPWbZuH5iXoPwwm81AKecqn3aS: [
      { address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", signed: false },
      { address: "0x0D79AfBF97a401968836b9D906F3f87b20d45A72", signed: false },
    ],
    Qmc2RnkEFmSGd2BCe8KEYzU477S7T7ck1AYN4ySXVXJSBD: [
      { address: "0xF1616A1b6D8fA07f2e74c7fC681625bfe3e378A4", signed: false },
      { address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", signed: false },
    ],
  },
};

const peristedContracts = {
  contracts: JSON.parse(localStorage.getItem("contracts")),
};
const getInitalState = () =>
  peristedContracts.contracts ? peristedContracts : initialState;

export const Context = React.createContext();

const Store = ({ children }) => {
  const [state, _setState] = useState(getInitalState());

  const getState = () => state;
  const setState = (newState) => {
    _setState({ contracts: newState });
    localStorage.setItem("contracts", JSON.stringify(newState));
  };
  const getCachedContracts = () =>
    JSON.parse(localStorage.getItem("contracts"));

  const addContract = (contractHash, signers) =>
    setState({ ...getCachedContracts(), [contractHash]: signers });

  const setSigningStatus = (keccakedContractHash, signer) => {
    // debugger;
    const id = utils.id;
    const keccak = utils.keccak256;
    const compareHash = (string) => keccak(utils.toUtf8Bytes(string));
    // debugger;
    const contractHash = Object.keys(getState().contracts).filter(
      (key) => compareHash(key) === keccakedContractHash
    );
    const currentContract = getState().contracts[contractHash];
    const cachedContracts = getCachedContracts();
    const newState = {
      ...cachedContracts,
      [contractHash]: currentContract.map((_signer) =>
        _signer.address.toLowerCase() === signer.toLowerCase()
          ? { ..._signer, signed: true }
          : _signer
      ),
    };
    // debugger;
    setState(newState);
  };

  const actions = { addContract, setSigningStatus };

  return (
    <Context.Provider value={[state, actions, setState]}>
      {children}
    </Context.Provider>
  );
};

export default Store;
