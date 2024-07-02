import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FavouritesProvider } from "./FavouritesContext";

ReactDOM.render(
  <FavouritesProvider>
    <App />
  </FavouritesProvider>,
  document.getElementById("root")
);
