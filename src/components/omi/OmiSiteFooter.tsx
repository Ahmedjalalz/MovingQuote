import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Recycle,
  Building2,
  Warehouse,
  Package,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { OmiSubPage } from "./OmiSiteHeader";

interface OmiSiteFooterProps {
  onNavigate: (page: OmiSubPage) => void;
}

export function OmiSiteFooter({ onNavigate }: OmiSiteFooterProps) {
  return (
    <footer className="bg-[#0D152D] text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Feature Banner */}
        <div className="rounded-xl bg-[#14224D] p-7 sm:p-9 mb-14 border border-slate-700/80 shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 px-2.5 py-1 text-xs font-semibold text-orange-300 border border-white/10">
                London Operations Centre • Park Royal NW10
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl font-black text-white tracking-tight">
                Plan Your Upcoming Commercial Office Relocation
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
                Book a free London site survey with our senior move directors. We'll inspect premises access, lift capacities, crate requirements, and supply an itemised fixed proposal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onNavigate("quote");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#F57619] px-6 py-3 text-sm font-bold text-white hover:bg-[#d86c1e] transition-colors shadow-sm"
              >
                <span>Request Move Proposal</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href="tel:02031883001"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="size-4 text-[#F57619]" />
                <span>020 3188 3001</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Column Corporate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1 & 2: About OMI */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded bg-[#16254F] flex items-center justify-center text-white font-black text-base border border-white/10">
                OMI
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block leading-none">
                  OFFICE MOVING
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#F57619] uppercase block mt-0.5">
                  INTERNATIONAL
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Established in 1989, Office Moving International Ltd provides commercial office relocations, IT transitions, certified zero-landfill clearance, and secure storage across London and the South East.
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 rounded bg-slate-800/90 px-2.5 py-1 border border-slate-700/60 text-[11px]">
                <ShieldCheck className="size-3 text-[#F57619]" />
                36+ Years Trading
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-slate-800/90 px-2.5 py-1 border border-slate-700/60 text-[11px]">
                <Recycle className="size-3 text-emerald-400" />
                Zero-to-Landfill
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-slate-800/90 px-2.5 py-1 border border-slate-700/60 text-[11px]">
                <Clock className="size-3 text-sky-400" />
                Weekend Moves
              </span>
            </div>
          </div>

          {/* Col 3: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Commercial Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("relocation")}
                  className="hover:text-white transition-colors text-left"
                >
                  Commercial Office Relocations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("relocation")}
                  className="hover:text-white transition-colors text-left"
                >
                  Desktop IT &amp; Server Relocation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("clearance")}
                  className="hover:text-white transition-colors text-left"
                >
                  Office Clearance &amp; WEEE Recycling
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("storage")}
                  className="hover:text-white transition-colors text-left"
                >
                  Commercial Storage (Park Royal NW10)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("crates")}
                  className="hover:text-white transition-colors text-left"
                >
                  Plastic Crate Hire &amp; Packing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Sectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Sectors &amp; Coverage
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#F57619]" />
                <span>NHS Trusts &amp; Healthcare</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#F57619]" />
                <span>Corporate &amp; Financial Services</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#F57619]" />
                <span>Media &amp; Creative Agencies</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#F57619]" />
                <span>City of London, West End &amp; EC</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#F57619]" />
                <span>Canary Wharf &amp; Docklands</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Depot */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Depot Operations
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 shrink-0 text-[#F57619] mt-0.5" />
                <span>37-43 Gorst Road, Park Royal, London NW10 6LA</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="size-3.5 shrink-0 text-[#F57619]" />
                <a
                  href="tel:02031883001"
                  className="font-bold text-white hover:text-[#F57619] transition-colors"
                >
                  020 3188 3001
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="size-3.5 shrink-0 text-[#F57619] mt-0.5" />
                <a
                  href="mailto:info@officemovinginternational.co.uk"
                  className="text-slate-300 hover:text-white transition-colors break-all"
                >
                  info@officemovinginternational.co.uk
                </a>
              </div>

              <div className="pt-1 text-[11px] text-slate-500">
                Operating Hours: 24/7 Phased Weekend &amp; Scheduled Relocations.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Office Moving International Ltd. Registered in England &amp; Wales.
          </p>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms &amp; Conditions</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Cookies Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Environmental Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
