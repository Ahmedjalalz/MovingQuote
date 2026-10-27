import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FrontlineTransportQuotePage } from "@/pages/FrontlineTransportQuotePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <FrontlineTransportQuotePage />
    </StrictMode>
  );
}
