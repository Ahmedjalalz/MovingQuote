import { useState, useEffect } from "react";
import { OmiSiteHeader, OmiSubPage } from "@/components/omi/OmiSiteHeader";
import { OmiSiteFooter } from "@/components/omi/OmiSiteFooter";
import { OmiHomePage } from "@/pages/OmiHomePage";
import { OmiQuotePage } from "@/pages/OmiQuotePage";
import { OmiMode, OmiQuotePrefill } from "@/components/omi/OmiQuoteWizard";
import { Toaster } from "@/components/ui/sonner";

function detectInitialSubPage(): OmiSubPage {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  if (
    path.includes("/quote") ||
    hash.includes("quote") ||
    params.get("page") === "quote" ||
    params.get("subpage") === "quote"
  ) {
    return "quote";
  }

  if (hash.includes("services") || hash.includes("relocation") || params.get("page") === "relocation") {
    return "relocation";
  }
  if (hash.includes("clearance") || params.get("page") === "clearance") return "clearance";
  if (hash.includes("storage") || params.get("page") === "storage") return "storage";
  if (hash.includes("crates") || params.get("page") === "crates") return "crates";
  if (hash.includes("why-us") || params.get("page") === "why-us") return "why-us";
  if (hash.includes("contact") || params.get("page") === "contact") return "contact";

  return "home";
}

function detectInitialServiceMode(): OmiMode {
  if (typeof window === "undefined") return "relocation";
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  const serviceParam = (params.get("service") || params.get("mode") || "").toLowerCase();
  if (serviceParam.includes("clearance") || hash.includes("clearance")) return "clearance";
  if (serviceParam.includes("storage") || hash.includes("storage")) return "storage";
  if (serviceParam.includes("crate") || hash.includes("crates")) return "crates";

  return "relocation";
}

export function OfficeMovingInternationalPage() {
  const [activePage, setActivePage] = useState<OmiSubPage>(detectInitialSubPage);
  const [selectedServiceMode, setSelectedServiceMode] = useState<OmiMode>(detectInitialServiceMode);
  const [quotePrefill, setQuotePrefill] = useState<OmiQuotePrefill | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(detectInitialSubPage());
      setSelectedServiceMode(detectInitialServiceMode());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (page: OmiSubPage) => {
    setActivePage(page);

    try {
      const url = new URL(window.location.href);

      // Determine base route prefix
      const currentPath = window.location.pathname.toLowerCase();
      const basePath = currentPath.startsWith("/officemovinginternational")
        ? "/officemovinginternational"
        : "/officemovinginternational";

      if (page === "quote") {
        url.pathname = `${basePath}/quote`;
        url.hash = "";
        url.searchParams.delete("page");
        window.history.pushState({}, "", url.toString());
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (page === "home") {
        url.pathname = basePath;
        url.hash = "";
        url.searchParams.delete("page");
        window.history.pushState({}, "", url.toString());
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Subpage navigation - either scroll to section on homepage or set section anchor
        url.pathname = basePath;
        url.hash = page === "relocation" ? "services" : page;
        window.history.pushState({}, "", url.toString());

        const targetId =
          page === "relocation" || page === "clearance" || page === "storage" || page === "crates"
            ? "services"
            : page;

        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 50);
      }
    } catch {
      // fallback
    }
  };

  const handleSelectServiceMode = (mode: OmiMode) => {
    setSelectedServiceMode(mode);
  };

  const handleLaunchQuoteWithPrefill = (prefillData: OmiQuotePrefill) => {
    if (prefillData.serviceMode) setSelectedServiceMode(prefillData.serviceMode);
    setQuotePrefill(prefillData);
    handleNavigate("quote");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-[#F57619] selection:text-white font-sans">
      <OmiSiteHeader activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activePage === "quote" ? (
          <OmiQuotePage
            initialMode={selectedServiceMode}
            prefill={quotePrefill}
            onNavigateHome={() => handleNavigate("home")}
            onNavigate={handleNavigate}
          />
        ) : (
          <OmiHomePage
            onNavigate={handleNavigate}
            onSelectServiceMode={handleSelectServiceMode}
            onLaunchQuoteWithPrefill={handleLaunchQuoteWithPrefill}
          />
        )}
      </main>

      <OmiSiteFooter onNavigate={handleNavigate} />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
