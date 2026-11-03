import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RadicalCourierPage } from "@/pages/RadicalCourierPage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RadicalCourierPage />
    </StrictMode>
  );
}