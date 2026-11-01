import { Phone, Mail, MapPin, Clock, ShieldCheck, Truck, ExternalLink } from "lucide-react";

export function Roads2RoadsSiteFooter() {
  return (
    <footer id="contact" className="bg-[#0b0f19] text-white pt-12 pb-8 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-slate-800/80">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/roads2roads-logo.png"
                alt="Roads2Roads Couriers"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              <strong>Roads2Roads Couriers Ltd</strong> is your #1 choice for same-day delivery, urgent special deliveries, and consignments across London and nationwide UK.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-[#25AAE1] font-semibold">
              <Clock className="size-3.5" />
              <span>Available 24 Hours • 7 Days a Week</span>
            </div>
          </div>

          {/* Column 2: Courier Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Courier Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="hover:text-white transition-colors">• Urgent Same-Day Delivery</li>
              <li className="hover:text-white transition-colors">• Packets to Pallets Transport</li>
              <li className="hover:text-white transition-colors">• Dedicated Direct Courier</li>
              <li className="hover:text-white transition-colors">• Time-Critical &amp; Fragile Freight</li>
              <li className="hover:text-white transition-colors">• Multi-Drop &amp; Route Logistics</li>
              <li className="hover:text-white transition-colors">• Luton Box Van with Tail Lift</li>
              <li className="hover:text-white transition-colors">• UK Nationwide Long-Distance</li>
            </ul>
          </div>

          {/* Column 3: Contact & Urgent Collections */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Urgent Collections
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="size-4 text-[#25AAE1] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.6875rem] text-slate-400">Urgent Dispatch:</span>
                  <a
                    href="tel:02034769656"
                    className="font-bold text-white hover:text-[#25AAE1] transition-colors"
                  >
                    0203 476 9656
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="size-4 text-[#449D44] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.6875rem] text-slate-400">Mobile / Direct:</span>
                  <a
                    href="tel:07584239227"
                    className="font-bold text-white hover:text-[#449D44] transition-colors"
                  >
                    0758 423 9227
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="size-4 text-[#25AAE1] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.6875rem] text-slate-400">Email:</span>
                  <a
                    href="mailto:andrew@roads2roads.co.uk"
                    className="text-slate-300 hover:text-white transition-colors break-all"
                  >
                    andrew@roads2roads.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Registered Office & Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Registered Office
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
              <MapPin className="size-4 text-[#25AAE1] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-200">Roads2Roads Couriers Ltd</p>
                <p>4th Floor, Silverstream House</p>
                <p>45 Fitzroy Street</p>
                <p>London, W1T 6EB</p>
                <p className="text-[0.6875rem] text-slate-500 mt-1">United Kingdom</p>
              </div>
            </div>

            <div className="pt-2">
              <span className="block text-[0.6875rem] uppercase font-bold text-slate-400 mb-1.5">
                Connect
              </span>
              <a
                href="https://www.facebook.com/Roads2Roadscouriers"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors text-xs font-semibold"
              >
                <span>Follow on Facebook</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Copyright &copy; 2026 Roads2Roads Couriers Ltd &bull; All Rights Reserved
          </p>
          <div className="flex items-center gap-4 text-[0.6875rem]">
            <span>London &bull; Birmingham &bull; Manchester &bull; UK Nationwide</span>
            <span>&bull;</span>
            <span className="text-[#25AAE1]">Cost-Effective Rates &bull; Realistic Timings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
