import { useContext, useEffect } from "react";
import { utils } from "ethers";
import { Context } from "../Store";
import useContract from "./useContract";

export const useEventWatcher = (eventName) => {
  const [state, actions] = useContext(Context);
  const [contract] = useContract();

  const getPastEvents = async () => {
    const pastEvents = await contract.queryFilter(eventName);
    return pastEvents;
  };
  //   const pastSignEvents = contract.queryFilter(eventName);
  // useEffect(() => {

  // })
  const listener = async (...args) => {
    console.log(args);
    const decoder = new utils.AbiCoder();
    const pastSignEvents = await getPastEvents();
    console.log(pastSignEvents);
    // debugger;
    const [[keccakedHash, address]] = pastSignEvents.map((log) => {
      const _address = log.args.contractSigner;
      const _keccakedHash = log.args.ipfsHash.hash;

      return [_keccakedHash, _address];
    });

    // console.log(hopefulMapping);
    // debugger;
    actions.setSigningStatus(keccakedHash, address);
  };

  contract.on(eventName, listener);
};
