import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
} from "lucide-react";

export function MoveManSiteFooter() {
  return (
    <footer className="bg-[#151515] text-white font-['Barlow',sans-serif] pt-14 pb-10 border-t-4 border-[#8DC63F]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Logo & Statement Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-neutral-800 gap-6">
          <a
            href="/movemanltd.com"
            className="inline-block hover:opacity-90 transition-opacity"
            aria-label="Move Management Asset Removals Ltd"
          >
            <img
              src="/moveman-logo-white.png"
              alt="Move Management Asset Removals Ltd"
              width={260}
              height={55}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-neutral-300">
            <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg text-[#8DC63F]">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Commercial Relocation Specialists</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg text-slate-300">
              <MapPin className="size-4 text-[#8DC63F] shrink-0" />
              <span>Midlands • Manchester • London • Stoke HQ</span>
            </span>
            <a
              href="tel:08002465642"
              className="inline-flex items-center gap-1.5 bg-[#8DC63F] text-neutral-950 font-bold px-3.5 py-1.5 rounded-lg hover:bg-[#7cb334] transition-colors"
            >
              <Phone className="size-4 shrink-0" />
              <span>0800 246 5642</span>
            </a>
          </div>
        </div>

        {/* 4 Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-neutral-800 text-sm">
          {/* Col 1: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-xs border-l-3 border-[#8DC63F] pl-2.5">
              Contact Us
            </h4>

            <div className="text-neutral-400 space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-neutral-200">
                Move Management Asset Removals Ltd
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="size-4 text-[#8DC63F] shrink-0 mt-0.5" />
                <span>The Genesis Centre, Innovation Way, Stoke-on-Trent, ST6 4BF</span>
              </p>
              <p className="text-xs text-neutral-500">
                Regional Hubs: Midlands, Greater Manchester &amp; London
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs sm:text-sm">
              <p>
                <a
                  href="tel:08002465642"
                  className="font-bold text-white hover:text-[#8DC63F] transition-colors flex items-center gap-2"
                >
                  <Phone className="size-4 text-[#8DC63F]" />
                  <span>Freephone: 0800 246 5642</span>
                </a>
              </p>
              <p>
                <a
                  href="tel:07918716165"
                  className="text-neutral-300 hover:text-[#8DC63F] transition-colors flex items-center gap-2"
                >
                  <Phone className="size-4 text-[#8DC63F]" />
                  <span>Direct: 07918 716165</span>
                </a>
              </p>
              <p>
                <a
                  href="mailto:mikedawson@movemanltd.com"
                  className="text-neutral-300 hover:text-[#8DC63F] transition-colors flex items-center gap-2"
                >
                  <Mail className="size-4 text-[#8DC63F]" />
                  <span>mikedawson@movemanltd.com</span>
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/movemanagementltd"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#8DC63F] hover:border-[#8DC63F] transition-colors"
                aria-label="MoveMan on Facebook"
              >
                <svg className="size-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>

              <a
                href="https://twitter.com/MoveManAR"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#8DC63F] hover:border-[#8DC63F] transition-colors"
                aria-label="MoveMan on X / Twitter"
              >
                <svg className="size-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/move-management-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#8DC63F] hover:border-[#8DC63F] transition-colors"
                aria-label="MoveMan on LinkedIn"
              >
                <svg className="size-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-xs border-l-3 border-[#8DC63F] pl-2.5">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <a
                  href="https://movemanltd.com/service/business-moving/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Business Moving
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/packing-storage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Packing &amp; Storage
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/move-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Move Management
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/machinery-moves/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Machinery Moves
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/space-floor-planning/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Space &amp; Floor Planning
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/it-relocations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> IT Relocations
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/recycling/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Recycling &amp; WEEE Clearance
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/office-furniture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Reusable Office Furniture
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-xs border-l-3 border-[#8DC63F] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <a
                  href="https://movemanltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> MoveMan Home
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/service/what-we-do/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> What We Do
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/projects/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Case Studies &amp; Projects
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/business-moving-help-guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Free Business Moving Guide
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/testimonials/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Client Testimonials
                </a>
              </li>
              <li>
                <a
                  href="https://movemanltd.com/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#8DC63F]">›</span> Contact MoveMan Team
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Reassurance */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-xs border-l-3 border-[#8DC63F] pl-2.5">
              Enterprise Excellence
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We manage large-scale transitions for FTSE-listed corporations, NHS trusts, leading universities, and growing regional businesses across the UK.
            </p>

            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-3.5 space-y-2">
              <span className="text-[11px] font-bold text-[#8DC63F] uppercase tracking-wider block">
                Zero Operational Downtime
              </span>
              <p className="text-xs text-neutral-300">
                Out-of-hours weekend transitions ensure your staff finish Friday in one office and resume Monday in another.
              </p>
            </div>

            <div className="pt-1 text-xs text-neutral-500">
              <a
                href="https://movemanltd.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8DC63F] mr-3"
              >
                Privacy Policy
              </a>
              <a
                href="https://movemanltd.com/terms-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8DC63F]"
              >
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Move Management Asset Removals Ltd. All Rights Reserved.
          </p>
          <p className="text-center sm:text-right">
            Commercial Relocation Planning, Removals &amp; Management Specialists • UK Nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}
