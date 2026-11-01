import { useState, useEffect } from "react";
import {
  Phone,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  MapPin,
  CalendarCheck,
} from "lucide-react";

interface RavensOakSiteHeaderProps {
  activePage: "home" | "quote" | "facilities" | "pricing" | "services" | "contact";
  onNavigate: (page: "home" | "quote" | "facilities" | "pricing" | "services" | "contact") => void;
}

export function RavensOakSiteHeader({ activePage, onNavigate }: RavensOakSiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (page: "home" | "quote" | "facilities" | "pricing" | "services" | "contact") => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#0b2915] text-emerald-100 text-[11px] sm:text-xs py-2 border-b border-emerald-950">
        <div className="container-page flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="size-2 rounded-full bg-[#8cc63f] animate-pulse" />
              24/7/365 Swipe Gate Access
            </span>
            <span className="hidden md:inline text-emerald-500/40">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#8cc63f]" />
              Resident Owners On-Site
            </span>
            <span className="hidden lg:inline text-emerald-500/40">•</span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-[#8cc63f]" />
              Rushden, Northamptonshire (NN10 0SQ)
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline text-emerald-300/80 font-medium text-[11px]">
              Visits Strictly by Appointment
            </span>
            <a
              href="tel:01933712782"
              className="font-bold text-white hover:text-[#8cc63f] transition-colors flex items-center gap-1.5"
            >
              <Phone className="size-3 text-[#8cc63f]" />
              <span>01933 712 782</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled ? "py-3 bg-white/95 backdrop-blur-md" : "py-4 bg-white"
        }`}
      >
        <div className="container-page flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center focus:outline-none cursor-pointer shrink-0"
          >
            <img
              src="/ravensoake-logo.svg"
              alt="Ravens Oak Caravan & Motorhome Storage"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === "home"
                  ? "text-[#006837] bg-emerald-50/80 font-bold"
                  : "hover:text-[#006837] hover:bg-slate-50"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("facilities")}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === "facilities"
                  ? "text-[#006837] bg-emerald-50/80 font-bold"
                  : "hover:text-[#006837] hover:bg-slate-50"
              }`}
            >
              Security &amp; Facilities
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("pricing")}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === "pricing"
                  ? "text-[#006837] bg-emerald-50/80 font-bold"
                  : "hover:text-[#006837] hover:bg-slate-50"
              }`}
            >
              Pitch Sizes &amp; Rates
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("services")}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === "services"
                  ? "text-[#006837] bg-emerald-50/80 font-bold"
                  : "hover:text-[#006837] hover:bg-slate-50"
              }`}
            >
              Services &amp; Towing
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activePage === "contact"
                  ? "text-[#006837] bg-emerald-50/80 font-bold"
                  : "hover:text-[#006837] hover:bg-slate-50"
              }`}
            >
              Location &amp; Visit
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:01933712782"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors"
            >
              <Phone className="size-3 text-[#006837]" />
              <span>01933 712782</span>
            </a>

            <button
              type="button"
              onClick={() => handleNavClick("quote")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-xs transition-all duration-200 cursor-pointer ${
                activePage === "quote"
                  ? "bg-[#509D25] text-white ring-2 ring-[#509D25]/30"
                  : "bg-[#006837] text-white hover:bg-[#14532D]"
              }`}
            >
              <CalendarCheck className="size-3.5 text-[#8CC63F]" />
              <span>Get a Free Quote</span>
              <ArrowRight className="size-3" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleNavClick("quote")}
              className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#006837] text-white"
            >
              <span>Quote</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-[#006837]"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("facilities")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-[#006837]"
            >
              Security &amp; Facilities
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("pricing")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-[#006837]"
            >
              Pitch Sizes &amp; Rates
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("services")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-[#006837]"
            >
              Services &amp; Towing
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-[#006837]"
            >
              Location &amp; Visit Appointment
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavClick("quote")}
                className="w-full py-3 rounded-full bg-[#006837] text-white font-bold text-center flex items-center justify-center gap-2 shadow-xs text-sm"
              >
                <CalendarCheck className="size-4 text-[#8CC63F]" />
                <span>Get a Free Storage Quote</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold pt-1">
                <a
                  href="tel:01933712782"
                  className="py-2.5 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center gap-1.5"
                >
                  <Phone className="size-3 text-[#006837]" />
                  <span>01933 712782</span>
                </a>
                <a
                  href="tel:07921784736"
                  className="py-2.5 rounded-lg bg-emerald-50 text-[#006837] border border-emerald-200/60 flex items-center justify-center gap-1.5"
                >
                  <Phone className="size-3 text-[#509D25]" />
                  <span>07921 784736</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
