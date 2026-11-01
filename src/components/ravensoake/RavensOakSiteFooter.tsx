import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  ArrowUp,
  ExternalLink,
  Lock,
} from "lucide-react";

interface RavensOakSiteFooterProps {
  onNavigate: (page: "home" | "quote" | "facilities" | "pricing" | "services" | "contact") => void;
}

export function RavensOakSiteFooter({ onNavigate }: RavensOakSiteFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#081f10] text-slate-300 pt-14 pb-10 border-t-2 border-[#509D25]">
      <div className="container-page">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-emerald-950">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3.5">
            <img
              src="/ravensoake-logo-white.svg"
              alt="Ravens Oak Caravan & Motorhome Storage"
              className="h-10 w-auto"
            />
            <p className="text-xs leading-relaxed text-emerald-100/70">
              Family-owned and operated secure storage for touring caravans, luxury motorhomes,
              trailers, boats, and shipping containers in Rushden, Northamptonshire.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-[11px]">
                <ShieldCheck className="size-3.5 text-[#8CC63F]" />
                <span>Resident Owners Living On-Site</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-[11px]">
                <Clock className="size-3.5 text-[#8CC63F]" />
                <span>24/7/365 Electric Swipe Card Access</span>
              </div>
            </div>
          </div>

          {/* Col 2: Storage & Facilities */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#8CC63F]" />
              Storage &amp; Facilities
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  Touring Caravan Storage (£50/mo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  Motorhome Storage up to 45ft (£55/mo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  20ft Shipping Containers (£65/mo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("facilities")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  Hardstanding, Grass &amp; Indoor Bays
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("facilities")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  2-Acre Practice Paddock
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: On-Site Services */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#8CC63F]" />
              On-Site Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  NCC-Approved Habitation Servicing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  Chassis &amp; Damp Safety Inspections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  Professional Auto-Glym Valeting &amp; Wax
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  UK &amp; European Caravan Towing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("services")}
                  className="hover:text-[#8CC63F] transition-colors cursor-pointer"
                >
                  Calor Gas Bottle Exchanges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Appointment */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#8CC63F]" />
              Visit &amp; Contact
            </h3>

            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-900/80 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-0.5 text-[11px]">
                <Lock className="size-3 text-[#8CC63F]" />
                <span>Strictly by Appointment</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Please ensure you bring your driving licence &amp; matching utility bill.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#8CC63F] shrink-0 mt-0.5" />
                <span>315 Bedford Road, Rushden, NN10 0SQ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#8CC63F] shrink-0" />
                <a href="tel:01933712782" className="hover:text-white font-semibold">
                  01933 712782
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#8CC63F] shrink-0" />
                <a
                  href="mailto:info@ravensoakecaravanstorage.co.uk"
                  className="hover:text-white font-semibold truncate text-[11px]"
                >
                  info@ravensoakecaravanstorage.co.uk
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("quote")}
              className="w-full mt-1 py-2 px-4 rounded-full bg-[#509D25] hover:bg-[#65a30d] text-white text-xs font-bold text-center transition-colors cursor-pointer"
            >
              Get Free Instant Quote
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-100/60">
          <p>© {new Date().getFullYear()} Ravens Oak Caravan Storage. All rights reserved.</p>

          <div className="flex items-center gap-4 flex-wrap justify-center text-[11px]">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate("quote")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pitch Quote
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Site Directions
            </button>
            <span>•</span>
            <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Main Portal</span>
              <ExternalLink className="size-2.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 rounded-full bg-emerald-950 hover:bg-emerald-900 text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
