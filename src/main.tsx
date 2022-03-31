import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";

const container: Element = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

