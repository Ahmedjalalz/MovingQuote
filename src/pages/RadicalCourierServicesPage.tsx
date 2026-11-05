import { useState } from "react";
import {
  Truck,
  Zap,
  Calendar,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  FileCheck,
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
    <div className="space-y-12 sm:space-y-16 pb-16 bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Radical Courier Service Ltd • Operations Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Our Same-Day Delivery Services
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Every delivery is managed by a single allocated driver from start to finish.
            No sorting hubs, no co-loading, and no subcontracting to external couriers.
          </p>
        </div>
      </section>

      {/* The 3 Core Delivery Services (from radicalcourier.co.uk) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("urgent")}
            className={cn(
              "px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
              activeTab === "urgent"
                ? "border-[#0284C7] text-[#0284C7]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>1. Urgent Same-Day (On Demand)</span>
          </button>

          <button
            onClick={() => setActiveTab("scheduled")}
            className={cn(
              "px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
              activeTab === "scheduled"
                ? "border-[#0284C7] text-[#0284C7]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>2. Same-Day Scheduled (Planned Routes)</span>
          </button>

          <button
            onClick={() => setActiveTab("student")}
            className={cn(
              "px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
              activeTab === "student"
                ? "border-[#0284C7] text-[#0284C7]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            )}
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>3. Student Accommodation Moves</span>
          </button>
        </div>

        {/* Tab 1 Content: Urgent Same-Day */}
        {activeTab === "urgent" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-black text-slate-900">
                Urgent Same-Day On-Demand Courier
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Collection and delivery are carried out by one dedicated driver on the same day.
                Ideal for time-critical situations where failure to deliver on schedule causes major
                operational disruption.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-900">Key Service Features:</div>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>60-Minute Response:</strong> Nearest driver dispatched across Coventry, Warwick, Birmingham, Rugby, or Leamington.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Driver Name &amp; Direct Mobile:</strong> Provided in advance so you can contact the driver directly during transit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Vehicle Registration Advance Notice:</strong> Supplied for factory security gates and legal chambers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Electronic Signature POD:</strong> Proof of delivery captured digitally upon handover.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Book Urgent Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <strong className="text-slate-900 block font-bold text-sm">Typical Urgent Consignments:</strong>
              <ul className="space-y-2 text-slate-600">
                <li>• Breakdown machine spares &amp; engineering tooling</li>
                <li>• Heads-up displays and urgent automotive components</li>
                <li>• Time-sensitive court files and signed solicitor contracts</li>
                <li>• Emergency hospital medical equipment and specimens</li>
                <li>• Urgent passports, visas, and keys</li>
              </ul>
              <div className="border-t border-slate-200 pt-3 text-slate-700">
                <strong>Urgent hotline:</strong> Call <a href="tel:02475122465" className="text-[#0284C7] font-bold">024 7512 2465</a> for live vehicle allocation.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Scheduled */}
        {activeTab === "scheduled" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-black text-slate-900">
                Scheduled &amp; Planned Regular Deliveries
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For routine business runs, inter-depot stock transfers, trade exhibitions, or deliveries where
                collection and drop-off occur on planned future dates. Vehicles can be reserved in advance.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-900">Key Service Features:</div>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span><strong>Pre-Booked Time Slots:</strong> Guaranteed arrival windows to suit factory and warehouse shifts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span><strong>Contract Routes:</strong> Daily or weekly dedicated drivers familiar with your sites and loading bays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span><strong>Pallet Tail Lift Offloading:</strong> Up to 6 pallets with 500kg hydraulic tail lift assistance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span><strong>30-Day Invoicing:</strong> Consolidated monthly VAT statements for approved business accounts.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Schedule Courier Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <strong className="text-slate-900 block font-bold text-sm">Typical Scheduled Contracts:</strong>
              <ul className="space-y-2 text-slate-600">
                <li>• Regular inter-branch stock distribution</li>
                <li>• Bulk print magazine and catalog releases</li>
                <li>• Exhibition materials to the NEC Birmingham or London ExCeL</li>
                <li>• Planned next-day collections with specific handover windows</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3 Content: Student Move */}
        {activeTab === "student" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-black text-slate-900">
                Student Accommodation &amp; Belongings Moves
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As detailed on our official website: where a student needs to relocate between home and
                university accommodation, we are able to move both person and belongings together.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-900">Student Relocation Benefits:</div>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Travel With Your Luggage:</strong> Passenger ride-along to university halls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Direct Campus Delivery:</strong> Door to door with no transfers or lost bags.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Clean, Spacious Vans:</strong> Ample room for desks, desktop PCs, suitcases, and bedding.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Fixed Clear Prices:</strong> No surprise add-ons.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Get Student Move Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <strong className="text-slate-900 block font-bold text-sm">Key Universities Regularly Served:</strong>
              <ul className="space-y-2 text-slate-600">
                <li>• University of Warwick (Coventry campus / Gibbet Hill)</li>
                <li>• Coventry University &amp; Technology Park</li>
                <li>• University of Birmingham &amp; Aston University</li>
                <li>• Loughborough, Leicester &amp; Nottingham universities</li>
                <li>• UK-wide home to campus relocations</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Fleet Table - Industrial, Tabular, Clear */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200 pb-3 mb-6">
          <h2 className="text-2xl font-black text-slate-900">
            Vehicle Fleet Load Capacities
          </h2>
          <p className="text-xs text-slate-600">
            Maximum load dimensions, weight, and pallet count across our vehicle sizes.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="py-3 px-4 font-bold">Vehicle Class</th>
                <th className="py-3 px-4 font-bold">Dimensions (L × W × H)</th>
                <th className="py-3 px-4 font-bold">Max Payload</th>
                <th className="py-3 px-4 font-bold">Pallets</th>
                <th className="py-3 px-4 font-bold">Ideal Consignment</th>
                <th className="py-3 px-4 font-bold text-right">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {RADICAL_VANS.map((van) => (
                <tr key={van.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{van.name}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-mono">{van.length} × {van.width} × {van.height}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{van.payload}</td>
                  <td className="py-3.5 px-4 font-bold text-[#0284C7]">{van.pallets} Pallet{van.pallets > 1 ? "s" : ""}</td>
                  <td className="py-3.5 px-4 text-slate-600">{van.idealFor}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onNavigate("quote")}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-[#0284C7] hover:text-white text-slate-800 font-bold transition-colors"
                    >
                      Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}