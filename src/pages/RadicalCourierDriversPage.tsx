import { useState } from "react";
import {
  Truck,
  Smartphone,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Coins,
  Headphones,
  FileCheck,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RadicalCourierDriversPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierDriversPage({
  onNavigate,
}: RadicalCourierDriversPageProps) {
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("Small Van");
  const [baseTown, setBaseTown] = useState("");
  const [hasInsurance, setHasInsurance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !driverEmail || !driverPhone || !baseTown) {
      toast.error("Please fill in all required driver details.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      toast.success("Driver application submitted! Our team will contact you shortly.");
    }, 700);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-[#0B152E] to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            Midlands & UK Driver Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Drive with Radical Courier Service
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join a forward-thinking courier company that values its drivers with clear upfront job pay,
            swift payments, and dedicated dispatch support every mile of the journey.
          </p>
        </div>
      </section>

      {/* Driver Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Custom Driver App</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accept jobs instantly on your Android mobile device with full collection & delivery notes.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Clear Upfront Rates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Know exactly how much you earn before accepting. Total loaded mileage and payment shown transparently.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Speedy Payments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prompt weekly settlements directly to your bank account with complete remittance receipts.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">24/7 Live Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access to our Coventry control room while on the road whenever you need traffic or access help.
            </p>
          </div>
        </div>
      </section>

      {/* Driver Requirements & Registration Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Requirements & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
                Registration Criteria
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What You Need to Join
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We accept experienced owner-drivers based in or around Coventry, Warwickshire,
                Birmingham, Leicester, Rugby, and the wider Midlands.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Vehicle in Good Order</strong>
                  <span className="text-slate-500">
                    Motorcycle, Small Van, SWB, LWB, XLWB, or Luton Van with tail lift. Valid MOT certificate.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Appropriate Courier Insurance</strong>
                  <span className="text-slate-500">
                    Hire & Reward vehicle insurance, plus Goods in Transit and Public Liability cover.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Valid UK Driving Licence</strong>
                  <span className="text-slate-500">
                    Full UK driving licence with a clean record or minimal penalty points.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Smartphone for Driver App</strong>
                  <span className="text-slate-500">
                    Android phone capable of running our dedicated dispatch application.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
            {isRegistered ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Application Received!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                  Thank you, {driverName}. A member of our fleet onboarding team will review your details
                  and call you at <strong>{driverPhone}</strong> to complete onboarding and app setup.
                </p>
                <button
                  onClick={() => setIsRegistered(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Submit Another Driver Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">Driver Registration Form</h3>
                  <p className="text-xs text-slate-500">Registration is free with no subscription charges</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 07123 456789"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. driver@domain.co.uk"
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Home Base Town / Postcode *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Coventry, Rugby, Solihull"
                      value={baseTown}
                      onChange={(e) => setBaseTown(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    >
                      <option value="Small Van">Small Van (Citroen Berlingo, Transit Connect)</option>
                      <option value="Short Wheelbase">Midi / Short Wheelbase (SWB)</option>
                      <option value="Long Wheelbase">Long Wheelbase (LWB / Sprinter)</option>
                      <option value="Extra Long Wheelbase">Extra Long Wheelbase (XLWB)</option>
                      <option value="Luton Tail Lift">Luton Van with 500kg Tail Lift</option>
                      <option value="Motorcycle">Courier Motorcycle</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={hasInsurance}
                        onChange={(e) => setHasInsurance(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0284C7]"
                      />
                      <span>I have valid courier insurance & UK MOT</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Driver Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Radical Driver Android Mobile App Section (from their original site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
                <Smartphone className="w-3.5 h-3.5" />
                Official Driver Application
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Radical Courier Android Mobile App
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Our custom mobile application notifies you the instant a new job matching your vehicle
                is available in your area. Review collection and delivery addresses, mileage, payload notes,
                and your exact earnings prior to acceptance.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/radicalcourierservice-210212.appspot.com/o/RadApp%2FRadicalCourier31.apk?alt=media&token=aa6f741f-2c3d-4ff6-ae76-5245a74a91a7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-extrabold text-xs shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Radical Courier APK (Android)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 text-xs space-y-3">
              <div className="font-bold text-sky-400 text-sm">How to Install the APK:</div>
              <ol className="space-y-2 text-slate-300 list-decimal pl-4">
                <li>Download the APK file onto your Android phone.</li>
                <li>When prompted, allow installs from "Files" or your browser in Android Settings.</li>
                <li>Tap Install when the confirmation prompt appears.</li>
                <li>Open the app and log in with your registered driver credentials.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}