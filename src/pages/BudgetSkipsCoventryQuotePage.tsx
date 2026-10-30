import { useState } from "react";
import {
  ShieldCheck,
  Award,
  Truck,
  Trash2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Check,
  CheckCircle2,
  Star,
  Sparkles,
  Package,
  HelpCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { BudgetSkipsQuoteWizard } from "@/components/budgetskips/BudgetSkipsQuoteWizard";
import { BudgetSkipsSiteHeader } from "@/components/budgetskips/BudgetSkipsSiteHeader";
import { BudgetSkipsSiteFooter } from "@/components/budgetskips/BudgetSkipsSiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const REVIEWS = [
  {
    quote:
      "Ordered an 8-yard builders skip for our house renovation in Radford. Delivered on time early morning, driver placed it precisely on the driveway. Excellent service.",
    author: "Dave & Sarah P.",
    location: "Radford, Coventry (CV6)",
  },
  {
    quote:
      "Budget Skips arranged our Coventry City Council road permit seamlessly. They dropped the skip with lights and picked it up promptly when we called.",
    author: "Richard T.",
    location: "Earlsdon, Coventry (CV5)",
  },
  {
    quote:
      "Used their Man With A Van clearance for our garage cleanout in Bedworth. Loaded everything in 45 minutes and swept up afterwards. Saved so much hassle!",
    author: "Karen M.",
    location: "Bedworth (CV12)",
  },
];

const COMPARISON_TABLE = [
  {
    size: "4 Yard Mini",
    bags: "~30 Bags",
    dimensions: "6ft x 4.2ft x 3.2ft",
    bestFor: "Garden tidy-ups, bathroom refits, small shed decluttering",
    heavyOk: true,
  },
  {
    size: "6 Yard Small Builders",
    bags: "~55 Bags",
    dimensions: "8.5ft x 5ft x 3.5ft",
    bestFor: "Heavy DIY rubble, kitchen refits, soil, hardcore & bricks",
    heavyOk: true,
  },
  {
    size: "8 Yard Large Builders",
    bags: "~75 Bags",
    dimensions: "10ft x 5.5ft x 4ft",
    bestFor: "Full home renovations, extensions, large garden overhauls",
    heavyOk: true,
    popular: true,
  },
  {
    size: "12 Yard Maxi",
    bags: "~115 Bags",
    dimensions: "12.5ft x 6ft x 5ft",
    bestFor: "Full house clearances, shop fittings, timber & bulky plastics",
    heavyOk: false,
  },
  {
    size: "16 Yard Maxi",
    bags: "~150 Bags",
    dimensions: "13.5ft x 6ft x 6.5ft",
    bestFor: "Major estate clearances, bulky commercial packaging",
    heavyOk: false,
  },
  {
    size: "20 - 40 Yard RoRo",
    bags: "Bulk Industrial",
    dimensions: "20ft x 8ft x 6-8ft",
    bestFor: "Commercial sites, industrial demolition & continuous waste generation",
    heavyOk: true,
  },
];

const FAQS = [
  {
    q: "Do I need a council permit for my skip in Coventry?",
    a: "If the skip is placed on private land (such as your driveway or private garden), you do NOT need a permit. If it must be placed on a public highway or road, Coventry City Council or Warwickshire County Council requires a road permit. Budget Skips will handle the permit application, safety lamps, and cones for you.",
  },
  {
    q: "How high can I load my skip?",
    a: "Skips must be loaded to a level load only (flush with the rim of the skip walls). Drivers are legally prohibited from transporting overloaded skips on public roads for safety reasons.",
  },
  {
    q: "What items CANNOT go into a general skip?",
    a: "Environment Agency regulations prohibit hazardous items: car tyres, fridges and freezers, asbestos, liquid paint tins, gas cylinders, car batteries, and fluorescent light tubes. Please call us if you have specialty items.",
  },
  {
    q: "How fast can you deliver a skip in Coventry?",
    a: "We offer both same-day and next-day deliveries across Coventry, Bedworth, Nuneaton, Kenilworth, and Leamington Spa for orders placed before noon, subject to stock and road permit lead times.",
  },
  {
    q: "Can I use your 'Man With A Van' service instead of a skip?",
    a: "Yes! If you have no driveway space, narrow street access, or prefer not to carry heavy items yourself, our two-man team arrives in a dedicated clearance vehicle, loads your waste, sweeps up, and takes it away immediately.",
  },
];

export function BudgetSkipsCoventryQuotePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/70 text-zinc-900 antialiased selection:bg-[#ec6c05] selection:text-white overflow-x-hidden w-full">
      <BudgetSkipsSiteHeader />

      <main className="flex-1 w-full">
        {/* Clean, Modern Hero */}
        <section className="bg-white border-b border-zinc-200/80 pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/80 px-3 py-1 text-xs font-bold text-[#ec6c05]">
                <span className="size-1.5 rounded-full bg-[#ec6c05] animate-pulse" />
                <span>Coventry &amp; Warwickshire Skip Hire • Over 25 Years of Service</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Get an Instant Skip Hire &amp; Waste Quote
              </h1>

              <p className="text-xs sm:text-base text-zinc-600 leading-relaxed font-normal max-w-2xl mx-auto">
                Independent, family-run skip hire, Roll-on Roll-off containers, and 'Man with a Van'
                clearances across Coventry, Bedworth, Nuneaton, and surrounding Warwickshire areas.
              </p>

              {/* Clean Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-zinc-700">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1">
                  <ShieldCheck className="size-3.5 text-[#ec6c05]" />
                  <span>Licensed Waste Carrier</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1">
                  <Award className="size-3.5 text-[#ec6c05]" />
                  <span>Price Match Guarantee</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1">
                  <Truck className="size-3.5 text-[#ec6c05]" />
                  <span>Council Permits Arranged</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1">
                  <Sparkles className="size-3.5 text-[#ec6c05]" />
                  <span>95%+ Waste Recycled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Quote & Interactive Wizard Section */}
        <section id="quote-form" className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] items-start">
              {/* Left Column: Form */}
              <Reveal>
                <BudgetSkipsQuoteWizard />
              </Reveal>

              {/* Right Column: Clean Order Assistance & Confidence */}
              <Reveal delay={100} className="space-y-5">
                {/* Confidence Card */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <h3 className="font-extrabold text-sm text-zinc-900 tracking-tight">
                      Why Choose Budget Skips?
                    </h3>
                    <span className="text-[0.625rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Bayton Road Depot
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-zinc-600">
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-[#ec6c05] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900">Over 25 Years of Family-Run Service:</strong>
                        <p className="text-[0.6875rem] text-zinc-500 mt-0.5 leading-relaxed">
                          Proudly serving Coventry homeowners, trades, and commercial businesses since 1999.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-[#ec6c05] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900">Environment Agency Licensed Carrier:</strong>
                        <p className="text-[0.6875rem] text-zinc-500 mt-0.5 leading-relaxed">
                          Upper-Tier Waste Carrier &amp; licensed transfer station with full Duty of Care notes.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-[#ec6c05] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900">"We Won't Be Beaten on Price":</strong>
                        <p className="text-[0.6875rem] text-zinc-500 mt-0.5 leading-relaxed">
                          Direct depot pricing with zero middleman markups and transparent fixed quotes.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-[#ec6c05] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900">Local Council Permits Handled:</strong>
                        <p className="text-[0.6875rem] text-zinc-500 mt-0.5 leading-relaxed">
                          We arrange Coventry City Council &amp; Warwickshire road licenses, lamps, and cones.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Direct Phone Help Card */}
                <div className="rounded-2xl bg-zinc-950 text-white p-6 shadow-xl space-y-4 border border-zinc-800">
                  <div className="space-y-1">
                    <span className="text-[0.6875rem] font-bold text-[#ec6c05] uppercase tracking-wider block">
                      Direct Coventry Office
                    </span>
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      Prefer to talk it through?
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-300 font-normal">
                      Some jobs have awkward access, tight road permit deadlines, or specific clearance
                      requirements. Call our friendly Coventry coordinators directly for advice and immediate
                      pricing.
                    </p>
                  </div>

                  <a
                    href="tel:02476363002"
                    className="flex items-center gap-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 p-3.5 text-white transition-colors border border-zinc-800"
                  >
                    <Phone className="size-4 text-[#ec6c05] shrink-0" />
                    <div>
                      <span className="block text-[0.625rem] text-zinc-400 font-normal">Direct Booking Line</span>
                      <span className="font-bold text-sm text-[#ec6c05]">02476 363 002</span>
                    </div>
                  </a>

                  <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[0.6875rem] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-[#ec6c05]" />
                      <span>Bayton Road, CV7 9NH</span>
                    </span>
                    <span>Mon-Sat Dispatch</span>
                  </div>
                </div>

                {/* Verified Customer Feedback Card */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      Customer Feedback
                    </span>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 divide-y divide-zinc-100">
                    {REVIEWS.map((rev, idx) => (
                      <div key={idx} className={idx > 0 ? "pt-3" : ""}>
                        <p className="text-xs italic text-zinc-600 leading-relaxed">
                          "{rev.quote}"
                        </p>
                        <div className="mt-1.5 flex items-center justify-between text-xs">
                          <strong className="text-zinc-900 font-semibold">{rev.author}</strong>
                          <span className="text-[#ec6c05] font-medium text-[0.6875rem]">{rev.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Skip Sizing Comparison Guide Section */}
        <section id="skip-guide" className="py-12 bg-white border-t border-zinc-200/80 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ec6c05]">
                Skip Size Comparison
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                Find the Right Skip for Your Project
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Compare capacities, dimensions, and heavy rubble permissions across our Coventry skip fleet.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-700 font-extrabold uppercase text-[0.6875rem] tracking-wider">
                      <th className="py-3 px-4">Skip Size</th>
                      <th className="py-3 px-3">Bag Capacity</th>
                      <th className="py-3 px-3">Dimensions</th>
                      <th className="py-3 px-4">Best Suited For</th>
                      <th className="py-3 px-3 text-center">Soil &amp; Rubble</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {COMPARISON_TABLE.map((row) => (
                      <tr
                        key={row.size}
                        className={`hover:bg-zinc-50/80 transition-colors ${
                          row.popular ? "bg-orange-50/20" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 font-bold text-zinc-900 flex items-center gap-1.5">
                          <span>{row.size}</span>
                          {row.popular && (
                            <span className="rounded-full bg-[#ec6c05] text-white px-1.5 py-0.2 text-[0.5625rem] font-extrabold uppercase">
                              Popular
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-[#ec6c05]">{row.bags}</td>
                        <td className="py-3.5 px-3 text-zinc-500 text-[0.6875rem] font-mono">
                          {row.dimensions}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-600 text-[0.6875rem] leading-snug">
                          {row.bestFor}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {row.heavyOk ? (
                            <span className="inline-flex items-center gap-1 text-[0.6875rem] text-emerald-700 font-medium">
                              <Check className="size-3.5 text-emerald-600" /> Yes
                            </span>
                          ) : (
                            <span className="text-[0.6875rem] text-amber-700 font-medium">
                              Light Only
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <a
                            href="#quote-form"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#ec6c05] hover:text-[#d85e00]"
                          >
                            <span>Book</span>
                            <ArrowRight className="size-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process (Distinct, Clean) */}
        <section id="how-it-works" className="py-12 bg-zinc-50 border-t border-zinc-200/80 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ec6c05]">
                Simple &amp; Hassle-Free
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                How Our Coventry Skip Hire Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-[#ec6c05] text-xs font-extrabold">
                    1
                  </span>
                  <h3 className="font-extrabold text-sm text-zinc-900">Choose Size &amp; Date</h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Select your required skip size or Man &amp; Van service, enter your Coventry address,
                  and let us know if you need driveway or road placement.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-[#ec6c05] text-xs font-extrabold">
                    2
                  </span>
                  <h3 className="font-extrabold text-sm text-zinc-900">Prompt Local Delivery</h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Our professional driver drops your skip precisely where requested. If on the road,
                  we ensure all council safety lamps and cones are fitted.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-[#ec6c05] text-xs font-extrabold">
                    3
                  </span>
                  <h3 className="font-extrabold text-sm text-zinc-900">Eco-Recycling at Bayton Rd</h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Call or request collection when full. We transport your waste directly to our Bayton
                  Road facility, recycling up to 95% of materials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Depot & Trade Tipping Section */}
        <section id="depot" className="py-12 bg-white border-t border-zinc-200/80 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ec6c05]">
                  Bayton Road Facility
                </span>
                <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  Licensed Waste Transfer Station &amp; Trade Tipping
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Operating from Crondal Road, Bayton Road Industrial Estate in Exhall, Coventry, our
                  site provides licensed waste transfer, weighbridge tipping, and recycling for both
                  domestic customers and registered trade carriers.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#ec6c05]" />
                    <span>Hardcore &amp; Soil Recovery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#ec6c05]" />
                    <span>Timber &amp; Wood Recycling</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#ec6c05]" />
                    <span>Scrap Metal Separation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#ec6c05]" />
                    <span>Green Garden Waste</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-zinc-800">
                    Trade Tipping Accounts
                  </span>
                  <span className="text-[0.625rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Weighbridge Open Mon-Sat
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Are you a contractor, builder, or registered waste carrier? We offer trade weighbridge
                  accounts, digital Waste Transfer Notes, and competitive tipping rates per tonne.
                </p>
                <a
                  href="tel:02476363002"
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-black px-4 py-2 text-xs font-bold text-white transition-colors"
                >
                  <Phone className="size-3.5 text-[#ec6c05]" />
                  <span>Enquire About Trade Rates: 02476 363 002</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Compact, Clean FAQ */}
        <section id="faq" className="py-12 bg-zinc-50 border-t border-zinc-200/80 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ec6c05]">
                Frequently Asked Questions
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                Road Permits, Delivery &amp; Sizing FAQ
              </h2>
            </div>

            <div className="space-y-2">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left px-4 py-3 text-xs font-bold text-zinc-900 flex items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="size-3.5 text-[#ec6c05] shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`size-3.5 text-zinc-400 transition-transform ${
                          isOpen ? "rotate-180 text-[#ec6c05]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <BudgetSkipsSiteFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}
