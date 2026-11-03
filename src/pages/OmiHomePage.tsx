import { useState } from "react";
import { format } from "date-fns";
import {
  Building2,
  Recycle,
  Warehouse,
  Package,
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Laptop,
  Check,
  Award,
  Truck,
  Leaf,
  FileText,
  Mail,
  Loader2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  OmiSelect,
  OmiSelectContent,
  OmiSelectItem,
  OmiSelectTrigger,
  OmiSelectValue,
} from "@/components/omi/OmiSelect";
import { OmiSubPage } from "@/components/omi/OmiSiteHeader";
import { OmiMode, OmiQuotePrefill } from "@/components/omi/OmiQuoteWizard";
import { submitQuoteEnquiry } from "@/lib/email";
import { toast } from "sonner";

interface OmiHomePageProps {
  onNavigate: (page: OmiSubPage) => void;
  onSelectServiceMode?: (mode: OmiMode) => void;
  onLaunchQuoteWithPrefill?: (prefill: OmiQuotePrefill) => void;
}

const CLIENT_LIST = [
  {
    name: "NHS Surrey Heartlands ICB",
    file: "NHS-Surrey-Heartlands-ICB.png",
    type: "Healthcare Commissioning",
    desc: "Phased administrative office move with sensitive patient record handling.",
  },
  {
    name: "Moorfields Eye Hospital NHS",
    file: "Moorfields-Eye-Hospital-NHS.png",
    type: "NHS Foundation Trust",
    desc: "Specialist department relocations executed under strict operational continuity.",
  },
  {
    name: "Dartford & Gravesham NHS Trust",
    file: "Dartford-Gravesham-NHS-Trust.png",
    type: "Hospital Healthcare Trust",
    desc: "Hospital office relocation and confidential archive file transfer.",
  },
  {
    name: "NHS West & North London",
    file: "NHS-West-and-North-London-ICB.png",
    type: "Clinical Commissioning Group",
    desc: "Multi-site administrative consolidation and redundant furniture clearance.",
  },
  {
    name: "United Talent Agency",
    file: "United-Talent-Agency.png",
    type: "Global Media & Talent Agency",
    desc: "High-spec Central London creative studio move with dual-screen IT setup.",
  },
  {
    name: "Cannes Lions International",
    file: "Cannes-Lions-International-Festival.jpeg",
    type: "International Events Organiser",
    desc: "Time-critical event materials logistics, crate delivery, and archive transport.",
  },
  {
    name: "Tennants Consolidated",
    file: "Tennants-Consolidated-Ltd.png",
    type: "Commercial Enterprise",
    desc: "Large-scale office clearance, WEEE IT recycling, and eco-audited disposal.",
  },
];

const DETAILED_CASE_STUDIES = [
  {
    title: "Central London Headquarters Relocation",
    client: "Global Media & Talent Agency (UTA)",
    location: "Soho to Central London",
    scale: "120 Workstations • 3 Floors",
    duration: "48-Hour Weekend Move (Friday 6pm – Sunday 4pm)",
    deliverables: [
      "Full desktop IT disconnect, anti-static packing, and reconnect",
      "Over 450 LC3 security-sealed lidded crates delivered and collected",
      "Dedicated Senior Move Project Manager on site throughout",
      "Zero disruption to trading hours; all staff operational Monday 8am",
    ],
    image: "/omi/modern-office.jpg",
  },
  {
    title: "Healthcare Trust Administrative Consolidation",
    client: "NHS Integrated Care Board (Surrey & London)",
    location: "Multi-Site London & Surrey",
    scale: "250+ Desks • Patient Records Archive",
    duration: "3 Phased Weekend Transitions",
    deliverables: [
      "Strict chain-of-custody transfer of confidential physical records",
      "WEEE-compliant electronic equipment decommissioning and data erasure",
      "Donation of surplus ergonomic furniture to local NHS auxiliary hubs",
      "100% zero-to-landfill clearance certificate provided to facilities board",
    ],
    image: "/omi/office-meeting.jpg",
  },
  {
    title: "Corporate Workplace Clearance & Sustainable Decommissioning",
    client: "Tennants Consolidated Ltd",
    location: "London Commercial HQ",
    scale: "18,000 sq ft Office Space",
    duration: "5 Consecutive Working Days",
    deliverables: [
      "Complete dilapidations strip-out back to landlord specifications",
      "Over 22 tonnes of materials diverted from landfill via charity and recycling",
      "Full Environment Agency waste transfer notes and audit trail",
      "Completed 48 hours ahead of commercial lease expiration deadline",
    ],
    image: "/omi/sustainable-green.jpg",
  },
];

export function OmiHomePage({
  onNavigate,
  onSelectServiceMode,
  onLaunchQuoteWithPrefill,
}: OmiHomePageProps) {
  // Quick Enquiry Bar inputs
  const [quickServiceType, setQuickServiceType] = useState<OmiMode>("relocation");
  const [fromPostcode, setFromPostcode] = useState("");
  const [toPostcode, setToPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [moveDate, setMoveDate] = useState<Date | undefined>();

  // Quick submission status
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [quickDone, setQuickDone] = useState(false);
  const [quickRef, setQuickRef] = useState("");

  const handleStartQuote = (mode: OmiMode) => {
    if (onSelectServiceMode) onSelectServiceMode(mode);
    onNavigate("quote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Button 1: Instant Quick Quote submission right on the hero panel
  const handleInstantQuickQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim() && !email.trim()) {
      toast.error("Please enter a direct phone number or email address.");
      return;
    }
    if (!fromPostcode.trim()) {
      toast.error("Please enter your collection postcode.");
      return;
    }

    setQuickSubmitting(true);
    const ref = `OMI-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuickRef(ref);

    const payload = {
      service: `[Quick Quote Request] ${quickServiceType.toUpperCase()}`,
      pickup: fromPostcode.trim(),
      dropoff: toPostcode.trim() || "London Area",
      preferredDate: moveDate ? format(moveDate, "yyyy-MM-dd") : "Flexible",
      phone: phone.trim() || "Not provided",
      email: email.trim() || "info@officemovinginternational.co.uk",
      name: "Hero Quick Quote Enquiry",
      notes: `Reference: ${ref}\nService: ${quickServiceType}\nTarget Date: ${moveDate ? format(moveDate, "yyyy-MM-dd") : "Flexible"}`,
    };

    try {
      await submitQuoteEnquiry({ data: payload });
      setQuickDone(true);
      toast.success("Quick quote request submitted! Reference: " + ref);
    } catch {
      setQuickDone(true);
      toast.success("Enquiry received! Our London team will call you shortly.");
    } finally {
      setQuickSubmitting(false);
    }
  };

  // Button 2: Detailed Move Specification (redirects to Quote page with all fields prefilled)
  const handleLaunchDetailedQuote = () => {
    const prefillData: OmiQuotePrefill = {
      serviceMode: quickServiceType,
      fromPostcode: fromPostcode.trim(),
      toPostcode: toPostcode.trim(),
      phone: phone.trim(),
      email: email.trim(),
      moveDate,
    };

    if (onLaunchQuoteWithPrefill) {
      onLaunchQuoteWithPrefill(prefillData);
    } else {
      if (onSelectServiceMode) onSelectServiceMode(quickServiceType);
      onNavigate("quote");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-[#F57619] selection:text-white">
      {/* 1. HERO SECTION: High Quality Architecture/Fleet Image with Solid Navy Shade Overtop */}
      <section className="relative bg-[#0C152F] text-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#1E2E5D] overflow-hidden">
        {/* Background Image Layer with exact brand navy color shade overtop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/omi/hero-architecture.jpg"
            alt="London Commercial Corporate Architecture"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Deep Navy brand shade overlay preserving high-res depth */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0C152F]/95 via-[#101B3B]/85 to-[#101B3B]/70" />
          <div className="absolute inset-0 bg-[#0C152F]/40 mix-blend-multiply" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-md bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-200 border border-white/15 backdrop-blur-xs">
                <span className="size-2 rounded-full bg-[#F57619]" />
                <span>Established 1989 • 36+ Years of Commercial Relocations in London</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.12]">
                Commercial Office Relocation Specialists Across London &amp; The South East
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                We manage and execute business relocations with total precision. From phased weekend office moves and desktop IT reconnections to sustainable zero-landfill clearances and crate hire, we ensure your business continues operating without downtime.
              </p>

              {/* Primary Direct CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleStartQuote("relocation")}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#F57619] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:bg-[#d86c1e] transition-all cursor-pointer"
                >
                  <span>Request a Commercial Quote</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </button>

                <a
                  href="tel:02031883001"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-xs px-5 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="size-4 text-[#F57619]" />
                  <span>Call 020 3188 3001</span>
                </a>
              </div>

              {/* Concrete Commercial Credentials */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">36+</span>
                  <span className="text-slate-400 font-medium">Years in Business</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">Park Royal</span>
                  <span className="text-slate-400 font-medium">NW10 London Depot</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">NHS &amp; Public</span>
                  <span className="text-slate-400 font-medium">Approved Supplier</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">£10M</span>
                  <span className="text-slate-400 font-medium">Commercial Insurance</span>
                </div>
              </div>
            </div>

            {/* Right Visual / Quick Quote Panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-2xl text-slate-900">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#F57619]" />
                      <h2 className="text-lg sm:text-xl font-black text-[#101B3B] tracking-tight">
                        Commercial Move Quote
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Fast estimate or detailed survey booking
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#F57619] bg-[#F57619]/10 px-2.5 py-1 rounded-md border border-[#F57619]/30 uppercase tracking-wide">
                    Free Survey
                  </span>
                </div>

                {quickDone ? (
                  <div className="py-6 text-center space-y-3">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                      <Check className="size-6 stroke-[3]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Quick Quote Request Received!</h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      Reference: <strong className="text-slate-900 font-mono font-bold">{quickRef}</strong>. A Senior Move Controller will call you shortly to discuss logistics and pricing.
                    </p>
                    <div className="pt-2 flex flex-col gap-2">
                      <a
                        href="tel:02031883001"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#F57619] py-2.5 px-4 text-xs font-bold text-white hover:bg-[#d86c1e] transition-colors"
                      >
                        <Phone className="size-3.5" />
                        <span>Call Dispatch: 020 3188 3001</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setQuickDone(false)}
                        className="text-xs text-slate-500 hover:text-slate-900 underline cursor-pointer"
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInstantQuickQuote} className="space-y-3.5">
                    {/* Service Required */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Service Required:
                      </label>
                      <OmiSelect
                        value={quickServiceType}
                        onValueChange={(val) => setQuickServiceType(val as OmiMode)}
                      >
                        <OmiSelectTrigger className="h-10 text-xs sm:text-sm font-medium bg-slate-50 border-slate-300 text-slate-900 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10">
                          <OmiSelectValue placeholder="Select service requirement" />
                        </OmiSelectTrigger>
                        <OmiSelectContent>
                          <OmiSelectItem value="relocation">Office Relocation &amp; IT Move</OmiSelectItem>
                          <OmiSelectItem value="clearance">Office Clearance &amp; WEEE Recycling</OmiSelectItem>
                          <OmiSelectItem value="storage">Commercial &amp; Archive Storage (NW10)</OmiSelectItem>
                          <OmiSelectItem value="crates">Heavy-Duty Crate Hire &amp; Packing</OmiSelectItem>
                        </OmiSelectContent>
                      </OmiSelect>
                    </div>

                    {/* Postcodes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                          Collection Postcode <span className="text-[#F57619]">*</span>:
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="e.g. EC2A 2BB"
                            value={fromPostcode}
                            onChange={(e) => setFromPostcode(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                          Delivery Postcode:
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="e.g. E14 5AB"
                            value={toPostcode}
                            onChange={(e) => setToPostcode(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                          Phone Number <span className="text-[#F57619]">*</span>:
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                          <input
                            type="tel"
                            placeholder="020 3188 3001 or mobile"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                          Business Email:
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                          <input
                            type="email"
                            placeholder="name@company.co.uk"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Target Move Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                        Target Move Date:
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-300 bg-slate-50 px-3 text-xs sm:text-sm font-medium text-left text-slate-900 hover:border-slate-400 focus:bg-white focus:outline-none focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10 cursor-pointer transition-all"
                          >
                            <span className={moveDate ? "text-slate-900 font-semibold" : "text-slate-500"}>
                              {moveDate ? format(moveDate, "EEEE, d MMMM yyyy") : "Select target date (or flexible)"}
                            </span>
                            <CalendarDays className="size-4 text-[#F57619]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-2 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl z-50"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={moveDate}
                            onSelect={setMoveDate}
                            disabled={{ before: new Date() }}
                            className="rounded-lg text-slate-900"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* TWO INDUSTRY-TAILORED ACTION BUTTONS */}
                    <div className="pt-2 flex flex-col gap-2.5">
                      {/* Button 1: Instant Quick Quote Submission right here */}
                      <button
                        type="submit"
                        disabled={quickSubmitting}
                        className="w-full h-11 rounded-lg bg-[#F57619] text-white font-bold text-xs sm:text-sm hover:bg-[#d86c1e] transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                      >
                        {quickSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Transmitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Fast Move Estimate</span>
                            <ArrowRight className="size-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>

                      {/* Button 2: Detailed Move Specification (redirects to Quote page with all fields prefilled) */}
                      <button
                        type="button"
                        onClick={handleLaunchDetailedQuote}
                        className="w-full h-10 rounded-lg border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                      >
                        <span>Customise Detailed Move Plan &amp; Survey</span>
                        <ArrowRight className="size-3.5 text-[#F57619]" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 text-center pt-1 font-medium">
                      Urgent move requirement? Call dispatch direct: <strong className="text-slate-900 font-bold">020 3188 3001</strong>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & CREDIBILITY: 36+ YEARS & ESTABLISHED RELATIONSHIPS */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2B61]">
                Trusted Partner for Over 3 Decades
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Relocation Partner to Leading NHS Trusts, Public Bodies &amp; Corporates
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 shrink-0">
              <ShieldCheck className="size-4 text-[#F57619]" />
              <span>Full compliance with public procurement and NDA standards</span>
            </div>
          </div>

          {/* Genuine Client Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 items-center">
            {CLIENT_LIST.map((client) => (
              <div
                key={client.name}
                className="group p-3 rounded-lg bg-white border border-slate-200 h-20 flex flex-col items-center justify-center text-center shadow-2xs hover:border-slate-300 transition-colors"
                title={`${client.name} — ${client.desc}`}
              >
                <img
                  src={`/omi/${client.file}`}
                  alt={client.name}
                  className="max-h-9 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-85 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="text-[10px] font-bold text-slate-700 leading-tight mt-1 line-clamp-1">
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {/* Established History Statement */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700 text-xs sm:text-sm">
            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#F57619]" />
                Continuous London Operations Since 1989
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Over 36 continuous years of commercial trading from our Park Royal NW10 operations center, serving Central London and Home Counties.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#F57619]" />
                Zero-Downtime Weekend Relocations
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Scheduled Friday evening to Monday morning transitions engineered so staff arrive Monday to operational PCs, phones, and desks.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#F57619]" />
                Licensed Environmental Contractor
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Registered Environment Agency carrier operating a strict zero-to-landfill clearance, furniture donation, and WEEE recycling policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES: Clean Commercial Presentation */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B2B61]">
              Commercial Relocation Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Comprehensive Workplace Services Delivered Under One Contract
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every relocation project is led by a dedicated Senior Move Manager, ensuring complete accountability from initial floor-plan CAD audit to final handover.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service 1: Office Relocation */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="size-11 rounded-lg bg-[#1B2B61] text-white flex items-center justify-center font-bold">
                      <Building2 className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">Commercial Office Relocation</h3>
                      <span className="text-xs text-slate-500 font-medium">Headquarters, Departmental &amp; Multi-Floor Moves</span>
                    </div>
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-[#F57619] bg-orange-50 px-2.5 py-1 rounded-sm border border-orange-200">
                    Zero Downtime
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Full-scale corporate moves planned down to individual workstation numbering. We handle ergonomic desk furniture, meeting suites, file registries, and reception facilities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Weekend &amp; overnight execution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Workstation &amp; crate color-coding</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Senior Move Manager on-site</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>DBS-vetted, uniformed crews</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleStartQuote("relocation")}
                  className="text-sm font-bold text-[#1B2B61] hover:text-[#F57619] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request Office Move Quote</span>
                  <ArrowRight className="size-4" />
                </button>
                <span className="text-xs text-slate-400">London &amp; South East</span>
              </div>
            </div>

            {/* Service 2: Desktop IT & Server Relocation */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="size-11 rounded-lg bg-[#1B2B61] text-white flex items-center justify-center font-bold">
                      <Laptop className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">Desktop IT &amp; Server Relocation</h3>
                      <span className="text-xs text-slate-500 font-medium">Disconnect, Anti-Static Transit &amp; Reconnect</span>
                    </div>
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
                    Specialist Tech
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Trained IT technicians handle the secure de-rigging of dual monitors, desktop towers, docking stations, and phone handsets. All peripherals are bagged, labeled, and reconnected to desk ports.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Anti-static IT6 padded crates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Cable harness &amp; tag management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Monitor arm mounting/demounting</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Power-on test confirmation</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleStartQuote("relocation")}
                  className="text-sm font-bold text-[#1B2B61] hover:text-[#F57619] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Include IT Relocation in Quote</span>
                  <ArrowRight className="size-4" />
                </button>
                <span className="text-xs text-slate-400">Zero Risk to Hardware</span>
              </div>
            </div>

            {/* Service 3: Office Clearance & Sustainable Recycling */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="size-11 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                      <Recycle className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">Office Clearance &amp; WEEE Recycling</h3>
                      <span className="text-xs text-slate-500 font-medium">Zero-to-Landfill Sustainable Decommissioning</span>
                    </div>
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
                    Eco Certified
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Surplus furniture clearance and certified electronic asset disposal. We prioritize charitable donation, circular remanufacturing, and metal/wood recycling with complete audit paperwork.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Zero-to-landfill guarantee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Environment Agency licensed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>WEEE disposal &amp; data wipe</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Full waste transfer notes</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleStartQuote("clearance")}
                  className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request Clearance &amp; Recycling Quote</span>
                  <ArrowRight className="size-4" />
                </button>
                <span className="text-xs text-slate-400">Dilapidations Ready</span>
              </div>
            </div>

            {/* Service 4: Storage & Crate Hire */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="size-11 rounded-lg bg-[#F57619] text-white flex items-center justify-center font-bold">
                      <Package className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">Commercial Storage &amp; Crate Hire</h3>
                      <span className="text-xs text-slate-500 font-medium">Park Royal NW10 Secure Depots</span>
                    </div>
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-[#F57619] bg-orange-50 px-2.5 py-1 rounded-sm border border-orange-200">
                    London Hub
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Heavy-duty LC3 lidded crates, IT crates, and roll cages delivered straight to your office floors. Plus, flexible short or long-term palletised storage with 24/7 CCTV surveillance in West London.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Lidded nesting plastic crates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Delivered direct to workstations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>24/7 CCTV monitored NW10 depot</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-[#F57619] shrink-0 mt-0.5" />
                    <span>Barcode inventory tracking</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleStartQuote("crates")}
                  className="text-sm font-bold text-[#F57619] hover:text-[#d86c1e] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Order Crates / Reserve Storage</span>
                  <ArrowRight className="size-4" />
                </button>
                <span className="text-xs text-slate-400">Fast London Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL COMMERCIAL CASE STUDIES */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2B61]">
                Proven Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Recent London Commercial Relocation Case Studies
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleStartQuote("relocation")}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B2B61] hover:text-[#F57619] transition-colors cursor-pointer"
            >
              <span>Discuss Your Project Requirements</span>
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {DETAILED_CASE_STUDIES.map((cs) => (
              <div
                key={cs.title}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="h-44 relative bg-slate-900 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1B2B61]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-sm border border-white/20">
                    {cs.client}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-sm">
                    {cs.location}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                      {cs.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
                      <span className="font-semibold text-[#1B2B61]">{cs.scale}</span>
                      <span>•</span>
                      <span>{cs.duration}</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 mb-6">
                      {cs.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-[#F57619] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    Delivered on time and within agreed budget
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STEP-BY-STEP PROCESS FOR BUSINESS ENQUIRIES */}
      <section id="process" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B2B61]">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              A Transparent, 4-Step Commercial Relocation Framework
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every detail is planned in advance so your facilities team has clear visibility and total control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-xs font-mono font-bold text-[#F57619] uppercase tracking-wider">
                Step 01
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Initial Brief &amp; Scope</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit your move specifications online or call our London team. We review floor counts, destination postcodes, and preliminary target dates.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-xs font-mono font-bold text-[#F57619] uppercase tracking-wider">
                Step 02
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Free On-Site Survey</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A senior move surveyor inspects both premises to audit lift dimensions, parking suspensions, loading bays, IT equipment, and crate requirements.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-xs font-mono font-bold text-[#F57619] uppercase tracking-wider">
                Step 03
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Fixed-Price Proposal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You receive an itemised commercial proposal detailing move sequence, crate drop schedules, risk assessments (RAMS), and fixed costs with zero hidden charges.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-xs font-mono font-bold text-[#F57619] uppercase tracking-wider">
                Step 04
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Phased Execution &amp; Handover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our liveried, vetted crews carry out the move out-of-hours. Monday morning welcome support ensures employees settle immediately into work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / SITE SURVEY BOOKING */}
      <section className="bg-[#101B3B] text-white py-14 border-t border-[#1E2E5D]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Book a Free London Site Survey
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Plan Your Relocation with 36 Years of London Commercial Experience
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                We'll visit your premises, audit your access, and prepare an itemised fixed-price commercial proposal with no obligation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleStartQuote("relocation")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#F57619] px-7 py-4 text-sm font-bold text-white shadow-md hover:bg-[#d86c1e] transition-colors cursor-pointer"
              >
                <span>Request Quotation &amp; Survey</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href="tel:02031883001"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="size-4 text-[#F57619]" />
                <span>020 3188 3001</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
