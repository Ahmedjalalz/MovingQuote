import { useState } from "react";
import {
  Phone,
  Clock,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  Calculator,
  Truck,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type RadicalSubPage =
  | "home"
  | "services"
  | "quote"
  | "about"
  | "drivers"
  | "customers"
  | "contact";

interface RadicalCourierHeaderProps {
  activePage: RadicalSubPage;
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierHeader({
  activePage,
  onNavigate,
}: RadicalCourierHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: RadicalSubPage; badge?: string }[] = [
    { label: "Home", page: "home" },
    { label: "Our Services", page: "services" },
    { label: "Get a Quote", page: "quote", badge: "Instant" },
    { label: "About Us", page: "about" },
    { label: "Drivers", page: "drivers" },
    { label: "Customer Portal", page: "customers" },
    { label: "Contact Us", page: "contact" },
  ];

  const handleNavClick = (page: RadicalSubPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar - Industrial / Commercial British Courier style */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-bold text-sky-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              24/7 Same-Day Express
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Dedicated Driver Direct to Door — No Subcontracting
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Coventry, Warwickshire & UK Nationwide
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto sm:ml-0">
            <span className="hidden lg:inline text-slate-400">Need urgent collection?</span>
            <a
              href="tel:02475122465"
              className="inline-flex items-center gap-1.5 text-white font-extrabold hover:text-sky-300 transition-colors bg-sky-600/30 px-2.5 py-0.5 rounded border border-sky-500/40 text-xs tracking-wide"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              <span>024 7512 2465</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 text-left group"
            aria-label="Radical Courier Service Home"
          >
            <img
              src="/radical-logo.svg"
              alt="Radical Courier Service Ltd"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold rounded-lg transition-all relative flex items-center gap-1.5",
                    isActive
                      ? "text-[#0284C7] bg-sky-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.2 rounded",
                        isActive
                          ? "bg-[#0284C7] text-white"
                          : "bg-sky-100 text-[#0284C7]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("quote")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold shadow-xs transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Online Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left",
                    isActive
                      ? "bg-sky-50 text-[#0284C7] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0284C7] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick("quote")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0284C7] text-white font-bold text-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>Get an Online Quote</span>
            </button>

            <a
              href="tel:02475122465"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-900 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call 024 7512 2465 (24/7)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}