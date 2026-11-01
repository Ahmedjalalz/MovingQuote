import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RavensOakCaravanStoragePage } from "@/pages/RavensOakCaravanStoragePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RavensOakCaravanStoragePage />
    </StrictMode>
  );
}
