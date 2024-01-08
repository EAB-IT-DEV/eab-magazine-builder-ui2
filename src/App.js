import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuid4 } from "uuid";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";

export const App = () => {
  const [loading, setLoading] = useState(true);

  const urlState = useMemo(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pKey = queryParams.get("key");
    const coreId = queryParams.get("coreid") || uuid4();
    console.log("Inside urlState: ", pKey, coreId);
    return { pKey, coreId };
  }, []);

  useEffect(() => {
    if (
      urlState.pKey === null ||
      (typeof urlState.pKey === "string" && urlState.pKey.trim().length !== 11)
    ) {
      window.location.replace(window.env.CVENT_EVENT_URL);
      return;
    }
    setLoading(false);
  }, [urlState]);

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="App">
      <HomePage pKey={urlState.pKey} coreId={urlState.coreId} />
    </div>
  );
};
