import React from "react";
import { v4 as uuid4 } from "uuid";

import "./App.css";
import { Home } from "./components/home";
import Header from "./components/header";
import Footer from "./components/footer";

export const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const pKey = queryParams.get("key");
  let coreId = queryParams.get("coreId");
  if (coreId === null) {
    coreId = uuid4();
  }

  if (pKey === null || (typeof pKey === "string" && pKey.trim().length !== 11)) {
    window.location.replace(window.env.CVENT_EVENT_URL);
    return null; // prevent rendering the rest of the app.
  }

  return (
    <div className="App">
      <Header />
      <Home pKey={pKey} coreId={coreId} />
      <Footer />
    </div>
  );
};
