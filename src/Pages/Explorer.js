import React, { useState, useContext } from "react";
import Contract from "./Contract";
import { Context } from "../Store";
import useContract from "../hooks/useContract";
import Button from "react-bootstrap/Button";
import { useEventWatcher } from "../hooks/useEventWatcher";

const daState = {
  contracts: {
    QmS3ZHX3Ngeu7CsNQzXDJPWbZuH5iXoPwwm81AKecqn3aS: [
      { address: "0xF1616A1b6D8fA07f2e74c7fC681625bfe3e378A4", signed: true },
      { address: "0x0D79AfBF97a401968836b9D906F3f87b20d45A72", signed: false },
    ],
    Qmc2RnkEFmSGd2BCe8KEYzU477S7T7ck1AYN4ySXVXJSBD: [
      { address: "0xF1616A1b6D8fA07f2e74c7fC681625bfe3e378A4", signed: false },
      { address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", signed: false },
    ],
  },
};

const daStateString = JSON.stringify(daState);

const Explorer = () => {
  const [state] = useContext(Context);
  const [contract] = useContract();
  useEventWatcher("Signed");

  console.log("state**", state);
  // console.log("state**", JSON.stringify(state));

  const events = contract.queryFilter("Signed");
  // console.log("==============");
  // console.log("events: ", events);
  // console.log("==============");

  // console.log("Object.keys(daState.contracts)", Object.keys(daState.contracts));

  const signContract = (evt, contractHash) => {
    evt.preventDefault();
    contract.sign(contractHash);
  };
  const displaySigner = (address) => {
    const selectedAddress = window.ethereum.selectedAddress;
    return address.toLowerCase() === selectedAddress.toLowerCase();
  };

  return (
    <div>
      {daStateString}
      <h1>Explore Deployed Contracts & Signed Status.</h1>
      {Object.keys(daState.contracts).map((contractHash) => {
        return (
          <div>
            <h2>
              Contract hash:{" "}
              <a href={`https://gateway.ipfs.io/ipfs/` + contractHash}>
                {contractHash}
              </a>
            </h2>
            {daState.contracts[contractHash].map((signatory) =>
              signatory.signed ? (
                <p> Already signed by: {signatory.address}</p>
              ) : (
                <div>
                  <p>Awaiting signature from: {signatory.address}</p>
                  {displaySigner(signatory.address) && (
                    <Button
                      onClick={(evt) => signContract(evt, contractHash)}
                      variant="primary"
                    >
                      Sign
                    </Button>
                  )}
                </div>
              )
            )}
            {/* <p>{JSON.stringify(daState.contracts[contract])}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Explorer;
