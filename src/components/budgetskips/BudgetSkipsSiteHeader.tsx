import { useState } from "react";
import { Phone, MapPin, Menu, X, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export function BudgetSkipsSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-2xs">
      {/* Top Utility Bar */}
      <div className="bg-zinc-900 text-zinc-300 py-1.5 px-4 sm:px-6 text-[0.6875rem] font-medium border-b border-zinc-800">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:02476363002"
              className="inline-flex items-center gap-1.5 text-white hover:text-orange-400 font-bold transition-colors"
            >
              <Phone className="size-3 text-[#ec6c05]" />
              <span>02476 363 002</span>
            </a>
            <div className="hidden md:inline-flex items-center gap-1.5 text-zinc-400">
              <MapPin className="size-3 text-[#ec6c05]" />
              <span>Bayton Road Industrial Estate, Coventry, CV7 9NH</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[0.625rem] sm:text-xs">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Environment Agency Licensed Waste Carrier &amp; Transfer Station</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Heritage */}
        <div className="flex items-center gap-3">
          <a href="/budgetskipscoventry" className="flex items-center gap-2.5">
            <img
              src="/budget-skips-logo.svg"
              alt="Budget Skips Coventry"
              width={165}
              height={55}
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>

          <div className="hidden sm:block border-l border-zinc-200 pl-3">
            <img
              src="/budget-25.svg"
              alt="Celebrating 25 Years of Service"
              width={100}
              height={34}
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>

        {/* Clean Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-zinc-700">
          <a href="#quote-form" className="text-[#ec6c05] hover:text-[#d85e00] transition-colors">
            Get a Quote
          </a>
          <a href="#skip-guide" className="hover:text-[#ec6c05] transition-colors">
            Skip Sizes
          </a>
          <a href="#how-it-works" className="hover:text-[#ec6c05] transition-colors">
            How It Works
          </a>
          <a href="#depot" className="hover:text-[#ec6c05] transition-colors">
            Recycling Depot
          </a>
          <a href="#faq" className="hover:text-[#ec6c05] transition-colors">
            Permits &amp; FAQ
          </a>
        </nav>

        {/* Desktop CTA & Direct Phone */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <div className="text-[0.5625rem] uppercase tracking-wider font-bold text-zinc-400">
              Direct Booking Line
            </div>
            <a
              href="tel:02476363002"
              className="text-sm font-extrabold text-zinc-900 hover:text-[#ec6c05] transition-colors block leading-tight"
            >
              024 7636 3002
            </a>
          </div>
          <a
            href="#quote-form"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#ec6c05] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#d85e00] transition-colors"
          >
            <span>Quote Form</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href="tel:02476363002"
            className="rounded-lg bg-orange-50 border border-orange-200 p-2 text-[#ec6c05]"
            aria-label="Call Budget Skips"
          >
            <Phone className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-2 text-sm font-semibold">
          <a
            href="#quote-form"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#ec6c05]"
          >
            Online Quote Form
          </a>
          <a
            href="#skip-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-700"
          >
            Skip Sizing Chart
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-700"
          >
            How Skip Hire Works
          </a>
          <a
            href="#depot"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-700"
          >
            Bayton Road Transfer Station
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-700"
          >
            Road Permits &amp; FAQ
          </a>

          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Need help?</span>
            <a
              href="tel:02476363002"
              className="text-xs font-bold text-[#ec6c05] flex items-center gap-1"
            >
              <Phone className="size-3.5" />
              <span>02476 363 002</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
