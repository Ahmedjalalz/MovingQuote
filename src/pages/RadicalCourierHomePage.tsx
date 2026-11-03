import {
  Truck,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  Award,
  Star,
  Quote,
  MapPin,
  Package,
  Layers,
  ChevronRight,
  GraduationCap,
  FileText,
  Building,
  HeartHandshake,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { RADICAL_VANS } from "@/components/radicalcourier/RadicalCourierQuoteWizard";

interface RadicalCourierHomePageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierHomePage({ onNavigate }: RadicalCourierHomePageProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B152E] to-slate-900 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0284C7]/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Midlands Hub • UK Nationwide Urgent Delivery
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Same-Day Express Courier.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#38BDF8] to-cyan-300">
                  Direct to Door.
                </span>{" "}
                Zero Subcontracting.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Operating 24/7, 365 days a year from Coventry. From critical Formula 1 automotive components
                and urgent legal filings to high-value pallets — a single dedicated driver manages your
                consignment from doorstep collection to recipient handover.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-extrabold text-base shadow-xl shadow-sky-600/30 transition-all transform active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-sky-200" />
                  <span>Get Instant Online Quote</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <a
                  href="tel:02475122465"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>024 7512 2465</span>
                </a>
              </div>

              {/* Guarantees List */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-semibold">One Dedicated Driver</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-semibold">60-Min Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-semibold">Live GPS Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-semibold">No Account Needed</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-3 sm:p-4 shadow-2xl relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <img
                    src="/radical-hero.jpg"
                    alt="Radical Courier Rapid Fleet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback image
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Floating live tracking badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white">Live Midlands Fleet: 18 Drivers Ready</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-xl p-3.5 text-xs text-white">
                    <div className="font-extrabold text-sky-400 text-sm mb-0.5">
                      Direct Dedicated Transport
                    </div>
                    <div className="text-slate-300">
                      Never co-loaded with other parcels. Straight from your address to the drop-off point.
                    </div>
                  </div>
                </div>

                {/* Key stats banner underneath */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-white/5 border border-white/10 rounded-xl py-3">
                    <div className="text-xl font-black text-sky-400">2007</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Established</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl py-3">
                    <div className="text-xl font-black text-emerald-400">99.4%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">On-Time Rate</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl py-3">
                    <div className="text-xl font-black text-amber-400">0%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Subcontracted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Industry Showcases from their site */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0284C7] text-xs font-extrabold uppercase tracking-wider">
            Proven Sector Expertise
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Specialized in Time-Critical & High-Consequence Deliveries
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            When standard couriers are too slow, too careless, or rely on hub sorting centres,
            enterprises trust Radical Courier for end-to-end dedicated delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Automotive & F1 Card */}
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/radical-automotive.jpg"
                  alt="Automotive & Formula 1 Support"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-sky-500 px-2 py-0.5 rounded-md">
                    Automotive & Motorsport
                  </span>
                  <h3 className="text-xl font-bold mt-1">Automotive & F1 Industry</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trusted by automotive manufacturers and motorsport teams across Silverstone,
                  Coventry, and the UK for ultra-urgent transport of:
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>Formula 1 Racing & Trackside Technical Spares</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>Heads-Up Displays (HUD) & Cockpit Electronics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>Assembly line breakdown critical components</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate("quote")}
                className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Book Automotive Courier <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legal & Court Card */}
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/radical-law.jpg"
                  alt="Legal Documents Courier"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 px-2 py-0.5 rounded-md">
                    Legal & Judiciary
                  </span>
                  <h3 className="text-xl font-bold mt-1">Law & Solicitor Documents</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Confidential, tamper-evident handling for law firms, barristers, courts,
                  and corporate legal departments:
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Time-sensitive court bundles & filing deadlines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Solicitor-client signature exchanges with live wait</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Proof of Delivery (POD) signature verified</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate("quote")}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Book Legal Courier <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Printing & Commercial Publications Card */}
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/radical-printing.jpg"
                  alt="Printing and Publications Delivery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-600 px-2 py-0.5 rounded-md">
                    Print & Media
                  </span>
                  <h3 className="text-xl font-bold mt-1">Printing & Publications</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Time-critical delivery of freshly printed materials directly to exhibition halls,
                  newsstands, and corporate headquarters:
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Bulk delivery of magazines, journals & programmes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Event promotional merchandise & branded clothing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Palletized print distribution with tail lift offloading</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate("quote")}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Book Print Transport <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Other Industries Strip */}
        <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center text-xs text-slate-600">
          <span className="font-bold text-slate-900">Additional Specialist Sectors Served: </span>
          Medical Supplies & Sterile Devices • Housing Providers & Local Authorities • Optical Engineering •
          Auction Houses • High-Value Jewellery Sellers • Student Campus Relocations.
        </div>
      </section>

      {/* "What Makes Us Radical" Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-extrabold uppercase tracking-wider border border-sky-400/30">
              The Radical Manifesto
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why We Are Truly Radical
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We asked: why do traditional courier companies make you talk to call handlers who just
              shop your delivery around to anonymous third parties? Here is how we do it differently:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old / Traditional Way */}
            <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-7 space-y-5">
              <div className="flex items-center gap-2.5 text-red-400 font-extrabold text-sm uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                What Traditional Couriers Do (We DON'T)
              </div>
              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Waste money on call centres:</strong> Call handlers spend hours trying to
                    subcontract your job to brokers or random delivery drivers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Co-loading & multiple hand-offs:</strong> Your urgent parcel is passed
                    between multiple vans and sorting hubs, multiplying risk of damage or loss.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>
                    <strong>Zero accountability:</strong> When a delay happens, nobody takes ownership
                    and you are left stuck on an automated helpline.
                  </span>
                </li>
              </ul>
            </div>

            {/* The Radical Way */}
            <div className="rounded-3xl border border-sky-500/40 bg-sky-950/30 p-7 space-y-5 shadow-2xl shadow-sky-900/20">
              <div className="flex items-center gap-2.5 text-sky-400 font-extrabold text-sm uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                The Radical Courier Guarantee (What We DO)
              </div>
              <ul className="space-y-4 text-xs text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant pricing & driver availability:</strong> We tell you in moments if we
                    can do the job, the exact fixed price, and when collection occurs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct driver name & vehicle registration:</strong> Allocated driver's details
                    and direct mobile are provided to support your security gates.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>WE TAKE 100% OWNERSHIP OF YOUR JOB:</strong> One person manages your delivery
                    from start to finish. No hand-offs, no excuses.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-10">
            <button
              onClick={() => onNavigate("about")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              <span>Read the Full Story of Radical Courier Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Fleet Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0284C7] text-xs font-extrabold uppercase tracking-wider">
              Ready for Any Consignment
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Versatile Same-Day Fleet
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              From nimble urban courier vans to heavy Luton box vans with 500kg hydraulic tail lifts.
            </p>
          </div>

          <button
            onClick={() => onNavigate("quote")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] text-white text-xs font-bold hover:bg-[#0369A1] transition-all"
          >
            <span>Quote Your Vehicle Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {RADICAL_VANS.map((van) => (
            <div
              key={van.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 hover:border-[#0284C7] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1">{van.name}</h3>
                <div className="text-[11px] font-bold text-sky-700 mb-2">
                  {van.pallets} Pallet{van.pallets > 1 ? "s" : ""} • {van.payload}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{van.idealFor}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[10px]">Dimensions</span>
                <span className="font-bold text-slate-800">{van.length} × {van.width}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Customer Testimonials (from the original website) */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              Verified Client Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-slate-600 text-sm">
              Long-standing partnerships with Midlands football clubs, manufacturing leaders, and legal executives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coventry City FC */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sky-200" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "Neil has been consistent and constant in the level of service delivered.
                  This has included delivering key documents, on time and in appalling winter conditions.
                  Like the US Post, Neil always gets through and delivers!"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-extrabold text-sm text-slate-900">Coventry City FC</div>
                <div className="text-[11px] text-slate-500">Official Club Operations</div>
              </div>
            </div>

            {/* Craig Watson / Hi-line Industries */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sky-200" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "Impeccable service from Radical Couriers!! Same day delivery required from Burton on Trent
                  to central Manchester, first contact made at 11.00am, item was delivered at 3.00pm. 4 Hours
                  from start to finish and all parties informed item's progress. That's what I call efficient!"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-extrabold text-sm text-slate-900">Craig Watson</div>
                <div className="text-[11px] text-slate-500">Refrigeration Product Manager, Hi-line Industries</div>
              </div>
            </div>

            {/* Mike Johnson */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sky-200" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "Radical Couriers provided an excellent straight to door service that was prompt, reliable
                  and above all transparent. I was kept up-to-date with regular communications and provided
                  with an accurate delivery time... item arriving in excellent condition."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-extrabold text-sm text-slate-900">Mike Johnson</div>
                <div className="text-[11px] text-slate-500">Private & B2B Consignment Client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Experience Truly Radical Courier Service?
            </h2>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              No account required. Calculate your instant quote right now, or speak directly with our
              24/7 dispatch desk for immediate collection within 60 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 shrink-0">
            <button
              onClick={() => onNavigate("quote")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm shadow-xl hover:bg-slate-100 transition-all cursor-pointer"
            >
              Calculate Online Quote
            </button>
            <a
              href="tel:02475122465"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-sky-950/40 text-white font-bold text-sm border border-white/20 hover:bg-sky-950/60 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-sky-300" />
              <span>024 7512 2465</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}