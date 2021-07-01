import { useState } from "react";

export const useLoadingIndicator = () => {
  const [loadingSigner, _setLoadingSigner] = useState([]);

  const setLoadingSigner = (contractHash, userAddress) => {
    _setLoadingSigner([contractHash, userAddress]);
  };
  return [loadingSigner, setLoadingSigner];
};
