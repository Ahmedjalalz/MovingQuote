import { useState } from "react";
import {
  Phone,
  Clock,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  Calculator,
  UserCheck,
  Truck,
  Sparkles,
  HelpCircle,
  FileText,
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
    { label: "Services", page: "services" },
    { label: "Online Quote", page: "quote", badge: "Instant" },
    { label: "Why Radical", page: "about" },
    { label: "Drivers Portal", page: "drivers", badge: "App" },
    { label: "Customer Portal", page: "customers" },
    { label: "Contact Us", page: "contact" },
  ];

  const handleNavClick = (page: RadicalSubPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-sky-400 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              24/7/365 SAME-DAY DISPATCH
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Dedicated Driver Guarantee — Zero Subcontracting
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-slate-400">
              Coventry HQ & UK Nationwide Fleet
            </span>
            <a
              href="tel:02475122465"
              className="inline-flex items-center gap-1.5 text-white font-bold hover:text-sky-400 transition-colors bg-sky-600/30 px-2.5 py-0.5 rounded-full border border-sky-500/40"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              <span>024 7512 2465</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 text-left group transition-transform active:scale-95"
            aria-label="Radical Courier Service Home"
          >
            <div className="relative">
              <img
                src="/radical-logo.svg"
                alt="Radical Courier Service"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if svg fails
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={cn(
                    "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all relative flex items-center gap-1.5",
                    isActive
                      ? "text-[#0284C7] bg-sky-50 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md",
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-sm font-bold shadow-md shadow-sky-600/25 transition-all transform active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Instant Quote</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                    isActive
                      ? "bg-sky-50 text-[#0284C7] border border-sky-200"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0284C7] text-white">
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0284C7] text-white font-bold text-sm shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Online Quote</span>
            </button>

            <a
              href="tel:02475122465"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
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