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

  const listener = async (...args) => {
    // console.log(args);
    const pastSignEvents = await getPastEvents();
    const currentEventCount = parseInt(localStorage.getItem("eventCounter"));
    const newEventCount = pastSignEvents.length;

    if (currentEventCount !== newEventCount) {
      const recentEvents = pastSignEvents.slice(newEventCount - 2);
      recentEvents.forEach((log) => {
        // debugger;
        const address = log.args.contractSigner;
        const keccakedHash = log.args.ipfsHash.hash;

        actions.setSigningStatus(keccakedHash, address);
      });
      localStorage.setItem("eventCounter", newEventCount);
    }
  };

  contract.on(eventName, listener);
};
