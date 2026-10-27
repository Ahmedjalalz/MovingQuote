import { Phone, Mail, MapPin, Recycle, ShieldCheck } from "lucide-react";

export function UnitySiteFooter() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-4 sm:grid-cols-2">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/unity-logo.webp"
                alt="Unity Waste Removal Logo"
                width={50}
                height={50}
                className="h-12 w-auto object-contain brightness-110"
              />
              <div>
                <p className="font-extrabold text-white text-lg tracking-tight">UNITY WASTE</p>
                <p className="text-xs text-[#b96be8] font-bold tracking-wider uppercase">Removal &amp; Clearances</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Professional, eco-friendly domestic &amp; commercial waste clearances across Ellesmere Port, Chester, The Wirral, Merseyside, and Cheshire.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                <Recycle className="size-3.5" />
                <span>Green Apple Award Winner</span>
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#b96be8]">
              Clearance Services
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-400 font-medium">
              <li>House &amp; Flat Clearances</li>
              <li>Loft, Attic &amp; Garage Clearances</li>
              <li>Probate &amp; Bereavement Support</li>
              <li>Office Clearances &amp; IT Disposal</li>
              <li>Shop &amp; Retail Strip-Outs</li>
              <li>Builders Waste (Skip Alternative)</li>
              <li>Garden Waste &amp; Shed Removals</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#b96be8]">
              Areas Covered
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-400 font-medium">
              <li>Ellesmere Port &amp; Great Sutton</li>
              <li>Chester &amp; Surrounding Villages</li>
              <li>The Wirral (Birkenhead, Heswall, Wallasey)</li>
              <li>Cheshire West &amp; Chester</li>
              <li>Frodsham, Helsby &amp; Runcorn</li>
              <li>Merseyside &amp; North Wales Borders</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#b96be8]">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[#b96be8] shrink-0" />
                <a href="tel:+441244566348" className="hover:text-white font-bold">
                  01244 566348
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[#b96be8] shrink-0" />
                <a href="tel:+447940771690" className="hover:text-white font-semibold">
                  07940 771690 (Mobile / WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="size-4 text-[#b96be8] shrink-0 mt-0.5" />
                <span>56 Oliver Ln, Great Sutton, Ellesmere Port, CH66 3NU, UK</span>
              </li>
              <li className="pt-2 text-[0.6875rem] text-emerald-400 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Environment Agency Upper-Tier Licensed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-800 pt-6 pb-2 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-500 font-semibold uppercase">UK Partners:</span>
            <a href="/frontlinetransport" className="text-gray-300 hover:text-white transition-colors">
              Frontline Transport (West Midlands &amp; Nationwide)
            </a>
            <span className="text-gray-700">•</span>
            <a href="/aldhouseandsmith" className="text-gray-300 hover:text-white transition-colors">
              Aldhouse &amp; Smith (Cambridge Removals)
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Unity Waste Removal. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>Licensed UK Waste Carrier</span>
            <span className="size-1 rounded-full bg-[#b96be8]" />
            <span>Zero-to-Landfill Mission</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
