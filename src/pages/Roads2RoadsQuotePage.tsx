import {
  ShieldCheck,
  Award,
  Truck,
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
  Zap,
} from "lucide-react";
import { Roads2RoadsQuoteWizard } from "@/components/roads2roads/Roads2RoadsQuoteWizard";
import { Roads2RoadsSiteHeader } from "@/components/roads2roads/Roads2RoadsSiteHeader";
import { Roads2RoadsSiteFooter } from "@/components/roads2roads/Roads2RoadsSiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const R2R_ASSURANCES = [
  {
    icon: Zap,
    title: "24/7 Same-Day & Urgent Collection",
    body: "Available 24 hours a day, 7 days a week. For urgent items, our courier can collect within 60 minutes across London and nationwide UK.",
    badge: "24/7 Available",
  },
  {
    icon: Package,
    title: "Packets to Pallets Capabilities",
    body: "From urgent legal briefs, passports, and medical supplies to multiple heavy pallets and manufacturing machinery.",
    badge: "Any Load Size",
  },
  {
    icon: Truck,
    title: "Dedicated Direct Point-to-Point",
    body: "No hub delays, no sorting networks, and zero co-loading risk. The driver who collects your goods delivers them directly to the recipient.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured Goods in Transit",
    body: "Comprehensive Goods in Transit and Public Liability insurance protection for complete peace of mind on every journey.",
    badge: "Fully Covered",
  },
  {
    icon: Sparkles,
    title: "Cost-Effective Rates & Realistic Timings",
    body: "Transparent fixed pricing with no surprise add-ons. Reviewed by real coordinators with accurate delivery estimates.",
  },
];

const REVIEWS = [
  {
    quote: "Urgent contract documents needed delivering from our Fitzrovia office to Canary Wharf within 90 minutes. Roads2Roads had a driver on site in 25 mins and completed the handover seamlessly.",
    author: "James T.",
    location: "Fitzrovia, Central London",
  },
  {
    quote: "Transported two heavy pallets of exhibition audio equipment from London to the NEC in Birmingham. The Luton tail-lift van made loading effortless. Superb 24/7 communication.",
    author: "Elena R.",
    location: "London / Birmingham",
  },
  {
    quote: "Late-night urgent machine part required for a manufacturing facility in Manchester. Collected at 11pm and delivered before 4am. Lifesavers!",
    author: "David M.",
    location: "Apex Engineering",
  },
];

const FLEET_ITEMS = [
  {
    name: "Small Courier Van",
    desc: "Swift city transport for urgent envelopes, packets, small cartons, medical samples, and legal paperwork.",
    capacity: "Up to 500 kg payload",
  },
  {
    name: "Short & Long Wheel Base (SWB / LWB)",
    desc: "Versatile high-capacity panel vans for multiple boxes, machinery parts, trade freight, and up to 2-3 standard pallets.",
    capacity: "Up to 1,200 kg payload",
  },
  {
    name: "Luton Box Van with 500kg Tail Lift",
    desc: "Spacious box van equipped with a hydraulic tail lift for effortless loading of heavy pallets, crates, and bulky consignments.",
    capacity: "600+ cu ft volume / 1,200kg",
  },
  {
    name: "Dedicated Multi-Drop / Route Fleet",
    desc: "Regular B2B delivery schedules, inter-depot transfers, and timed drops tailored to your business operations.",
    capacity: "Scheduled contracts",
  },
];

export function Roads2RoadsQuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 antialiased selection:bg-[#25AAE1] selection:text-white overflow-x-hidden w-full font-sans">
      <Roads2RoadsSiteHeader />

      <main className="flex-1 w-full">
        {/* Hero Section matching Roads2Roads official light & airy overlay aesthetic */}
        <section className="relative bg-slate-100 overflow-hidden border-b border-slate-200">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
            style={{ backgroundImage: "url('/roads2roads-courier.jpg')" }}
          />
          {/* Luminous Light Overlay as per original theme.css (.overlay {background:rgba(255,255,255,0.7)}) */}
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

          <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
            {/* Centered Logo as on original homepage */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-md border border-slate-200/80 inline-flex items-center justify-center">
                <img
                  src="/roads2roads-logo.png"
                  alt="Roads2Roads Couriers"
                  className="h-10 sm:h-14 w-auto object-contain"
                />
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-[#25AAE1]/30 px-3.5 py-1 text-xs sm:text-sm font-bold text-[#007cb0] tracking-wide uppercase">
                <span className="size-2 rounded-full bg-[#25AAE1] animate-pulse" />
                <span>24/7 Same-Day Courier Service &bull; London &amp; Nationwide</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-tight">
                <span className="border-b-4 border-slate-950 pb-0.5">The</span> same-day delivery service.
              </h1>

              <h2 className="text-lg sm:text-2xl font-bold text-slate-700 tracking-tight">
                Cost-effective rates &bull; Realistic timings
              </h2>

              <div className="text-sm sm:text-base text-slate-600 space-y-1 font-normal max-w-xl mx-auto pt-1">
                <p>We can Transport anything from <strong>Packets to Pallets</strong>.</p>
                <p>For all your urgent special deliveries and consignments,</p>
                <p className="text-slate-900 font-bold"><strong>Roads2Roads</strong> is your #1 Choice.</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#quote-section"
                  className="px-6 py-3.5 rounded-2xl bg-[#449D44] hover:bg-[#398439] active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="tel:02034769656"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm sm:text-base shadow-xs transition-colors flex items-center gap-2"
                >
                  <Phone className="size-4 text-[#25AAE1]" />
                  <span>Call 0203 476 9656</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-700 font-semibold max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/90 border border-slate-200/90 py-2.5 px-3 shadow-2xs">
                  <Clock className="size-4 text-[#25AAE1]" />
                  <span>60-Min Collection</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/90 border border-slate-200/90 py-2.5 px-3 shadow-2xs">
                  <Package className="size-4 text-[#25AAE1]" />
                  <span>Packets to Pallets</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/90 border border-slate-200/90 py-2.5 px-3 shadow-2xs">
                  <ShieldCheck className="size-4 text-[#25AAE1]" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/90 border border-slate-200/90 py-2.5 px-3 shadow-2xs">
                  <Truck className="size-4 text-[#25AAE1]" />
                  <span>Tail Lift Fleet</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Quote & Assurances Section */}
        <section id="quote-section" className="py-10 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14 items-start">
              <Reveal>
                <div id="quote-form">
                  <Roads2RoadsQuoteWizard />
                </div>
              </Reveal>

              <Reveal delay={120} className="space-y-6">
                <div id="why-r2r" className="space-y-6">
                  {/* Assurances List */}
                  <div className="space-y-3.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007cb0]">
                      Why Choose Roads2Roads Couriers
                    </span>
                    <ul className="grid gap-3.5">
                      {R2R_ASSURANCES.map(({ icon: Icon, title, body, badge }) => (
                        <li
                          key={title}
                          className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="inline-flex size-9 sm:size-10 items-center justify-center rounded-xl bg-sky-50 text-[#25AAE1] shrink-0">
                              <Icon className="size-5" />
                            </span>
                            {badge && (
                              <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[0.625rem] font-bold text-[#007cb0] uppercase tracking-wide border border-sky-200/80">
                                {badge}
                              </span>
                            )}
                          </div>
                          <h2 className="mt-2.5 text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                            {title}
                          </h2>
                          <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                            {body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Urgent Contact Card */}
                  <div className="rounded-3xl bg-[#0b0f19] p-6 text-white shadow-xl border border-slate-800 space-y-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25AAE1] uppercase tracking-wider">
                        <MessageSquare className="size-3.5" />
                        <span>Urgent Collection Desk</span>
                      </span>
                      <h2 className="mt-1 text-lg font-bold text-white tracking-tight">
                        We are available 24/7
                      </h2>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                        Need an immediate vehicle dispatched for an urgent packet, fragile delivery, or full pallet load? Call our direct dispatch lines anytime.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 pt-1">
                      <a
                        href="tel:02034769656"
                        className="flex items-center gap-2 rounded-xl bg-[#25AAE1] hover:bg-[#1b93c5] p-3 text-white transition-all font-bold text-xs shadow-xs"
                      >
                        <Phone className="size-4 shrink-0" />
                        <div className="text-left">
                          <span className="block text-[0.625rem] text-white/80 uppercase">
                            Urgent Desk
                          </span>
                          <span className="font-extrabold text-xs sm:text-sm">0203 476 9656</span>
                        </div>
                      </a>

                      <a
                        href="tel:07584239227"
                        className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 p-3 text-white transition-all border border-slate-700 text-xs shadow-xs"
                      >
                        <Phone className="size-4 text-[#449D44] shrink-0" />
                        <div className="text-left">
                          <span className="block text-[0.625rem] text-slate-400 uppercase">
                            Mobile / WhatsApp
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-100">
                            0758 423 9227
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-xs text-slate-400">
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="size-3.5 text-[#25AAE1] shrink-0" />
                        <a
                          href="mailto:andrew@roads2roads.co.uk"
                          className="hover:text-white transition-colors truncate"
                        >
                          andrew@roads2roads.co.uk
                        </a>
                      </div>
                      <div className="flex items-start gap-2 pt-0.5">
                        <MapPin className="size-3.5 text-[#25AAE1] shrink-0 mt-0.5" />
                        <span className="leading-snug">
                          4th Floor, Silverstream House, 45 Fitzroy Street, London W1T 6EB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Client Testimonials
                      </span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {REVIEWS.map((r, i) => (
                        <div key={i} className="border-l-2 border-[#25AAE1] pl-3 py-0.5">
                          <p className="text-xs text-slate-600 italic leading-relaxed">
                            "{r.quote}"
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[0.6875rem]">
                            <span className="font-bold text-slate-800">{r.author}</span>
                            <span className="text-slate-400">{r.location}</span>
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

        {/* Fleet & Capabilities Section */}
        <section id="fleet" className="py-14 sm:py-18 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#007cb0]">
                Versatile Dedicated Transport
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Courier Fleet &amp; Capacities
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                From express small vans through London traffic to 500kg hydraulic tail-lift Luton box vans for cross-country heavy cargo.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FLEET_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col justify-between hover:border-[#25AAE1] hover:bg-white hover:shadow-md transition-all"
                >
                  <div>
                    <span className="size-11 rounded-2xl bg-sky-50 text-[#25AAE1] flex items-center justify-center mb-4">
                      <Truck className="size-5" />
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-5 pt-3.5 border-t border-slate-200/80">
                    <span className="inline-block text-[0.6875rem] font-bold text-[#007cb0] uppercase">
                      {item.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section id="services" className="py-14 sm:py-18 bg-slate-100/60 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#007cb0]">
                Tailored Logistics
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Special Deliveries &amp; Consignments
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Roads2Roads provides rapid, point-to-point courier solutions across all commercial and private requirements.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-7 shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
                <span className="size-12 rounded-2xl bg-sky-50 text-[#25AAE1] flex items-center justify-center mb-4">
                  <Zap className="size-6" />
                </span>
                <h3 className="text-base font-bold text-slate-900">Same-Day Urgent Courier</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Direct dispatch for emergency items, legal briefs, passports, tender documents, medical supplies, and urgent production spares. Collected in 60 mins.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-7 shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
                <span className="size-12 rounded-2xl bg-emerald-50 text-[#449D44] flex items-center justify-center mb-4">
                  <Package className="size-6" />
                </span>
                <h3 className="text-base font-bold text-slate-900">Pallets &amp; Freight Transport</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Full pallets or oversized freight transported safely with dedicated tail-lift vehicles. No sorting hubs or risk of fork damage.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-7 shadow-xs border border-slate-200 hover:shadow-md transition-shadow">
                <span className="size-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <Layers className="size-6" />
                </span>
                <h3 className="text-base font-bold text-slate-900">Timed &amp; Multi-Drop Contracts</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Scheduled regular routes between offices, warehouses, or customer depots. Precise time-window drop-offs with electronic proof of delivery.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Roads2RoadsSiteFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}
