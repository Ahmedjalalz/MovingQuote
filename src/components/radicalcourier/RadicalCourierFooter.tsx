import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { RadicalSubPage } from "./RadicalCourierHeader";

interface RadicalCourierFooterProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierFooter({ onNavigate }: RadicalCourierFooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* Value Ribbon */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">24/7/365 On Demand</div>
              <div className="text-slate-400 text-[11px]">Collections within 60 mins in Midlands</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Dedicated Driver Only</div>
              <div className="text-slate-400 text-[11px]">Zero subcontracting, zero hub delays</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Packets to 6 Pallets</div>
              <div className="text-slate-400 text-[11px]">Small vans to Luton 500kg tail lifts</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">No Account Required</div>
              <div className="text-slate-400 text-[11px]">Instant fixed-price online quotation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Address */}
          <div className="space-y-3">
            <img
              src="/radical-logo.svg"
              alt="Radical Courier Service Ltd"
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Same-day express courier service providing point-to-point delivery across Coventry,
              Warwickshire, and UK nationwide since 2007.
            </p>
            <div className="text-slate-400 text-[11px] space-y-0.5 pt-1">
              <strong className="text-white block">Radical Courier Service Limited</strong>
              <div>Company Reg No: 06143596</div>
              <div>38 Crossway Road, Green Lane, Coventry, CV3 6JP</div>
            </div>
          </div>

          {/* Quick Sub-pages */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Our Services &amp; Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("quote")}
                  className="text-sky-400 font-bold hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  Online Quotation Calculator <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-sky-400 transition-colors"
                >
                  About Us (What Makes Us Radical)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("drivers")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Drivers Registration &amp; App
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("customers")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Customer Account Portal &amp; POD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Courier Services
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Urgent Same-Day On Demand</li>
              <li>Scheduled Delivery Routes</li>
              <li>Student Relocations (Person &amp; Bags)</li>
              <li>Automotive &amp; Formula 1 Parts</li>
              <li>Legal Documents &amp; Court Files</li>
              <li>Printing &amp; Commercial Publications</li>
              <li>Medical Supplies &amp; Equipment</li>
              <li>Heavy Palletised Freight</li>
            </ul>
          </div>

          {/* Direct 24/7 Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <span className="text-slate-400 block text-[11px]">24/7 Operations Desk:</span>
                <a
                  href="tel:02475122465"
                  className="text-white font-extrabold text-sm hover:text-sky-400 flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  024 7512 2465
                </a>
              </li>
              <li>
                <span className="text-slate-400 block text-[11px]">Dispatch Email:</span>
                <a
                  href="mailto:info@radicalcourier.co.uk"
                  className="text-sky-400 hover:underline flex items-center gap-1.5 mt-0.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  info@radicalcourier.co.uk
                </a>
              </li>
              <li className="pt-1">
                <span className="text-slate-400 block text-[11px]">Coventry Hub Coverage:</span>
                <span className="text-slate-300 text-[11px] block">
                  Coventry, Birmingham, Warwick, Leamington Spa, Rugby, and UK Nationwide
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-4 px-4 sm:px-6 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Radical Courier Service Limited. All rights reserved. Registered in England &amp; Wales (06143596).
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>Direct to Door</span>
            <span>•</span>
            <span>Dedicated Driver</span>
            <span>•</span>
            <span>Goods in Transit Insured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}