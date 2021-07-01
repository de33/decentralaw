import React, { useState, useContext } from "react";
import { Context } from "../Store";
import useContract from "../hooks/useContract";
import Button from "react-bootstrap/Button";
import { useEventWatcher } from "../hooks/useEventWatcher";

const Explorer = () => {
  const [state] = useContext(Context);
  const [contract] = useContract();
  useEventWatcher("Signed");

  console.log("state**", state);

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
      <h1>Explore Deployed Contracts & Signed Status.</h1>
      {state.contracts &&
        Object.keys(state.contracts).map((contractHash) => {
          return (
            <div>
              <h2>
                Contract hash:{" "}
                <a href={`https://gateway.ipfs.io/ipfs/` + contractHash}>
                  {contractHash}
                </a>
              </h2>
              {state.contracts[contractHash].map((signatory) =>
                signatory.signed ? (
                  <p>✅ Already signed by: {signatory.address}</p>
                ) : (
                  <div>
                    <p>⌛ Awaiting signature from: {signatory.address}</p>
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
            </div>
          );
        })}
    </div>
  );
};

export default Explorer;
