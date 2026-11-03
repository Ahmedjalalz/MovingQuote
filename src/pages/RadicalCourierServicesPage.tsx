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
  Package,
  Layers,
  Sparkles,
  Phone,
  FileText,
  UserCheck,
  HelpCircle,
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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-[#0B152E] to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
            Dedicated Same-Day Logistics
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Our Delivery Services & Fleet
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every Radical delivery is handled directly by a single allocated driver.
            No sorting hubs, no co-loading, and zero risk of your items passing through multiple hands.
          </p>
        </div>
      </section>

      {/* The 3 Core Delivery Formats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Three Tailored Delivery Formats
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Whether it's an emergency same-day dispatch or a planned campus move, we have you covered.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab("urgent")}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                activeTab === "urgent"
                  ? "bg-white text-[#0284C7] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. Urgent Same-Day On Demand</span>
            </button>

            <button
              onClick={() => setActiveTab("scheduled")}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                activeTab === "scheduled"
                  ? "bg-white text-[#0284C7] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <span>2. Scheduled & Multi-Drop</span>
            </button>

            <button
              onClick={() => setActiveTab("student")}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                activeTab === "student"
                  ? "bg-white text-[#0284C7] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>3. Student Accommodation Moves</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Urgent Same-Day */}
        {activeTab === "urgent" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
                <Zap className="w-3.5 h-3.5" />
                Time-Critical Emergency Logistics
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Urgent Same-Day On-Demand Courier
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                When every minute counts, our dedicated Coventry & Midlands dispatch team locates the
                nearest driver and sends them directly to your collection point within 60 minutes.
                Your goods travel non-stop straight to the destination door.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Single Dedicated Driver</span>
                    <span className="text-slate-500">The person who collects delivers to the recipient</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Driver Mobile Phone</span>
                    <span className="text-slate-500">Call your driver directly for real-time traffic updates</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Driver Reg For Security</span>
                    <span className="text-slate-500">Provided in advance to clear site security gates</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Immediate Digital POD</span>
                    <span className="text-slate-500">Instant signed proof of delivery emailed to you</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Book Urgent Delivery Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="font-bold text-sm text-slate-900">Urgent Courier Scenarios:</div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Factory assembly breakdown machine parts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Motorsport trackside components (Silverstone / Donington)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Emergency legal bundles for court filings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Urgent medical specimens and hospital devices</span>
                </li>
              </ul>
              <div className="rounded-xl bg-white p-3.5 border border-slate-200 text-xs text-slate-700">
                <strong>Emergency Helpline:</strong> Need dispatch right now? Call our 24/7 hotline at{" "}
                <a href="tel:02475122465" className="text-[#0284C7] font-bold hover:underline">
                  024 7512 2465
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Scheduled */}
        {activeTab === "scheduled" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#0284C7] text-xs font-extrabold uppercase">
                <Calendar className="w-3.5 h-3.5" />
                Planned Routes & Multi-Drop Logistics
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Same-Day Scheduled & Contract Deliveries
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                For routine business runs, inter-depot stock transfers, trade exhibitions, or planned
                future date collections. Lock in your dedicated vehicle and driver ahead of time for
                seamless execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Specific Time Slots</span>
                    <span className="text-slate-500">Fixed collection and delivery booking windows</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Weekly / Daily Contract Runs</span>
                    <span className="text-slate-500">Regular dedicated driver familiar with your sites</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Pallet Tail-Lift Capabilities</span>
                    <span className="text-slate-500">Up to 6 standard pallets with hydraulic offload</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Corporate Account Terms</span>
                    <span className="text-slate-500">Monthly consolidated billing & preferred rates</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Schedule Delivery Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="font-bold text-sm text-slate-900">Ideal For:</div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Scheduled manufacturing replenishment to assembly plants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>B2B wholesale deliveries across Warwickshire & West Midlands</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Exhibition freight transport to the NEC Birmingham or London ExCeL</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Next-day planned collections with guaranteed delivery dates</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content 3: Student Move */}
        {activeTab === "student" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                University & Campus Relocation
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Student Accommodation & Belongings Move
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                As featured on our official service offerings: where a student needs to relocate between
                home and university campus accommodation (such as Warwick University, Coventry University,
                or UK-wide), we are able to transport both person and personal belongings directly door to door.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Move Person & Belongings</span>
                    <span className="text-slate-500">Travel alongside your suitcases, computers & luggage</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Campus Delivery</span>
                    <span className="text-slate-500">Straight to your halls of residence or student flat</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Spacious Clean Vans</span>
                    <span className="text-slate-500">Room for desks, clothing racks, sports kit & bedding</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Fixed Clear Student Pricing</span>
                    <span className="text-slate-500">No unexpected surcharges or hidden fuel add-ons</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("quote")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Request Student Relocation Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="font-bold text-sm text-slate-900">Popular Universities Served:</div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>University of Warwick (Gibbet Hill / Westwood / Campus)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Coventry University & Technology Park student flats</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>University of Birmingham & Aston University</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Loughborough, Leicester & Nottingham campuses</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Complete Vehicle Fleet Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Radical Courier Vehicle Fleet Specifications
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Payload capacities and maximum cargo dimensions across our fleet.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Vehicle Class</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px]">Dimensions (L × W × H)</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px]">Payload Capacity</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px]">Pallets</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Best Suited For</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {RADICAL_VANS.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 font-extrabold text-slate-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0284C7]" />
                    <span>{v.name}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700">
                    {v.length} × {v.width} × {v.height}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900">{v.payload}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-md">
                      {v.pallets} Pallet{v.pallets > 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-600 max-w-xs">{v.idealFor}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onNavigate("quote")}
                      className="px-3 py-1.5 rounded-lg bg-sky-50 text-[#0284C7] hover:bg-[#0284C7] hover:text-white font-bold transition-all"
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

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            Have a Bespoke Logistics Requirement?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Need multiple drops, round-trip return journeys, or contract pricing?
            Our operations director is available 24/7.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate("quote")}
              className="px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs"
            >
              Get Instant Online Quote
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20"
            >
              Contact Operations Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}