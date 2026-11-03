import {
  ShieldCheck,
  Building2,
  Cpu,
  Package,
  Recycle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Star,
  Quote,
  Truck,
  Award,
  Users,
  Warehouse,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { MoveManQuoteWizard } from "@/components/moveman/MoveManQuoteWizard";
import { MoveManSiteHeader } from "@/components/moveman/MoveManSiteHeader";
import { MoveManSiteFooter } from "@/components/moveman/MoveManSiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const MOVEMAN_ASSURANCES = [
  {
    icon: Clock,
    title: "Zero Operational Downtime",
    body: "Phased weekend and out-of-hours transitions ensure your staff finish Friday at the existing premises and start work Monday morning with phones and computers fully operational.",
    badge: "Business Continuity",
  },
  {
    icon: Award,
    title: "Dedicated Senior Move Manager",
    body: "A single experienced point of contact oversees the entire transition, coordinating CAD space planning, crate deliveries, IT reconnection, and on-site move teams.",
    badge: "Single Contact",
  },
  {
    icon: Recycle,
    title: "WEEE & Zero-to-Landfill Clearance",
    body: "Certified eco-friendly IT disposal and redundant office furniture buyback, donation, or recycling. Complete environmental documentation and data destruction provided.",
    badge: "Eco-Accredited",
  },
  {
    icon: Building2,
    title: "Nationwide Infrastructure & Hubs",
    body: "Strategically located operational teams across the Midlands, Greater Manchester, London, and Stoke-on-Trent HQ handle relocations of any scale across England, Wales & Scotland.",
  },
  {
    icon: ShieldCheck,
    title: "100% Free Fixed-Price Proposal",
    body: "Comprehensive site surveys and transparent itemised proposals with zero obligation. Every quote is fully detailed with fixed pricing and guaranteed timelines.",
  },
];

const MOVEMAN_CASE_STUDIES = [
  {
    client: "Bet365",
    scope: "2,000+ Workstation Relocation",
    desc: "Managed the massive corporate relocation and internal desk restructuring for Bet365, moving thousands of employee positions, server systems, and ergonomic furniture in Stoke-on-Trent with zero betting platform downtime.",
  },
  {
    client: "Leeds City College",
    scope: "4 City Centre Campuses",
    desc: "Facilitated a complex three-phase campus relocation across Leeds city centre. Successfully navigated tight stairwells, narrow historic corridors, and out-of-order lifts to move lab equipment, pianos, and classroom furniture on time.",
  },
  {
    client: "NHS Trust & Hospitals",
    scope: "Medical & Administrative Moves",
    desc: "Specialist confidential records management, patient ward equipment transfer, and clinical office relocations executed under strict health authority hygiene and security standards.",
  },
];

const MOVEMAN_REVIEWS = [
  {
    quote: "Move Management planned and executed our 3-phase relocation of 180 staff over a single weekend. All IT was reconnected and tested before 8am Monday.",
    author: "Operations Director",
    company: "Midlands Corporate HQ",
  },
  {
    quote: "Their crate hire service and furniture clearance saved our university department weeks of work. Outstanding communication and punctuality from start to finish.",
    author: "Facilities Project Lead",
    company: "Higher Education Sector",
  },
  {
    quote: "Having a dedicated Move Manager on site took all the stress away. Accurate fixed quote, no surprise costs, and zero disruption to our daily business operations.",
    author: "Head of Infrastructure",
    company: "Manchester Tech Hub",
  },
];

const MOVEMAN_FAQS = [
  {
    q: "Can you carry out office relocations over weekends or evenings?",
    a: "Yes. The vast majority of our commercial relocations take place on Friday evenings and across the weekend. This guarantees that your business experiences zero commercial downtime and employees resume work uninterrupted on Monday.",
  },
  {
    q: "Do you supply heavy-duty packing crates for office moves?",
    a: "Yes. We deliver robust, security-sealable, lidded plastic crates directly to your building in advance. We supply standard office crates, computer/IT monitor crates, and file-hanging archive crates, collecting them once unpacked.",
  },
  {
    q: "How do you handle sensitive IT hardware and server racks?",
    a: "Our trained technicians disconnect desktop computers, peripherals, monitors, and cabling, tagging them per employee workstation. In server rooms, equipment is un-racked, transported in anti-static protective flight cases, and re-racked at destination.",
  },
  {
    q: "What is your environmental policy for redundant furniture and old electronics?",
    a: "We adhere strictly to WEEE regulations and operate a zero-to-landfill sustainability mandate. Reusable furniture is refurbished or donated, and obsolete equipment is separated into raw materials with full waste transfer notes issued.",
  },
];

export function MoveManQuotePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-[#8DC63F] selection:text-slate-950">
      <Toaster position="top-center" richColors />
      <MoveManSiteHeader />

      <main className="flex-1">
        {/* Hero Banner with MoveMan Brand Green Accents */}
        <section className="bg-gradient-to-b from-[#151515] via-[#1c1c1c] to-[#222222] text-white py-14 sm:py-18 md:py-20 border-b-4 border-[#8DC63F]">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/90 border border-[#8DC63F]/50 px-4 py-1.5 text-xs font-bold text-[#8DC63F] uppercase tracking-wider shadow-sm">
                <span className="size-2 rounded-full bg-[#8DC63F] animate-pulse" />
                <span>Move Management Asset Removals Ltd &bull; UK Nationwide</span>
              </div>

              <h1 className="font-['Barlow',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Commercial Relocation Planning, Removals &amp; Management Specialists
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
                UK commercial relocations, IT migrations, space planning, packing crates, secure storage, and zero-to-landfill asset clearance. Offices in Midlands, Manchester &amp; London.
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-xl bg-neutral-900/90 px-4 py-2 border border-neutral-700 shadow-sm">
                  <Clock className="size-4 text-[#8DC63F]" />
                  <span>Zero Downtime Relocations</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-neutral-900/90 px-4 py-2 border border-neutral-700 shadow-sm">
                  <ShieldCheck className="size-4 text-[#8DC63F]" />
                  <span>Trusted by Bet365, NHS &amp; Universities</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-neutral-900/90 px-4 py-2 border border-neutral-700 shadow-sm">
                  <Recycle className="size-4 text-[#8DC63F]" />
                  <span>WEEE &amp; Zero Landfill Mandate</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Quote & Information Section */}
        <section id="quote-section" className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14 items-start">
              {/* Left Column: Form Wizard */}
              <Reveal>
                <div id="quote-form">
                  <MoveManQuoteWizard />
                </div>
              </Reveal>

              {/* Right Column: Assurances, Case Studies & Hotline (Zero WINZ) */}
              <Reveal delay={120} className="lg:pt-1">
                <div id="why-moveman" className="space-y-6">
                  {/* Section Title */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase">
                      Why Choose Move Management Ltd
                    </h3>
                    <span className="text-xs font-bold text-[#8DC63F] bg-[#151515] px-2.5 py-0.5 rounded-md">
                      UK Relocations
                    </span>
                  </div>

                  {/* Assurances List */}
                  <ul className="grid gap-3.5">
                    {MOVEMAN_ASSURANCES.map(({ icon: Icon, title, body, badge }) => (
                      <li
                        key={title}
                        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#8DC63F]/70"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#8DC63F]/15 text-slate-950 border border-[#8DC63F]/30">
                            <Icon className="size-5 text-[#6fa32d]" strokeWidth={2.2} />
                          </span>
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                              {title}
                              {badge && (
                                <span className="rounded-full bg-[#8DC63F]/20 text-slate-950 border border-[#8DC63F]/40 text-[0.625rem] font-extrabold px-2 py-0.5">
                                  {badge}
                                </span>
                              )}
                            </h4>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                              {body}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Direct Corporate Hotline Card */}
                  <div className="rounded-2xl bg-[#151515] p-6 sm:p-7 text-white shadow-xl space-y-4 border-2 border-[#8DC63F]">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-wider block">
                        Direct Corporate Relocation Team
                      </span>
                      <h4 className="font-['Barlow',sans-serif] text-lg font-bold text-white tracking-tight">
                        Prefer to discuss your project directly?
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                        Complex phased moves, sensitive server infrastructure, or heavy factory machinery require careful planning. Speak directly with our senior move coordinators today.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                      <a
                        href="tel:08002465642"
                        className="flex items-center gap-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 p-3 text-white transition-colors border border-neutral-700"
                      >
                        <Phone className="size-4 text-[#8DC63F] shrink-0" />
                        <div>
                          <span className="block text-[0.6875rem] text-slate-400 font-normal">Freephone Hotline</span>
                          <span className="font-bold text-sm text-[#8DC63F]">0800 246 5642</span>
                        </div>
                      </a>

                      <a
                        href="tel:07918716165"
                        className="flex items-center gap-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 p-3 text-white transition-colors border border-neutral-700"
                      >
                        <Phone className="size-4 text-[#8DC63F] shrink-0" />
                        <div>
                          <span className="block text-[0.6875rem] text-slate-400 font-normal">Direct Mobile</span>
                          <span className="font-bold text-sm text-[#8DC63F]">07918 716165</span>
                        </div>
                      </a>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <a
                        href="mailto:mikedawson@movemanltd.com"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-[#8DC63F] transition-colors"
                      >
                        <Mail className="size-3.5 text-[#8DC63F]" />
                        <span>mikedawson@movemanltd.com</span>
                      </a>

                      <span className="text-slate-400 text-xs">
                        Headquarters: Stoke-on-Trent ST6 4BF
                      </span>
                    </div>
                  </div>

                  {/* Proven Corporate Track Record */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <Building2 className="size-4 text-[#6fa32d]" />
                        <span>Notable Project Case Studies</span>
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        UK Enterprise Relocations
                      </span>
                    </div>

                    <div className="space-y-3">
                      {MOVEMAN_CASE_STUDIES.map((study, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between">
                            <strong className="text-xs sm:text-sm font-bold text-slate-900">{study.client}</strong>
                            <span className="text-[11px] font-semibold text-[#8DC63F] bg-[#151515] px-2 py-0.5 rounded-md">
                              {study.scope}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {study.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Testimonials Card */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Client Testimonials
                      </span>
                      <div className="flex text-[#8DC63F] gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-[#8DC63F]" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 divide-y divide-slate-100">
                      {MOVEMAN_REVIEWS.map((rev, idx) => (
                        <div key={idx} className={idx > 0 ? "pt-3" : ""}>
                          <p className="text-xs sm:text-sm italic text-slate-600 leading-relaxed font-normal">
                            "{rev.quote}"
                          </p>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <strong className="text-slate-900 font-semibold">{rev.author}</strong>
                            <span className="text-[#8DC63F] font-bold bg-[#151515] px-2 py-0.5 rounded-sm text-[10px]">
                              {rev.company}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Accordion Section */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
                      Commercial Relocation FAQs
                    </h4>

                    <div className="space-y-2">
                      {MOVEMAN_FAQS.map((faq, i) => (
                        <div key={i} className="border border-slate-200/80 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => toggleFaq(i)}
                            className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown
                              className={`size-4 text-[#6fa32d] shrink-0 transition-transform ${
                                openFaq === i ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openFaq === i && (
                            <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <MoveManSiteFooter />
    </div>
  );
}
