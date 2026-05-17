// src/main.jsx
// Entry point — renders the app into the #root div in index.html.
// Import the CSS first so Tailwind loads.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
