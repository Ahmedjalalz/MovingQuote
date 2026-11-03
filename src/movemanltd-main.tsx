import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MoveManQuotePage } from "@/pages/MoveManQuotePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <MoveManQuotePage />
    </StrictMode>
  );
}
