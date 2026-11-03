import { useState, useEffect } from "react";
import {
  RadicalCourierHeader,
  RadicalSubPage,
} from "@/components/radicalcourier/RadicalCourierHeader";
import { RadicalCourierFooter } from "@/components/radicalcourier/RadicalCourierFooter";
import { RadicalCourierQuoteWizard } from "@/components/radicalcourier/RadicalCourierQuoteWizard";
import { RadicalCourierHomePage } from "@/pages/RadicalCourierHomePage";
import { RadicalCourierServicesPage } from "@/pages/RadicalCourierServicesPage";
import { RadicalCourierAboutPage } from "@/pages/RadicalCourierAboutPage";
import { RadicalCourierDriversPage } from "@/pages/RadicalCourierDriversPage";
import { RadicalCourierCustomersPage } from "@/pages/RadicalCourierCustomersPage";
import { RadicalCourierContactPage } from "@/pages/RadicalCourierContactPage";
import { Toaster } from "@/components/ui/sonner";

function detectInitialSubPage(): RadicalSubPage {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  // Check quote
  if (
    path.includes("/quote") ||
    path.includes("/radquote") ||
    hash.includes("quote") ||
    params.get("page") === "quote" ||
    params.get("subpage") === "quote" ||
    params.get("route") === "quote"
  ) {
    return "quote";
  }

  // Check services
  if (
    path.includes("/services") ||
    hash.includes("services") ||
    params.get("page") === "services" ||
    params.get("subpage") === "services"
  ) {
    return "services";
  }

  // Check about
  if (
    path.includes("/about") ||
    hash.includes("about") ||
    params.get("page") === "about" ||
    params.get("subpage") === "about"
  ) {
    return "about";
  }

  // Check drivers
  if (
    path.includes("/drivers") ||
    path.includes("/driver") ||
    hash.includes("driver") ||
    params.get("page") === "drivers" ||
    params.get("subpage") === "drivers"
  ) {
    return "drivers";
  }

  // Check customers
  if (
    path.includes("/customers") ||
    path.includes("/customer") ||
    path.includes("/clogin") ||
    hash.includes("customer") ||
    params.get("page") === "customers" ||
    params.get("subpage") === "customers"
  ) {
    return "customers";
  }

  // Check contact
  if (
    path.includes("/contact") ||
    hash.includes("contact") ||
    params.get("page") === "contact" ||
    params.get("subpage") === "contact"
  ) {
    return "contact";
  }

  return "home";
}

export function RadicalCourierPage() {
  const [activePage, setActivePage] = useState<RadicalSubPage>(detectInitialSubPage);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(detectInitialSubPage());
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  const handleNavigate = (page: RadicalSubPage) => {
    setActivePage(page);

    try {
      const url = new URL(window.location.href);

      // Determine clean path or query
      const baseRoot = window.location.pathname.startsWith("/radicalcourier")
        ? "/radicalcourier"
        : "";

      if (page === "home") {
        url.pathname = baseRoot || "/radicalcourier";
        url.searchParams.delete("page");
        url.searchParams.delete("subpage");
        url.hash = "";
      } else {
        if (baseRoot) {
          url.pathname = `${baseRoot}/${page}`;
        } else {
          url.searchParams.set("page", page);
        }
        url.hash = "";
      }

      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-[#0284C7] selection:text-white font-sans w-full">
      <RadicalCourierHeader activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activePage === "home" && <RadicalCourierHomePage onNavigate={handleNavigate} />}

        {activePage === "services" && (
          <RadicalCourierServicesPage onNavigate={handleNavigate} />
        )}

        {activePage === "quote" && (
          <div className="py-10 px-4 sm:px-6">
            <RadicalCourierQuoteWizard />
          </div>
        )}

        {activePage === "about" && (
          <RadicalCourierAboutPage onNavigate={handleNavigate} />
        )}

        {activePage === "drivers" && (
          <RadicalCourierDriversPage onNavigate={handleNavigate} />
        )}

        {activePage === "customers" && (
          <RadicalCourierCustomersPage onNavigate={handleNavigate} />
        )}

        {activePage === "contact" && (
          <RadicalCourierContactPage onNavigate={handleNavigate} />
        )}
      </main>

      <RadicalCourierFooter onNavigate={handleNavigate} />
      <Toaster position="top-right" richColors />
    </div>
  );
}