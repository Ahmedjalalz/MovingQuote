import { useState } from "react";
import { Phone, MapPin, Menu, X, ArrowRight } from "lucide-react";

export function UnitySiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Banner */}
      <div className="bg-gray-900 text-gray-200 py-2 text-xs">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href="tel:+441244566348"
              className="flex items-center gap-1.5 hover:text-[#b96be8] transition-colors"
            >
              <Phone className="size-3.5 text-[#b96be8]" />
              <span className="font-semibold">01244 566348</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-gray-400">
              <MapPin className="size-3.5 text-[#b96be8]" />
              <span>56 Oliver Ln, Great Sutton, Ellesmere Port CH66 3NU</span>
            </div>
          </div>
          <div className="text-[0.6875rem] font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Environment Agency Licensed &amp; Green Apple Award Winners</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b-2 border-[#b96be8]">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <a href="/unitywasteremovals" className="flex items-center gap-3">
            <img
              src="/unity-logo.webp"
              alt="Unity Waste Removal Logo"
              width={64}
              height={64}
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-gray-900 leading-none">
                UNITY WASTE
              </span>
              <span className="text-[0.6875rem] font-bold tracking-widest text-[#b96be8] uppercase leading-tight mt-0.5">
                Removal &amp; Clearances
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-800">
            <a href="/unitywasteremovals" className="text-[#b96be8]">
              Quote Page
            </a>
            <a href="#quote-form" className="hover:text-[#b96be8] transition-colors">
              Domestic
            </a>
            <a href="#quote-form" className="hover:text-[#b96be8] transition-colors">
              Commercial
            </a>
            <a href="#why-unity" className="hover:text-[#b96be8] transition-colors">
              Why Us
            </a>
            <a href="https://unitywasteremovals.co.uk/" target="_blank" rel="noreferrer" className="hover:text-[#b96be8] transition-colors">
              Official Site ↗
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+441244566348"
              className="hidden md:inline-flex items-center gap-2 bg-[#b96be8] px-6 py-2.5 -skew-x-[20deg] text-white font-bold text-sm shadow-md transition-all duration-200 hover:bg-gray-900"
            >
              <span className="inline-block skew-x-[20deg] flex items-center gap-2">
                <Phone className="size-4" />
                <span>01244 566348</span>
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="grid size-10 place-items-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 lg:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div className="border-t border-gray-100 bg-white p-5 lg:hidden animate-in fade-in zoom-in-95 duration-150">
            <nav className="flex flex-col gap-3 font-semibold text-gray-800 text-sm">
              <a
                href="/unitywasteremovals"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-purple-50 px-4 py-2.5 text-[#b96be8]"
              >
                Clearance Quote
              </a>
              <a
                href="#why-unity"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-50 rounded-xl"
              >
                Why Choose Unity
              </a>
              <a
                href="tel:+441244566348"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#b96be8] px-4 py-3 text-white font-bold"
              >
                <Phone className="size-4" />
                <span>Call 01244 566348</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
