import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export function MoveManSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Corporate Strip */}
      <div className="bg-[#151515] text-slate-300 py-2 px-3 sm:px-6 text-xs border-b border-neutral-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Numbers & Hubs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-5 gap-y-1">
            <a
              href="tel:08002465642"
              className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#8DC63F] transition-colors"
            >
              <Phone className="size-3.5 text-[#8DC63F]" />
              <span>Freephone: 0800 246 5642</span>
            </a>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <a
              href="tel:07918716165"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#8DC63F] transition-colors font-medium"
            >
              <Phone className="size-3.5 text-[#8DC63F]" />
              <span>Direct: 07918 716165</span>
            </a>
            <span className="text-neutral-700 hidden md:inline">•</span>
            <a
              href="mailto:mikedawson@movemanltd.com"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-[#8DC63F] transition-colors font-medium"
            >
              <Mail className="size-3.5 text-[#8DC63F]" />
              <span>mikedawson@movemanltd.com</span>
            </a>
          </div>

          {/* Regional Hubs & Badge */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <div className="hidden lg:flex items-center gap-1.5 text-neutral-400">
              <MapPin className="size-3.5 text-[#8DC63F]" />
              <span>Offices in Midlands, Manchester, London &amp; Stoke-on-Trent HQ</span>
            </div>
            <span className="hidden lg:inline text-neutral-700">•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#8DC63F]">
              <ShieldCheck className="size-3.5" />
              <span>UK Commercial Relocation Specialists</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5">
          {/* Logo */}
          <a
            href="/movemanltd.com"
            className="flex items-center shrink-0 hover:opacity-95 transition-opacity"
            aria-label="Move Management Asset Removals Ltd"
          >
            <img
              src="/moveman-logo.png"
              alt="Move Management Asset Removals Ltd Logo"
              width={260}
              height={58}
              className="h-8 xs:h-9 sm:h-11 md:h-12 w-auto max-w-[150px] xs:max-w-[190px] sm:max-w-none object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[15px] font-semibold text-neutral-800">
            <a
              href="https://movemanltd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DC63F] transition-colors"
            >
              Home
            </a>
            <a
              href="https://movemanltd.com/service/what-we-do/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DC63F] transition-colors"
            >
              What We Do
            </a>

            {/* Services Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#8DC63F] transition-colors cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className="size-4 transition-transform group-hover:rotate-180 text-neutral-500" />
              </button>

              {servicesOpen && (
                <div className="absolute top-full -left-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50">
                  <a
                    href="https://movemanltd.com/service/business-moving/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Business Moving
                  </a>
                  <a
                    href="https://movemanltd.com/service/packing-storage/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Packing &amp; Storage
                  </a>
                  <a
                    href="https://movemanltd.com/service/move-management/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Move Management
                  </a>
                  <a
                    href="https://movemanltd.com/service/machinery-moves/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Machinery Moves
                  </a>
                  <a
                    href="https://movemanltd.com/service/space-floor-planning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Space &amp; Floor Planning
                  </a>
                  <a
                    href="https://movemanltd.com/service/it-relocations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    IT Relocations
                  </a>
                  <a
                    href="https://movemanltd.com/service/recycling/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Recycling &amp; Sustainability
                  </a>
                  <a
                    href="https://movemanltd.com/service/office-furniture/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-[#8DC63F]/10 hover:text-neutral-900 font-medium"
                  >
                    Reusable Office Furniture
                  </a>
                </div>
              )}
            </div>

            <a
              href="https://movemanltd.com/projects/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DC63F] transition-colors"
            >
              Projects &amp; Case Studies
            </a>
            <a
              href="https://movemanltd.com/business-moving-help-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DC63F] transition-colors"
            >
              Moving Guide
            </a>
            <a
              href="https://movemanltd.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DC63F] transition-colors"
            >
              Contact Us
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:08002465642"
              className="hidden md:inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors border border-neutral-200 shadow-2xs"
            >
              <Phone className="size-4 text-[#8DC63F]" />
              <span>0800 246 5642</span>
            </a>

            <a
              href="#quote-section"
              className="inline-flex items-center gap-1.5 bg-[#8DC63F] hover:bg-[#7cb334] text-neutral-950 px-3 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="size-3.5 sm:size-4" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5 sm:size-6" /> : <Menu className="size-5 sm:size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-neutral-800">
            <a
              href="https://movemanltd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home ↗
            </a>
            <a
              href="https://movemanltd.com/service/what-we-do/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              What We Do ↗
            </a>
            <div className="px-3 py-1 text-xs font-bold uppercase text-neutral-400">Services</div>
            <div className="pl-4 space-y-1 text-xs sm:text-sm">
              <a
                href="https://movemanltd.com/service/business-moving/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Business Moving
              </a>
              <a
                href="https://movemanltd.com/service/packing-storage/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Packing &amp; Storage
              </a>
              <a
                href="https://movemanltd.com/service/move-management/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Move Management
              </a>
              <a
                href="https://movemanltd.com/service/machinery-moves/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Machinery Moves
              </a>
              <a
                href="https://movemanltd.com/service/space-floor-planning/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Space &amp; Floor Planning
              </a>
              <a
                href="https://movemanltd.com/service/it-relocations/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • IT Relocations
              </a>
              <a
                href="https://movemanltd.com/service/recycling/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Recycling &amp; Sustainability
              </a>
              <a
                href="https://movemanltd.com/service/office-furniture/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 hover:text-[#8DC63F]"
                onClick={() => setMobileMenuOpen(false)}
              >
                • Reusable Office Furniture
              </a>
            </div>
            <a
              href="https://movemanltd.com/projects/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects &amp; Case Studies ↗
            </a>
            <a
              href="https://movemanltd.com/business-moving-help-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              FREE Business Moving Help Guide ↗
            </a>
            <a
              href="https://movemanltd.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us ↗
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="tel:08002465642"
              className="flex items-center justify-center gap-2 bg-[#151515] text-white py-3 rounded-xl font-bold text-sm"
            >
              <Phone className="size-4 text-[#8DC63F]" />
              <span>Call Freephone 0800 246 5642</span>
            </a>
            <a
              href="mailto:mikedawson@movemanltd.com"
              className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-800 py-2.5 rounded-xl font-semibold text-sm"
            >
              <Mail className="size-4 text-[#8DC63F]" />
              <span>mikedawson@movemanltd.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
