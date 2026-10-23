import {
  ShieldCheck,
  Award,
  Warehouse,
  Music,
  Clock,
  Phone,
  Mail,
  MapPin,
  Facebook,
  ExternalLink,
  CheckCircle2,
  Star,
  Quote,
  Truck,
  Box,
} from "lucide-react";
import { AldhouseQuoteWizard } from "@/components/aldhouse/AldhouseQuoteWizard";
import { AldhouseSiteHeader } from "@/components/aldhouse/AldhouseSiteHeader";
import { AldhouseSiteFooter } from "@/components/aldhouse/AldhouseSiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const ALDHOUSE_ASSURANCES = [
  {
    icon: Award,
    title: "Family-Run Since 1990",
    body: "Over 30 years of trusted moving experience across Cambridge and the UK. A dedicated, hands-on team delivering personalised care on every single move.",
    badge: "30+ Years",
  },
  {
    icon: ShieldCheck,
    title: "Movers to the Universities",
    body: "Longstanding reputation across Cambridge University colleges, students, fellows, and departments for reliable relocations and room moves.",
    badge: "Cambridge Partner",
  },
  {
    icon: Warehouse,
    title: "Secure Containerised Storage",
    body: "Dry, clean, and safe containerised storage at our Waterbeach depot. Ideal for between-move gaps, decluttering, or student summer holidays.",
  },
  {
    icon: Music,
    title: "Specialist Piano & Antique Movers",
    body: "Expertly equipped for upright and grand pianos, heavy safes, and delicate period furniture with protective blankets, piano shoes, and dollies.",
  },
  {
    icon: Clock,
    title: "100% Free & Fixed-Price Quotation",
    body: "Transparent, itemised quotation with zero obligation. Free home survey or video quotation to guarantee an accurate fixed price.",
  },
];

const REVIEWS = [
  {
    quote: "Aldhouse & Smith moved our 4-bed house in Cambridge and transported our upright piano without a scratch. Courteous, hard-working, and calm throughout.",
    author: "David & Sarah M.",
    location: "Newnham, Cambridge",
  },
  {
    quote: "Used their Waterbeach containerised storage for three months between house completion dates. Clean facilities, seamless collection and return.",
    author: "Eleanor T.",
    location: "Waterbeach, Cambridgeshire",
  },
  {
    quote: "Recommended by our college porter. They moved our university department library and office furniture swiftly over a weekend with zero disruption.",
    author: "Dr. Jonathan R.",
    location: "University of Cambridge",
  },
];

export function AldhouseAndSmithQuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-[#9bdce6] selection:text-[#0c2229]">
      <AldhouseSiteHeader />

      <main className="flex-1">
        {/* Heritage Hero Banner with Cambridge Blue Palette */}
        <section className="bg-gradient-to-b from-[#eefafc] via-[#e2f6f9]/50 to-slate-50 py-10 sm:py-12 md:py-16 border-b border-[#cceef4]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#9bdce6]/35 border border-[#9bdce6] px-4 py-1.5 text-xs font-bold text-[#0c2229] uppercase tracking-wider shadow-2xs">
                <span className="size-2 rounded-full bg-[#368b9a] animate-pulse" />
                <span>Cambridge Removals &amp; Containerised Storage • Est. 1990</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0c2229]">
                Get a Free Moving &amp; Storage Quote
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                Family-run domestic and commercial removals, secure storage solutions, and specialist piano transport across Cambridge, Waterbeach, Cambridgeshire, and UK Nationwide.
              </p>

              {/* Quick Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-2xs">
                  <Award className="size-4 text-[#368b9a]" />
                  <span>30+ Years Industry Experience</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-2xs">
                  <ShieldCheck className="size-4 text-[#368b9a]" />
                  <span>Movers to the Universities</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-2xs">
                  <Warehouse className="size-4 text-[#368b9a]" />
                  <span>Waterbeach Storage Facility</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Quote & Information Section */}
        <section id="quote-section" className="py-10 sm:py-14 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14 items-start">
              {/* Form Column */}
              <Reveal>
                <div id="quote-form">
                  <AldhouseQuoteWizard />
                </div>
              </Reveal>

              {/* Assurances & Company Info Column (NO WINZ) */}
              <Reveal delay={120} className="lg:pt-1">
                <div id="why-aldhouse" className="space-y-6">
                  {/* Section Title */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h3 className="text-xs font-bold tracking-widest text-[#0c2229] uppercase">
                      Why Choose Aldhouse &amp; Smith
                    </h3>
                    <span className="text-[0.6875rem] font-bold text-[#368b9a]">
                      Cambridge, UK
                    </span>
                  </div>

                  {/* Assurances List */}
                  <ul className="grid gap-3.5">
                    {ALDHOUSE_ASSURANCES.map(({ icon: Icon, title, body, badge }) => (
                      <li
                        key={title}
                        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#9bdce6]"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eefafc] text-[#368b9a] border border-[#9bdce6]/40">
                            <Icon className="size-5 text-[#368b9a]" strokeWidth={2} />
                          </span>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                              {title}
                              {badge && (
                                <span className="rounded-full bg-[#9bdce6]/35 text-[#0c2229] border border-[#9bdce6] text-[0.625rem] font-extrabold px-2 py-0.25">
                                  {badge}
                                </span>
                              )}
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-600">
                              {body}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Direct Contact Card (Cambridge Blue accent) */}
                  <div className="rounded-2xl bg-[#0c2229] p-6 text-white shadow-xl space-y-4 border border-[#9bdce6]/30">
                    <div className="space-y-1">
                      <span className="text-[0.6875rem] font-bold text-[#9bdce6] uppercase tracking-wider block">
                        Direct Cambridge Office
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        Prefer to talk it through?
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-300">
                        Some moves have complex requirements — piano transport, delicate antiques, or awkward college staircases. Call our friendly team directly for honest advice and instant estimates.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                      <a
                        href="tel:+441223861761"
                        className="flex items-center gap-2 rounded-xl bg-[#163945]/60 hover:bg-[#163945] p-3 text-white transition-colors border border-[#214c5c]"
                      >
                        <Phone className="size-4 text-[#9bdce6] shrink-0" />
                        <div>
                          <span className="block text-[0.625rem] text-slate-300">Office Phone</span>
                          <span className="font-bold text-[#9bdce6]">01223 861761</span>
                        </div>
                      </a>

                      <a
                        href="tel:+447768856486"
                        className="flex items-center gap-2 rounded-xl bg-[#163945]/60 hover:bg-[#163945] p-3 text-white transition-colors border border-[#214c5c]"
                      >
                        <Phone className="size-4 text-[#9bdce6] shrink-0" />
                        <div>
                          <span className="block text-[0.625rem] text-slate-300">Direct / Mobile</span>
                          <span className="font-bold text-[#9bdce6]">07768 856486</span>
                        </div>
                      </a>
                    </div>

                    <div className="pt-2 border-t border-[#163945] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <a
                        href="mailto:info@aldhouseandsmith.co.uk"
                        className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#9bdce6] transition-colors"
                      >
                        <Mail className="size-3.5 text-[#9bdce6]" />
                        <span>info@aldhouseandsmith.co.uk</span>
                      </a>

                      <a
                        href="https://web.facebook.com/aldhouseandsmith"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#9bdce6] hover:underline transition-colors font-medium"
                      >
                        <Facebook className="size-3.5" />
                        <span>Find us on Facebook ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Customer Testimonials Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0c2229]">
                        Cambridge Customer Feedback
                      </span>
                      <div className="flex text-[#368b9a]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3 fill-[#368b9a]" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 divide-y divide-slate-100">
                      {REVIEWS.map((rev, idx) => (
                        <div key={idx} className={idx > 0 ? "pt-3" : ""}>
                          <p className="text-xs italic text-slate-600 leading-relaxed">
                            "{rev.quote}"
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[0.6875rem]">
                            <strong className="text-slate-900 font-semibold">{rev.author}</strong>
                            <span className="text-[#368b9a] font-medium">{rev.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Detailed Service Pillars Section */}
        <section id="services" className="bg-white py-12 md:py-16 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#368b9a]">
                Tailored Moving Solutions
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c2229]">
                Comprehensive Removal &amp; Storage Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Whether relocating a university room, a four-bedroom house, or an entire commercial department, we deliver dependable professionalism from start to finish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Domestic */}
              <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-[#eefafc]/40 hover:border-[#9bdce6] hover:shadow-md transition-all space-y-3">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#0c2229] text-white">
                  <Truck className="size-5 text-[#9bdce6]" />
                </div>
                <h4 className="text-base font-bold text-[#0c2229]">Domestic Removals</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Local house moves across Cambridge, Cambridgeshire, and nationwide. Includes full protective covers for mattresses, sofas, and furniture.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Free home / video surveys</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Dismantling &amp; reassembly</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Commercial & University */}
              <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-[#eefafc]/40 hover:border-[#9bdce6] hover:shadow-md transition-all space-y-3">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#0c2229] text-white">
                  <Award className="size-5 text-[#9bdce6]" />
                </div>
                <h4 className="text-base font-bold text-[#0c2229]">University &amp; Commercial</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Movers to the Universities" — chosen by Cambridge colleges and academic departments for office relocations and student room moves.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>College &amp; student moves</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Office &amp; IT equipment moves</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Storage */}
              <div id="storage" className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-[#eefafc]/40 hover:border-[#9bdce6] hover:shadow-md transition-all space-y-3">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#0c2229] text-white">
                  <Warehouse className="size-5 text-[#9bdce6]" />
                </div>
                <h4 className="text-base font-bold text-[#0c2229]">Containerised Storage</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clean, dry, secure containerised storage at our Waterbeach premises. Flexible terms for household goods, student summer breaks, or commercial stock.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Short or long-term options</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Collection &amp; delivery direct</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Pianos */}
              <div id="pianos" className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-[#eefafc]/40 hover:border-[#9bdce6] hover:shadow-md transition-all space-y-3">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#0c2229] text-white">
                  <Music className="size-5 text-[#9bdce6]" />
                </div>
                <h4 className="text-base font-bold text-[#0c2229]">Piano &amp; Fine Art</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialist handling for upright pianos, baby grands, concert grands, grandfather clocks, and fine antiques with bespoke strapping and pads.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Upright &amp; Grand Pianos</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#368b9a]" />
                    <span>Full transit insurance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AldhouseSiteFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default AldhouseAndSmithQuotePage;
