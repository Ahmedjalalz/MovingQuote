import { useState } from "react";
import {
  Truck,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  MapPin,
  Package,
  FileCheck,
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
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                24/7 Same-Day Courier • Coventry &amp; UK Nationwide
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Same-Day Delivery, Managed by One Dedicated Driver.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto sm:mx-0">
                Direct point-to-point transport operating 24 hours a day from Coventry.
                The driver who collects your consignment delivers it straight to the recipient.
                No sorting hubs, no co-loading, and zero subcontracting.
              </p>

              {/* Call to action buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <button
                  onClick={() => onNavigate("quote")}
                  className="px-7 py-3.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Instant Rate Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:02475122465"
                  className="px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>024 7512 2465</span>
                </a>
              </div>

              {/* Minimal Trust Signals */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Direct Point-to-Point
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  60-Min Midlands Response
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Envelopes to 6 Pallets
                </span>
              </div>
            </div>

            {/* Clean Quick Estimator Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Quick Rate Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fixed price quotation based on official mileage tariff.
                  </p>
                </div>

                <form onSubmit={handleQuickQuote} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Collection Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Coventry CV1, Warwick, Birmingham"
                        value={quickPickup}
                        onChange={(e) => setQuickPickup(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Delivery Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. London, Manchester, Leeds, Bristol"
                        value={quickDelivery}
                        onChange={(e) => setQuickDelivery(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Vehicle Type
                    </label>
                    <select
                      value={quickVan}
                      onChange={(e) => setQuickVan(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    >
                      <option value="small_van">Small Van (Up to 400kg / 1 Pallet)</option>
                      <option value="midi_swb">Midi SWB (Up to 800kg / 2 Pallets)</option>
                      <option value="lwb">Long Wheelbase (Up to 1,100kg / 3 Pallets)</option>
                      <option value="xlwb">Extra Long Wheelbase (Up to 1,100kg / 4 Pallets)</option>
                      <option value="luton_tail_lift">Luton Box Van with 500kg Tail Lift (6 Pallets)</option>
                    </select>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Calculate Pricing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No registration required • Free fixed quote</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Strip */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#0284C7]" />
              <h3 className="font-bold text-base text-slate-900">Dedicated Driver Only</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The driver who collects delivers directly to your recipient with zero co-loading or hub sorting.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <Clock className="w-6 h-6 text-[#0284C7]" />
              <h3 className="font-bold text-base text-slate-900">24/7/365 On Demand</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Available around the clock with 60-minute urgent collection response across the Midlands.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <FileCheck className="w-6 h-6 text-[#0284C7]" />
              <h3 className="font-bold text-base text-slate-900">Electronic POD</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Recipient name, signature, and timestamp captured and sent immediately upon handover.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <Truck className="w-6 h-6 text-[#0284C7]" />
              <h3 className="font-bold text-base text-slate-900">Transit Insured</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Comprehensive Goods in Transit and Public Liability insurance on every consignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Editorial Quote */}
      <section className="py-12 bg-slate-50/60 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed italic">
            "We manage your delivery from start to finish with one dedicated driver.
            No call-centre runarounds, no sorting depots, and no selling your job to outside courier firms."
          </p>
          <div className="text-xs text-slate-500 font-medium tracking-wide">
            — <strong className="text-slate-800">Neil Carter</strong>, Director • Radical Courier Service Limited (Coventry, Est. 2007)
          </div>
        </div>
      </section>

      {/* Sector Logistics Cards */}
      <section className="py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Industry Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Specialist Sector Logistics
              </h2>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="text-sm font-semibold text-[#0284C7] hover:underline flex items-center gap-1"
            >
              <span>Explore All Services</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Automotive */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden flex flex-col justify-between">
              <div className="h-48 bg-slate-100 overflow-hidden">
                <img
                  src="/radical-automotive.jpg"
                  alt="Automotive Parts Courier"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg text-slate-900">Automotive &amp; Motorsport</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Urgent delivery of breakdown replacement parts, assembly tooling, and trackside spares for motorsport teams.
                </p>
                <button
                  onClick={() => onNavigate("quote")}
                  className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1 pt-1 hover:underline"
                >
                  Quote Automotive Delivery <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Legal */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden flex flex-col justify-between">
              <div className="h-48 bg-slate-100 overflow-hidden">
                <img
                  src="/radical-law.jpg"
                  alt="Legal Documents Courier"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg text-slate-900">Legal Documents &amp; Deeds</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Confidential direct transport for court filing deadlines, deed submissions, and in-person contract signatures.
                </p>
                <button
                  onClick={() => onNavigate("quote")}
                  className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1 pt-1 hover:underline"
                >
                  Quote Legal Courier <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Printing */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden flex flex-col justify-between">
              <div className="h-48 bg-slate-100 overflow-hidden">
                <img
                  src="/radical-printing.jpg"
                  alt="Print & Publications Transport"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg text-slate-900">Printing &amp; Publications</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bulk transport of catalogues, magazines, and event promotional merchandise direct to exhibition halls.
                </p>
                <button
                  onClick={() => onNavigate("quote")}
                  className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1 pt-1 hover:underline"
                >
                  Quote Print Freight <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Sizing - Comfortable 3+2 responsive grid */}
      <section className="py-16 sm:py-24 border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Fleet Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Vehicle Classes &amp; Capacities
              </h2>
            </div>
            <button
              onClick={() => onNavigate("quote")}
              className="text-sm font-semibold text-[#0284C7] hover:underline flex items-center gap-1"
            >
              <span>Calculate Mileage Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RADICAL_VANS.map((van) => (
              <div
                key={van.id}
                className="border border-slate-200/80 rounded-2xl bg-white p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-slate-900">{van.name}</span>
                    <span className="text-xs font-semibold text-[#0284C7] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                      {van.pallets} Pallet{van.pallets > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-mono">
                    Cargo Bay: {van.length} × {van.width} × {van.height} • Max {van.payload}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {van.idealFor}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("quote")}
                  className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-800 text-xs font-bold transition-colors"
                >
                  Quote This Vehicle
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Endorsements */}
      <section className="py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coventry City FC */}
            <div className="border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 bg-white">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "Neil has been consistent and constant in the level of service delivered. This has included
                delivering key documents on time and in appalling winter conditions. Neil always gets through and delivers!"
              </p>
              <div className="border-t border-slate-100 pt-3">
                <strong className="text-sm text-slate-900 block font-bold">Coventry City FC</strong>
                <span className="text-xs text-slate-500">Commercial Partner</span>
              </div>
            </div>

            {/* Hi-line Industries */}
            <div className="border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 bg-white">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "Impeccable service. Same day delivery from Burton on Trent to Manchester — first contact made
                at 11.00am, item delivered at 3.00pm. 4 hours from start to finish and all parties informed throughout."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <strong className="text-sm text-slate-900 block font-bold">Craig Watson</strong>
                <span className="text-xs text-slate-500">Hi-line Industries</span>
              </div>
            </div>

            {/* Mike Johnson */}
            <div className="border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 bg-white">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "Radical Couriers provided an excellent straight to door service that was prompt, reliable
                and above all transparent. Regular communications and accurate delivery times."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <strong className="text-sm text-slate-900 block font-bold">Mike Johnson</strong>
                <span className="text-xs text-slate-500">Commercial Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Need an urgent courier today?
              </h3>
              <p className="text-sm text-slate-300 max-w-lg">
                Vehicles available across Coventry, Birmingham, Warwick, and Rugby for immediate dispatch.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="tel:02475122465"
                className="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>024 7512 2465</span>
              </a>

              <button
                onClick={() => onNavigate("quote")}
                className="px-6 py-3 rounded-lg bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                Get Online Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
