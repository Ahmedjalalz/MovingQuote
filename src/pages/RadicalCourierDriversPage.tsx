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
    <div className="space-y-12 sm:space-y-16 pb-16 bg-white text-slate-900">
      {/* Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Owner-Drivers &amp; Courier Fleet Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Drive with Radical Courier Service
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            If you are based in or near Coventry, Warwickshire, or the West Midlands and have access to
            your own van or motorcycle, we offer transparent rates, speedy payments, and direct support.
          </p>
        </div>
      </section>

      {/* Driver Advantages (Direct from radicalcourier.co.uk) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-white text-xs space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Mobile Phone App</div>
            <p className="text-slate-600">Available job notifications sent directly to your phone with full details.</p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white text-xs space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Transparent Pay</div>
            <p className="text-slate-600">See the exact mileage and payment due to you before you accept any job.</p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white text-xs space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Speedy Payments</div>
            <p className="text-slate-600">Prompt payments directly into your bank account with complete statements.</p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white text-xs space-y-1.5">
            <div className="font-bold text-slate-900 text-sm">Live Job Support</div>
            <p className="text-slate-600">Direct telephone support from our Coventry operations desk while on the road.</p>
          </div>
        </div>
      </section>

      {/* Requirements & Application Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Requirements */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <h2 className="text-xl font-black text-slate-900">
              Driver Requirements
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To register as a driver with Radical Courier Service, you will need:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Vehicle:</strong> Van (Small Van, SWB, LWB, XLWB, or Luton) or courier motorcycle.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Insurance:</strong> Appropriate Hire &amp; Reward courier insurance, Goods in Transit, and Public Liability.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Documentation:</strong> Valid UK Driving Licence and current vehicle MOT.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Mobile Device:</strong> Android smartphone to run the Radical Courier driver application.</span>
              </div>
            </div>

            <p className="text-slate-500 text-[11px]">
              Registration is completely free with no recurring subscription or sign-up fees.
            </p>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            {isRegistered ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Application Received</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, {driverName}. A member of our fleet team will review your application and
                  contact you at <strong>{driverPhone}</strong> to complete onboarding and app configuration.
                </p>
                <button
                  onClick={() => setIsRegistered(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3 text-xs">
                <div className="border-b border-slate-100 pb-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900">Driver Registration Form</h3>
                  <span className="text-[11px] text-slate-500">Free registration for owner-drivers</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Telephone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07123 456789"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. driver@domain.co.uk"
                      value={driverEmail}
                      onChange={(e) => setDriverEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Home Base / Postcode *</label>
                    <input
                      type="text"
                      placeholder="e.g. Coventry, Rugby, Leamington"
                      value={baseTown}
                      onChange={(e) => setBaseTown(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 px-2.5 text-xs font-medium text-slate-900"
                  >
                    <option value="Small Van">Small Van (Citroen Berlingo, Transit Connect)</option>
                    <option value="Short Wheelbase">Midi / Short Wheelbase (SWB)</option>
                    <option value="Long Wheelbase">Long Wheelbase (LWB / Sprinter)</option>
                    <option value="Extra Long Wheelbase">Extra Long Wheelbase (XLWB)</option>
                    <option value="Luton Tail Lift">Luton Van with 500kg Tail Lift</option>
                    <option value="Motorcycle">Courier Motorcycle</option>
                  </select>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
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
                    className="w-full py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Driver Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Radical Driver Android App (Actual Download & Install Guide from radicalcourier.co.uk) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-6 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Official Driver Application
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Radical Courier Android Mobile App (APK)
              </h3>
              <p className="text-slate-600 text-xs mt-0.5">
                Install our dedicated Android driver application to receive live job dispatch alerts.
              </p>
            </div>

            <a
              href="https://firebasestorage.googleapis.com/v0/b/radicalcourierservice-210212.appspot.com/o/RadApp%2FRadicalCourier31.apk?alt=media&token=aa6f741f-2c3d-4ff6-ae76-5245a74a91a7"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Radical Courier APK</span>
            </a>
          </div>

          <div className="space-y-2 text-slate-700">
            <strong className="text-slate-900 font-bold block">Installation Instructions:</strong>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600">
              <li>Click the button above to download the <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">RadicalCourier31.apk</code> file to your device.</li>
              <li>When prompted by Android, go to Settings and allow installs from your browser / Files app ("Allow from this source").</li>
              <li>Tap Install on the prompt to complete setup.</li>
              <li>Open the app and sign in with your confirmed driver credentials.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}