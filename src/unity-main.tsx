import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UnityWasteQuotePage } from "@/pages/UnityWasteQuotePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <UnityWasteQuotePage />
    </StrictMode>
  );
}
