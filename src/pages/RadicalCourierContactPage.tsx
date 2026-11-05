import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Calculator,
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
      toast.error("Please fill in all required fields.");
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
    <div className="space-y-12 sm:space-y-16 pb-16 bg-white text-slate-900">
      {/* Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
            24/7 Dispatch Control • Coventry Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Contact Radical Courier Service
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Our Coventry dispatch team is available 24 hours a day, 7 days a week, 365 days a year.
            Whether you need urgent collection within the hour or advice on vehicle sizing, reach out directly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Phone */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white text-xs space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#0284C7]" />
              <span>24/7 Telephone Hotline</span>
            </div>
            <p className="text-slate-600">Immediate response from our Coventry operations controllers:</p>
            <a
              href="tel:02475122465"
              className="text-base font-extrabold text-[#0284C7] block hover:underline"
            >
              024 7512 2465
            </a>
          </div>

          {/* Email */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white text-xs space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0284C7]" />
              <span>Operations &amp; Billing Email</span>
            </div>
            <p className="text-slate-600">Quotations, POD receipts, and accounts:</p>
            <a
              href="mailto:info@radicalcourier.co.uk"
              className="text-sm font-bold text-slate-900 block hover:underline truncate"
            >
              info@radicalcourier.co.uk
            </a>
          </div>

          {/* Office Address */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white text-xs space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0284C7]" />
              <span>Registered Office</span>
            </div>
            <p className="text-slate-600">
              38 Crossway Road, Green Lane, Coventry, CV3 6JP
            </p>
            <span className="text-slate-500 text-[11px] block">Company No. 06143596</span>
          </div>
        </div>

        {/* Contact Form & Urgent Dispatch Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 border border-slate-200 rounded-xl p-6 bg-white shadow-xs text-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Send an Enquiry</h2>
              <span className="text-slate-500">For instant pricing, please use our online quote calculator</span>
            </div>

            {sent ? (
              <div className="text-center py-8 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Enquiry Received</h3>
                <p className="text-slate-600 max-w-sm mx-auto">
                  Thank you, {name}. A member of our operations team will reply to you promptly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. David Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Telephone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="e.g. name@company.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Urgent Delivery / Account Query"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message / Consignment Details *</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details on pickup location, destination, cargo size, or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors"
                  >
                    {isSubmitting ? "Sending..." : "Submit Message"}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate("quote")}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                  >
                    Calculate Instant Online Quote
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Urgent Dispatch Advice */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
              <strong className="text-slate-900 block font-bold text-sm">
                Need Immediate Collection?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                If your requirement is time-critical or requires vehicle allocation within 60 minutes,
                please telephone our 24-hour operations desk directly rather than waiting for an email reply.
              </p>
              <a
                href="tel:02475122465"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs mt-2"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call 024 7512 2465</span>
              </a>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
              <strong className="text-slate-900 block font-bold text-sm">
                Direct Driver Assurance
              </strong>
              <p className="text-slate-600 leading-relaxed">
                We capture delivery time and the full name of the receiving person. You will be made aware
                of the driver's name and mobile number to enable direct live updates during transit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}