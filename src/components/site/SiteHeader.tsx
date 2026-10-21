import { useEffect, useState } from "react";
import { ArrowRight, Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const NAV = [
  { href: "#quote-section", label: "Get a Quote", active: true },
  { href: "#assurances-section", label: "Why Us" },
  { href: "tel:+64211009045", label: "021 100 9045", isPhone: true },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page pt-3 md:pt-5">
        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-full px-3 py-2.5 transition-all duration-500 md:px-4",
            scrolled || open
              ? "border border-border/70 bg-card/85 shadow-soft backdrop-blur-2xl"
              : "border border-border/40 bg-card/60 backdrop-blur-md",
          )}
        >
          <a
            href="/"
            className="group flex min-w-0 items-center pl-1"
            aria-label="Paul Movers home"
          >
            <Logo tone="dark" />
          </a>

          <nav
            className="hidden items-center gap-1 rounded-full p-1 bg-secondary lg:flex"
            aria-label="Main"
          >
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                  "active" in item && item.active
                    ? "bg-card text-brand shadow-soft"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {"isPhone" in item && item.isPhone && (
                  <Phone className="inline-block mr-1.5 size-3.5 text-accent" />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Quick mobile call button */}
            <a
              href="tel:+64211009045"
              className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground md:hidden shadow-xs"
              aria-label="Call Paul Movers"
            >
              <Phone className="size-4" />
            </a>

            <a
              href="tel:+64211009045"
              className="group hidden items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 md:inline-flex btn-brand"
            >
              <span>021 100 9045</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="mt-2 rounded-3xl border border-border bg-card p-6 shadow-lift animate-in fade-in zoom-in-95 duration-200 lg:hidden">
            <nav className="flex flex-col gap-2">
              <a
                href="#quote-section"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-secondary/80 px-4 py-3 text-base font-semibold text-brand"
              >
                Get a Free Quote
              </a>
              <a
                href="#assurances-section"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                Why Choose Paul Movers
              </a>
              <div className="pt-2">
                <a
                  href="tel:+64211009045"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground"
                >
                  <Phone className="size-4" />
                  <span>Call 021 100 9045</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
