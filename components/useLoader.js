import React from "react";

export default function useLoader(initialState) {
  const [loader, setLoader] = React.useState(() =>
    initialState === undefined ? false : initialState
  );

  function toggleLoader() {
    setLoader(prevState => !prevState);
  }

  function setLoaderToCustomState(state) {
    setLoader(state);
  }

  return [loader, toggleLoader, setLoaderToCustomState];
}
