import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Building,
  Star,
  Quote,
  Truck,
  ArrowRight,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";

interface RadicalCourierAboutPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierAboutPage({ onNavigate }: RadicalCourierAboutPageProps) {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-white text-slate-900">
      {/* Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
            About Radical Courier Service Limited • Est. 2007 Coventry
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            What Makes Us Radical
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            In an industry dominated by call centers and subcontracted multi-drop brokers,
            we manage your delivery from start to finish with one dedicated driver.
          </p>
        </div>
      </section>

      {/* The Core Story & Difference */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900">
              Direct to Door. Zero Hand-Offs.
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Radical Courier Service Limited was incorporated in March 2007 in Coventry, Warwickshire
              (Company Registration No. 06143596). Founded by director Neil Carter, the company was established
              with a straightforward commitment: provide reliable same-day transport where the customer deals
              directly with the people responsible for their goods.
            </p>
          </div>

          {/* Comparison Cards: What We Don't Do vs What We Do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <strong className="text-red-700 font-bold block text-sm">
                What Traditional Couriers Do (We DON'T):
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Waste money on call centres and call handlers who spend the bulk of their time finding
                other courier firms or brokers to take the job you thought they were going to do.
              </p>
              <ul className="space-y-1.5 text-slate-600">
                <li>• No selling or brokering your consignment to third parties.</li>
                <li>• No co-loading with dozens of other unrelated drops.</li>
                <li>• No passing parcels through multiple regional hubs.</li>
              </ul>
            </div>

            <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-5 space-y-3 text-xs">
              <strong className="text-[#0284C7] font-bold block text-sm">
                What Radical Courier Does (We DO):
              </strong>
              <p className="text-slate-700 leading-relaxed">
                Direct honesty, realistic timings, and personal accountability from your first enquiry.
              </p>
              <ul className="space-y-1.5 text-slate-800">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Advise you within moments of the price and driver availability.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supply driver's name and registration number to support site security.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Take 100% ownership of the job you trusted us with!</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Credentials */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4 text-xs">
          <h3 className="text-base font-black text-slate-900">
            Company Information &amp; Operational Standards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
              <span className="text-slate-500 block">Registered Company:</span>
              <strong className="text-slate-900 block font-bold mt-0.5">Radical Courier Service Limited</strong>
              <span className="text-slate-500">Company No: 06143596</span>
            </div>

            <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
              <span className="text-slate-500 block">Head Office:</span>
              <strong className="text-slate-900 block font-bold mt-0.5">38 Crossway Road</strong>
              <span className="text-slate-500">Green Lane, Coventry, CV3 6JP</span>
            </div>

            <div className="border border-slate-100 rounded-lg p-3 bg-slate-50">
              <span className="text-slate-500 block">Insurance Cover:</span>
              <strong className="text-slate-900 block font-bold mt-0.5">Goods in Transit</strong>
              <span className="text-slate-500">Full policy &amp; Public Liability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Customer Feedback (Original Quotes) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200 pb-3 mb-6">
          <h3 className="text-xl font-black text-slate-900">Client References</h3>
          <p className="text-xs text-slate-600">Long-term relationships with football clubs, manufacturing, and commercial partners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 italic">
              "Neil has been consistent and constant in the level of service delivered. This has included delivering
              key documents, on time and in appalling winter conditions. Like the US Post, Neil always gets through and delivers!"
            </p>
            <div className="border-t border-slate-100 pt-2 font-bold text-slate-900">
              Coventry City FC
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 italic">
              "Impeccable service from Radical Couriers!! Same day delivery required from Burton on Trent to central Manchester,
              first contact made at 11.00am, item was delivered at 3.00pm. 4 Hours from start to finish and all parties informed. That's what I call efficient!"
            </p>
            <div className="border-t border-slate-100 pt-2 font-bold text-slate-900">
              Craig Watson, Hi-line Industries
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 italic">
              "Radical Couriers provided an excellent straight to door service that was prompt, reliable and above all transparent.
              I was kept up-to-date with regular communications and provided with an accurate delivery time."
            </p>
            <div className="border-t border-slate-100 pt-2 font-bold text-slate-900">
              Mike Johnson, Private Client
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-center sm:text-left">
            <strong className="text-sm font-bold text-slate-900 block">Ready to obtain a fixed quotation?</strong>
            <span className="text-slate-600">Calculate online in 60 seconds or call our Coventry office 24/7.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("quote")}
              className="px-5 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors"
            >
              Get Online Quote
            </button>
            <a
              href="tel:02475122465"
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              024 7512 2465
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}