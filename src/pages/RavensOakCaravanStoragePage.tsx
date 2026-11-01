import { useState, useEffect } from "react";
import { RavensOakSiteHeader } from "@/components/ravensoake/RavensOakSiteHeader";
import { RavensOakSiteFooter } from "@/components/ravensoake/RavensOakSiteFooter";
import { RavensOakHomePage } from "@/pages/RavensOakHomePage";
import { RavensOakQuotePage } from "@/pages/RavensOakQuotePage";
import { StorageCategory } from "@/components/ravensoake/RavensOakQuoteWizard";
import { Toaster } from "@/components/ui/sonner";

export type RavensOakSubPage = "home" | "quote" | "facilities" | "pricing" | "services" | "contact";

function detectInitialSubPage(): RavensOakSubPage {
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

  if (hash.includes("facilities") || params.get("page") === "facilities") return "facilities";
  if (hash.includes("pricing") || params.get("page") === "pricing") return "pricing";
  if (hash.includes("services") || params.get("page") === "services") return "services";
  if (hash.includes("contact") || params.get("page") === "contact") return "contact";

  return "home";
}

export function RavensOakCaravanStoragePage() {
  const [activePage, setActivePage] = useState<RavensOakSubPage>(detectInitialSubPage);
  const [selectedCategory, setSelectedCategory] = useState<StorageCategory>("caravan");

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(detectInitialSubPage());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (page: RavensOakSubPage) => {
    setActivePage(page);

    try {
      const url = new URL(window.location.href);
      if (page === "quote") {
        url.pathname = "/ravensoakecaravanstorage/quote";
        url.searchParams.delete("page");
        window.history.pushState({}, "", url.toString());
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (page === "home") {
        url.pathname = "/ravensoakecaravanstorage";
        url.searchParams.delete("page");
        window.history.pushState({}, "", url.toString());
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Anchor section on home page
        url.pathname = "/ravensoakecaravanstorage";
        url.hash = page;
        window.history.pushState({}, "", url.toString());

        const el = document.getElementById(page);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch {
      // fallback
    }
  };

  const handleSelectCategory = (cat: StorageCategory) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-[#509D25] selection:text-white font-sans">
      <RavensOakSiteHeader activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activePage === "quote" ? (
          <RavensOakQuotePage
            initialCategory={selectedCategory}
            onNavigate={handleNavigate}
          />
        ) : (
          <RavensOakHomePage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </main>

      <RavensOakSiteFooter onNavigate={handleNavigate} />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default RavensOakCaravanStoragePage;
