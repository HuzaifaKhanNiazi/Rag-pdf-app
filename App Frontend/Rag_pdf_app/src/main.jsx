import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App.jsx";
import "../src/components css/sidebar.css";
import "../src/components css/container.css";
createRoot(document.getElementById("root")).render(
  <>
    <SpeedInsights />
    <App />
  </>,
);
