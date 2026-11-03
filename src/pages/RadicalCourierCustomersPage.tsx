import { useState } from "react";
import {
  User,
  Lock,
  Building,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
  ArrowRight,
  Sparkles,
  Truck,
  CreditCard,
  MapPin,
  Clock,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { toast } from "sonner";

interface RadicalCourierCustomersPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierCustomersPage({
  onNavigate,
}: RadicalCourierCustomersPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "track">("track");

  // Tracking State
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Corporate Register State
  const [compName, setCompName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [compEmail, setCompEmail] = useState("");
  const [compPhone, setCompPhone] = useState("");
  const [estMonthlySpend, setEstMonthlySpend] = useState("£500 - £2,000");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error("Please enter a consignment reference or postcode.");
      return;
    }

    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      setTrackingResult({
        ref: trackingNumber.toUpperCase(),
        status: "Active In Transit",
        driverName: "Neil C. (Dedicated Driver)",
        vehicle: "Ford Transit LWB (Reg: VK23 ***)",
        pickup: "Coventry CV1 (Collected 11:15 AM)",
        destination: "London EC1 (Estimated Delivery 1:45 PM)",
        progress: 75,
        updated: "2 minutes ago (M40 Southbound)",
      });
      toast.success("Consignment located! Displaying live tracking telemetry.");
    }, 600);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      toast.success("Welcome back! Loading account orders and invoice history...");
      onNavigate("quote");
    }, 700);
  };

  const handleRegisterAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Corporate 30-day invoice account request received. A business coordinator will contact you.");
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-[#0B152E] to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
            Client Portal & Live Telemetry
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Customer Portal & Consignment Tracking
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Track active same-day deliveries, manage corporate 30-day credit accounts, and access
            instant Proof of Delivery (POD) signatures.
          </p>
        </div>
      </section>

      {/* Main Interactive Hub */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab("track")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "track" ? "bg-white text-[#0284C7] shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Search className="w-4 h-4 text-[#0284C7]" />
              <span>Live Consignment Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab("login")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "login" ? "bg-white text-[#0284C7] shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="w-4 h-4 text-[#0284C7]" />
              <span>Customer Sign In</span>
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "register" ? "bg-white text-[#0284C7] shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="w-4 h-4 text-emerald-600" />
              <span>Open Business Account</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Tracking */}
        {activeTab === "track" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900">Track an Active Consignment</h3>
              <p className="text-xs text-slate-500">
                Enter your Radical Job Reference (e.g. RAD-84291) or destination postcode
              </p>
            </div>

            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. RAD-49210 or CV1..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                />
              </div>
              <button
                type="submit"
                disabled={isTracking}
                className="px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all shrink-0 cursor-pointer"
              >
                {isTracking ? "Locating..." : "Track Now"}
              </button>
            </form>

            {/* Tracking Result Mockup */}
            {trackingResult && (
              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-6 space-y-4 animate-in slide-in-from-top duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                      Consignment Telemetry
                    </span>
                    <span className="text-lg font-black text-slate-900">{trackingResult.ref}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {trackingResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Dedicated Driver:</span>
                    <span className="font-bold text-slate-900">{trackingResult.driverName}</span>
                    <span className="text-slate-500 block">{trackingResult.vehicle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Current Position:</span>
                    <span className="font-bold text-slate-900">{trackingResult.updated}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Collection Point:</span>
                    <span className="font-semibold text-slate-800">{trackingResult.pickup}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Direct Handover To:</span>
                    <span className="font-semibold text-slate-800">{trackingResult.destination}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <span>In Transit</span>
                    <span>75% Completed</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-sky-200 overflow-hidden">
                    <div className="h-full bg-[#0284C7] rounded-full transition-all duration-1000 w-3/4" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Login */}
        {activeTab === "login" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900">Sign In to Your Customer Account</h3>
              <p className="text-xs text-slate-500">Access saved delivery addresses and volume discount rates</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.co.uk"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" className="rounded text-[#0284C7]" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); toast.info("Password reset instructions will be sent to your email."); }} className="text-[#0284C7] hover:underline font-semibold">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                {isLoggingIn ? "Authenticating..." : "Sign In to Account"}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate("quote")}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Return to quote calculator without logging in
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Corporate Account Application */}
        {activeTab === "register" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900">Open a Corporate 30-Day Credit Account</h3>
              <p className="text-xs text-slate-500">
                Unlock monthly VAT invoice consolidation, preferential volume mileage rates, and priority dispatch
              </p>
            </div>

            <form onSubmit={handleRegisterAccount} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Company Registered Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Midlands Engineering Ltd"
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Accounts Contact Person *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Accounts Billing Email *
                  </label>
                  <input
                    type="email"
                    placeholder="invoices@company.co.uk"
                    value={compEmail}
                    onChange={(e) => setCompEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 024 7600 0000"
                    value={compPhone}
                    onChange={(e) => setCompPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Estimated Monthly Courier Spend
                </label>
                <select
                  value={estMonthlySpend}
                  onChange={(e) => setEstMonthlySpend(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                >
                  <option value="Under £500">Occasional (Under £500 / month)</option>
                  <option value="£500 - £2,000">Regular (£500 - £2,000 / month)</option>
                  <option value="£2,000 - £5,000">High Volume (£2,000 - £5,000 / month)</option>
                  <option value="£5,000+">Enterprise & Daily Routes (£5,000+ / month)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Apply for 30-Day Credit Account
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}