import { useState } from "react";
import {
  Truck,
  Smartphone,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  HelpCircle,
  FileText,
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
      toast.error("Please fill in all required driver fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      toast.success("Driver application submitted. A fleet coordinator will contact you.");
    }, 600);
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Owner-Drivers &amp; Courier Fleet
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
            Drive with Radical Courier
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            If you are based in Coventry, Warwickshire, or across the West Midlands and operate your own van
            or courier motorcycle, we offer transparent rates, prompt direct payments, and dedicated dispatch support.
          </p>
        </div>
      </section>

      {/* 3 Driver Benefits */}
      <section className="py-12 border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Transparent Pricing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                See exact mileage, route details, and agreed compensation before you accept any job. No hidden fees.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Prompt Weekly Payments</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct transfers into your UK bank account with itemised self-billing remittance statements.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Dedicated Mobile App</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive live dispatches, upload recipient signatures, and update delivery milestones straight from your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements & Registration Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Driver Criteria */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Fleet Criteria
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Driver Requirements
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  To join our owner-driver network, you will need the following items in place:
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Your Own Vehicle</strong>
                    <span className="text-slate-500 text-xs">Van (Small, SWB, LWB, XLWB, Luton) or courier motorcycle</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Courier Insurance</strong>
                    <span className="text-slate-500 text-xs">Hire &amp; Reward, Goods in Transit, and Public Liability</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Documentation</strong>
                    <span className="text-slate-500 text-xs">Valid UK Driving Licence and current MOT certificate</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Android Smartphone</strong>
                    <span className="text-slate-500 text-xs">Compatible with the Radical Courier dispatch application</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                <strong>Note:</strong> Registration is 100% free with no recurring subscription or sign-up fees.
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Driver Application Form
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Complete the details below to join our Coventry &amp; Midlands courier network.
                </p>
              </div>

              {isRegistered ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Application Submitted</h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, {driverName}. A fleet coordinator will contact you at {driverPhone} to
                    verify insurance and complete app setup.
                  </p>
                  <button
                    onClick={() => setIsRegistered(false)}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 mt-2"
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Mobile Telephone *
                      </label>
                      <input
                        type="tel"
                        placeholder="07123 456789"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="driver@domain.co.uk"
                        value={driverEmail}
                        onChange={(e) => setDriverEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Home Base / Town *
                      </label>
                      <input
                        type="text"
                        placeholder="Coventry, Warwick, Rugby, etc."
                        value={baseTown}
                        onChange={(e) => setBaseTown(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    >
                      <option value="Small Van">Small Van (Citroen Berlingo, Transit Connect)</option>
                      <option value="Short Wheelbase">Midi / Short Wheelbase (SWB)</option>
                      <option value="Long Wheelbase">Long Wheelbase (LWB / Sprinter)</option>
                      <option value="Extra Long Wheelbase">Extra Long Wheelbase (XLWB)</option>
                      <option value="Luton Tail Lift">Luton Van with 500kg Tail Lift</option>
                      <option value="Motorcycle">Courier Motorcycle</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={hasInsurance}
                        onChange={(e) => setHasInsurance(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0284C7]"
                      />
                      <span>I confirm I hold valid courier insurance, current MOT, and UK licence.</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors"
                    >
                      {isSubmitting ? "Submitting Application..." : "Submit Driver Application"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Driver Android App (Direct Download) */}
      <section className="py-16 sm:py-20 border-t border-slate-100 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Official Mobile Dispatch
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Radical Courier Android Driver App
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Download our Android APK to receive live job dispatch notifications on the road.
                </p>
              </div>

              <a
                href="https://firebasestorage.googleapis.com/v0/b/radicalcourierservice-210212.appspot.com/o/RadApp%2FRadicalCourier31.apk?alt=media&token=aa6f741f-2c3d-4ff6-ae76-5245a74a91a7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shrink-0 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download APK</span>
              </a>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                Quick Installation Steps
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="bg-slate-50 rounded-xl p-4 space-y-1">
                  <strong className="text-slate-900 block font-semibold">1. Download APK</strong>
                  <span>Tap the download button above on your Android smartphone.</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-1">
                  <strong className="text-slate-900 block font-semibold">2. Allow Install</strong>
                  <span>Enable "Install Unknown Apps" in your device settings if prompted.</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-1">
                  <strong className="text-slate-900 block font-semibold">3. Log In</strong>
                  <span>Open the app and sign in with your confirmed driver credentials.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
