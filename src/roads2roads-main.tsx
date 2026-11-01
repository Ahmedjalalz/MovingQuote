import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Roads2RoadsQuotePage } from "@/pages/Roads2RoadsQuotePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Roads2RoadsQuotePage />
    </StrictMode>
  );
}
