import { useState } from "react";
import {
  ShieldCheck,
  Clock,
  PhoneCall,
  Recycle,
  Award,
  Building2,
  CalendarCheck,
  Phone,
  ChevronDown,
  ArrowRight,
  FileText,
  MapPin,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { OmiQuoteWizard, OmiMode, OmiQuotePrefill } from "@/components/omi/OmiQuoteWizard";
import { OmiSubPage } from "@/components/omi/OmiSiteHeader";
import { cn } from "@/lib/utils";

interface OmiQuotePageProps {
  initialMode?: OmiMode;
  prefill?: OmiQuotePrefill;
  onNavigateHome?: () => void;
  onNavigate?: (page: OmiSubPage) => void;
}

const OMI_ASSURANCES = [
  {
    icon: CalendarCheck,
    title: "Free London On-Site Survey",
    body: "Every quotation can be paired with an in-person premises walkthrough by our senior surveyors to audit access, lift dimensions, parking suspensions, and crate counts.",
    highlight: true,
  },
  {
    icon: Clock,
    title: "Zero Business Downtime Guarantee",
    body: "Scheduled Friday evening to Monday morning transitions ensuring your staff return to fully reconnected PCs, dual-screens, and ready-to-work desks.",
  },
  {
    icon: Award,
    title: "Dedicated Senior Move Manager",
    body: "A single experienced contact oversees CAD floor layouts, crate deliveries, IT patching, and on-site crews from start to sign-off.",
  },
  {
    icon: Recycle,
    title: "Zero-to-Landfill Eco Pledge",
    body: "Sustainable furniture re-homing to schools and charities, with certified WEEE electrical recycling and complete waste transfer notes provided.",
  },
  {
    icon: FileText,
    title: "100% Fixed-Price Proposal",
    body: "Itemised, transparent commercial proposals with guaranteed costs and zero hidden fees. Nothing is booked until you approve the schedule.",
  },
];

const OMI_FAQS = [
  {
    q: "Can you carry out our office relocation over a weekend?",
    a: "Yes. The vast majority of our commercial moves take place between Friday 5:00 PM and Sunday evening. This ensures that your business maintains operational continuity throughout the working week and staff resume work on Monday morning without interruption.",
  },
  {
    q: "How does the Free London Site Survey work?",
    a: "One of our senior commercial relocation surveyors will visit both your current workplace and your new destination. We assess goods lifts, door widths, parking suspensions, loading bays, IT infrastructure, and count exact crate requirements so your quotation is 100% accurate with no surprise charges.",
  },
  {
    q: "What types of plastic crates do you supply?",
    a: "We supply heavy-duty LC3 lidded personal desk crates (nesting and lockable with security numbered seals), specialized IT6 computer crates with internal cushioning for desktop PCs and monitors, meter crates for filing archives, and roll cages for rapid floor transit.",
  },
  {
    q: "Do you handle IT disconnect and reconnect?",
    a: "Yes. Our trained technicians can disconnect desktop computers, dual-monitor mounts, telephony, and docking stations, bag and tag all cabling, transport them in anti-static foam crates, and reconnect them according to your new desk plan.",
  },
  {
    q: "What happens to redundant or unwanted office furniture?",
    a: "Under our licensed waste carrier credentials, we operate a strict zero-to-landfill policy. We prioritize re-homing usable furniture to schools and charities, followed by material recycling (metal, wood, plastic). Full waste transfer documentation and WEEE certificates of destruction are provided.",
  },
];

export function OmiQuotePage({
  initialMode = "relocation",
  prefill,
  onNavigateHome,
  onNavigate,
}: OmiQuotePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-slate-50/50 py-8 sm:py-12 md:py-16 text-slate-900 selection:bg-[#F57619] selection:text-white pb-24 lg:pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Navigation Breadcrumb & Header Title */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          {onNavigateHome && (
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#101B3B] mb-3.5 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="size-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Return to Overview</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-200/90 px-3 py-1.5 text-xs font-bold text-[#101B3B] shadow-2xs mb-3">
            <span className="size-2 rounded-full bg-[#F57619]" />
            <span>Established 1989 • 36+ Years London Commercial Relocation Authority</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#101B3B] leading-tight">
            Request an Itemised Commercial Proposal
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Engineered for London and South East businesses. Provide your move specifications below for a guaranteed fixed price and free on-site survey.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:gap-10 items-start">
          {/* Left Column: Quote Wizard */}
          <div>
            <OmiQuoteWizard
              initialMode={initialMode}
              prefill={prefill}
              onNavigateHome={onNavigateHome}
            />
          </div>

          {/* Right Column: Assurances & Credentials Sidebar */}
          <div className="space-y-6">
            {/* Direct Phone Dispatch Card */}
            <div className="rounded-2xl border border-[#1E2E5D] bg-gradient-to-br from-[#0C152F] via-[#101B3B] to-[#14224D] text-white p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                  <PhoneCall className="size-4 text-[#F57619]" />
                  <span>Immediate Telephone Dispatch</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Support
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                Speak Directly With a Move Director
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                Planning an upcoming tender, multi-floor consolidation, or require an on-site survey within 48 hours? Our Park Royal operations controllers are on hand to advise.
              </p>

              <a
                href="tel:02031883001"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#F57619] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#d86c1e] transition-all shadow-md shadow-orange-500/20 active:scale-[0.99]"
              >
                <Phone className="size-4" />
                <span>Call 020 3188 3001</span>
              </a>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-300 pt-3 border-t border-white/10">
                <span>Depot: Park Royal NW10 6LA</span>
                <span className="text-slate-300 font-medium">Mon–Fri 8am–7pm • Sat 9am–4pm</span>
              </div>
            </div>

            {/* Assurances List */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xl space-y-4 text-slate-900">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#F57619]" />
                  <h2 className="font-extrabold text-[#101B3B] text-xs uppercase tracking-wide">
                    The OMI Commercial Guarantee
                  </h2>
                </div>
                <span className="text-[10px] font-bold text-[#F57619] bg-[#F57619]/10 px-2.5 py-0.5 rounded border border-[#F57619]/20 uppercase">
                  Audited
                </span>
              </div>

              <ul className="space-y-3">
                {OMI_ASSURANCES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all",
                        item.highlight
                          ? "border-orange-200/90 bg-orange-50/50"
                          : "border-slate-100 bg-slate-50/70"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "size-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs",
                            item.highlight
                              ? "bg-[#F57619] text-white"
                              : "bg-[#101B3B] text-white"
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Public Sector Accreditations Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>NHS &amp; Public Sector Approved Supplier</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">£10M Insured</span>
            </div>
          </div>
        </div>

        {/* Commercial Moving FAQs */}
        <div className="mt-16 max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#F57619]" />
              <span className="text-xs font-bold uppercase tracking-wide text-[#101B3B]">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#101B3B] mt-1 tracking-tight">
              Commercial Move Specifications &amp; Survey Logistics
            </h2>
          </div>

          <div className="space-y-2.5">
            {OMI_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-[#101B3B] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3",
                        isOpen && "rotate-180 text-[#F57619]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
