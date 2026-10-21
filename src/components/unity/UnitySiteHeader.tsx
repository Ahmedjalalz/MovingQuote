import { useState } from "react";
import { Phone, MapPin, Menu, X, ArrowRight } from "lucide-react";

export function UnitySiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Banner */}
      <div className="bg-gray-900 text-gray-200 py-2 text-xs">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-4 sm:gap-6">
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
          <div className="text-[0.6875rem] font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Environment Agency Licensed &amp; Green Apple Award</span>
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick mobile call button */}
            <a
              href="tel:+441244566348"
              className="grid size-10 place-items-center rounded-xl bg-[#b96be8] text-white md:hidden shadow-xs hover:bg-[#a249d9] transition-colors"
              aria-label="Call Unity Waste Removal"
            >
              <Phone className="size-4 shrink-0" fill="currentColor" />
            </a>

            <a
              href="tel:+441244566348"
              className="relative group hidden md:inline-flex items-center gap-2 px-7 py-2.5 bg-[#b96be8] -skew-x-[30deg] text-white hover:bg-black hover:text-white transition-all duration-200 ease-in-out shadow-sm leading-none"
            >
              <strong className="inline-flex items-center skew-x-[30deg] font-bold text-sm tracking-tight leading-none">
                01244 566348
              </strong>
              <span className="inline-flex items-center justify-center skew-x-[30deg] leading-none">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 shrink-0"
                >
                  <path d="M12.2187 15C11.6087 15 10.7519 14.7793 9.46873 14.0625C7.90842 13.1875 6.70155 12.3796 5.14967 10.8318C3.65342 9.33652 2.9253 8.36839 1.90623 6.51402C0.754983 4.42027 0.951233 3.32277 1.17061 2.8537C1.43186 2.29308 1.81748 1.95777 2.31592 1.62495C2.59903 1.43947 2.89863 1.28046 3.21092 1.14995C3.24217 1.13652 3.27123 1.1237 3.29717 1.11214C3.45186 1.04245 3.68623 0.937142 3.98311 1.04964C4.18123 1.12402 4.35811 1.2762 4.63498 1.54964C5.2028 2.10964 5.97873 3.35683 6.26498 3.96933C6.45717 4.38214 6.58436 4.65464 6.58467 4.96027C6.58467 5.31808 6.40467 5.59402 6.18623 5.89183C6.1453 5.94777 6.10467 6.0012 6.0653 6.05308C5.82748 6.36558 5.7753 6.45589 5.80967 6.61714C5.87936 6.9412 6.39905 7.90589 7.25311 8.75808C8.10717 9.61027 9.04405 10.0971 9.36936 10.1665C9.53748 10.2025 9.62967 10.1481 9.95217 9.90183C9.99842 9.86652 10.0459 9.82995 10.0956 9.79339C10.4287 9.54558 10.6919 9.37027 11.0412 9.37027H11.0431C11.3472 9.37027 11.6075 9.50214 12.0387 9.71964C12.6012 10.0034 13.8859 10.7693 14.4494 11.3378C14.7234 11.614 14.8762 11.7903 14.9509 11.9881C15.0634 12.2859 14.9575 12.5193 14.8884 12.6756C14.8769 12.7015 14.864 12.73 14.8506 12.7615C14.7191 13.0733 14.5591 13.3722 14.3728 13.6546C14.0406 14.1515 13.704 14.5362 13.1422 14.7978C12.8537 14.9343 12.5379 15.0034 12.2187 15Z"/>
                </svg>
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
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#b96be8] px-4 py-3 text-white font-bold leading-none"
              >
                <span className="leading-none">01244 566348</span>
                <Phone className="size-4 shrink-0 leading-none" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
