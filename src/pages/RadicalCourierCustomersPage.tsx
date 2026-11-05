import { useState } from "react";
import {
  User,
  Building,
  ShieldCheck,
  CheckCircle2,
  Search,
  ArrowRight,
  FileText,
  Lock,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { toast } from "sonner";

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
        date: "Today, Same-Day Service",
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
    <div className="space-y-12 sm:space-y-16 pb-16 bg-white text-slate-900">
      {/* Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Client Portal &amp; Account Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Customer Login &amp; Business Accounts
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Sign in to manage recurring bookings, apply for a 30-day corporate credit account,
            or look up electronic Proof of Delivery (POD) signatures.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Sub-Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-5 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "login"
                ? "border-[#0284C7] text-[#0284C7]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="w-4 h-4 text-[#0284C7]" />
            <span>Customer Sign In</span>
          </button>

          <button
            onClick={() => setActiveTab("account")}
            className={`px-5 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "account"
                ? "border-[#0284C7] text-[#0284C7]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Apply for 30-Day Credit Account</span>
          </button>

          <button
            onClick={() => setActiveTab("pod")}
            className={`px-5 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === "pod"
                ? "border-[#0284C7] text-[#0284C7]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Search className="w-4 h-4 text-slate-600" />
            <span>Proof of Delivery (POD) Search</span>
          </button>
        </div>

        {/* Tab 1: Login */}
        {activeTab === "login" && (
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4 max-w-md mx-auto text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-900">Sign In to Your Account</h2>
              <span className="text-slate-500">Access saved delivery addresses and preferential rates</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                  <input type="checkbox" className="rounded text-[#0284C7]" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a
                  href="#reset"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password reset instructions sent to your email.");
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
                  className="w-full py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors"
                >
                  {isLoggingIn ? "Signing In..." : "Sign In"}
                </button>
              </div>

              <div className="text-center pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onNavigate("quote")}
                  className="text-slate-600 hover:text-slate-900 underline"
                >
                  Return to quote calculator without logging in
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: 30-Day Credit Account Application */}
        {activeTab === "account" && (
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-900">
                Open a 30-Day Business Credit Account
              </h2>
              <p className="text-slate-600">
                For regular commercial shippers across Warwickshire, the Midlands, and UK nationwide.
                Enjoy consolidated monthly VAT billing and preferential mileage tariff rates.
              </p>
            </div>

            {accountApplied ? (
              <div className="text-center py-8 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Application Lodged</h3>
                <p className="text-slate-600 max-w-sm mx-auto">
                  Thank you, {contactName}. Our credit control team will verify company details
                  and email your account terms and pricing schedule to <strong>{billingEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAccountApply} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company Registered Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Midlands Engineering Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company Reg / VAT Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 01234567 / GB 123 4567 89"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Accounts Contact Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Billing Email *</label>
                    <input
                      type="email"
                      placeholder="invoices@company.co.uk"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Direct Phone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 024 7600 0000"
                      value={billingPhone}
                      onChange={(e) => setBillingPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Monthly Courier Volume</label>
                  <select
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 px-2.5 text-xs font-medium text-slate-900"
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
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    Submit Credit Account Application
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: POD Search */}
        {activeTab === "pod" && (
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-900">
                Proof of Delivery (POD) Search
              </h2>
              <p className="text-slate-600">
                Look up completed or in-transit delivery records by your Radical Reference number.
              </p>
            </div>

            <form onSubmit={handlePodSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. RAD-84291"
                value={podRef}
                onChange={(e) => setPodRef(e.target.value)}
                className="flex-1 rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shrink-0"
              >
                {isSearching ? "Searching..." : "Look Up"}
              </button>
            </form>

            {podFound && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 mt-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-mono font-bold text-slate-900 text-sm">{podFound.ref}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                    {podFound.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-500 block">Signed By:</span>
                    <strong>{podFound.signedBy}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Delivered At:</span>
                    <strong>{podFound.time} ({podFound.date})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Route:</span>
                    <span>{podFound.origin} → {podFound.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Driver:</span>
                    <span>{podFound.vehicle}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}