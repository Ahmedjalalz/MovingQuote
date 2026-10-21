import { ShieldCheck, Recycle, Truck, Sparkles, Phone, MessageSquare } from "lucide-react";
import { UnityQuoteWizard } from "@/components/unity/UnityQuoteWizard";
import { UnitySiteHeader } from "@/components/unity/UnitySiteHeader";
import { UnitySiteFooter } from "@/components/unity/UnitySiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { Toaster } from "@/components/ui/sonner";

const UNITY_ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Environment Agency Licensed",
    body: "Fully licensed Upper-Tier Waste Carrier. We ensure legal compliance and provide official waste transfer notes with every collection.",
    isLicensed: true,
  },
  {
    icon: Recycle,
    title: "Green Apple Award Winner",
    body: "Proud winners of the Green Apple Award for environmental best practice, striving to recycle, reuse, and divert maximum waste away from landfills.",
    isEco: true,
  },
  {
    icon: Truck,
    title: "No Skip Permit Needed",
    body: "The convenient skip hire alternative: we do all the heavy lifting, loading, and sweeping up so you never have to worry about permits or driveway damage.",
  },
  {
    icon: Sparkles,
    title: "100% Free & No Obligation",
    body: "Transparent fixed pricing with zero hidden fees. You can also send photos directly via WhatsApp for an immediate quote.",
  },
];

export function UnityWasteQuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 antialiased">
      <UnitySiteHeader />

      <main className="flex-1">
        {/* Hero banner */}
        <section className="bg-gradient-to-b from-purple-50/60 to-slate-50 py-10 md:py-14 border-b border-purple-100/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#b96be8]/15 px-4 py-1.5 text-xs font-bold text-[#b96be8] uppercase tracking-wider">
                <span className="size-2 rounded-full bg-[#b96be8] animate-pulse" />
                Licensed UK Waste Management
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Get a Free Waste Removal Quote
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Professional property clearances, trade waste, and junk removals across Ellesmere Port, Chester, The Wirral, and Cheshire.
              </p>
            </div>
          </div>
        </section>

        {/* Form & Assurances section */}
        <section id="quote-form" className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
              <Reveal>
                <UnityQuoteWizard />
              </Reveal>

              <Reveal delay={120} className="lg:pt-2">
                <div id="why-unity" className="space-y-4">
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Why Choose Unity Waste
                  </h3>
                  <ul className="grid gap-4">
                    {UNITY_ASSURANCES.map(({ icon: Icon, title, body, isLicensed, isEco }) => (
                      <li
                        key={title}
                        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                      >
                        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-purple-50">
                          <Icon
                            className={`size-5 ${isEco || isLicensed ? "text-[#10b981]" : "text-[#b96be8]"}`}
                            strokeWidth={2}
                          />
                        </span>
                        <h4 className="mt-4 text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                          {title}
                          {isLicensed && (
                            <span className="size-1.5 rounded-full bg-[#10b981] animate-pulse" />
                          )}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                          {body}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Direct Call Box */}
                  <div className="mt-8 rounded-3xl bg-gray-950 p-7 text-white shadow-2xl border border-gray-800">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b96be8] uppercase tracking-wider">
                      <MessageSquare className="size-3.5" />
                      <span>Prefer To Talk Or Send Photos?</span>
                    </span>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                      Get an Instant Quote on the Phone
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-400 font-medium">
                      Some jobs are easier to explain out loud or show with a quick photo. Give our friendly team a call or send photos on WhatsApp for an immediate price estimate.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href="tel:+441244566348"
                        className="inline-flex items-center gap-2 rounded-full bg-[#b96be8] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#a249d9] transition-colors"
                      >
                        <Phone className="size-3.5" />
                        <span>01244 566348</span>
                      </a>
                      <a
                        href="https://wa.me/447940771690"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-colors"
                      >
                        <MessageSquare className="size-3.5" />
                        <span>WhatsApp: 07940 771690</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <UnitySiteFooter />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default UnityWasteQuotePage;
