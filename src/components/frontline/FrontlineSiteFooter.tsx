import { Phone, Mail, MapPin, ShieldCheck, Truck, ExternalLink } from "lucide-react";

export function FrontlineSiteFooter() {
  return (
    <footer className="bg-[#261744] text-slate-300 pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-[#3b2566] px-3 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Col 1: About & Logo */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/frontline-logo-header.png"
                alt="Frontline Transport"
                className="h-8 sm:h-9 w-auto brightness-0 invert object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith("frontline-logo-full.png")) {
                    target.src = "/frontline-logo-full.png";
                  }
                }}
              />
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-normal">
              We move, remove, and deliver your stuff. Professional house removals, licensed waste clearances, and rapid courier delivery across the West Midlands and UK Nationwide.
            </p>
            <div className="pt-1 sm:pt-2 flex items-center gap-2 text-xs font-semibold text-[#20c200]">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Environment Agency Registered Waste Carrier</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="text-xs space-y-1.5 sm:space-y-2 text-purple-200/75 font-medium">
              <li>
                <a href="#removals" className="hover:text-[#20c200] transition-colors">
                  Full House &amp; Flat Removals
                </a>
              </li>
              <li>
                <a href="#removals" className="hover:text-[#20c200] transition-colors">
                  Office &amp; Commercial Moves
                </a>
              </li>
              <li>
                <a href="#waste-clearance" className="hover:text-[#20c200] transition-colors">
                  Licensed Waste &amp; Rubbish Clearance
                </a>
              </li>
              <li>
                <a href="#waste-clearance" className="hover:text-[#20c200] transition-colors">
                  End of Tenancy &amp; Garage Clearances
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-[#20c200] transition-colors">
                  Same-Day &amp; Next-Day Courier Delivery
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-[#20c200] transition-colors">
                  Single Item &amp; Palletized Freight
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-[#20c200] transition-colors">
                  Luton Van &amp; SWB / LWB Fleet
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Service Coverage</h4>
            <p className="text-xs text-purple-200/75 leading-relaxed">
              Operating daily throughout the West Midlands and available for long-distance relocations across the UK:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "Brownhills",
                "Walsall",
                "Birmingham",
                "Wolverhampton",
                "Lichfield",
                "Cannock",
                "Dudley",
                "Sutton Coldfield",
                "Solihull",
                "Tamworth",
                "Coventry",
                "Stafford",
                "Telford",
                "UK Nationwide",
              ].map((town) => (
                <span
                  key={town}
                  className="rounded-full bg-[#1c1132] px-2.5 py-1 text-[0.68rem] text-purple-200 border border-[#3b2566]"
                >
                  {town}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Depot */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Contact Details</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href="tel:01543630122"
                className="flex items-start gap-2.5 hover:text-[#20c200] transition-colors"
              >
                <Phone className="size-4 text-[#20c200] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-sm text-white">01543 630 122</span>
                  <span className="text-[0.7rem] text-purple-200/70 font-normal">Customer Enquiries</span>
                </div>
              </a>

              <a
                href="tel:07761098483"
                className="flex items-start gap-2.5 hover:text-[#20c200] transition-colors"
              >
                <Phone className="size-4 text-[#20c200] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">07761 098 483</span>
                  <span className="text-[0.7rem] text-purple-200/70 font-normal">Direct Line / WhatsApp</span>
                </div>
              </a>

              <a
                href="mailto:enquiries@frontlinetransport.co.uk"
                className="flex items-start gap-2.5 hover:text-[#20c200] transition-colors"
              >
                <Mail className="size-4 text-[#20c200] shrink-0 mt-0.5" />
                <span className="break-all font-medium">enquiries@frontlinetransport.co.uk</span>
              </a>

              <div className="flex items-start gap-2.5 pt-1 text-purple-200/70">
                <MapPin className="size-4 text-[#20c200] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[0.72rem] sm:text-xs">
                  Office 5, Toll Point Industrial Estate, Lichfield Road, Brownhills, Walsall, WS8 6JP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Brand Links */}
        <div className="pt-4 sm:pt-6 pb-4 sm:pb-6 border-t border-[#3b2566] text-xs text-purple-200/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[0.68rem] sm:text-xs">
            <span className="text-purple-300/80 font-semibold uppercase tracking-wider text-[0.65rem]">
              Partner Network:
            </span>
            <a
              href="/aldhouseandsmith"
              className="text-purple-100 hover:text-[#20c200] transition-colors"
            >
              Aldhouse &amp; Smith (Cambridge)
            </a>
            <span className="text-purple-600">•</span>
            <a
              href="/unitywasteremovals"
              className="text-purple-100 hover:text-[#20c200] transition-colors"
            >
              Unity Waste Removals (Cheshire &amp; Wirral)
            </a>
            <span className="text-purple-600">•</span>
            <a href="/" className="text-purple-100 hover:text-[#20c200] transition-colors">
              Paul Movers Auckland (NZ)
            </a>
          </div>

          <a
            href="https://www.frontlinetransport.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#20c200] hover:underline font-semibold text-[0.72rem] sm:text-xs"
          >
            <span>Visit official website: frontlinetransport.co.uk</span>
            <ExternalLink className="size-3" />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-3 sm:pt-4 border-t border-[#3b2566]/60 flex flex-col sm:flex-row items-center justify-between text-[0.68rem] sm:text-[0.7rem] text-purple-300/60 gap-1.5 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Frontline Transport. All rights reserved. Registered in the United Kingdom.</p>
          <p className="flex items-center gap-1">
            <span className="text-[#20c200]">Fast, Reliable &amp; Licensed Transport Services</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
