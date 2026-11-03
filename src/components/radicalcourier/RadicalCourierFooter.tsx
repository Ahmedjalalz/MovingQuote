import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { RadicalSubPage } from "./RadicalCourierHeader";

interface RadicalCourierFooterProps {
  onNavigate: (page: RadicalSubPage) => void;
}

export function RadicalCourierFooter({ onNavigate }: RadicalCourierFooterProps) {
  return (
    <footer className="bg-[#0B1329] text-slate-300 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-[#0F172A]/70 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">24/7/365 On Demand</div>
              <div className="text-slate-400 text-xs">Immediate 60-min collections</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Zero Subcontracting</div>
              <div className="text-slate-400 text-xs">One dedicated driver start to finish</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Packets to 6 Pallets</div>
              <div className="text-slate-400 text-xs">Small vans to Luton tail lifts</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">No Account Needed</div>
              <div className="text-slate-400 text-xs">Instant online quote & booking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/radical-logo.svg"
                alt="Radical Courier Service"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Established in March 2007 in Coventry, Radical Courier Service Limited
              provides premium same-day express and time-critical direct delivery across
              Warwickshire, the West Midlands, and UK nationwide.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="text-slate-300 font-semibold">
                Radical Courier Service Limited
              </div>
              <div>Company Reg No: 06143596 • Registered in England & Wales</div>
              <div>Registered Office: 38 Crossway Road, Green Lane, Coventry, CV3 6JP</div>
            </div>
          </div>

          {/* Quick Sub-pages */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
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
                  Services & Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("quote")}
                  className="text-sky-400 font-semibold hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  Online Quotation Calculator
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Why We Are Radical
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("drivers")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Drivers Registration & App
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("customers")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Customer Account Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-sky-400 transition-colors"
                >
                  Contact & Emergency Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Delivery Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Urgent Same-Day On Demand</li>
              <li>Same-Day Scheduled Multi-Drop</li>
              <li>Student Accommodation Moves</li>
              <li>Automotive & Formula 1 Parts</li>
              <li>Time-Critical Legal Documents</li>
              <li>Medical & Healthcare Supplies</li>
              <li>High-Volume Printing Delivery</li>
              <li>High-Value & Luxury Courier</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <div className="text-slate-400">24/7 Operations Control:</div>
                <a
                  href="tel:02475122465"
                  className="text-white font-bold text-sm hover:text-sky-400 flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  024 7512 2465
                </a>
              </li>
              <li>
                <div className="text-slate-400">Direct Inquiries:</div>
                <a
                  href="mailto:info@radicalcourier.co.uk"
                  className="text-sky-400 hover:underline flex items-center gap-1.5 mt-0.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  info@radicalcourier.co.uk
                </a>
              </li>
              <li className="pt-2">
                <div className="text-slate-400">Primary Dispatch Hub:</div>
                <div className="text-slate-300 mt-0.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Coventry & Warwickshire (Local Midlands + UK Wide)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 bg-[#070D1E] py-5 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Radical Courier Service Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Direct to Door</span>
            <span>•</span>
            <span>Live Driver GPS Updates</span>
            <span>•</span>
            <span>Fully Insured Goods In Transit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}