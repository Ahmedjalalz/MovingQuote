import { useState } from "react";
import {
  Caravan,
  Truck,
  Box,
  Anchor,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface RavensOakPitchCalculatorProps {
  onSelectPitch: (category: "caravan" | "motorhome" | "container" | "boat" | "trailer") => void;
}

export function RavensOakPitchCalculator({ onSelectPitch }: RavensOakPitchCalculatorProps) {
  const [vehicleType, setVehicleType] = useState<"caravan" | "motorhome" | "container" | "boat">("caravan");
  const [lengthFt, setLengthFt] = useState<number>(24);
  const [surface, setSurface] = useState<"hardstanding" | "indoor" | "grass">("hardstanding");

  // Calculations
  let rate = 50;
  let title = "Touring Caravan Pitch";
  let pitchWidth = "3.0 metres (~10 ft)";
  let pitchDepth = "8.0+ metres (~26 ft)";

  if (vehicleType === "motorhome") {
    rate = 55;
    title = "Motorhome / RV Pitch";
    pitchWidth = "3.2 metres (~10.5 ft)";
    pitchDepth = lengthFt > 30 ? "14.0 metres (up to 45 ft)" : "10.0 metres (~33 ft)";
  } else if (vehicleType === "container") {
    rate = 65;
    title = "20ft Steel Shipping Container";
    pitchWidth = "8ft (2.44m)";
    pitchDepth = "20ft (6.06m)";
  } else if (vehicleType === "boat") {
    rate = 50;
    title = "Boat & Marine Trailer Bay";
    pitchWidth = "3.0 metres (~10 ft)";
    pitchDepth = "8.0+ metres (~26 ft)";
  }

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs">
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#006837] border border-emerald-200/60 mb-2">
          <Sparkles className="size-3.5" />
          <span>Interactive Pitch &amp; Space Calculator</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find Your Pitch Size &amp; Exact Monthly Cost
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Standard caravan pitches at Ravens Oak are generously dimensioned to ensure effortless
          parking, full door/locker clearance, and hassle-free hitching.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vehicle Type Switcher */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700 mb-2.5">
              1. Choose Vehicle or Storage Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setVehicleType("caravan");
                  setLengthFt(24);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  vehicleType === "caravan"
                    ? "border-[#006837] bg-emerald-50 text-[#006837] font-bold ring-2 ring-[#006837]/20"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Caravan className="size-5 mx-auto mb-1 text-[#006837]" />
                <div className="text-xs font-bold">Caravan</div>
                <div className="text-[11px] text-[#509D25] font-black">£50/mo</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVehicleType("motorhome");
                  setLengthFt(28);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  vehicleType === "motorhome"
                    ? "border-[#006837] bg-emerald-50 text-[#006837] font-bold ring-2 ring-[#006837]/20"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Truck className="size-5 mx-auto mb-1 text-[#006837]" />
                <div className="text-xs font-bold">Motorhome</div>
                <div className="text-[11px] text-[#509D25] font-black">£55/mo</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVehicleType("container");
                  setLengthFt(20);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  vehicleType === "container"
                    ? "border-[#006837] bg-emerald-50 text-[#006837] font-bold ring-2 ring-[#006837]/20"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Box className="size-5 mx-auto mb-1 text-[#006837]" />
                <div className="text-xs font-bold">Container</div>
                <div className="text-[11px] text-[#509D25] font-black">£65/mo</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVehicleType("boat");
                  setLengthFt(22);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  vehicleType === "boat"
                    ? "border-[#006837] bg-emerald-50 text-[#006837] font-bold ring-2 ring-[#006837]/20"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Anchor className="size-5 mx-auto mb-1 text-[#006837]" />
                <div className="text-xs font-bold">Boat / Trailer</div>
                <div className="text-[11px] text-[#509D25] font-black">£50/mo</div>
              </button>
            </div>
          </div>

          {/* Length Slider & Surface */}
          {vehicleType !== "container" && (
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-[0.1em] text-slate-700">
                    2. Vehicle Length
                  </label>
                  <span className="text-xs font-bold text-[#006837] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {lengthFt} feet (approx {(lengthFt * 0.3048).toFixed(1)} metres)
                  </span>
                </div>
                <input
                  type="range"
                  min={16}
                  max={45}
                  step={1}
                  value={lengthFt}
                  onChange={(e) => setLengthFt(Number(e.target.value))}
                  className="w-full accent-[#006837] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                  <span>16 ft (compact)</span>
                  <span>26 ft (typical twin axle)</span>
                  <span>45 ft (large RV)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.1em] text-slate-700 mb-2">
                  3. Preferred Pitch Surface
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(["hardstanding", "indoor", "grass"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSurface(s)}
                      className={`py-2 px-2.5 rounded-xl border text-center capitalize font-semibold transition-colors cursor-pointer ${
                        surface === s
                          ? "border-[#006837] bg-emerald-50 text-[#006837] font-bold"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Recommendation Card */}
        <div className="lg:col-span-5 bg-[#0b2915] text-white p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#8CC63F] animate-pulse" />
            <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-300">
              Allocated Pitch Specification
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white">{title}</h4>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#8CC63F]">£{rate}</span>
              <span className="text-xs text-emerald-200">/ month</span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-200/70">
              Payable 3 months initial, then standing order. £40 refundable card deposit.
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-emerald-900/80">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 block text-[10px]">Pitch Width:</span>
              <span className="font-bold text-white">{pitchWidth}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 block text-[10px]">Pitch Depth:</span>
              <span className="font-bold text-white">{pitchDepth}</span>
            </div>
          </div>

          {/* Included Features */}
          <ul className="space-y-1.5 text-xs text-emerald-100/90 pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
              <span>24/7/365 Automated Electric Swipe Card Gate</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
              <span>Complimentary 2-acre practice paddock access</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
              <span>Water wash-down taps &amp; tyre air compressor bay</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#8CC63F] shrink-0" />
              <span>Resident owners on-site with regular patrols</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => onSelectPitch(vehicleType)}
            className="w-full h-12 rounded-full bg-[#8CC63F] hover:bg-[#7cb630] text-emerald-950 font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Reserve This Pitch &amp; Get Quote</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
