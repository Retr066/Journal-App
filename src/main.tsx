import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import JournalApp from "./JournalApp";
import "sweetalert2/src/sweetalert2.scss";
ReactDOM.render(
  <React.StrictMode>
    <JournalApp />
  </React.StrictMode>,
  document.getElementById("root")
);
