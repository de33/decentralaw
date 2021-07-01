import React, { useState, useContext } from "react";
import { Context } from "../Store";
import useContract from "../hooks/useContract";
import Button from "react-bootstrap/Button";
import { useEventWatcher } from "../hooks/useEventWatcher";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";

const Explorer = () => {
  const [state] = useContext(Context);
  const [contract, userAddress] = useContract();
  const [loadingSigner, setLoadingSigner] = useLoadingIndicator();
  useEventWatcher("Signed");

  console.log("state**", state);

  const signContract = (evt, contractHash, _userAddress) => {
    evt.preventDefault();

    contract.sign(contractHash);
    setLoadingSigner(contractHash, _userAddress);
  };
  const displaySigner = (address) => {
    return userAddress && address.toLowerCase() === userAddress.toLowerCase();
  };
  const displayLoadingIndicator = (address, hash) => {
    return (
      loadingSigner[0] === hash &&
      loadingSigner[1].toLowerCase() === address.toLowerCase()
    );
  };

  return (
    <div>
      <h1>Explore Deployed Contracts & Signed Status.</h1>
      {state.contracts &&
        Object.keys(state.contracts).map((contractHash) => {
          return (
            <div key={contractHash}>
              <h2>
                Contract hash:{" "}
                <a href={`https://gateway.ipfs.io/ipfs/` + contractHash}>
                  {contractHash}
                </a>
              </h2>
              {state.contracts[contractHash].map((signatory, _idx) =>
                signatory.signed ? (
                  <p key={_idx}>✅ Already signed by: {signatory.address}</p>
                ) : loadingSigner.length &&
                  displayLoadingIndicator(signatory.address, contractHash) ? (
                  <div key={_idx}>
                    <p>
                      📝📝{" "}
                      <b>Signature being processed for: {signatory.address}</b>
                    </p>
                  </div>
                ) : (
                  <div key={_idx}>
                    <p>⌛ Awaiting signature from: {signatory.address}</p>
                    {userAddress && displaySigner(signatory.address) && (
                      <Button
                        onClick={(evt) =>
                          signContract(evt, contractHash, userAddress)
                        }
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
