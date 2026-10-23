import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AldhouseAndSmithQuotePage } from "@/pages/AldhouseAndSmithQuotePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AldhouseAndSmithQuotePage />
    </StrictMode>
  );
}
