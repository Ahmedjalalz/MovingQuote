import { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  Lock,
  ChevronDown,
  Caravan,
  ArrowRight,
} from "lucide-react";
import { RavensOakQuoteWizard, StorageCategory } from "@/components/ravensoake/RavensOakQuoteWizard";
import { Reveal } from "@/components/site/Reveal";

const REASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Resident Owners On-Site",
    body: "We live on the grounds full-time and carry out regular daytime and night patrols. Your vehicle is never left unattended.",
  },
  {
    icon: Clock,
    title: "24/7/365 Swipe Gate Access",
    body: "Enter and leave at any hour with your personal electronic swipe card. No advance notice needed for early holiday departures.",
  },
  {
    icon: Caravan,
    title: "Extra-Wide 3m × 8m+ Bays",
    body: "Generous 3-metre wide pitches give you abundant room to open lockers, doors, and deploy slide-outs without risking scratches.",
  },
  {
    icon: Sparkles,
    title: "100% Free & No Obligation",
    body: "Submitting this quote is an enquiry, not a binding commitment. Your pitch is only reserved once you view the site in person.",
  },
];

const FAQS = [
  {
    q: "Can I access my caravan or motorhome at night or over bank holidays?",
    a: "Yes! Every registered keyholder is provided with an electronic swipe card that operates our automated electric security gates 24 hours a day, 7 days a week, 365 days a year without needing to give prior notice.",
  },
  {
    q: "What do I need to bring to my initial site visit appointment?",
    a: "Because perimeter security is paramount, all viewings are strictly by appointment. All visitors must bring their current photo driving licence and a matching utility bill or proof of residence.",
  },
  {
    q: "How big are the pitches and can they fit twin-axle vans?",
    a: "Our standard touring caravan pitches are 3.0 metres wide and at least 8.0 metres deep, comfortably accommodating both single and twin-axle caravans. For motorhomes, we have dedicated bays ranging from 24 feet up to 45 feet.",
  },
  {
    q: "Can I get my caravan serviced or valeted on-site?",
    a: "Yes! We have an approved NCC service engineer who performs habitation servicing, chassis servicing, damp inspections, and warranty repairs directly on-site. We also host a professional valeting service (Auto-Glym wash & polish) and offer complimentary water wash points and tyre air compressors.",
  },
  {
    q: "What is the 2-acre paddock used for?",
    a: "We offer an exclusive 2-acre open grass paddock where our storage customers are welcome to practice difficult reversing maneuvers, test tow hitching, or assemble and air out awnings before heading out on holidays.",
  },
  {
    q: "What are the payment terms?",
    a: "Standard caravan storage is £50/month and motorhomes £55/month. Fees are payable 3 months in advance initially, followed by monthly standing order with one month's notice. A £40 fully refundable deposit covers your automated electronic swipe card and key.",
  },
];

interface RavensOakQuotePageProps {
  initialCategory?: StorageCategory;
  onNavigate?: (page: "home" | "quote" | "facilities" | "pricing" | "services" | "contact") => void;
}

export function RavensOakQuotePage({
  initialCategory = "caravan",
  onNavigate,
}: RavensOakQuotePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#fbfdfa] min-h-screen py-10 sm:py-14 md:py-16">
      <div className="container-page">
        {/* Clean Breadcrumb & Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("home")}
              className="hover:text-[#006837] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-800 font-bold">Request a Free Pitch Quote</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get a Free Storage Quote
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Select your vehicle or container specifications below. We'll check pitch availability
            and prepare an accurate, transparent quote with zero obligation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Main Column: Quote Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Reveal>
              <RavensOakQuoteWizard initialCategory={initialCategory} />
            </Reveal>
          </div>

          {/* Sidebar Column: Assurances & Contact */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            <Reveal delay={100}>
              {/* Trust Assurances Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-[0.14em] flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#006837]" />
                  Why Store with Ravens Oak
                </h3>

                <ul className="space-y-4 pt-1">
                  {REASSURANCES.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li key={idx} className="flex items-start gap-3.5 text-xs">
                        <div className="size-8 rounded-lg bg-emerald-50 text-[#006837] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="mt-0.5 text-slate-500 leading-relaxed text-[11px]">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Direct Contact Box */}
            <Reveal delay={150}>
              <div className="rounded-3xl bg-[#0b2915] text-white p-6 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Prefer to talk it through?</h3>
                  <p className="mt-1 text-xs text-emerald-100/80 leading-relaxed">
                    Have questions about pitch dimensions, trailer towing, or container storage?
                    Give our family team a call.
                  </p>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <a
                    href="tel:01933712782"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors font-bold text-white"
                  >
                    <span>Landline: 01933 712782</span>
                    <ArrowRight className="size-3.5 text-[#8CC63F]" />
                  </a>
                  <a
                    href="tel:07921784736"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors font-bold text-white"
                  >
                    <span>Mobile: 07921 784736</span>
                    <ArrowRight className="size-3.5 text-[#8CC63F]" />
                  </a>
                </div>

                <div className="pt-2 text-[11px] text-emerald-200/70 flex items-center gap-1.5 border-t border-emerald-900">
                  <MapPin className="size-3.5 text-[#8CC63F] shrink-0" />
                  <span>315 Bedford Road, Rushden, NN10 0SQ</span>
                </div>
              </div>
            </Reveal>

            {/* Strict ID Verification Card */}
            <Reveal delay={200}>
              <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/50 p-5 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#006837]">
                  <Lock className="size-3.5" />
                  <span>Site Visit Protocol</span>
                </div>
                <p className="leading-relaxed text-[11px] text-slate-600">
                  All prospective customer visits are <strong>strictly by appointment</strong>.
                  Please bring your <strong>current photo driving licence</strong> and a{" "}
                  <strong>corresponding utility bill</strong> with you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 pt-12 border-t border-slate-200/70">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
              Clear answers regarding our facility security, pitch access, and customer terms.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#006837]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
