import {
  ShieldCheck,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  Caravan,
  Truck,
  Box,
  Anchor,
  Sparkles,
  ArrowRight,
  Droplets,
  Lock,
  Wrench,
  Compass,
  Star,
  Check,
} from "lucide-react";
import { RavensOakPitchCalculator } from "@/components/ravensoake/RavensOakPitchCalculator";
import { StorageCategory } from "@/components/ravensoake/RavensOakQuoteWizard";
import { Reveal } from "@/components/site/Reveal";

interface RavensOakHomePageProps {
  onNavigate: (page: "home" | "quote" | "facilities" | "pricing" | "services" | "contact") => void;
  onSelectCategory: (cat: StorageCategory) => void;
}

const STATS = [
  { value: "12+ Years", label: "Family Run", sub: "Established in Rushden" },
  { value: "24/7/365", label: "Swipe Gate", sub: "Zero notice required" },
  { value: "100%", label: "Resident Owners", sub: "Living on-site & patrolling" },
  { value: "3m × 8m+", label: "Extra-Wide Bays", sub: "Standard caravan pitch" },
  { value: "2 Acres", label: "Practice Paddock", sub: "Awning & reversing" },
];

const SECURITY_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Resident Owners Living On-Site",
    desc: "We live directly on the property. Daily and nighttime patrols ensure your caravan or motorhome is always safeguarded with vigilant care.",
    highlight: "Constant Presence",
  },
  {
    icon: Clock,
    title: "24/7 Automated Swipe Gate Access",
    desc: "Enter and depart anytime with your personal swipe card operating the automated security gates. No advance notice needed for early departures.",
    highlight: "Unrestricted Access",
  },
  {
    icon: Lock,
    title: "Fortified Perimeter & Continuous CCTV",
    desc: "Fully enclosed perimeter fencing, high-definition CCTV monitoring, and strict swipe-only barriers keep unauthorized visitors out.",
    highlight: "CCTV Monitored",
  },
  {
    icon: Caravan,
    title: "Generous 3m × 8m+ Hardstanding Bays",
    desc: "Standard caravan pitches are 3 metres wide by at least 8 metres deep, giving you abundant room to open lockers, habitation doors, and deploy awnings.",
    highlight: "No Tight Squeezes",
  },
  {
    icon: Compass,
    title: "Exclusive 2-Acre Practice Paddock",
    desc: "A rare facility amenity: a dedicated 2-acre open grass paddock for practicing reversing maneuvers or pitching and checking awnings.",
    highlight: "Free Customer Perk",
  },
  {
    icon: Truck,
    title: "12m Commercial 40-Tonne Driveway",
    desc: "Sweeping commercial access road built to accommodate articulated vehicles, heavy plant, and up to 45-foot American RV motorhomes.",
    highlight: "Easy Manoeuvring",
  },
];

const STORAGE_OPTIONS = [
  {
    title: "Touring Caravan Storage",
    rate: "£50",
    period: "per month",
    badge: "Most Popular",
    desc: "Single or twin-axle touring caravans stored on clean hardstanding or indoor bays.",
    features: [
      "24/7/365 electric swipe-card access",
      "Extra-wide 3m × 8m+ demarcated bays",
      "Complimentary fresh water & tyre compressor",
      "Free access to 2-acre practice paddock",
      "On-site NCC habitation & chassis servicing",
    ],
    cat: "caravan" as StorageCategory,
    popular: true,
  },
  {
    title: "Motorhome & RV Storage",
    rate: "£55",
    period: "per month",
    badge: "Up to 45ft",
    desc: "Coachbuilt, A-class, campervans, and large American RV motorhomes.",
    features: [
      "24/7/365 swipe gate access",
      "12m wide commercial 40-tonne entrance",
      "Bays accommodating 24ft to 45ft RVs",
      "Complimentary water points & air station",
      "Resident owners living on site",
    ],
    cat: "motorhome" as StorageCategory,
  },
  {
    title: "Shipping Container Self-Store",
    rate: "£65",
    period: "per month",
    badge: "20ft Steel",
    desc: "Clean, dry, wind and watertight lockable steel containers for personal or trade storage.",
    features: [
      "20ft lockable secure shipping container",
      "Direct vehicle drive-up loading access",
      "Protected within CCTV perimeter compound",
      "Ideal for house movers, trade tools & stock",
      "Flexible 6-month minimum hire terms",
    ],
    cat: "container" as StorageCategory,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We've kept our twin-axle Bailey caravan at Ravens Oak for over 4 years. Having the owners live on-site gives us massive reassurance, and the 24/7 swipe gate means we can leave for weekend trips at 5 AM without bothering anyone.",
    author: "Mark & Diane W.",
    vehicle: "Bailey Pegasus Twin Axle",
    location: "Rushden, Northants",
  },
  {
    quote:
      "The 2-acre paddock is a game changer! Being able to practice reversing without traffic or pressure gave us huge confidence. Plus having the approved NCC service engineer come right to your pitch saves tons of towing hassle.",
    author: "Colin S.",
    vehicle: "Swift Sprite Major",
    location: "Wellingborough",
  },
  {
    quote:
      "Spacious pitches where you can actually open your locker doors and slide-outs without hitting your neighbour. Spotlessly clean gravel bays and water points handy. Superb facility.",
    author: "Sarah L.",
    vehicle: "Auto-Trail Tracker Motorhome",
    location: "Bedford",
  },
];

export function RavensOakHomePage({ onNavigate, onSelectCategory }: RavensOakHomePageProps) {
  const handleCalculatorSelect = (category: StorageCategory) => {
    onSelectCategory(category);
    onNavigate("quote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-20 lg:py-28">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/ravensoake-hero.jpg"
            alt="Ravens Oak Secure Caravan and Motorhome Storage Facility in Rushden"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#072412]/95 via-[#0b3819]/80 to-transparent" />
        </div>

        <div className="container-page relative z-10">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8CC63F]/20 text-[#8CC63F] border border-[#8CC63F]/30 backdrop-blur-xs">
              <ShieldCheck className="size-4" />
              <span>Rushden, Northamptonshire • Family Run Facility Since 2012</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Secure Caravan &amp; Motorhome Storage
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
              Northamptonshire’s premier family-operated facility. Enjoy{" "}
              <strong className="text-white">24/7 unrestricted swipe-card gate access</strong>,{" "}
              <strong className="text-white">resident owners living on-site</strong>, and extra-wide{" "}
              <strong className="text-[#8CC63F]">3m × 8m+ hardstanding pitches</strong> with a 2-acre
              practice paddock.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory("caravan");
                  onNavigate("quote");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="h-12 sm:h-13 px-7 rounded-full bg-[#509D25] hover:bg-[#65a30d] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Availability &amp; Get Quote</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href="tel:01933712782"
                className="h-12 sm:h-13 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-xs border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="size-4 text-[#8CC63F]" />
                <span>Call Us: 01933 712 782</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-emerald-100/80 border-t border-emerald-800/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
                <span>24/7 Swipe Gate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
                <span>Owners Live On-Site</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
                <span>3m × 8m+ Wide Bays</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
                <span>2-Acre Practice Paddock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[#0b2413] text-white py-6 border-b border-emerald-950">
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {STATS.map((s, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-[#8CC63F]">{s.value}</div>
                <div className="text-xs font-bold text-white">{s.label}</div>
                <div className="text-[11px] text-emerald-300/70">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PITCH & RATE CALCULATOR */}
      <section id="calculator-section" className="py-14 sm:py-18 bg-[#fbfdfa]">
        <div className="container-page">
          <Reveal>
            <RavensOakPitchCalculator onSelectPitch={handleCalculatorSelect} />
          </Reveal>
        </div>
      </section>

      {/* SECURITY & FACILITIES */}
      <section id="facilities" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#006837] border border-emerald-200/60">
              <ShieldCheck className="size-3.5" />
              <span>Perimeter Security &amp; Facilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Discerning Caravanners Choose Ravens Oak
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike unmanned remote compounds, Ravens Oak provides vigilant vehicle protection
              combined with welcoming, family-run customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECURITY_FEATURES.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={index} delay={index * 50}>
                  <div className="p-6 rounded-3xl border border-slate-200/90 bg-white hover:border-emerald-300 transition-colors h-full flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="size-10 rounded-xl bg-emerald-50 text-[#006837] flex items-center justify-center">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.highlight}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORAGE TIERS & RATES */}
      <section id="pricing" className="py-16 sm:py-20 bg-[#fbfdfa] border-t border-slate-100">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#006837] border border-emerald-200/60">
              <Sparkles className="size-3.5" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Storage Rates &amp; Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Transparent, fixed monthly pricing with no hidden surcharges. Payable 3 months
              initial, then standing order with 1 month notice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {STORAGE_OPTIONS.map((tier, index) => (
              <Reveal key={index} delay={index * 60}>
                <div
                  className={`p-6 sm:p-7 rounded-3xl border transition-all flex flex-col justify-between h-full bg-white ${
                    tier.popular
                      ? "border-[#509D25] shadow-xs ring-2 ring-[#509D25]/20"
                      : "border-slate-200/90 shadow-xs hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          tier.popular
                            ? "bg-[#509D25] text-white"
                            : "bg-emerald-50 text-[#006837]"
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{tier.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tier.desc}</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-1 border-t border-slate-100">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#006837]">
                        {tier.rate}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{tier.period}</span>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="size-3.5 text-[#509D25] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory(tier.cat);
                        onNavigate("quote");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full h-11 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        tier.popular
                          ? "bg-[#006837] hover:bg-[#14532D] text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      <span>Check Pitch Availability</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* On-Site Services Sub-strip */}
          <div id="services" className="mt-10 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#006837] uppercase tracking-wider block">
                  NCC-Approved Servicing
                </span>
                <h4 className="text-sm font-bold text-slate-900">Habitation &amp; Chassis Servicing</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Single axle £230 + VAT / Twin axle £250 + VAT. Full inspection carried out directly
                  at your bay without towing elsewhere.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#006837] uppercase tracking-wider block">
                  Auto-Glym Valeting
                </span>
                <h4 className="text-sm font-bold text-slate-900">Professional Wash &amp; Resin Polish</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bodywork wash £30–£45. Super Resin Wax Polish at £2 per linear foot. Caravan ready
                  and shining for your departure.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#006837] uppercase tracking-wider block">
                  UK &amp; European Towing
                </span>
                <h4 className="text-sm font-bold text-slate-900">Land Rover Discovery Fleet</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dedicated caravan towing to any UK campsite, ferry terminal, or dealership. Plus
                  Calor Gas bottle stockist on-site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-ACRE PADDOCK FEATURE */}
      <section className="py-14 sm:py-18 bg-white border-t border-slate-100">
        <div className="container-page">
          <div className="rounded-3xl bg-[#0b2915] text-white p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8CC63F]">
                  Exclusive Facility Perk
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  2-Acre Practice Paddock for Awning Setup &amp; Reversing
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                  Practice tricky reversing maneuvers or test-pitch your awnings in a calm, open
                  environment without any pressure before heading out on holidays. Free for all our
                  stored customers.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory("caravan");
                    onNavigate("quote");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="h-11 px-6 rounded-full bg-[#8CC63F] hover:bg-[#7cb630] text-emerald-950 font-bold text-xs text-center transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Pitch &amp; Practice Space</span>
                  <ArrowRight className="size-3.5" />
                </button>
                <a
                  href="tel:01933712782"
                  className="h-11 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center border border-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="size-3.5 text-[#8CC63F]" />
                  <span>Ask Owners About Access</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-[#fbfdfa] border-t border-slate-100">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>Customer Satisfaction</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Caravanners for Over 12 Years
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Read how our family-run security and personal approach gives owners complete peace of
              mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, index) => (
              <Reveal key={index} delay={index * 60}>
                <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="font-bold text-xs text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-[#006837] font-semibold">{t.vehicle}</p>
                    <p className="text-[10px] text-slate-400">{t.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & APPOINTMENT PROTOCOL */}
      <section id="contact" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container-page">
          <div className="rounded-3xl border border-slate-200/90 bg-[#fbfdfa] p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#006837] border border-emerald-200/60">
                  <Lock className="size-3.5" />
                  <span>Security Appointment Protocol</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Visit Ravens Oak Caravan Storage
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Conveniently situated just off the A6 and A45 in Rushden, Northamptonshire.
                  Because the security of our stored caravans is our highest priority,{" "}
                  <strong>all site visits are strictly by appointment only</strong>.
                </p>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#006837]">Required for New Customer Visits:</span>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Please ensure you bring a <strong>current photo driving licence</strong> and a{" "}
                    <strong>corresponding utility bill</strong> matching your address.
                  </p>
                </div>

                <div className="pt-1 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-[#006837]" />
                    <span>315 Bedford Road, Rushden, Northants NN10 0SQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-[#006837]" />
                    <a href="tel:01933712782" className="hover:text-[#006837] font-bold">
                      01933 712 782
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory("caravan");
                    onNavigate("quote");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full h-12 rounded-full bg-[#006837] hover:bg-[#14532D] text-white font-bold text-xs sm:text-sm text-center shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Viewing &amp; Get Free Quote</span>
                  <ArrowRight className="size-4" />
                </button>

                <a
                  href="tel:01933712782"
                  className="w-full h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs text-center border border-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="size-3.5 text-[#006837]" />
                  <span>Call 01933 712782 to Arrange Time</span>
                </a>

                <a
                  href="https://maps.google.com/?q=315+Bedford+Road+Rushden+NN10+0SQ"
                  target="_blank"
                  rel="noreferrer"
                  className="text-center text-[11px] text-slate-400 hover:text-[#006837] transition-colors underline pt-1"
                >
                  Open in Google Maps (NN10 0SQ)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
