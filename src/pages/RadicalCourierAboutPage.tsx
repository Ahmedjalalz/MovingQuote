import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Target,
  Phone,
  ArrowRight,
  HeartHandshake,
  Star,
  Quote,
  Building,
  Truck,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";

interface RadicalCourierAboutPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierAboutPage({ onNavigate }: RadicalCourierAboutPageProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-[#0B152E] to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
            Founded 2007 in Coventry, England
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            What Makes Us Radical
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            In an industry plagued by call centers, subcontracted hand-offs, and broken promises,
            we built Radical Courier on a radical principle: complete ownership from start to finish.
          </p>
        </div>
      </section>

      {/* The Core Manifesto */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              One Person. One Dedicated Journey. No Excuses.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We manage your delivery from start to finish, and we achieve this with <strong>one dedicated person</strong>.
              When you book a Radical delivery, your package does not sit in a distribution warehouse overnight, nor does it
              get transferred between multiple delivery drivers.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              The driver who meets you at collection is the exact same driver who walks the consignment into the
              hands of your recipient at the destination.
            </p>
          </div>

          {/* Side by side: What we don't do vs what we do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-4">
              <div className="font-extrabold text-sm text-red-700 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                What We DON'T Do:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We refuse to waste money on bloated call centres and detached call handlers who spend the
                bulk of their time searching for other courier firms to take the job you thought they were doing.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span> No selling your job to outside sub-contractors
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span> No vague arrival windows or evasive answers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">✕</span> No co-loading or multi-stop detour delays
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-sky-50/70 border border-sky-100 p-6 space-y-4">
              <div className="font-extrabold text-sm text-[#0284C7] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                What We DO:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct honesty and full operational transparency right from the very first conversation.
              </p>
              <ul className="space-y-2 text-xs text-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Advise you in moments of the exact price and vehicle availability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Provide allocated driver name & registration for gate security</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>TAKE 100% OWNERSHIP OF THE JOB YOU TRUSTED US WITH!</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History & Credentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              Company Heritage
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              18+ Years Serving Coventry, the Midlands & the UK
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Incorporated in March 2007 under company number 06143596, Radical Courier Service Limited
              was founded in Coventry with the objective of providing dependable, point-to-point courier solutions
              for industries that cannot tolerate delays or damaged consignments.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Under the direction of founder Neil Carter, the company has expanded its vehicle fleet
              from single vans to a nationwide network capable of transporting everything from small medical
              cartons to 6 heavy industrial pallets.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                <div className="font-extrabold text-sm text-slate-900 mb-1">Company No.</div>
                <div className="text-slate-600">06143596 (England & Wales)</div>
              </div>
              <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                <div className="font-extrabold text-sm text-slate-900 mb-1">Operating Model</div>
                <div className="text-slate-600">24/7/365 Dedicated Dispatch</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              Our Uncompromising Standards
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="border-b border-slate-800 pb-3">
                <span className="font-bold text-white block mb-0.5">Comprehensive Goods in Transit Cover</span>
                Full insurance protection on every consignment, whether it is high-value jewellery, legal deeds, or F1 components.
              </div>
              <div className="border-b border-slate-800 pb-3">
                <span className="font-bold text-white block mb-0.5">Vetted, Experienced Drivers</span>
                Every driver in our network holds verified UK driving licenses, courier insurance, and valid vehicle MOTs.
              </div>
              <div>
                <span className="font-bold text-white block mb-0.5">Direct Accountability</span>
                No automated bot support. You speak directly to our experienced team who knows exactly where your vehicle is located.
              </div>
            </div>

            <button
              onClick={() => onNavigate("quote")}
              className="w-full py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs transition-all"
            >
              Get Your Free Quotation Today
            </button>
          </div>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Trusted By High-Profile Midlands & UK Clients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic">
                "Like the US Post, Neil always gets through and delivers! Delivering key documents on time
                and in appalling winter conditions."
              </p>
              <div className="font-bold text-xs text-slate-900 border-t border-slate-100 pt-3">
                Coventry City FC Operations
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic">
                "Impeccable service... Same day delivery required from Burton on Trent to Manchester.
                4 hours from start to finish and all parties informed. That's what I call efficient!"
              </p>
              <div className="font-bold text-xs text-slate-900 border-t border-slate-100 pt-3">
                Hi-line Industries (Craig Watson)
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic">
                "An excellent straight to door service that was prompt, reliable and above all transparent...
                item arriving in excellent condition."
              </p>
              <div className="font-bold text-xs text-slate-900 border-t border-slate-100 pt-3">
                Mike Johnson (Business Consignments)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}