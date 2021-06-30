import React, { useState } from "react";
import { utils } from "ethers";

const initialState = {
  contracts: {
    QmS3ZHX3Ngeu7CsNQzXDJPWbZuH5iXoPwwm81AKecqn3aS: [
      { address: "0xF1616A1b6D8fA07f2e74c7fC681625bfe3e378A4", signed: false },
      { address: "0x0D79AfBF97a401968836b9D906F3f87b20d45A72", signed: false },
    ],
    Qmc2RnkEFmSGd2BCe8KEYzU477S7T7ck1AYN4ySXVXJSBD: [
      { address: "0xF1616A1b6D8fA07f2e74c7fC681625bfe3e378A4", signed: false },
      { address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", signed: false },
    ],
  },
};

const peristedContracts = localStorage.getItem("contracts");
export const Context = React.createContext();

const Store = ({ children }) => {
  const [state, _setState] = useState(peristedContracts || initialState);

  const setState = (newState) => {
    _setState(newState);
    localStorage.setItem("contracts", JSON.stringify(newState));
  };

  const addContract = (contractHash, signers) =>
    setState({
      ...state,
      contracts: { ...state.contracts, [contractHash]: signers },
    });

  const setSigningStatus = (keccakedContractHash, signer) => {
    // debugger;
    const id = utils.id;
    const keccak = utils.keccak256;
    const compareHash = (string) => keccak(utils.toUtf8Bytes(string));
    // debugger;
    const contractHash = Object.keys(state.contracts).filter(
      (key) => compareHash(key) === keccakedContractHash
    );
    const currentContract = state.contracts[contractHash];
    // debugger;
    setState({
      ...state,
      contracts: {
        ...state.contracts,
        [contractHash]: currentContract.map((_signer) =>
          _signer.address.toLowerCase() === signer.toLowerCase()
            ? { ..._signer, signed: true }
            : _signer
        ),
      },
    });
  };

  const actions = { addContract, setSigningStatus };

  return (
    <Context.Provider value={[state, actions, setState]}>
      {children}
    </Context.Provider>
  );
};

export default Store;
