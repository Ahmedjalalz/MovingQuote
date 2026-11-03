import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Building2,
  Recycle,
  Warehouse,
  Package,
} from "lucide-react";

export type OmiSubPage =
  | "home"
  | "quote"
  | "relocation"
  | "clearance"
  | "storage"
  | "crates"
  | "why-us"
  | "contact";

interface OmiSiteHeaderProps {
  activePage: OmiSubPage;
  onNavigate: (page: OmiSubPage) => void;
}

export function OmiSiteHeader({ activePage, onNavigate }: OmiSiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (page: OmiSubPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-xs transition-all duration-300">
        {/* Top Corporate Strip */}
        <div className="bg-[#101B3B] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 border-b border-[#1E2E5D]">
          <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Left contact info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1">
              <a
                href="tel:02031883001"
                className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#F57619] transition-colors"
              >
                <Phone className="size-3 text-[#F57619]" />
                <span>020 3188 3001</span>
              </a>

              <span className="text-white/20 hidden sm:inline">•</span>

              <a
                href="mailto:info@officemovinginternational.co.uk"
                className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium"
              >
                <Mail className="size-3 text-[#F57619]" />
                <span>info@officemovinginternational.co.uk</span>
              </a>

              <span className="text-white/20 hidden md:inline">•</span>

              <div className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
                <MapPin className="size-3 text-[#F57619]" />
                <span>Park Royal Depot: 37-43 Gorst Road, NW10 6LA</span>
              </div>
            </div>

            {/* Right badge */}
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-200">
                <ShieldCheck className="size-3.5 text-[#F57619]" />
                <span>Established 1989 • London &amp; South East</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`border-b border-slate-200 bg-white transition-all ${
            isScrolled ? "py-2 sm:py-2.5 shadow-sm" : "py-3 sm:py-3.5"
          }`}
        >
          <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => handleLinkClick("home")}
              className="flex items-center gap-3 text-left group focus:outline-none"
              aria-label="Office Moving International Home"
            >
              {!logoError ? (
                <img
                  src="/omi/logo.png"
                  alt="Office Moving International"
                  className="h-8 sm:h-10 md:h-11 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded bg-[#101B3B] flex items-center justify-center text-white font-black text-base">
                    OMI
                  </div>
                  <div>
                    <div className="text-base font-black tracking-tight text-[#101B3B] leading-none">
                      OFFICE MOVING
                    </div>
                    <div className="text-[9px] font-bold tracking-widest text-[#F57619] uppercase leading-none mt-1">
                      INTERNATIONAL
                    </div>
                  </div>
                </div>
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
              <button
                type="button"
                onClick={() => handleLinkClick("home")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "home" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("relocation")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "relocation" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                Office Relocation
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("clearance")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "clearance" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                Clearance &amp; Recycling
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("storage")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "storage" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                Storage
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("crates")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "crates" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                Crate Hire
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("why-us")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "why-us" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                About &amp; Experience
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("contact")}
                className={`transition-colors hover:text-[#101B3B] ${
                  activePage === "contact" ? "text-[#101B3B] font-bold border-b-2 border-[#F57619] pb-0.5" : ""
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Right Action CTAs */}
            <div className="flex items-center gap-3">
              <a
                href="tel:02031883001"
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <Phone className="size-3.5 text-[#F57619]" />
                <span>020 3188 3001</span>
              </a>

              <button
                type="button"
                onClick={() => handleLinkClick("quote")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#F57619] px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#d86c1e] shadow-sm transition-colors"
              >
                <span>Request Quote</span>
                <ArrowRight className="size-3.5 stroke-[2.5]" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-2.5">
              <button
                type="button"
                onClick={() => handleLinkClick("home")}
                className="flex items-center justify-between py-2 text-left text-sm font-bold text-slate-900 border-b border-slate-100"
              >
                <span>Home</span>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("relocation")}
                className="flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-700 border-b border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-[#101B3B]" />
                  <span>Commercial Office Relocation</span>
                </div>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("clearance")}
                className="flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-700 border-b border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Recycle className="size-4 text-[#101B3B]" />
                  <span>Office Clearance &amp; Recycling</span>
                </div>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("storage")}
                className="flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-700 border-b border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Warehouse className="size-4 text-[#101B3B]" />
                  <span>Commercial Storage (NW10)</span>
                </div>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("crates")}
                className="flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-700 border-b border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Package className="size-4 text-[#101B3B]" />
                  <span>Crate Hire</span>
                </div>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("why-us")}
                className="flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-700 border-b border-slate-100"
              >
                <span>About &amp; 36 Years Experience</span>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleLinkClick("contact")}
                className="flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-700 border-b border-slate-100"
              >
                <span>Contact &amp; Site Surveys</span>
                <ArrowRight className="size-4 text-slate-400" />
              </button>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleLinkClick("quote")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#F57619] py-3 text-sm font-bold text-white shadow-sm"
                >
                  <span>Request Free Quote</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </button>

                <a
                  href="tel:02031883001"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-sm font-bold text-slate-800 bg-slate-50"
                >
                  <Phone className="size-4 text-[#F57619]" />
                  <span>Call 020 3188 3001</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-lg flex items-center gap-2">
        <a
          href="tel:02031883001"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-900 shadow-2xs hover:bg-slate-50"
        >
          <Phone className="size-3.5 text-[#F57619]" />
          <span>Call 020 3188 3001</span>
        </a>
        <button
          type="button"
          onClick={() => handleLinkClick("quote")}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#F57619] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d86c1e]"
        >
          <span>Get Free Quote</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </>
  );
}
