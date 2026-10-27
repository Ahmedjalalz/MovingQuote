import { useState } from "react";
import { Phone, MapPin, Menu, X, ShieldCheck, Truck, ExternalLink } from "lucide-react";

export function FrontlineSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-[#0f172a] text-slate-200 py-2.5 text-xs border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-2.5 text-center md:text-left">
          {/* Phone Numbers & Location */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5">
            <a
              href="tel:01543630122"
              className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors font-semibold"
            >
              <Phone className="size-3.5 text-amber-400 shrink-0" />
              <span>Office: 01543 630 122</span>
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href="tel:07761098483"
              className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors font-semibold text-slate-300"
            >
              <Phone className="size-3.5 text-amber-400 shrink-0" />
              <span>Direct / WhatsApp: 07761 098 483</span>
            </a>
            <span className="hidden lg:inline text-slate-600">•</span>
            <div className="hidden lg:flex items-center gap-2 text-slate-300">
              <MapPin className="size-3.5 text-amber-400 shrink-0" />
              <span>Toll Point, Lichfield Rd, Brownhills, Walsall WS8 6JP</span>
            </div>
          </div>

          {/* Licensing & Coverage badge */}
          <div className="flex items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium tracking-wide">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>Environment Agency Registered Waste Carrier</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline-flex items-center gap-1">
              <Truck className="size-3.5 text-amber-400" />
              <span>West Midlands &amp; Nationwide</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">
          {/* Logo */}
          <a
            href="/frontlinetransport"
            className="flex items-center shrink-0 hover:opacity-95 transition-opacity py-0.5"
            aria-label="Frontline Transport Homepage"
          >
            <img
              src="/frontline-logo-full.png"
              alt="Frontline Transport - Removals, Waste Clearance & Courier Services"
              width={260}
              height={44}
              className="h-9 sm:h-10 md:h-11 w-auto object-contain"
              onError={(e) => {
                // Fallback to square logo if wide logo fails
                const target = e.currentTarget;
                if (!target.src.endsWith("frontline-logo.png")) {
                  target.src = "/frontline-logo.png";
                }
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-700">
            <a
              href="/frontlinetransport"
              className="px-3.5 py-2 rounded-xl text-slate-900 bg-amber-50 font-bold border border-amber-300 transition-all"
            >
              Get Free Quote
            </a>
            <a
              href="#removals"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Home Removals
            </a>
            <a
              href="#waste-clearance"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Waste Clearance
            </a>
            <a
              href="#delivery"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Delivery &amp; Courier
            </a>
            <a
              href="#fleet"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Fleet &amp; Vans
            </a>
            <a
              href="#why-frontline"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Why Frontline
            </a>
            <a
              href="https://www.frontlinetransport.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all inline-flex items-center gap-1.5"
            >
              <span>Main Site</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
          </nav>

          {/* Direct Phone Call Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:01543630122"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs md:text-sm font-bold text-slate-950 transition-all shadow-xs hover:shadow-md"
            >
              <Phone className="size-4 shrink-0" />
              <span>01543 630 122</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="/frontlinetransport"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-amber-50 text-amber-950 font-bold border border-amber-200"
            >
              Get Free Quote
            </a>
            <a
              href="#removals"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              Home Removals
            </a>
            <a
              href="#waste-clearance"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              Waste Clearance
            </a>
            <a
              href="#delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              Delivery &amp; Courier
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              Our Fleet &amp; Vehicles
            </a>
            <a
              href="#why-frontline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              Why Choose Frontline
            </a>
            <a
              href="https://www.frontlinetransport.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-between"
            >
              <span>Visit frontlinetransport.co.uk</span>
              <ExternalLink className="size-3.5" />
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:01543630122"
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-center text-sm font-bold text-slate-950 shadow-xs"
            >
              <Phone className="size-4" />
              <span>Call 01543 630 122</span>
            </a>
            <a
              href="tel:07761098483"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2 text-center text-xs font-semibold text-slate-200"
            >
              <span>Direct / WhatsApp: 07761 098 483</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
