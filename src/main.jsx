// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    import("./serviceWorkerRegistration.js")
      .then(({ register }) => register())
      .catch(() => {
        // Service worker is optional; ignore registration failures.
      });
  });
}
