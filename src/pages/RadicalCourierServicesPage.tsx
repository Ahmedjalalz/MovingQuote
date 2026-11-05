import { useState } from "react";
import {
  Truck,
  Zap,
  Calendar,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { RADICAL_VANS } from "@/components/radicalcourier/RadicalCourierQuoteWizard";
import { cn } from "@/lib/utils";

interface RadicalCourierServicesPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierServicesPage({
  onNavigate,
}: RadicalCourierServicesPageProps) {
  const [activeTab, setActiveTab] = useState<"urgent" | "scheduled" | "student">("urgent");

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Radical Courier Service • Fleet &amp; Capabilities
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
            Delivery Services &amp; Fleet
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Every booking is handled directly by one dedicated driver. No regional sorting hubs,
            no co-loading, and zero subcontracting.
          </p>
        </div>
      </section>

      {/* The 3 Core Delivery Formats */}
      <section className="py-12 sm:py-16 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Tab Buttons */}
          <div className="flex border-b border-slate-200 mb-10 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab("urgent")}
              className={cn(
                "px-6 py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === "urgent"
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. Urgent Same-Day (On Demand)</span>
            </button>

            <button
              onClick={() => setActiveTab("scheduled")}
              className={cn(
                "px-6 py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === "scheduled"
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>2. Same-Day Scheduled (Planned Routes)</span>
            </button>

            <button
              onClick={() => setActiveTab("student")}
              className={cn(
                "px-6 py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === "student"
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>3. Student Accommodation Moves</span>
            </button>
          </div>

          {/* Tab 1 Content: Urgent Same-Day */}
          {activeTab === "urgent" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Urgent Same-Day Courier
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Direct point-to-point transit where speed and security are paramount.
                    The vehicle collects directly from your premises and travels non-stop to the recipient.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">60-Minute Response</strong>
                      <span className="text-slate-500 text-xs">Rapid dispatch across Coventry &amp; the Midlands</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Direct Driver Mobile</strong>
                      <span className="text-slate-500 text-xs">Direct contact with driver throughout transit</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Security Clearance</strong>
                      <span className="text-slate-500 text-xs">Driver name and vehicle registration supplied</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Electronic POD</strong>
                      <span className="text-slate-500 text-xs">Signature and timestamp captured upon delivery</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate("quote")}
                    className="px-6 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors inline-flex items-center gap-2"
                  >
                    <span>Quote Urgent Courier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="tel:02475122465"
                    className="px-5 py-3 rounded-lg border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    024 7512 2465
                  </a>
                </div>
              </div>

              {/* Typical Consignments */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Frequently Transported Items
                </span>
                <div className="space-y-2.5 text-sm text-slate-600">
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Automotive parts &amp; assembly breakdown spares
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Urgent court bundles, deeds &amp; legal contracts
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Medical laboratory specimens &amp; critical supplies
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Trade show displays &amp; event print publications
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Content: Scheduled */}
          {activeTab === "scheduled" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Scheduled &amp; Contract Delivery
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Pre-booked collections and recurring routes designed for businesses requiring regular,
                    punctual transport between branches, suppliers, and distribution hubs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Guaranteed Time Slots</strong>
                      <span className="text-slate-500 text-xs">Punctual daily or weekly arrival windows</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Consistent Dedicated Drivers</strong>
                      <span className="text-slate-500 text-xs">Drivers familiar with your staff and procedures</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Pallet &amp; Tail Lift Support</strong>
                      <span className="text-slate-500 text-xs">Up to 6 standard pallets with 500kg tail lift</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">30-Day Invoicing</strong>
                      <span className="text-slate-500 text-xs">Consolidated monthly VAT statements</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("quote")}
                    className="px-6 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors inline-flex items-center gap-2"
                  >
                    <span>Schedule Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Typical Scheduled Routes */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Typical Scheduled Requirements
                </span>
                <div className="space-y-2.5 text-sm text-slate-600">
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Inter-site warehouse stock redistribution
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Multi-drop regional supplier deliveries
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Exhibition transit to the NEC or London ExCeL
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Scheduled print magazine distribution
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3 Content: Student Move */}
          {activeTab === "student" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Student Relocations &amp; Campus Moves
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Designed for students relocating between home and university accommodation.
                    We transport your belongings and you can ride along directly to campus halls.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Travel Alongside</strong>
                      <span className="text-slate-500 text-xs">Passenger ride-along option included</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Direct Campus Delivery</strong>
                      <span className="text-slate-500 text-xs">Direct to your student hall or apartment door</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Clean, Spacious Vans</strong>
                      <span className="text-slate-500 text-xs">Ample space for boxes, desks, monitors, bedding</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">Fixed All-Inclusive Rate</strong>
                      <span className="text-slate-500 text-xs">No surprises, excess baggage fees, or fuel add-ons</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("quote")}
                    className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors inline-flex items-center gap-2"
                  >
                    <span>Quote Student Move</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Universities Regularly Served */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Midlands Universities Frequently Served
                </span>
                <div className="space-y-2.5 text-sm text-slate-600">
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    University of Warwick (Gibbet Hill campus)
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Coventry University &amp; Technology Park
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    University of Birmingham &amp; Aston University
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-medium text-slate-800">
                    Loughborough, Leicester &amp; Nottingham campuses
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Clean Fleet Specifications Table */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Fleet Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Vehicle Capacity &amp; Sizing
            </h2>
          </div>

          <div className="overflow-x-auto border border-slate-200/80 rounded-2xl bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white text-xs">
                <tr>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider">Vehicle Class</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider">Cargo Space (L × W × H)</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider">Max Payload</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider">Pallets</th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-xs sm:text-sm">
                {RADICAL_VANS.map((van) => (
                  <tr key={van.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">{van.name}</div>
                      <div className="text-xs text-slate-500 font-normal mt-0.5">{van.idealFor}</div>
                    </td>
                    <td className="py-4 px-5 text-slate-700 font-mono text-xs whitespace-nowrap">
                      {van.length} × {van.width} × {van.height}
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-800 whitespace-nowrap">
                      {van.payload}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="font-semibold text-[#0284C7] bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md text-xs">
                        {van.pallets} Pallet{van.pallets > 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate("quote")}
                        className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-800 text-xs font-bold transition-colors"
                      >
                        Quote Van
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
