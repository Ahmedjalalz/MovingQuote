import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { RadicalSubPage } from "@/components/radicalcourier/RadicalCourierHeader";
import { toast } from "sonner";

interface RadicalCourierContactPageProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierContactPage({
  onNavigate,
}: RadicalCourierContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      toast.error("Please fill in the required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      toast.success("Enquiry sent to Coventry dispatch control.");
    }, 500);
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            24/7 Operations Desk • Coventry Hub
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
            Contact Radical Courier
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Our Coventry dispatch team operates 24 hours a day, 7 days a week. For urgent collections
            within the hour or tailored logistics advice, get in touch directly.
          </p>
        </div>
      </section>

      {/* 3 Contact Channels */}
      <section className="py-12 border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Phone className="w-4 h-4 text-[#0284C7]" />
                <span>24/7 Telephone</span>
              </div>
              <a
                href="tel:02475122465"
                className="text-xl font-bold text-slate-900 hover:text-[#0284C7] block transition-colors"
              >
                024 7512 2465
              </a>
              <p className="text-xs text-slate-500">
                Direct to our Coventry desk for urgent bookings.
              </p>
            </div>

            {/* Email */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Mail className="w-4 h-4 text-[#0284C7]" />
                <span>Email Enquiries</span>
              </div>
              <a
                href="mailto:info@radicalcourier.co.uk"
                className="text-base font-bold text-slate-900 hover:text-[#0284C7] block truncate transition-colors"
              >
                info@radicalcourier.co.uk
              </a>
              <p className="text-xs text-slate-500">
                Quotes, corporate accounts, and POD queries.
              </p>
            </div>

            {/* Registered Base */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#0284C7]" />
                <span>Operating Base</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                38 Crossway Road, Coventry
              </div>
              <p className="text-xs text-slate-500">
                Green Lane, Coventry, CV3 6JP (Reg: 06143596)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Guidance */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Send a Message
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill in your details and an operations controller will reply shortly.
                </p>
              </div>

              {sent ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, {name}. A member of our team will respond to {email} promptly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="07123 456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        placeholder="name@company.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Delivery quote, account query..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Message / Consignment Details *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please include collection and delivery locations, cargo size, or date requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate("quote")}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
                    >
                      Need Instant Price? Use Calculator
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Telephone Callout */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Urgent Collections
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Need a vehicle within 60 minutes?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For immediate same-day dispatches, call our Coventry control room directly.
                  Our team can allocate a driver and confirm arrival times in minutes.
                </p>
                <a
                  href="tel:02475122465"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>Call 024 7512 2465</span>
                </a>
              </div>

              <div className="border border-slate-200/80 rounded-2xl p-6 space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Direct Tracking
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Driver Name &amp; Contact Provided
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Upon dispatch, you are provided with your driver's name, vehicle registration, and mobile
                  number for transparent communication at every milestone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
