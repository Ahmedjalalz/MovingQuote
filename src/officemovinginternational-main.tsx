import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OfficeMovingInternationalPage } from "@/pages/OfficeMovingInternationalPage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <OfficeMovingInternationalPage />
    </StrictMode>
  );
}
