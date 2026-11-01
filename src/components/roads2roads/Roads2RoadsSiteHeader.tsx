import { useState } from "react";
import { Phone, Mail, Menu, X, Clock, Zap, ArrowRight } from "lucide-react";

export function Roads2RoadsSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80">
      {/* Top Banner Bar - Clean, spacious Sky Blue bar (#25AAE1) */}
      <div className="bg-[#25AAE1] text-white py-2.5 px-4 sm:px-8 lg:px-12 text-xs sm:text-sm font-semibold tracking-wide">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[0.6875rem] bg-white/20 px-2.5 py-0.5 rounded-full">
              <Zap className="size-3.5 fill-current animate-pulse text-yellow-300" />
              24/7 Urgent Dispatch
            </span>
            <span className="text-white/95 hidden sm:inline">
              Urgent collection across London &amp; Nationwide:
            </span>
            <a
              href="tel:02034769656"
              className="text-white font-extrabold underline underline-offset-2 hover:text-white/85 transition-opacity"
            >
              0203 476 9656
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-white/95">
            <a
              href="tel:07584239227"
              className="hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              <Phone className="size-3.5" />
              <span>Direct / Mobile: 0758 423 9227</span>
            </a>
            <span className="text-white/60">•</span>
            <a
              href="mailto:andrew@roads2roads.co.uk"
              className="hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              <Mail className="size-3.5" />
              <span>andrew@roads2roads.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation - Generous height & spacious layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between">
        {/* Brand Logo & Subtitle */}
        <a
          href="/roads2roads"
          className="flex items-center gap-4 shrink-0 hover:opacity-95 transition-opacity py-1"
          aria-label="Roads2Roads Couriers Homepage"
        >
          <img
            src="/roads2roads-logo.png"
            alt="Roads2Roads Couriers"
            width={240}
            height={52}
            className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
          />
          <div className="hidden xl:block pl-4 border-l border-slate-200 text-left">
            <p className="text-xs font-bold text-slate-900 tracking-tight leading-tight">
              Roads2Roads Couriers Ltd
            </p>
            <p className="text-[0.6875rem] text-[#25AAE1] font-semibold mt-0.5">
              The same-day delivery service
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links - Relaxed, elegant spacing */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-semibold text-slate-700">
          <a
            href="#services"
            className="hover:text-[#25AAE1] transition-colors py-1"
          >
            Services
          </a>
          <a
            href="#fleet"
            className="hover:text-[#25AAE1] transition-colors py-1"
          >
            Fleet &amp; Vehicles
          </a>
          <a
            href="#why-r2r"
            className="hover:text-[#25AAE1] transition-colors py-1"
          >
            Why Roads2Roads
          </a>
          <a
            href="#contact"
            className="hover:text-[#25AAE1] transition-colors py-1"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Area - Clean direct dialer + CTA button */}
        <div className="hidden sm:flex items-center gap-3.5">
          <a
            href="tel:02034769656"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-800 transition-colors text-xs font-bold shadow-2xs"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <Phone className="size-3.5 text-[#25AAE1]" />
            <span>0203 476 9656</span>
          </a>

          <a
            href="#quote-section"
            className="px-5 py-2.5 rounded-full text-white bg-[#449D44] hover:bg-[#398439] active:scale-95 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get Free Quote</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:02034769656"
            className="sm:hidden inline-flex items-center justify-center size-10 rounded-xl bg-[#449D44] text-white shadow-xs"
            aria-label="Call Roads2Roads directly"
          >
            <Phone className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center size-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
            <a
              href="#quote-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl bg-[#449D44] text-white font-bold text-center shadow-xs"
            >
              Get Free Instant Quote
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Courier Services
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Fleet &amp; Vehicles
            </a>
            <a
              href="#why-r2r"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Why Roads2Roads
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Contact &amp; Location
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs text-slate-500 font-medium">Urgent Collections (24/7):</div>
            <a
              href="tel:02034769656"
              className="flex items-center gap-2.5 text-sm font-bold text-slate-900 bg-slate-100 p-3 rounded-xl"
            >
              <Phone className="size-4 text-[#25AAE1]" />
              <span>0203 476 9656 (Landline)</span>
            </a>
            <a
              href="tel:07584239227"
              className="flex items-center gap-2.5 text-sm font-bold text-slate-900 bg-slate-100 p-3 rounded-xl"
            >
              <Phone className="size-4 text-[#449D44]" />
              <span>0758 423 9227 (Mobile)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
