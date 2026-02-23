import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "../common/ThemeProvider";

import "./index.css";
import { App } from "./App";
import { Router } from "../Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
