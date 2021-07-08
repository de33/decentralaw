import React, { useState } from "react";
import { utils } from "ethers";

const initialState = {
  contracts: {
    QmS3ZHX3Ngeu7CsNQzXDJPWbZuH5iXoPwwm81AKecqn3aS: [
      { address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", signed: false },
      { address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", signed: false },
    ],
    QmNvhVFvpshNVTBg7ZR826UiAEGxq3ijqMDWuohFDWPF9P: [
      { address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", signed: false },
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
  const getCachedContracts = () => {
    const contracts = JSON.parse(localStorage.getItem("contracts"));
    return contracts || initialState.contracts;
  };

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
