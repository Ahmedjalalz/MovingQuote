import { useState } from "react";
import {
  User,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Search,
  ArrowRight,
  FileText,
  Lock,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RadicalCourierCustomersPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierCustomersPage({
  onNavigate,
}: RadicalCourierCustomersPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "account" | "pod">("login");

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Corporate Application
  const [companyName, setCompanyName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("£500 - £2,000 / month");
  const [accountApplied, setAccountApplied] = useState(false);

  // POD Search
  const [podRef, setPodRef] = useState("");
  const [podFound, setPodFound] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      toast.success("Welcome back! Loading account dashboard...");
      onNavigate("quote");
    }, 600);
  };

  const handleAccountApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !billingEmail || !billingPhone) {
      toast.error("Please fill in all required company details.");
      return;
    }
    setAccountApplied(true);
    toast.success("Credit account application received. Our accounts team will review within 24 hours.");
  };

  const handlePodSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!podRef.trim()) {
      toast.error("Please enter a consignment reference (e.g. RAD-84291).");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setPodFound({
        ref: podRef.toUpperCase(),
        date: "Today, Same-Day Express",
        status: "Delivered & Signed",
        signedBy: "J. Davies (Front Desk Reception)",
        time: "14:22 GMT",
        vehicle: "Ford Transit LWB (Dedicated Driver Neil C.)",
        origin: "Coventry CV1",
        destination: "London EC1",
      });
      toast.success("Consignment record retrieved.");
    }, 500);
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Client Portal &amp; Management
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
            Customer Portal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Sign in to manage recurring bookings, apply for a 30-day business credit account,
            or retrieve electronic Proof of Delivery (POD) signatures.
          </p>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Sub-Tabs */}
          <div className="flex border-b border-slate-200 mb-10 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab("login")}
              className={cn(
                "px-6 py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === "login"
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <User className="w-4 h-4 text-[#0284C7]" />
              <span>Customer Sign In</span>
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={cn(
                "px-6 py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === "account"
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Apply for 30-Day Credit Account</span>
            </button>

            <button
              onClick={() => setActiveTab("pod")}
              className={cn(
                "px-6 py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === "pod"
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span>Proof of Delivery (POD)</span>
            </button>
          </div>

          {/* Tab 1: Login */}
          {activeTab === "login" && (
            <div className="max-w-md mx-auto bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Sign In
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Access saved addresses and business account rates.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input type="checkbox" className="rounded text-[#0284C7]" defaultChecked />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#reset"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Password reset link sent to your registered email.");
                    }}
                    className="text-[#0284C7] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors"
                  >
                    {isLoggingIn ? "Signing In..." : "Sign In"}
                  </button>
                </div>

                <div className="text-center pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onNavigate("quote")}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Calculate quote without signing in
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: 30-Day Credit Account Application */}
          {activeTab === "account" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Open a 30-Day Business Account
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Enjoy consolidated monthly VAT invoicing, priority driver allocation, and preferential tariff rates.
                </p>
              </div>

              {accountApplied ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Application Received</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, {contactName}. Our accounts team will review your application and send
                    terms to {billingEmail} within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAccountApply} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Company Registered Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Midlands Engineering Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Company Registration / VAT Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 01234567 / GB 123 4567 89"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Accounts Contact Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Sarah Jenkins"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Billing Email *
                      </label>
                      <input
                        type="email"
                        placeholder="accounts@company.co.uk"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Direct Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="024 7600 0000"
                        value={billingPhone}
                        onChange={(e) => setBillingPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Estimated Monthly Spend
                    </label>
                    <select
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    >
                      <option value="Under £500 / month">Occasional (Under £500 / month)</option>
                      <option value="£500 - £2,000 / month">Regular (£500 - £2,000 / month)</option>
                      <option value="£2,000 - £5,000 / month">High Volume (£2,000 - £5,000 / month)</option>
                      <option value="£5,000+ / month">Contract &amp; Daily Routes (£5,000+ / month)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
                    >
                      Submit Account Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 3: POD Search */}
          {activeTab === "pod" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Proof of Delivery (POD) Search
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Look up completed or in-transit delivery records by your Radical Reference number.
                </p>
              </div>

              <form onSubmit={handlePodSearch} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. RAD-84291"
                  value={podRef}
                  onChange={(e) => setPodRef(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden uppercase"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shrink-0"
                >
                  {isSearching ? "Searching..." : "Look Up POD"}
                </button>
              </form>

              {podFound && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 space-y-4 mt-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="font-mono font-bold text-slate-900 text-base">{podFound.ref}</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded text-xs">
                      {podFound.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Signed By</span>
                      <strong className="text-slate-900 text-sm">{podFound.signedBy}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Delivered At</span>
                      <strong className="text-slate-900 text-sm">{podFound.time} ({podFound.date})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Route</span>
                      <span className="text-slate-800 font-medium">{podFound.origin} → {podFound.destination}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Driver / Vehicle</span>
                      <span className="text-slate-800 font-medium">{podFound.vehicle}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
