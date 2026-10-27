import { useState } from "react";
import { Phone, MapPin, Menu, X, ShieldCheck, Truck, ExternalLink } from "lucide-react";

export function FrontlineSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Banner Bar - Mobile-optimized with clean single-line / stacked wrap */}
      <div className="bg-[#1c1132] text-slate-200 py-1.5 sm:py-2.5 text-[0.68rem] sm:text-xs border-b border-[#2d1b4e]">
        <div className="container mx-auto px-3 sm:px-6 flex flex-wrap justify-between items-center gap-x-4 gap-y-1 text-center sm:text-left">
          {/* Phone Numbers & Location */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-5 gap-y-1 mx-auto sm:mx-0">
            <a
              href="tel:01543630122"
              className="inline-flex items-center gap-1.5 hover:text-[#20c200] transition-colors font-semibold"
            >
              <Phone className="size-3 sm:size-3.5 text-[#20c200] shrink-0" />
              <span>01543 630 122</span>
            </a>
            <span className="text-purple-400/40">•</span>
            <a
              href="tel:07761098483"
              className="inline-flex items-center gap-1.5 hover:text-[#20c200] transition-colors font-semibold text-slate-300"
            >
              <Phone className="size-3 sm:size-3.5 text-[#20c200] shrink-0" />
              <span className="hidden xs:inline">WhatsApp:</span>
              <span>07761 098 483</span>
            </a>
            <span className="hidden md:inline text-purple-400/40">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300 truncate max-w-[280px] lg:max-w-none">
              <MapPin className="size-3.5 text-[#20c200] shrink-0" />
              <span className="truncate">Toll Point, Lichfield Rd, Brownhills, WS8 6JP</span>
            </div>
          </div>

          {/* Licensing & Coverage badge (hidden on tiny screens to avoid 5-line clutter) */}
          <div className="hidden sm:flex items-center justify-center gap-2.5 text-[0.68rem] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-[#20c200] font-semibold tracking-wide">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>Licensed Waste Carrier</span>
            </span>
            <span className="text-purple-400/40 hidden lg:inline">•</span>
            <span className="text-slate-300 hidden lg:inline-flex items-center gap-1">
              <Truck className="size-3.5 text-[#20c200]" />
              <span>West Midlands &amp; Nationwide</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5">
          {/* Logo with responsive max-width to protect mobile layout */}
          <a
            href="/frontlinetransport"
            className="flex items-center shrink-0 hover:opacity-95 transition-opacity py-0.5"
            aria-label="Frontline Transport Homepage"
          >
            <img
              src="/frontline-logo-header.png"
              alt="Frontline Transport"
              width={260}
              height={44}
              className="h-7 xs:h-8 sm:h-10 md:h-11 w-auto max-w-[170px] xs:max-w-[210px] sm:max-w-[260px] object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith("frontline-logo-full.png")) {
                  target.src = "/frontline-logo-full.png";
                }
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm font-semibold text-slate-700">
            <a
              href="/frontlinetransport"
              className="px-3.5 xl:px-4 py-2 rounded-full text-[#147a00] bg-[#ecf5eb] font-bold border border-[#20c200]/40 transition-all"
            >
              Get Free Quote
            </a>
            <a
              href="#removals"
              className="px-3 xl:px-3.5 py-2 rounded-full text-slate-700 hover:text-[#147a00] hover:bg-[#ecf5eb]/60 transition-all"
            >
              Home Removals
            </a>
            <a
              href="#waste-clearance"
              className="px-3 xl:px-3.5 py-2 rounded-full text-slate-700 hover:text-[#147a00] hover:bg-[#ecf5eb]/60 transition-all"
            >
              Waste Clearance
            </a>
            <a
              href="#delivery"
              className="px-3 xl:px-3.5 py-2 rounded-full text-slate-700 hover:text-[#147a00] hover:bg-[#ecf5eb]/60 transition-all"
            >
              Delivery Services
            </a>
            <a
              href="#fleet"
              className="px-3 xl:px-3.5 py-2 rounded-full text-slate-700 hover:text-[#147a00] hover:bg-[#ecf5eb]/60 transition-all"
            >
              Fleet &amp; Vans
            </a>
            <a
              href="#why-frontline"
              className="px-3 xl:px-3.5 py-2 rounded-full text-slate-700 hover:text-[#147a00] hover:bg-[#ecf5eb]/60 transition-all"
            >
              Why Frontline
            </a>
            <a
              href="https://www.frontlinetransport.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-full text-slate-500 hover:text-[#147a00] hover:bg-[#ecf5eb]/60 transition-all inline-flex items-center gap-1"
            >
              <span>Main Site</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
          </nav>

          {/* Right Action: Call CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:01543630122"
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#20c200] hover:bg-[#1cb000] px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-[#261744] transition-all shadow-xs hover:shadow-md active:scale-95 tracking-wide uppercase shrink-0"
            >
              <Phone className="size-3.5 sm:size-4 shrink-0 stroke-[2.5]" />
              <span>01543 630 122</span>
            </a>

            {/* Quick phone icon for small mobile */}
            <a
              href="tel:01543630122"
              className="sm:hidden flex size-9 items-center justify-center rounded-full bg-[#20c200] text-[#261744] shadow-xs active:scale-95"
              aria-label="Call Frontline Transport"
            >
              <Phone className="size-4 stroke-[2.5]" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-6 text-[#261744]" /> : <Menu className="size-6 text-[#261744]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1.5 text-sm font-semibold text-slate-800">
            <a
              href="/frontlinetransport"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-full bg-[#ecf5eb] text-[#147a00] font-bold border border-[#20c200]/40 flex items-center justify-between"
            >
              <span>Get Free Quote</span>
              <span className="size-2 rounded-full bg-[#20c200] animate-pulse" />
            </a>
            <a
              href="#removals"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Home Removals
            </a>
            <a
              href="#waste-clearance"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Waste Clearance
            </a>
            <a
              href="#delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Delivery Services
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Our Fleet &amp; Vehicles
            </a>
            <a
              href="#why-frontline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Why Choose Frontline
            </a>
            <a
              href="https://www.frontlinetransport.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-between transition-colors"
            >
              <span>Visit frontlinetransport.co.uk</span>
              <ExternalLink className="size-3.5" />
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:01543630122"
              className="flex items-center justify-center gap-2 rounded-full bg-[#20c200] py-3 text-center text-sm font-extrabold text-[#261744] shadow-xs uppercase tracking-wide active:scale-95 transition-transform"
            >
              <Phone className="size-4 stroke-[2.5]" />
              <span>Call 01543 630 122</span>
            </a>
            <a
              href="tel:07761098483"
              className="flex items-center justify-center gap-2 rounded-full bg-[#261744] py-2.5 text-center text-xs font-semibold text-[#20c200]"
            >
              <span>Direct / WhatsApp: 07761 098 483</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
