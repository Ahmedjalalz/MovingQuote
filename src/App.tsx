import { useState, useEffect } from "react";
import { Clock, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Reveal } from "@/components/site/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { UnityWasteQuotePage } from "@/pages/UnityWasteQuotePage";

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

export function App() {
  const [pathname, setPathname] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname.toLowerCase();
    }
    return "/";
  });

  const [activeMode, setActiveMode] = useState<"moving" | "junk">("moving");

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname.toLowerCase());
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
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

  // Route: /unitywasteremovals
  if (pathname.startsWith("/unitywasteremovals")) {
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

                  {/* Route Link to Unity Waste */}
                  <div className="mt-4 p-4 rounded-2xl border border-border/80 bg-secondary/50 text-xs text-foreground/80 flex items-center justify-between">
                    <span>Looking for UK Waste Clearances?</span>
                    <a
                      href="/unitywasteremovals"
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
