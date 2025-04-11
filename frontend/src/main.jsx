import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/recipe-tile.css";
import "./styles/main-page.css";
import "./styles/header.css";
import "./styles/searchbar.css";
import "./styles/aside-menu.css";
import "./styles/recipe-page.css";
import "./styles/add-recipe.css";
import "./styles/recepie-container.css";
import "./styles/modal.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
