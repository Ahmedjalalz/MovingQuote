import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
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
      toast.success("Enquiry sent directly to Coventry dispatch!");
    }, 600);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-[#0B152E] to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
            24/7 Operations Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contact Radical Courier Service
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our Coventry dispatch controllers are on duty 24 hours a day, 7 days a week, 365 days a year.
            Reach out by phone, email, or send an enquiry below.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">24/7 Phone Hotline</h3>
            <p className="text-xs text-slate-500">
              Immediate answer from real coordinators — never an offshore call center.
            </p>
            <a
              href="tel:02475122465"
              className="inline-block text-lg font-black text-[#0284C7] hover:underline"
            >
              024 7512 2465
            </a>
          </div>

          {/* Email */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Dispatch Email</h3>
            <p className="text-xs text-slate-500">
              Quotes, proof of delivery requests & billing inquiries.
            </p>
            <a
              href="mailto:info@radicalcourier.co.uk"
              className="inline-block text-sm font-black text-emerald-700 hover:underline"
            >
              info@radicalcourier.co.uk
            </a>
          </div>

          {/* Registered Office */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Coventry Operations Hub</h3>
            <p className="text-xs text-slate-500">
              38 Crossway Road, Green Lane, Coventry, CV3 6JP
            </p>
            <div className="text-xs font-bold text-slate-700">
              Serving West Midlands & UK Nationwide
            </div>
          </div>
        </div>

        {/* Contact Form & Emergency Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Delivered</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                  Thank you, {name}. Our Coventry control desk has received your note and will reply
                  promptly via {email} or {phone}.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">Send an Online Enquiry</h3>
                  <p className="text-xs text-slate-500">
                    For booking an urgent collection right now, please use our online quote calculator
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. David Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="e.g. name@company.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Subject / Consignment Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Urgent machine part / Contract quote"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Your Message / Delivery Requirements *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about collection & delivery locations, package size, weight, or dates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate("quote")}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                  >
                    Switch to Instant Quote Calculator
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Urgent Dispatch Right Callout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                Urgent 60-Minute Collections
              </div>
              <h3 className="text-xl font-bold">Need a Courier Dispatched Right Now?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If your requirement is time-critical, do not wait for email replies. Call our 24-hour
                desk directly so we can locate the nearest active driver in your area:
              </p>
              <a
                href="tel:02475122465"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm shadow-md transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call 024 7512 2465</span>
              </a>
            </div>

            <div className="rounded-3xl bg-sky-50/70 border border-sky-100 p-6 space-y-3 text-xs text-slate-700">
              <div className="font-bold text-sky-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                Direct Driver Assurance
              </div>
              <p className="leading-relaxed">
                We confirm the name and vehicle registration of your driver in advance.
                You are welcome to liaise directly with the driver via mobile during transit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}