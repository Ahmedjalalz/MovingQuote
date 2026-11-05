import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Building2,
  Star,
  Truck,
  ArrowRight,
  MapPin,
  FileCheck,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";

interface RadicalCourierAboutPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierAboutPage({ onNavigate }: RadicalCourierAboutPageProps) {
  return (
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            About Radical Courier • Est. 2007 Coventry
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
            Direct to Door. Zero Hand-Offs.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Founded in Coventry in 2007 by Neil Carter, Radical Courier was created with a straightforward
            mission: provide reliable, time-critical UK transport where one dedicated driver oversees your consignment from start to finish.
          </p>
        </div>
      </section>

      {/* Main Narrative & Facts */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Story */}
            <div className="lg:col-span-7 space-y-6 text-sm text-slate-600 leading-relaxed">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                The Dedicated Driver Principle
              </h2>
              <p>
                Most modern courier companies rely on multi-tier brokerages and regional sorting hubs.
                Parcels are loaded, transferred, co-mingled with unrelated deliveries, and handed off through
                multiple distribution depots. When an item is urgent or confidential, that chain introduces delays and risk.
              </p>
              <p>
                At Radical Courier, we do the exact opposite. When you book a vehicle, that specific van and driver
                arrive at your collection point and travel directly to the delivery address. There are no depot sortings,
                no co-loading, and no subcontracting to third-party networks.
              </p>
              <p className="text-slate-800 font-medium">
                The driver who accepts your goods is the driver who hands them to the recipient.
              </p>
            </div>

            {/* Verified Credentials Card */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Company Credentials
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Registered Entity</span>
                    <strong className="text-slate-900 text-sm font-semibold">Radical Courier Service Limited</strong>
                    <span className="text-slate-500 block">Companies House: 06143596</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Coventry Operations</span>
                    <strong className="text-slate-900 text-sm font-semibold">38 Crossway Road</strong>
                    <span className="text-slate-500 block">Green Lane, Coventry, CV3 6JP</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Transit Insurance</span>
                    <strong className="text-slate-900 text-sm font-semibold">Full Goods in Transit Cover</strong>
                    <span className="text-slate-500 block">Plus comprehensive Public Liability</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Operating Hours</span>
                    <strong className="text-slate-900 text-sm font-semibold">24 Hours / 7 Days / 365 Days</strong>
                    <span className="text-slate-500 block">Immediate phone dispatch support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Operating Standards */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Our Operating Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              How We Deliver Differently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct Communication</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You receive your driver's name, vehicle registration, and direct mobile number.
                No call centres, automated menus, or middle-men.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Point-to-Point Routing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your consignment is the sole priority on the vehicle. The van departs collection
                and travels straight to delivery without intermediate drops.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Transparent Pricing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fixed mileage tariffs with no hidden fuel surcharges or unexpected add-ons.
                Know your exact cost before the vehicle departs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Client Feedback */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Client References
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Trusted by Local &amp; National Organisations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "Neil has been consistent and constant in the level of service delivered. This has included
                delivering key documents on time and in appalling winter conditions. Neil always gets through and delivers!"
              </p>
              <div className="border-t border-slate-100 pt-3">
                <strong className="text-sm text-slate-900 block font-bold">Coventry City FC</strong>
                <span className="text-xs text-slate-500">Commercial Partner</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "Same day delivery from Burton on Trent to Manchester — first contact made at 11.00am,
                item delivered at 3.00pm. 4 hours from start to finish and all parties informed throughout."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <strong className="text-sm text-slate-900 block font-bold">Craig Watson</strong>
                <span className="text-xs text-slate-500">Hi-line Industries</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 italic leading-relaxed">
                "Radical Couriers provided an excellent straight to door service that was prompt, reliable
                and transparent. Kept up to date with regular communications and accurate timing."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <strong className="text-sm text-slate-900 block font-bold">Mike Johnson</strong>
                <span className="text-xs text-slate-500">Commercial Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Call to Action */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-black text-white">
                Need a dedicated courier today?
              </h3>
              <p className="text-sm text-slate-300">
                Calculate your fixed rate online or telephone our Coventry office 24/7.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate("quote")}
                className="px-6 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors"
              >
                Get Online Quote
              </button>
              <a
                href="tel:02475122465"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white text-sm font-bold hover:bg-slate-700 transition-colors"
              >
                024 7512 2465
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
