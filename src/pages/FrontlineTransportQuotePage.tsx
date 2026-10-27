import {
  ShieldCheck,
  Award,
  Truck,
  Trash2,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Star,
  Quote,
  Box,
  Layers,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Package,
} from "lucide-react";
import { FrontlineQuoteWizard } from "@/components/frontline/FrontlineQuoteWizard";
import { FrontlineSiteHeader } from "@/components/frontline/FrontlineSiteHeader";
import { FrontlineSiteFooter } from "@/components/frontline/FrontlineSiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const FRONTLINE_ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Environment Agency Registered",
    body: "Fully licensed Upper-Tier Waste Carrier. We ensure legal compliance, eco-friendly recycling, and official waste transfer notes on every job.",
    badge: "Licensed Carrier",
    isLicensed: true,
  },
  {
    icon: Award,
    title: "Fully Insured Goods & Transit",
    body: "Comprehensive Goods in Transit insurance and £2M+ Public Liability cover for total peace of mind on all house removals and courier freight.",
    badge: "£2M+ Cover",
  },
  {
    icon: Truck,
    title: "Versatile Dedicated Van Fleet",
    body: "From agile small vans to Long Wheel Base and Luton box vans equipped with 500kg hydraulic tail lifts, straps, and protective transit blankets.",
  },
  {
    icon: Clock,
    title: "Same-Day & Scheduled Availability",
    body: "Fast response across Brownhills, Walsall, Birmingham, Wolverhampton, and nationwide UK capabilities for planned or urgent moves.",
  },
  {
    icon: Sparkles,
    title: "100% Free Fixed-Price Quote",
    body: "Itemised, transparent pricing with zero surprise extras or hidden fees. Reviewed by real logistics coordinators.",
  },
];

const REVIEWS = [
  {
    quote: "Frontline Transport handled our 3-bedroom house removal from Walsall to Lichfield flawlessly. The tail-lift Luton van made loading heavy oak wardrobes effortless.",
    author: "Mark & Claire H.",
    location: "Walsall, West Midlands",
  },
  {
    quote: "Cleared out my late uncle's garage and property in Brownhills. Prompt arrival, swept everything clean, and gave us the waste transfer paperwork right away.",
    author: "Gary D.",
    location: "Brownhills, WS8",
  },
  {
    quote: "Used Frontline for an urgent pallet delivery to Birmingham city centre. Collected within the hour and delivered on time. Outstanding communication.",
    author: "Apex Engineering Ltd",
    location: "Birmingham",
  },
];

const FLEET_ITEMS = [
  {
    name: "Small Van",
    desc: "Ideal for urgent documents, parcels, single small furniture items, and express parts.",
    capacity: "Up to 500 kg payload",
  },
  {
    name: "Short & Long Wheel Base (SWB / LWB)",
    desc: "Versatile panel vans for medium furniture, appliances, student rooms, or trade deliveries.",
    capacity: "Up to 1,200 kg payload",
  },
  {
    name: "Luton Box Van with 500kg Tail Lift",
    desc: "Spacious box van with hydraulic lift, perfect for full home removals, bulky clearances, and pallets.",
    capacity: "600+ cu ft volume",
  },
  {
    name: "Multi-Vehicle / HGV",
    desc: "Large-scale commercial relocations, warehouse freight, and multiple van deployments.",
    capacity: "High-capacity transport",
  },
];

export function FrontlineTransportQuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-950">
      <FrontlineSiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-slate-900 text-white py-12 sm:py-16 md:py-20 border-b border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider shadow-xs">
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                <span>West Midlands &amp; UK Nationwide • Environment Agency Licensed</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Get a Free Removals, Waste Clearance &amp; Courier Quote
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto pt-1">
                We move, remove, and deliver your stuff. Professional, hassle-free services across Brownhills, Walsall, Birmingham, Wolverhampton, Lichfield, and beyond.
              </p>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-3.5 py-2 border border-slate-700 shadow-2xs">
                  <ShieldCheck className="size-4 text-amber-400" />
                  <span>Licensed Waste Carrier</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-3.5 py-2 border border-slate-700 shadow-2xs">
                  <Truck className="size-4 text-amber-400" />
                  <span>Luton Van Tail Lift Fleet</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-3.5 py-2 border border-slate-700 shadow-2xs">
                  <Award className="size-4 text-amber-400" />
                  <span>Goods in Transit Insured</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-3.5 py-2 border border-slate-700 shadow-2xs">
                  <Clock className="size-4 text-amber-400" />
                  <span>Same-Day &amp; Fixed Pricing</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Form & Assurances Section */}
        <section id="quote-section" className="py-10 sm:py-14 md:py-18">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
              <Reveal>
                <div id="quote-form">
                  <FrontlineQuoteWizard />
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:pt-1">
                <div id="why-frontline" className="space-y-6">
                  {/* Why Choose Frontline List */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Why Choose Frontline Transport
                    </span>
                    <ul className="grid gap-3.5">
                      {FRONTLINE_ASSURANCES.map(
                        ({ icon: Icon, title, body, badge, isLicensed }) => (
                          <li
                            key={title}
                            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                                <Icon className="size-5" />
                              </span>
                              {badge && (
                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-bold text-slate-700 uppercase tracking-wide border border-slate-200">
                                  {badge}
                                </span>
                              )}
                            </div>
                            <h2 className="mt-3 text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                              {title}
                              {isLicensed && (
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                            </h2>
                            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                              {body}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Direct Contact Card */}
                  <div className="rounded-3xl bg-[#0f172a] p-6 text-white shadow-xl border border-slate-800 space-y-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                        <MessageSquare className="size-3.5" />
                        <span>Need An Immediate Answer?</span>
                      </span>
                      <h2 className="mt-1 text-lg font-bold text-white tracking-tight">
                        Call or WhatsApp Our Team
                      </h2>
                      <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                        For awkward staircases, tight timeframes, photos of waste loads, or urgent courier dispatch, reach our Brownhills logistics hub directly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <a
                        href="tel:01543630122"
                        className="flex items-center gap-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 p-3 text-slate-950 transition-colors font-bold text-xs"
                      >
                        <Phone className="size-4 shrink-0" />
                        <div>
                          <span className="block text-[0.625rem] text-slate-900 font-medium">Office Phone</span>
                          <span className="font-extrabold text-sm">01543 630 122</span>
                        </div>
                      </a>

                      <a
                        href="tel:07761098483"
                        className="flex items-center gap-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 p-3 text-white transition-colors border border-slate-700 text-xs"
                      >
                        <Phone className="size-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="block text-[0.625rem] text-slate-400 font-normal">Mobile / WhatsApp</span>
                          <span className="font-bold text-sm text-amber-400">07761 098 483</span>
                        </div>
                      </a>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3.5 text-amber-400 shrink-0" />
                        <a
                          href="mailto:enquiries@frontlinetransport.co.uk"
                          className="hover:text-amber-400 transition-colors"
                        >
                          enquiries@frontlinetransport.co.uk
                        </a>
                      </div>
                      <div className="flex items-start gap-2 pt-0.5">
                        <MapPin className="size-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>Office 5, Toll Point Trading Estate, Brownhills, WS8 6JP</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Reviews Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        West Midlands Customer Reviews
                      </span>
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 divide-y divide-slate-100">
                      {REVIEWS.map((rev, idx) => (
                        <div key={idx} className={idx > 0 ? "pt-3" : ""}>
                          <p className="text-xs text-slate-600 italic leading-relaxed">
                            "{rev.quote}"
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-xs">
                            <strong className="text-slate-900 font-semibold">{rev.author}</strong>
                            <span className="text-amber-600 font-medium">{rev.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Detailed Services Pillars */}
        <section id="services" className="bg-white py-14 sm:py-18 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                What We Do
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Core Services in the West Midlands
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you are moving home, needing an office cleared, or require same-day parcel or pallet transport, Frontline Transport has it covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: Removals */}
              <div
                id="removals"
                className="rounded-2xl border border-slate-200 p-6 bg-slate-50/60 hover:border-amber-400 hover:shadow-md transition-all space-y-3.5"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <Truck className="size-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Home &amp; Flat Removals</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Local and nationwide home removals. From student flats to large family residences. Includes protective furniture blankets, straps, and handling for heavy items.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 font-medium pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>House &amp; apartment relocations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Packing boxes &amp; materials supplied</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Furniture dismantling &amp; reassembly</span>
                  </li>
                </ul>
              </div>

              {/* Pillar 2: Waste Clearance */}
              <div
                id="waste-clearance"
                className="rounded-2xl border border-slate-200 p-6 bg-slate-50/60 hover:border-amber-400 hover:shadow-md transition-all space-y-3.5"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <Trash2 className="size-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Waste &amp; Rubbish Clearance</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Skip hire alternative without permit hassle. We load and sweep up. Environment Agency licensed carrier delivering full waste transfer documentation.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 font-medium pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Full house, loft, &amp; garage clearances</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Commercial trade rubbish &amp; builders waste</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Environment Agency Waste Transfer Notes</span>
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Delivery Services */}
              <div
                id="delivery"
                className="rounded-2xl border border-slate-200 p-6 bg-slate-50/60 hover:border-amber-400 hover:shadow-md transition-all space-y-3.5"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <Package className="size-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Same-Day Courier &amp; Delivery</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Rapid collection and prompt delivery for pallets, machinery, retail collections, store pickups, or urgent consignments across the UK.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 font-medium pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Same-day and next-day courier runs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>Palletized goods &amp; commercial distribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>eBay, Facebook &amp; store collections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className="bg-slate-100 py-12 sm:py-16 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Modern Transport Fleet
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Vehicles Sized for Every Job
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clean, reliable, and properly equipped vehicles ready to transport your items safely.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FLEET_ITEMS.map((v) => (
                <div
                  key={v.name}
                  className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="inline-flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <Truck className="size-4" />
                    </div>
                    <h5 className="text-sm font-bold text-slate-900">{v.name}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[0.68rem] font-bold text-amber-600 uppercase tracking-wide">
                      {v.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="bg-white py-12 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="rounded-3xl bg-[#0f172a] text-white p-6 sm:p-10 shadow-xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <MapPin className="size-3.5" />
                    <span>Depot Based in Brownhills, Walsall</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Covering the West Midlands &amp; All UK Regions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Centrally located on Lichfield Road in Brownhills, Walsall (WS8 6JP), we provide fast access across Birmingham, Wolverhampton, Dudley, Cannock, Lichfield, Sutton Coldfield, Tamworth, and the motorway network for nationwide UK transit.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs">
                    <a
                      href="tel:01543630122"
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 font-bold text-slate-950 transition-colors"
                    >
                      <Phone className="size-4" />
                      <span>01543 630 122</span>
                    </a>
                    <a
                      href="#quote-form"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 font-semibold text-white border border-slate-700 transition-colors"
                    >
                      <span>Request Quote Online</span>
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-800/60 p-5 border border-slate-700/60 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Regular Service Locations:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                    {[
                      "Brownhills (WS8)",
                      "Walsall (WS1-WS9)",
                      "Lichfield (WS13)",
                      "Birmingham (B1-B45)",
                      "Wolverhampton (WV)",
                      "Cannock (WS11)",
                      "Dudley (DY1)",
                      "Sutton Coldfield (B72)",
                      "Solihull (B91)",
                      "Tamworth (B77)",
                      "Coventry (CV1)",
                      "UK Nationwide",
                    ].map((loc) => (
                      <span key={loc} className="flex items-center gap-1 text-[0.72rem]">
                        <CheckCircle2 className="size-3 text-amber-400 shrink-0" />
                        <span>{loc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FrontlineSiteFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default FrontlineTransportQuotePage;
