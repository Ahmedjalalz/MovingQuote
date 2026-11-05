import { useState } from "react";
import {
  Truck,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  Quote,
  MapPin,
  Package,
  Layers,
  FileCheck,
  AlertCircle,
  Calculator,
  ChevronRight,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { RADICAL_VANS } from "@/components/radicalcourier/RadicalCourierQuoteWizard";

interface RadicalCourierHomePageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierHomePage({ onNavigate }: RadicalCourierHomePageProps) {
  const [quickPickup, setQuickPickup] = useState("");
  const [quickDelivery, setQuickDelivery] = useState("");
  const [quickVan, setQuickVan] = useState("small_van");

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("quote");
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-white text-slate-900">
      {/* Hero Section - Realistic, high-contrast British logistics header */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Direct value proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                24/7 Same-Day Express Courier • Coventry &amp; UK Nationwide
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Same-Day Delivery. Direct to Door.{" "}
                <span className="text-sky-400">One Dedicated Driver.</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Operating 24/7, 365 days a year from Coventry. Whether it's urgent legal documents,
                manufacturing components, or heavy palletised freight, the driver who collects your consignment
                is the exact driver who delivers it directly to the recipient. No hubs, no co-loading, and zero subcontracting.
              </p>

              {/* Trust Badges - Realistic logistics credentials */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="border border-slate-800 bg-slate-800/50 rounded-lg p-3">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>No Subcontracting</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">100% dedicated point-to-point</div>
                </div>

                <div className="border border-slate-800 bg-slate-800/50 rounded-lg p-3">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>60-Min Collection</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Across Coventry &amp; Midlands</div>
                </div>

                <div className="border border-slate-800 bg-slate-800/50 rounded-lg p-3 col-span-2 sm:col-span-1">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Packets to 6 Pallets</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Small vans to Luton tail lifts</div>
                </div>
              </div>

              {/* Call Hotline Callout */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="tel:02475122465"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call 024 7512 2465 (24/7)</span>
                </a>

                <button
                  onClick={() => onNavigate("quote")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-sky-400" />
                  <span>Online Rate Calculator</span>
                </button>
              </div>
            </div>

            {/* Right Column: Direct Quick Quote Form */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl border border-slate-200 p-6 shadow-xl">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Instant Fixed-Price Estimate
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Calculate Your Courier Quote
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No account needed. Instant transparent rates calculated per mile.
                  </p>
                </div>

                <form onSubmit={handleQuickQuote} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Collection Town / Postcode *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Coventry CV1, Warwick, Birmingham"
                        value={quickPickup}
                        onChange={(e) => setQuickPickup(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Delivery Town / Postcode *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. London, Manchester, Leeds, Bristol"
                        value={quickDelivery}
                        onChange={(e) => setQuickDelivery(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-xs font-medium text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Select Vehicle Size
                    </label>
                    <select
                      value={quickVan}
                      onChange={(e) => setQuickVan(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-xs font-medium text-slate-900 focus:border-[#0284C7]"
                    >
                      <option value="small_van">Small Van (Up to 400kg / 1 Pallet / Envelopes / Boxes)</option>
                      <option value="midi_swb">Midi SWB (Up to 800kg / 2 Pallets)</option>
                      <option value="lwb">Long Wheelbase (Up to 1,100kg / 3 Pallets)</option>
                      <option value="xlwb">Extra Long Wheelbase (Up to 1,100kg / 4 Pallets)</option>
                      <option value="luton_tail_lift">Luton Box Van with 500kg Tail Lift (Up to 6 Pallets)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Proceed to Full Quotation &amp; Pricing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 text-center pt-1 border-t border-slate-100 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free, no obligation • Reviewed by real transport coordinators</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assurance Ribbon - Clean British Commercial Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-sky-50 text-[#0284C7] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">Dedicated Driver Guarantee</strong>
              <span className="text-slate-600">The person who collects delivers to the recipient. No hand-offs.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-sky-50 text-[#0284C7] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">24/7/365 On-Demand</strong>
              <span className="text-slate-600">Available day, night, weekends &amp; bank holidays UK-wide.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-sky-50 text-[#0284C7] shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">Proof of Delivery (POD)</strong>
              <span className="text-slate-600">Electronic signature captured &amp; emailed immediately.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-sky-50 text-[#0284C7] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="text-slate-900 block font-bold">Goods in Transit Insured</strong>
              <span className="text-slate-600">Fully covered with comprehensive goods-in-transit policy.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Real Quote from Founder Neil Carter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              The Radical Difference
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              "We manage your delivery from start to finish with one dedicated driver."
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We don't waste your time with call handlers searching for 3rd-party couriers to sell your job to.
              We advise you within moments of vehicle availability, provide the allocated driver's name and registration
              number in advance, and take 100% ownership of your delivery.
            </p>
            <div className="text-xs font-semibold text-slate-500 pt-1">
              — Neil Carter, Founder &amp; Director, Radical Courier Service Ltd (Est. 2007, Coventry)
            </div>
          </div>

          <button
            onClick={() => onNavigate("about")}
            className="shrink-0 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
          >
            Learn More About Us
          </button>
        </div>
      </section>

      {/* Specialist Cargo & Industries (Direct from radicalcourier.co.uk) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
              What We Transport
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Sector Logistics &amp; Specialist Deliveries
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            From envelopes to machinery across Coventry, Warwickshire &amp; the UK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Automotive & F1 */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs hover:border-[#0284C7] transition-colors flex flex-col">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src="/radical-automotive.jpg"
                alt="Automotive & Motorsport Parts"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop";
                }}
              />
              <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Motorsport &amp; Engineering
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 mb-1">
                  Automotive &amp; Formula 1 Support
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Time-critical delivery of heads-up displays (HUD), precision trackside spares for F1 teams,
                  and urgent line-side assembly parts across the Midlands automotive cluster.
                </p>
              </div>
              <button
                onClick={() => onNavigate("quote")}
                className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
              >
                Quote Automotive Delivery <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legal Documents */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs hover:border-[#0284C7] transition-colors flex flex-col">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src="/radical-law.jpg"
                alt="Legal and Confidential Documents"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop";
                }}
              />
              <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Confidential &amp; Judiciary
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 mb-1">
                  Legal Documents &amp; Deeds
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hand-to-hand transit for solicitors and courts. Time-sensitive legal papers, contracts requiring
                  in-person client signatures, and complete confidentiality guaranteed.
                </p>
              </div>
              <button
                onClick={() => onNavigate("quote")}
                className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
              >
                Quote Legal Courier <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Printing & Publications */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs hover:border-[#0284C7] transition-colors flex flex-col">
            <div className="h-44 bg-slate-100 overflow-hidden relative">
              <img
                src="/radical-printing.jpg"
                alt="Printing & Bulk Publications"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop";
                }}
              />
              <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Print &amp; Exhibitions
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 mb-1">
                  Printing &amp; Commercial Media
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct transport of bulk magazine prints, journals, event brochures, and promotional merchandise
                  directly to exhibition venues (NEC, London ExCeL) and distribution hubs.
                </p>
              </div>
              <button
                onClick={() => onNavigate("quote")}
                className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
              >
                Quote Print Freight <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Other Industries Tag List */}
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center">
          <strong>Also regularly transporting:</strong> Medical equipment &amp; laboratory samples, high-value jewellery,
          auction house valuables, local council documents, and student university relocations.
        </div>
      </section>

      {/* Vehicle Fleet Cards - Realistic Van Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Vehicle Capacity Guide
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Our Same-Day Fleet Specifications
            </h2>
          </div>
          <button
            onClick={() => onNavigate("quote")}
            className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
          >
            Calculate Van Pricing <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {RADICAL_VANS.map((van) => (
            <div
              key={van.id}
              className="border border-slate-200 rounded-xl bg-white p-4 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="text-xs font-bold text-slate-900 mb-0.5">{van.name}</div>
                <div className="text-[11px] font-semibold text-[#0284C7] mb-2">
                  {van.pallets} Pallet{van.pallets > 1 ? "s" : ""} • Payload: {van.payload}
                </div>
                <div className="bg-slate-50 rounded p-2 text-[11px] text-slate-600 mb-2 font-mono">
                  L: {van.length} | W: {van.width} | H: {van.height}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  {van.idealFor}
                </p>
              </div>

              <button
                onClick={() => onNavigate("quote")}
                className="w-full py-2 rounded bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-700 text-xs font-bold transition-colors"
              >
                Select Van
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Authentic Testimonials from their original site */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
              Client Endorsements
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              What Real Clients Say About Radical Courier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Coventry City FC */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed">
                  "Neil has been consistent and constant in the level of service delivered. This has included
                  delivering key documents, on time and in appalling winter conditions. Like the US Post, Neil always
                  gets through and delivers!"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3 mt-4">
                <strong className="text-slate-900 block font-bold">Coventry City FC</strong>
                <span className="text-slate-500 text-[11px]">Club Management Operations</span>
              </div>
            </div>

            {/* Craig Watson / Hi-line Industries */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed">
                  "Impeccable service from Radical Couriers!! Same day delivery required from Burton on Trent
                  to central Manchester, first contact made at 11.00am, item was delivered at 3.00pm. 4 Hours from
                  start to finish and all parties informed item's progress. That's what I call efficient!"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3 mt-4">
                <strong className="text-slate-900 block font-bold">Craig Watson</strong>
                <span className="text-slate-500 text-[11px]">Refrigeration Product Manager, Hi-line Industries</span>
              </div>
            </div>

            {/* Mike Johnson */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed">
                  "Radical Couriers provided an excellent straight to door service that was prompt, reliable
                  and above all transparent. I was kept up-to-date with regular communications and provided with an accurate
                  delivery time which ensured minimal impact to my day, with my item arriving in excellent condition."
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3 mt-4">
                <strong className="text-slate-900 block font-bold">Mike Johnson</strong>
                <span className="text-slate-500 text-[11px]">Private Consignment Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              24/7 Operations Desk
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Need an Urgent Courier Dispatched Today?
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              We have experienced drivers available across Coventry, Warwick, Birmingham, Rugby,
              and Leamington ready to collect and deliver immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:02475122465"
              className="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>024 7512 2465</span>
            </a>

            <button
              onClick={() => onNavigate("quote")}
              className="px-6 py-3 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Get Online Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}