import { useState } from "react";
import { Phone, MapPin, Mail, Menu, X, Facebook, ExternalLink, ShieldCheck } from "lucide-react";

export function AldhouseSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Heritage Info Bar with Generous Breathing Room */}
      <div className="bg-[#0c2229] text-slate-200 py-2.5 text-xs border-b border-[#163945]">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-2.5 text-center md:text-left">
          {/* Phone Numbers & Location */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-1.5">
            <a
              href="tel:+441223861761"
              className="inline-flex items-center gap-2 hover:text-[#9bdce6] transition-colors font-semibold"
            >
              <Phone className="size-3.5 text-[#9bdce6] shrink-0" />
              <span>Office: 01223 861761</span>
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href="tel:+447768856486"
              className="inline-flex items-center gap-2 hover:text-[#9bdce6] transition-colors font-semibold text-slate-300"
            >
              <Phone className="size-3.5 text-[#9bdce6] shrink-0" />
              <span>Mobile: 07768 856486</span>
            </a>
            <span className="hidden lg:inline text-slate-600">•</span>
            <div className="hidden lg:flex items-center gap-2 text-slate-300">
              <MapPin className="size-3.5 text-[#9bdce6] shrink-0" />
              <span>Unit 1, Convent Dr, Waterbeach, Cambridge CB25 9QT</span>
            </div>
          </div>

          {/* Heritage Tag & Social */}
          <div className="flex items-center justify-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-[#9bdce6] font-medium tracking-wide">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>Est. 1990 • Movers to the Universities</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href="https://web.facebook.com/aldhouseandsmith"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-[#9bdce6] transition-colors font-medium"
              title="Visit our Facebook page"
            >
              <Facebook className="size-3.5 text-[#9bdce6] shrink-0" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar with Spacious Padding and No Crammed Text */}
      <div className="border-b-2 border-[#9bdce6] bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4">
          {/* Logo with Uncluttered Presentation */}
          <a
            href="/aldhouseandsmith"
            className="flex items-center shrink-0 hover:opacity-95 transition-opacity py-0.5"
            aria-label="Aldhouse & Smith Ltd Homepage"
          >
            <img
              src="/aldhouse-logo.jpg"
              alt="Aldhouse & Smith Ltd Removals and Storage"
              width={260}
              height={48}
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation with Comfortable Spacing */}
          <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-700">
            <a
              href="/aldhouseandsmith"
              className="px-3.5 py-2 rounded-xl text-[#0c2229] bg-[#eefafc] font-bold border border-[#9bdce6]/50 transition-all"
            >
              Get Free Quote
            </a>
            <a
              href="#services"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#0c2229] hover:bg-slate-100/80 transition-all"
            >
              Removals
            </a>
            <a
              href="#storage"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#0c2229] hover:bg-slate-100/80 transition-all"
            >
              Secure Storage
            </a>
            <a
              href="#pianos"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#0c2229] hover:bg-slate-100/80 transition-all"
            >
              Piano Specialists
            </a>
            <a
              href="#why-aldhouse"
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#0c2229] hover:bg-slate-100/80 transition-all"
            >
              Why Us
            </a>
            <a
              href="https://aldhouseandsmith.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-[#0c2229] hover:bg-slate-100/80 transition-all inline-flex items-center gap-1.5"
            >
              <span>Main Site</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
          </nav>

          {/* Phone Call CTA & Mobile Toggle with Generous Padding */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+441223861761"
              className="hidden sm:inline-flex items-center gap-2.5 rounded-xl bg-[#0c2229] px-4.5 py-2.5 text-xs font-bold text-[#9bdce6] shadow-xs hover:bg-[#132f38] hover:text-white transition-all border border-[#9bdce6]/40 tracking-wide"
            >
              <Phone className="size-3.5 text-[#9bdce6] shrink-0" />
              <span>01223 861761</span>
            </a>

            <a
              href="tel:+447768856486"
              className="inline-flex sm:hidden items-center justify-center size-10 rounded-xl bg-[#0c2229] text-[#9bdce6] border border-[#9bdce6]/40 shadow-xs"
              aria-label="Call Aldhouse & Smith"
            >
              <Phone className="size-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Ample Padding */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-[#eefafc]/50 px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1.5 text-sm font-medium text-slate-800">
              <a
                href="/aldhouseandsmith"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-white px-4 py-2.5 text-[#0c2229] font-bold shadow-xs border-l-4 border-[#9bdce6]"
              >
                Quote Page
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-white/80 transition-colors"
              >
                Domestic &amp; Commercial Removals
              </a>
              <a
                href="#storage"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-white/80 transition-colors"
              >
                Secure Containerised Storage
              </a>
              <a
                href="#pianos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-white/80 transition-colors"
              >
                Upright &amp; Grand Piano Transport
              </a>
              <a
                href="#why-aldhouse"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-white/80 transition-colors"
              >
                Why Choose Aldhouse &amp; Smith
              </a>
              <a
                href="https://web.facebook.com/aldhouseandsmith"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2 text-[#368b9a] font-semibold hover:bg-white/80 rounded-lg transition-colors"
              >
                <Facebook className="size-4 text-[#368b9a]" />
                <span>Visit Facebook Page</span>
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-2.5 text-xs">
              <a
                href="tel:+441223861761"
                className="flex items-center gap-2.5 text-slate-800 font-semibold p-1.5 hover:text-[#368b9a]"
              >
                <Phone className="size-3.5 text-[#368b9a]" />
                <span>Office: 01223 861761</span>
              </a>
              <a
                href="tel:+447768856486"
                className="flex items-center gap-2.5 text-slate-800 font-semibold p-1.5 hover:text-[#368b9a]"
              >
                <Phone className="size-3.5 text-[#368b9a]" />
                <span>Mobile: 07768 856486</span>
              </a>
              <a
                href="mailto:info@aldhouseandsmith.co.uk"
                className="flex items-center gap-2.5 text-slate-800 font-semibold p-1.5 hover:text-[#368b9a]"
              >
                <Mail className="size-3.5 text-[#368b9a]" />
                <span>info@aldhouseandsmith.co.uk</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
