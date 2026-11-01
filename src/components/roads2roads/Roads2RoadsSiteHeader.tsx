import { useState } from "react";
import { Phone, Mail, MapPin, Menu, X, Clock, ShieldCheck, Zap } from "lucide-react";

export function Roads2RoadsSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Banner Bar - Distinctive Roads2Roads Sky Blue (#25AAE1) */}
      <div className="bg-[#25AAE1] text-white py-2 px-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-wide">
        <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[0.6875rem] sm:text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
              <Zap className="size-3.5 fill-current animate-pulse text-yellow-300" />
              24/7 Urgent Dispatch
            </span>
            <span className="text-white/90 hidden xs:inline">
              For an urgent collection call us on:
            </span>
            <a
              href="tel:02034769656"
              className="text-white font-extrabold underline underline-offset-2 hover:text-white/80 transition-opacity"
            >
              0203 476 9656
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-white/90">
            <a
              href="tel:07584239227"
              className="hover:underline flex items-center gap-1"
            >
              <Phone className="size-3.5" />
              <span>Mobile: 0758 423 9227</span>
            </a>
            <span>•</span>
            <a
              href="mailto:andrew@roads2roads.co.uk"
              className="hover:underline flex items-center gap-1"
            >
              <Mail className="size-3.5" />
              <span>andrew@roads2roads.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-6xl flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5">
          {/* Logo & Tagline */}
          <a
            href="/roads2roads"
            className="flex items-center gap-3 shrink-0 hover:opacity-95 transition-opacity"
            aria-label="Roads2Roads Couriers Homepage"
          >
            <img
              src="/roads2roads-logo.png"
              alt="Roads2Roads Couriers"
              width={220}
              height={50}
              className="h-9 xs:h-10 sm:h-12 w-auto max-w-[190px] xs:max-w-[220px] object-contain"
            />
            <div className="hidden xl:block pl-3 border-l border-slate-200 text-left">
              <p className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
                Roads2Roads Couriers Ltd
              </p>
              <p className="text-[0.6875rem] text-[#25AAE1] font-semibold">
                The same-day delivery service
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-slate-700">
            <a
              href="#quote-section"
              className="px-3.5 py-2 rounded-full text-white bg-[#449D44] hover:bg-[#398439] font-bold shadow-xs transition-all active:scale-95"
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              className="px-3 py-2 rounded-full hover:text-[#25AAE1] hover:bg-sky-50 transition-colors"
            >
              Courier Services
            </a>
            <a
              href="#fleet"
              className="px-3 py-2 rounded-full hover:text-[#25AAE1] hover:bg-sky-50 transition-colors"
            >
              Fleet &amp; Vehicles
            </a>
            <a
              href="#why-r2r"
              className="px-3 py-2 rounded-full hover:text-[#25AAE1] hover:bg-sky-50 transition-colors"
            >
              Why Roads2Roads
            </a>
            <a
              href="#contact"
              className="px-3 py-2 rounded-full hover:text-[#25AAE1] hover:bg-sky-50 transition-colors"
            >
              Contact Us
            </a>
          </nav>

          {/* Direct Urgent Call CTA Button on Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="tel:02034769656"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors text-xs font-bold shadow-xs"
            >
              <Phone className="size-3.5 text-[#25AAE1]" />
              <div className="text-left">
                <span className="block text-[0.625rem] text-slate-400 uppercase font-semibold leading-none">
                  24/7 Hotline
                </span>
                <span className="text-xs font-bold leading-none mt-0.5 block">0203 476 9656</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:02034769656"
              className="sm:hidden inline-flex items-center justify-center size-9 rounded-xl bg-[#449D44] text-white"
              aria-label="Call Roads2Roads directly"
            >
              <Phone className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center size-9 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800">
            <a
              href="#quote-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-[#449D44] text-white font-bold text-center"
            >
              Get Free Instant Quote
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Courier Services
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Fleet &amp; Vehicles
            </a>
            <a
              href="#why-r2r"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Why Roads2Roads
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Contact &amp; Location
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs text-slate-500 font-medium">Urgent Collections (24/7):</div>
            <a
              href="tel:02034769656"
              className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 p-2.5 rounded-xl"
            >
              <Phone className="size-4 text-[#25AAE1]" />
              <span>0203 476 9656 (Landline)</span>
            </a>
            <a
              href="tel:07584239227"
              className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 p-2.5 rounded-xl"
            >
              <Phone className="size-4 text-[#449D44]" />
              <span>0758 423 9227 (Mobile)</span>
            </a>
            <a
              href="mailto:andrew@roads2roads.co.uk"
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 p-1"
            >
              <Mail className="size-3.5 text-[#25AAE1]" />
              <span>andrew@roads2roads.co.uk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
