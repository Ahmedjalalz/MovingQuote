import { Phone, Mail, MapPin, ShieldCheck, Clock, ArrowUp, CheckCircle2 } from "lucide-react";

export function BudgetSkipsSiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 pt-12 pb-8 text-xs">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">
          {/* Column 1: Company Profile */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/budget-skips-logo.svg"
                alt="Budget Skips Coventry"
                width={150}
                height={45}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              <strong>Budget Skip Services Ltd</strong> is an independent, family-run skip hire and
              waste management specialist operating from our licensed Bayton Road transfer station in
              Coventry for over 25 years.
            </p>
            <div className="pt-1 flex items-center gap-2 text-emerald-400 font-semibold text-[0.6875rem]">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Environment Agency Licensed Waste Carrier</span>
            </div>
          </div>

          {/* Column 2: Skip Sizes */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Skip Sizing
            </h4>
            <ul className="space-y-1.5 text-zinc-400 text-xs">
              <li>
                <a href="#skip-guide" className="hover:text-orange-400 transition-colors">
                  4 Yard Mini Skip (30 bags)
                </a>
              </li>
              <li>
                <a href="#skip-guide" className="hover:text-orange-400 transition-colors">
                  6 Yard Small Builders (55 bags)
                </a>
              </li>
              <li>
                <a href="#skip-guide" className="hover:text-orange-400 font-semibold text-zinc-200 transition-colors">
                  8 Yard Builders Skip (★ Best Seller)
                </a>
              </li>
              <li>
                <a href="#skip-guide" className="hover:text-orange-400 transition-colors">
                  12 Yard Maxi Clearout (115 bags)
                </a>
              </li>
              <li>
                <a href="#skip-guide" className="hover:text-orange-400 transition-colors">
                  14 - 16 Yard Maxi Skips (150 bags)
                </a>
              </li>
              <li>
                <a href="#skip-guide" className="hover:text-orange-400 transition-colors">
                  20 - 40 Yard RoRo Commercial Skips
                </a>
              </li>
              <li>
                <a href="#quote-form" className="hover:text-orange-400 transition-colors">
                  'Man With A Van' Rubbish Clearances
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Local Coverage */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Areas We Cover
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[0.6875rem] text-zinc-400">
              <span>• Coventry City (CV1)</span>
              <span>• Radford (CV6)</span>
              <span>• Coundon &amp; Foleshill</span>
              <span>• Holbrooks (CV6)</span>
              <span>• Earlsdon (CV5)</span>
              <span>• Finham &amp; Cheylesmore</span>
              <span>• Walsgrave &amp; Wyken</span>
              <span>• Tile Hill &amp; Canley</span>
              <span>• Bedworth &amp; Exhall</span>
              <span>• Nuneaton &amp; Bulkington</span>
              <span>• Kenilworth (CV8)</span>
              <span>• Leamington &amp; Warwick</span>
            </div>
            <div className="pt-1 text-[0.6875rem] text-orange-400 font-semibold">
              Free delivery &amp; prompt collection across Coventry!
            </div>
          </div>

          {/* Column 4: Contact & Depot */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Coventry Depot
            </h4>
            <div className="space-y-2 text-zinc-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#ec6c05] shrink-0 mt-0.5" />
                <span className="text-[0.6875rem] text-zinc-400">
                  Crondal Road, Bayton Road Industrial Estate, Exhall, Coventry, CV7 9NH
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#ec6c05] shrink-0" />
                <a
                  href="tel:02476363002"
                  className="font-extrabold text-white hover:text-orange-400 transition-colors"
                >
                  02476 363 002
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#ec6c05] shrink-0" />
                <a
                  href="mailto:info@budgetskips.net"
                  className="hover:text-orange-400 transition-colors text-[0.6875rem]"
                >
                  info@budgetskips.net
                </a>
              </div>
              <div className="pt-1 text-[0.625rem] text-zinc-500">
                Mon-Fri: 7:00am - 5:30pm | Sat: 7:00am - 1:00pm
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.6875rem] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Budget Skip Services Ltd. All Rights Reserved. Trading as
            Budget Skips Coventry &amp; Skip Hire Coventry.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.skiphireincoventry.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              skiphireincoventry.com
            </a>
            <span>•</span>
            <a
              href="https://www.budgetskipscoventry.co.uk/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              budgetskipscoventry.co.uk
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
