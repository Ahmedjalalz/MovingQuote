import { Phone, Mail, MapPin, Facebook, ExternalLink, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export function AldhouseSiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c2229] text-slate-300 text-xs border-t-2 border-[#9bdce6]">
      {/* Upper Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Brand Column */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block max-w-[220px]">
              <img
                src="/aldhouse-logo.jpg"
                alt="Aldhouse & Smith Ltd"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Family-run domestic and commercial removals and containerised storage specialists based in Waterbeach, Cambridge. Established in 1990 — proudly serving Cambridge colleges, families, and businesses for over 30 years.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://web.facebook.com/aldhouseandsmith"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#9bdce6]/15 border border-[#9bdce6]/30 px-3 py-1.5 text-[#9bdce6] hover:bg-[#9bdce6]/25 transition-colors font-semibold"
              >
                <Facebook className="size-4" />
                <span className="text-xs">Facebook Page</span>
              </a>
              <a
                href="https://aldhouseandsmith.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[#163945] border border-[#214c5c] px-3 py-1.5 text-slate-200 hover:text-white transition-colors"
              >
                <span>Website</span>
                <ExternalLink className="size-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">
              Contact &amp; Depots
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[#9bdce6] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Waterbeach Facility</strong>
                  <span>Unit 1, Convent Drive, Waterbeach, Cambridge, CB25 9QT</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="size-4 text-[#9bdce6] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Telephone Enquiries</strong>
                  <a href="tel:+441223861761" className="hover:text-[#9bdce6] transition-colors block">
                    01223 861761 (Office)
                  </a>
                  <a href="tel:+447768856486" className="hover:text-[#9bdce6] transition-colors block">
                    07768 856486 (Mobile / Urgent)
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="size-4 text-[#9bdce6] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Email</strong>
                  <a
                    href="mailto:info@aldhouseandsmith.co.uk"
                    className="hover:text-[#9bdce6] transition-colors"
                  >
                    info@aldhouseandsmith.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">
              Our Services
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Domestic Household Removals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Movers to the Universities (Colleges &amp; Students)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Commercial &amp; Office Relocations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Secure Containerised Storage Facilities</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Full &amp; Part Packing Services</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Upright &amp; Grand Piano Specialist Transport</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-[#9bdce6] shrink-0" />
                <span>Overseas &amp; European Removals</span>
              </li>
            </ul>
          </div>

          {/* Areas Covered & Opening Times */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">
              Operating Hours &amp; Coverage
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <Clock className="size-4 text-[#9bdce6] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Opening Times</span>
                  <span>Monday – Friday: 8:00 AM – 6:00 PM</span>
                  <span className="block">Saturday: 8:00 AM – 1:00 PM</span>
                  <span className="block text-slate-400">Sunday: Closed</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="block font-medium text-white mb-1">Local Coverage</span>
                <p className="text-[0.6875rem] text-slate-400 leading-relaxed">
                  Cambridge, Waterbeach, Ely, Newmarket, Huntingdon, St Neots, Royston, Saffron Walden, Great Shelford, Sawston, Cottenham, Cambridgeshire, London &amp; UK Nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UK Partners Bar */}
        <div className="border-t border-[#163945] mt-8 pt-4 text-[0.6875rem] text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 font-semibold uppercase">UK Partners:</span>
            <a href="/frontlinetransport" className="text-slate-300 hover:text-[#9bdce6] transition-colors">
              Frontline Transport (West Midlands &amp; Nationwide)
            </a>
            <span className="text-slate-700">•</span>
            <a href="/unitywasteremovals" className="text-slate-300 hover:text-[#9bdce6] transition-colors">
              Unity Waste Removals (Cheshire &amp; Wirral)
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#163945] py-4 bg-[#081a20]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.6875rem] text-slate-400 text-center sm:text-left">
          <div>
            © {currentYear} Aldhouse &amp; Smith Ltd. All rights reserved. Registered in England &amp; Wales.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#9bdce6] font-medium">Cambridge Blue Heritage • Fully Insured Removals &amp; Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
