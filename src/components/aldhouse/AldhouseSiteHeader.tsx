import { useState } from "react";
import { Phone, MapPin, Mail, Menu, X, Facebook, ExternalLink, ShieldCheck } from "lucide-react";

export function AldhouseSiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top Heritage Bar */}
      <div className="bg-[#0c2229] text-slate-200 py-2 text-xs border-b border-[#163945]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <a
              href="tel:+441223861761"
              className="flex items-center gap-1.5 hover:text-[#9bdce6] transition-colors font-semibold"
            >
              <Phone className="size-3.5 text-[#9bdce6]" />
              <span>Office: 01223 861761</span>
            </a>
            <a
              href="tel:+447768856486"
              className="hidden md:flex items-center gap-1.5 hover:text-[#9bdce6] transition-colors font-semibold text-slate-300"
            >
              <Phone className="size-3.5 text-[#9bdce6]" />
              <span>Mobile: 07768 856486</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin className="size-3.5 text-[#9bdce6]" />
              <span>Unit 1, Convent Dr, Waterbeach, Cambridge CB25 9QT</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[0.6875rem]">
            <span className="inline-flex items-center gap-1.5 text-[#9bdce6] font-bold tracking-wide">
              <ShieldCheck className="size-3.5" />
              <span>Family-Run Since 1990 • Movers to the Universities</span>
            </span>

            <a
              href="https://web.facebook.com/aldhouseandsmith"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-[#9bdce6] transition-colors font-medium"
              title="Visit our Facebook page"
            >
              <Facebook className="size-3.5 text-[#9bdce6]" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="border-b-2 border-[#9bdce6] bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="/aldhouseandsmith" className="flex items-center gap-3">
            <img
              src="/aldhouse-logo.jpg"
              alt="Aldhouse & Smith Ltd Removals and Storage"
              width={260}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden md:flex flex-col border-l border-slate-200 pl-3">
              <span className="text-xs font-bold text-[#0c2229] uppercase tracking-wider">
                Cambridge Removals &amp; Storage
              </span>
              <span className="text-[0.6875rem] text-[#368b9a] font-semibold">
                Domestic • Commercial • Containerised Storage
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="/aldhouseandsmith" className="text-[#0c2229] border-b-2 border-[#9bdce6] pb-0.5">
              Get Quote
            </a>
            <a href="#services" className="hover:text-[#368b9a] transition-colors">
              Removals
            </a>
            <a href="#storage" className="hover:text-[#368b9a] transition-colors">
              Secure Storage
            </a>
            <a href="#pianos" className="hover:text-[#368b9a] transition-colors">
              Piano Specialists
            </a>
            <a href="#why-aldhouse" className="hover:text-[#368b9a] transition-colors">
              About Us
            </a>
            <a
              href="https://aldhouseandsmith.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#368b9a] transition-colors text-slate-500"
            >
              <span>Main Site</span>
              <ExternalLink className="size-3" />
            </a>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href="tel:+441223861761"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#0c2229] px-4 py-2.5 text-xs font-bold text-[#9bdce6] shadow-xs hover:bg-[#132f38] transition-all border border-[#9bdce6]/40"
            >
              <Phone className="size-3.5 text-[#9bdce6]" />
              <span>01223 861761</span>
            </a>

            <a
              href="tel:+447768856486"
              className="inline-flex sm:hidden items-center justify-center size-10 rounded-xl bg-[#0c2229] text-[#9bdce6] border border-[#9bdce6]/30"
              aria-label="Call Aldhouse & Smith"
            >
              <Phone className="size-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-[#eefafc]/40 px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
              <a
                href="/aldhouseandsmith"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-white px-3 py-2 text-[#0c2229] font-bold shadow-xs border-l-4 border-[#9bdce6]"
              >
                Quote Page
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 hover:text-[#368b9a]"
              >
                Domestic &amp; Commercial Removals
              </a>
              <a
                href="#storage"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 hover:text-[#368b9a]"
              >
                Secure Containerised Storage
              </a>
              <a
                href="#pianos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 hover:text-[#368b9a]"
              >
                Upright &amp; Grand Piano Transport
              </a>
              <a
                href="#why-aldhouse"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 hover:text-[#368b9a]"
              >
                Why Choose Aldhouse &amp; Smith
              </a>
              <a
                href="https://web.facebook.com/aldhouseandsmith"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-[#368b9a] font-semibold"
              >
                <Facebook className="size-4 text-[#368b9a]" />
                <span>Visit Facebook Page</span>
              </a>
            </nav>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2 text-xs">
              <a
                href="tel:+441223861761"
                className="flex items-center gap-2 text-slate-800 font-semibold"
              >
                <Phone className="size-3.5 text-[#368b9a]" />
                <span>Office: 01223 861761</span>
              </a>
              <a
                href="tel:+447768856486"
                className="flex items-center gap-2 text-slate-800 font-semibold"
              >
                <Phone className="size-3.5 text-[#368b9a]" />
                <span>Mobile: 07768 856486</span>
              </a>
              <a
                href="mailto:info@aldhouseandsmith.co.uk"
                className="flex items-center gap-2 text-slate-800 font-semibold"
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
