import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BudgetSkipsCoventryQuotePage } from "@/pages/BudgetSkipsCoventryQuotePage";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BudgetSkipsCoventryQuotePage />
    </StrictMode>
  );
}
