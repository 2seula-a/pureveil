import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/Header.css";
import "./styles/Hero.css";
import "./styles/RitualStrip.css";
import "./styles/Shop.css";
import "./styles/Editorial.css";
import "./styles/Footer.css";
import "./styles/Cart.css";
import "./styles/Toast.css";

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
