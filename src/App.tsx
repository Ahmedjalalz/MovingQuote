import { useState, useEffect } from "react";
import { Clock, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Reveal } from "@/components/site/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { UnityWasteQuotePage } from "@/pages/UnityWasteQuotePage";
import { AldhouseAndSmithQuotePage } from "@/pages/AldhouseAndSmithQuotePage";
import { FrontlineTransportQuotePage } from "@/pages/FrontlineTransportQuotePage";
import { BudgetSkipsCoventryQuotePage } from "@/pages/BudgetSkipsCoventryQuotePage";

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "WINZ Quotes Available",
    body: "Work and Income Registered Supplier. We prepare official quotes for WINZ assistance.",
    isWinz: true,
  },
  {
    icon: Clock,
    title: "Quick Single-Step Form",
    body: "Fill out the required details in one go, without annoying multi-step wizards.",
  },
  {
    icon: PhoneCall,
    title: "Reviewed by a real person",
    body: "We read every enquiry carefully and reply to confirm details and exact pricing.",
  },
  {
    icon: Sparkles,
    title: "100% Free & No Obligation",
    body: "A free quote request is an enquiry, never a booking. Nothing is booked until you say so.",
  },
];

function checkIsUnityRoute(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  return (
    path.startsWith("/unitywasteremovals") ||
    path.startsWith("/unity") ||
    hash.includes("unitywasteremovals") ||
    hash.includes("unity") ||
    params.get("page") === "unitywasteremovals" ||
    params.get("page") === "unity" ||
    params.get("route") === "unitywasteremovals" ||
    params.get("route") === "unity"
  );
}

function checkIsAldhouseRoute(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  return (
    path.startsWith("/aldhouseandsmith") ||
    path.startsWith("/aldhouse") ||
    hash.includes("aldhouseandsmith") ||
    hash.includes("aldhouse") ||
    params.get("page") === "aldhouseandsmith" ||
    params.get("page") === "aldhouse" ||
    params.get("route") === "aldhouseandsmith" ||
    params.get("route") === "aldhouse"
  );
}

function checkIsBudgetSkipsRoute(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  return (
    path.startsWith("/budgetskipscoventry") ||
    path.startsWith("/budgetskips") ||
    path.startsWith("/skiphireincoventry") ||
    hash.includes("budgetskipscoventry") ||
    hash.includes("budgetskips") ||
    hash.includes("skiphireincoventry") ||
    params.get("page") === "budgetskipscoventry" ||
    params.get("page") === "budgetskips" ||
    params.get("page") === "skiphireincoventry" ||
    params.get("route") === "budgetskipscoventry" ||
    params.get("route") === "budgetskips" ||
    params.get("route") === "skiphireincoventry"
  );
}

function checkIsFrontlineRoute(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search.toLowerCase());

  return (
    path.startsWith("/frontlinetransport") ||
    path.startsWith("/frontline") ||
    hash.includes("frontlinetransport") ||
    hash.includes("frontline") ||
    params.get("page") === "frontlinetransport" ||
    params.get("page") === "frontline" ||
    params.get("route") === "frontlinetransport" ||
    params.get("route") === "frontline"
  );
}

export function App() {
  const [isUnity, setIsUnity] = useState(checkIsUnityRoute);
  const [isAldhouse, setIsAldhouse] = useState(checkIsAldhouseRoute);
  const [isFrontline, setIsFrontline] = useState(checkIsFrontlineRoute);
  const [isBudgetSkips, setIsBudgetSkips] = useState(checkIsBudgetSkipsRoute);
  const [activeMode, setActiveMode] = useState<"moving" | "junk">("moving");

  useEffect(() => {
    const handleLocationChange = () => {
      setIsUnity(checkIsUnityRoute());
      setIsAldhouse(checkIsAldhouseRoute());
      setIsFrontline(checkIsFrontlineRoute());
      setIsBudgetSkips(checkIsBudgetSkipsRoute());
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type")?.toLowerCase() || "";
      const service = params.get("service")?.toLowerCase() || "";
      if (
        type === "junk" ||
        service.includes("junk") ||
        type.includes("clearance") ||
        service.includes("clearance")
      ) {
        setActiveMode("junk");
      }
    } catch {
      // fallback
    }
  }, []);

  const handleModeChange = (newMode: "moving" | "junk") => {
    setActiveMode(newMode);
    try {
      const url = new URL(window.location.href);
      if (newMode === "junk") {
        url.searchParams.set("type", "junk");
      } else {
        url.searchParams.delete("type");
        url.searchParams.delete("service");
      }
      window.history.replaceState({}, "", url.toString());
    } catch {
      // fallback
    }
  };

  // Route: /budgetskipscoventry
  if (isBudgetSkips) {
    return <BudgetSkipsCoventryQuotePage />;
  }

  // Route: /frontlinetransport
  if (isFrontline) {
    return <FrontlineTransportQuotePage />;
  }

  // Route: /aldhouseandsmith
  if (isAldhouse) {
    return <AldhouseAndSmithQuotePage />;
  }

  // Route: /unitywasteremovals
  if (isUnity) {
    return <UnityWasteQuotePage />;
  }

  // Default Route: Paul Movers Quote Page
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-brand selection:text-brand-foreground">
      <SiteHeader />

      <main id="main" className="flex-1">
        <section id="quote-section" className="bg-background pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
              <Reveal>
                <QuoteWizard
                  key={activeMode}
                  mode={activeMode}
                  onModeChange={handleModeChange}
                  showModeSwitcher={true}
                  heading={
                    activeMode === "moving"
                      ? "Get a Free Moving Quote"
                      : "Get a Free Junk Removal Quote"
                  }
                  subheading={
                    activeMode === "moving"
                      ? "Select your moving service, move size and locations. We'll review your details and prepare an accurate, fixed-price quote with zero obligation."
                      : "Tell us about your property clearance or junk removal in Auckland for an accurate fixed price."
                  }
                />
              </Reveal>

              <Reveal delay={120} className="lg:pt-4">
                <div id="assurances-section">
                  <ul className="grid gap-4">
                    {ASSURANCES.map(({ icon: Icon, title, body, isWinz }) => (
                      <li
                        key={title}
                        className="rounded-[1.75rem] border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                      >
                        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-tint">
                          <Icon className="size-5 text-brand" strokeWidth={1.5} />
                        </span>
                        <h2 className="mt-4 font-display text-base font-semibold tracking-tight flex items-center gap-2">
                          {title}
                          {isWinz && (
                            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                          )}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{body}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-[1.75rem] bg-ink p-7 text-ink-foreground shadow-lift">
                    <h2 className="font-display text-lg font-semibold tracking-tight">
                      Prefer to talk it through?
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-foreground/85">
                      Some jobs are easier explained out loud — awkward access, tight timeframes, unusual
                      items. Give us a call and we'll work it out.
                    </p>
                    <a
                      href="tel:+64211009045"
                      className="mt-5 inline-flex border-b border-accent pb-1 text-sm font-semibold hover:text-accent transition-colors"
                    >
                      021 100 9045
                    </a>
                  </div>

                  {/* Route Link to Budget Skips Coventry */}
                  <div className="mt-4 p-4 rounded-2xl border border-[#ec6c05]/40 bg-orange-50/70 text-xs text-foreground/85 flex items-center justify-between">
                    <span>Looking for Coventry &amp; Warwickshire Skip Hire?</span>
                    <a
                      href="/budgetskipscoventry"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", "/budgetskipscoventry");
                        setIsBudgetSkips(true);
                        setIsFrontline(false);
                        setIsAldhouse(false);
                        setIsUnity(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="font-bold text-[#ec6c05] hover:underline flex items-center gap-1"
                    >
                      <span>Budget Skips Coventry →</span>
                    </a>
                  </div>

                  {/* Route Link to Frontline Transport */}
                  <div className="mt-4 p-4 rounded-2xl border border-[#20c200]/40 bg-[#ecf5eb]/60 text-xs text-foreground/85 flex items-center justify-between">
                    <span>Looking for West Midlands Removals &amp; Courier?</span>
                    <a
                      href="/frontlinetransport"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", "/frontlinetransport");
                        setIsFrontline(true);
                        setIsAldhouse(false);
                        setIsUnity(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="font-bold text-[#147a00] hover:underline flex items-center gap-1"
                    >
                      <span>Frontline Transport →</span>
                    </a>
                  </div>

                  {/* Route Link to Aldhouse & Smith */}
                  <div className="mt-4 p-4 rounded-2xl border border-border/80 bg-secondary/50 text-xs text-foreground/80 flex items-center justify-between">
                    <span>Looking for Cambridge Removals &amp; Storage?</span>
                    <a
                      href="/aldhouseandsmith"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", "/aldhouseandsmith");
                        setIsAldhouse(true);
                        setIsUnity(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      <span>Aldhouse &amp; Smith →</span>
                    </a>
                  </div>

                  {/* Route Link to Unity Waste */}
                  <div className="mt-3 p-4 rounded-2xl border border-border/80 bg-secondary/50 text-xs text-foreground/80 flex items-center justify-between">
                    <span>Looking for UK Waste Clearances?</span>
                    <a
                      href="/unitywasteremovals"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", "/unitywasteremovals");
                        setIsUnity(true);
                        setIsAldhouse(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      <span>Unity Waste Removals →</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
