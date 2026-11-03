import { useState, useId, useMemo } from "react";
import {
  Truck,
  Package,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Phone,
  Mail,
  Building,
  User,
  Zap,
  GraduationCap,
  Sparkles,
  Layers,
  FileCheck,
  Percent,
} from "lucide-react";
import { RadicalLocationField } from "./RadicalLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface VanOption {
  id: string;
  name: string;
  shortName: string;
  length: string;
  width: string;
  height: string;
  payload: string;
  pallets: number;
  baseRatePerMile: number;
  minCharge: number;
  idealFor: string;
  imageAlt: string;
}

export const RADICAL_VANS: VanOption[] = [
  {
    id: "small_van",
    name: "Small Van",
    shortName: "Small Van",
    length: "1.0m",
    width: "1.2m",
    height: "1.0m",
    payload: "400 kg",
    pallets: 1,
    baseRatePerMile: 1.35,
    minCharge: 55,
    idealFor: "Envelopes, urgent documents, medical vials, cartons & 1 small pallet",
    imageAlt: "Small Courier Van",
  },
  {
    id: "midi_swb",
    name: "Midi / Short Wheelbase (SWB)",
    shortName: "Midi SWB",
    length: "2.0m",
    width: "1.2m",
    height: "1.2m",
    payload: "800 kg",
    pallets: 2,
    baseRatePerMile: 1.65,
    minCharge: 75,
    idealFor: "Up to 2 pallets, automotive parts, machinery spares & trade goods",
    imageAlt: "Midi SWB Panel Van",
  },
  {
    id: "lwb",
    name: "Long Wheelbase (LWB)",
    shortName: "LWB Van",
    length: "3.0m",
    width: "1.2m",
    height: "1.7m",
    payload: "1,100 kg",
    pallets: 3,
    baseRatePerMile: 1.95,
    minCharge: 95,
    idealFor: "3 standard pallets, commercial exhibition kit, bulky engineering parts",
    imageAlt: "Long Wheelbase Van",
  },
  {
    id: "xlwb",
    name: "Extra Long Wheelbase (XLWB)",
    shortName: "XLWB Jumbo",
    length: "4.0m",
    width: "1.2m",
    height: "1.7m",
    payload: "1,100 kg",
    pallets: 4,
    baseRatePerMile: 2.25,
    minCharge: 125,
    idealFor: "Up to 4 pallets, 4m pipes/ladders, high-cube industrial freight",
    imageAlt: "Extra Long Wheelbase Van",
  },
  {
    id: "luton_tail_lift",
    name: "Luton Box Van (with 500kg Tail Lift)",
    shortName: "Luton Tail Lift",
    length: "4.0m",
    width: "2.0m",
    height: "2.0m",
    payload: "800 kg",
    pallets: 6,
    baseRatePerMile: 2.45,
    minCharge: 145,
    idealFor: "Up to 6 pallets, heavy pallet truck freight, student relocations",
    imageAlt: "Luton Box Van with Hydraulic Tail Lift",
  },
];

export type DeliveryType = "asap" | "planned" | "student";

// Intelligent UK approximate road mileage calculation between key regions/cities
function estimateUkDistance(from: string, to: string): number {
  if (!from || !to) return 38;

  const f = from.toLowerCase();
  const t = to.toLowerCase();

  // Same town / local Coventry & Warwickshire
  if (
    (f.includes("coventry") && t.includes("coventry")) ||
    (f.includes("cv") && t.includes("cv"))
  ) {
    return 12;
  }

  // Common corridors from Coventry / West Midlands
  const distances: Record<string, number> = {
    birmingham: 22,
    leamington: 11,
    warwick: 11,
    rugby: 14,
    solihull: 16,
    nuneaton: 10,
    leicester: 26,
    london: 105,
    manchester: 95,
    leeds: 118,
    bristol: 88,
    nottingham: 52,
    sheffield: 84,
    newcastle: 205,
    southampton: 125,
    liverpool: 108,
    oxford: 52,
    cambridge: 85,
    cardiff: 115,
  };

  for (const [city, dist] of Object.entries(distances)) {
    if ((f.includes(city) && t.includes("coventry")) || (f.includes("coventry") && t.includes(city))) {
      return dist;
    }
  }

  // Cross-country heuristic based on character difference hash
  let hash = 0;
  for (let i = 0; i < f.length; i++) hash += f.charCodeAt(i);
  for (let i = 0; i < t.length; i++) hash += t.charCodeAt(i);
  const pseudoMiles = 25 + (hash % 85);
  return pseudoMiles;
}

interface RadicalCourierQuoteWizardProps {
  className?: string;
  initialDeliveryType?: DeliveryType;
  initialVanId?: string;
}

export function RadicalCourierQuoteWizard({
  className,
  initialDeliveryType = "asap",
  initialVanId = "small_van",
}: RadicalCourierQuoteWizardProps) {
  // Vehicle Selection
  const [selectedVanId, setSelectedVanId] = useState<string>(initialVanId);
  const selectedVan = RADICAL_VANS.find((v) => v.id === selectedVanId) || RADICAL_VANS[0];

  // Delivery Format
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(initialDeliveryType);
  const [scheduledDateTime, setScheduledDateTime] = useState<string>("");

  // Collection Details
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupBuilding, setPickupBuilding] = useState("");
  const [pickupContactName, setPickupContactName] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");

  // Delivery Details
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryBuilding, setDeliveryBuilding] = useState("");
  const [deliveryContactName, setDeliveryContactName] = useState("");
  const [deliveryContactPhone, setDeliveryContactPhone] = useState("");

  // Consignment & Notes
  const [cargoDescription, setCargoDescription] = useState("");
  const [palletCount, setPalletCount] = useState<string>("1");
  const [cargoWeightKg, setCargoWeightKg] = useState<string>("");
  const [industrySector, setIndustrySector] = useState<string>("general");
  const [isAccountHolder, setIsAccountHolder] = useState<boolean>(false);
  const [clientEmail, setClientEmail] = useState("");

  // Errors & UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  // Estimated Distance and Cost Calculation
  const estimatedMiles = useMemo(() => {
    return estimateUkDistance(pickupLocation, deliveryLocation);
  }, [pickupLocation, deliveryLocation]);

  const pricingBreakdown = useMemo(() => {
    let mileageRate = selectedVan.baseRatePerMile;
    let distanceCost = estimatedMiles * mileageRate;

    // Apply minimum charge if distance charge is below minimum
    if (distanceCost < selectedVan.minCharge) {
      distanceCost = selectedVan.minCharge;
    }

    // Urgent ASAP modifier (+15% for immediate 60-min priority dispatch)
    const urgencyMultiplier = deliveryType === "asap" ? 1.15 : 1.0;
    const subtotal = distanceCost * urgencyMultiplier;

    // Account customer discount (10% discount on mileage for approved corporate accounts)
    const accountDiscount = isAccountHolder ? subtotal * 0.1 : 0;
    const netTotal = subtotal - accountDiscount;

    // UK VAT at 20%
    const vat = netTotal * 0.2;
    const grossTotal = netTotal + vat;

    return {
      miles: estimatedMiles,
      mileageRate,
      subtotal,
      accountDiscount,
      netTotal,
      vat,
      grossTotal,
    };
  }, [estimatedMiles, selectedVan, deliveryType, isAccountHolder]);

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!pickupLocation.trim()) errs.pickupLocation = "Pickup town or postcode is required";
    if (!pickupContactName.trim()) errs.pickupContactName = "Pickup contact name is required";
    if (!pickupContactPhone.trim()) errs.pickupContactPhone = "Contact phone number is required";

    if (!deliveryLocation.trim()) errs.deliveryLocation = "Delivery town or postcode is required";
    if (!deliveryContactName.trim()) errs.deliveryContactName = "Delivery contact name is required";
    if (!deliveryContactPhone.trim()) errs.deliveryContactPhone = "Delivery contact phone is required";

    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      errs.clientEmail = "A valid email address is required for quote confirmation";
    }

    if (deliveryType === "planned" && !scheduledDateTime) {
      errs.scheduledDateTime = "Please select your required collection date and time";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields marked in red.");
      return;
    }

    setIsSubmitting(true);

    // Generate random reference like RAD-72491
    const randomRef = "RAD-" + Math.floor(10000 + Math.random() * 90000);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingReference(randomRef);
      setBookingConfirmed(true);
      toast.success("Quote generated & dispatch enquiry lodged successfully!");
    }, 800);
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {bookingConfirmed ? (
        /* Confirmation State */
        <div className="bg-white rounded-3xl border border-sky-100 shadow-2xl p-6 sm:p-10 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0284C7] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Dispatch Enquiry Lodged
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Quotation & Booking Request Received
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Thank you! Your quotation reference is{" "}
            <span className="font-extrabold text-[#0284C7] text-base">{bookingReference}</span>.
            Our dedicated Coventry dispatch controller is reviewing driver availability right now.
          </p>

          <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 text-left mb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Vehicle Allocated
              </span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0284C7]" />
                {selectedVan.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-3">
              <div>
                <span className="font-bold text-slate-500 block">Collection From:</span>
                <span className="font-semibold text-slate-900">{pickupLocation}</span>
                {pickupBuilding && <span className="text-slate-500 block">{pickupBuilding}</span>}
                <span className="text-slate-500 block">Contact: {pickupContactName} ({pickupContactPhone})</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Direct Delivery To:</span>
                <span className="font-semibold text-slate-900">{deliveryLocation}</span>
                {deliveryBuilding && <span className="text-slate-500 block">{deliveryBuilding}</span>}
                <span className="text-slate-500 block">Contact: {deliveryContactName} ({deliveryContactPhone})</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2 text-xs">
              <span className="font-bold text-slate-500">Service Format:</span>
              <span className="font-bold text-[#0284C7] uppercase">
                {deliveryType === "asap" ? "Urgent Same-Day (Within 60 mins)" : deliveryType === "student" ? "Student Accommodation Move" : `Scheduled: ${scheduledDateTime || "Planned"}`}
              </span>
            </div>

            <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-sky-900">Estimated Total Quote (inc. VAT):</div>
                <div className="text-xs text-sky-700">Distance approx. {pricingBreakdown.miles} road miles</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-[#0284C7]">
                  £{pricingBreakdown.grossTotal.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-500">£{pricingBreakdown.netTotal.toFixed(2)} + £{pricingBreakdown.vat.toFixed(2)} VAT</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:02475122465"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold shadow-lg shadow-sky-600/25 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dispatch to Fast-Track: 024 7512 2465</span>
            </a>
            <button
              onClick={() => {
                setBookingConfirmed(false);
                setBookingReference("");
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-bold transition-all"
            >
              Calculate Another Quote
            </button>
          </div>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Top Banner Guarantees */}
          <div className="bg-gradient-to-r from-sky-900 via-[#0B1A3B] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Radical Courier Service Guarantee
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  Instant Same-Day Courier Quotation
                </h1>
                <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                  Real-time transparent pricing for Coventry, the Midlands, and UK nationwide.
                  A single dedicated driver handles your consignment directly from collection to drop-off.
                </p>
              </div>

              <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[200px]">
                <div className="text-xs uppercase tracking-wider text-sky-200 font-bold mb-1">
                  Urgent Collection Time
                </div>
                <div className="text-2xl font-black text-white flex items-center justify-center gap-1.5">
                  <Clock className="w-5 h-5 text-sky-400" />
                  <span>Within 60 Mins</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">Direct to door • 24/7/365</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Form inputs */}
            <div className="lg:col-span-8 space-y-8">
              {/* Step 1: Vehicle Size Selection */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284C7] font-black text-sm flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Select Vehicle Size</h2>
                      <p className="text-xs text-slate-500">Choose the ideal van for your payload & pallet requirements</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    5 Vehicle Classes Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {RADICAL_VANS.map((van) => {
                    const isSelected = selectedVanId === van.id;
                    return (
                      <div
                        key={van.id}
                        onClick={() => setSelectedVanId(van.id)}
                        className={cn(
                          "cursor-pointer rounded-2xl border p-4.5 transition-all relative flex flex-col justify-between",
                          isSelected
                            ? "border-[#0284C7] bg-sky-50/50 shadow-md ring-2 ring-[#0284C7]/20"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <Truck
                              className={cn(
                                "w-5 h-5",
                                isSelected ? "text-[#0284C7]" : "text-slate-400"
                              )}
                            />
                            <div className="font-extrabold text-sm text-slate-900">
                              {van.name}
                            </div>
                          </div>
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                              isSelected
                                ? "border-[#0284C7] bg-[#0284C7] text-white"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2 my-1 border-y border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-bold">Max Load</span>
                            <span className="font-bold text-slate-800">{van.length} × {van.width}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-bold">Payload</span>
                            <span className="font-bold text-slate-800">{van.payload}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase font-bold">Pallets</span>
                            <span className="font-bold text-sky-700">{van.pallets} Pallet{van.pallets > 1 ? "s" : ""}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-tight mt-1">
                          {van.idealFor}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Delivery Format & Urgency */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284C7] font-black text-sm flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Delivery Type & Urgency</h2>
                    <p className="text-xs text-slate-500">Pick immediate on-demand dispatch or planned date/time</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div
                    onClick={() => setDeliveryType("asap")}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-4 transition-all relative flex flex-col justify-between",
                      deliveryType === "asap"
                        ? "border-[#0284C7] bg-sky-50/60 shadow-md ring-2 ring-[#0284C7]/20"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        <span className="font-bold text-sm text-slate-900">ASAP Same-Day</span>
                      </div>
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                        Urgent
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Driver dispatched immediately. Collected within 60 mins across the Midlands.
                    </p>
                  </div>

                  <div
                    onClick={() => setDeliveryType("planned")}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-4 transition-all relative flex flex-col justify-between",
                      deliveryType === "planned"
                        ? "border-[#0284C7] bg-sky-50/60 shadow-md ring-2 ring-[#0284C7]/20"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#0284C7]" />
                        <span className="font-bold text-sm text-slate-900">Specific Date/Time</span>
                      </div>
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-sky-100 text-[#0284C7]">
                        Scheduled
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Pre-book planned collection for a specific date and time slot.
                    </p>
                  </div>

                  <div
                    onClick={() => setDeliveryType("student")}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-4 transition-all relative flex flex-col justify-between",
                      deliveryType === "student"
                        ? "border-[#0284C7] bg-sky-50/60 shadow-md ring-2 ring-[#0284C7]/20"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-sm text-slate-900">Student Move</span>
                      </div>
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        Campus
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Relocate student belongings and passenger directly to university accommodation.
                    </p>
                  </div>
                </div>

                {deliveryType === "planned" && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Required Collection Date & Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className={cn(
                        "w-full sm:w-80 rounded-xl border border-slate-300 bg-white py-3 px-4 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
                        errors.scheduledDateTime && "border-red-400"
                      )}
                    />
                    {errors.scheduledDateTime && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errors.scheduledDateTime}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Route Locations */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284C7] font-black text-sm flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Collection & Delivery Route</h2>
                    <p className="text-xs text-slate-500">Enter UK addresses or postcodes for direct delivery</p>
                  </div>
                </div>

                {/* Pickup Section */}
                <div className="space-y-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 p-5">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Collection Details (Point A)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <RadicalLocationField
                      label="Pickup Town / City / Postcode"
                      placeholder="e.g. Coventry CV1, Warwick, Birmingham..."
                      value={pickupLocation}
                      onChange={setPickupLocation}
                      error={errors.pickupLocation}
                      required
                    />

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Building / Street / Unit
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Unit 4, Crossway Road"
                        value={pickupBuilding}
                        onChange={(e) => setPickupBuilding(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Collection Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contact person at collection"
                        value={pickupContactName}
                        onChange={(e) => setPickupContactName(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
                          errors.pickupContactName && "border-red-400"
                        )}
                      />
                      {errors.pickupContactName && (
                        <p className="text-xs text-red-500 mt-1">{errors.pickupContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Collection Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Driver phone liaison"
                        value={pickupContactPhone}
                        onChange={(e) => setPickupContactPhone(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
                          errors.pickupContactPhone && "border-red-400"
                        )}
                      />
                      {errors.pickupContactPhone && (
                        <p className="text-xs text-red-500 mt-1">{errors.pickupContactPhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 p-5">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span>Direct Delivery Details (Point B)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <RadicalLocationField
                      label="Delivery Town / City / Postcode"
                      placeholder="e.g. London EC1, Manchester, Leeds..."
                      value={deliveryLocation}
                      onChange={setDeliveryLocation}
                      error={errors.deliveryLocation}
                      required
                    />

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Recipient Building / Street
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Legal Chambers, 14 High St"
                        value={deliveryBuilding}
                        onChange={(e) => setDeliveryBuilding(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Recipient Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Person receiving delivery"
                        value={deliveryContactName}
                        onChange={(e) => setDeliveryContactName(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
                          errors.deliveryContactName && "border-red-400"
                        )}
                      />
                      {errors.deliveryContactName && (
                        <p className="text-xs text-red-500 mt-1">{errors.deliveryContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                        Recipient Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="For delivery SMS / call"
                        value={deliveryContactPhone}
                        onChange={(e) => setDeliveryContactPhone(e.target.value)}
                        className={cn(
                          "w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
                          errors.deliveryContactPhone && "border-red-400"
                        )}
                      />
                      {errors.deliveryContactPhone && (
                        <p className="text-xs text-red-500 mt-1">{errors.deliveryContactPhone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Cargo & Consignment Details */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284C7] font-black text-sm flex items-center justify-center">
                    4
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Consignment Specifications</h2>
                    <p className="text-xs text-slate-500">Tell us what you are moving to ensure correct handling</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Industry Sector
                    </label>
                    <select
                      value={industrySector}
                      onChange={(e) => setIndustrySector(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15"
                    >
                      <option value="general">Commercial / General Freight</option>
                      <option value="automotive">Automotive & Formula 1 Parts</option>
                      <option value="legal">Legal & Court Documents (Signatures)</option>
                      <option value="medical">Medical Supplies & Equipment</option>
                      <option value="printing">Printing / Bulk Publications</option>
                      <option value="luxury">High-Value Jewellery & Antiques</option>
                      <option value="student">Student Accommodation Belongings</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Pallet Count
                    </label>
                    <select
                      value={palletCount}
                      onChange={(e) => setPalletCount(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15"
                    >
                      <option value="0">0 (Boxes / Packets / Loose items)</option>
                      <option value="1">1 Standard Pallet</option>
                      <option value="2">2 Standard Pallets</option>
                      <option value="3">3 Standard Pallets</option>
                      <option value="4">4 Standard Pallets</option>
                      <option value="6">6 Pallets (Luton required)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Approx Weight (kg)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 50, 250, 700"
                      value={cargoWeightKg}
                      onChange={(e) => setCargoWeightKg(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Package Dimensions & Special Delivery Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details on package dimensions, reference numbers, access codes, or urgent delivery requirements..."
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden"
                  />
                </div>

                {/* Email for quote dispatch */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Your Email Address (For Instant Quote Summary & PDF Reference) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@company.co.uk"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border border-slate-200 bg-white py-3 px-3.5 text-sm font-medium text-slate-900 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
                      errors.clientEmail && "border-red-400"
                    )}
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-red-500 mt-1">{errors.clientEmail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Live Pricing Breakdown Sticky Card */}
            <div className="lg:col-span-4 sticky top-24 space-y-5">
              <div className="bg-white rounded-3xl border-2 border-sky-100 shadow-xl p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                  Live Calculator
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Quotation Summary</h3>
                    <p className="text-xs text-slate-500">Real-time estimate based on official tariff</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Vehicle Selected:</span>
                      <span className="font-bold text-slate-900">{selectedVan.shortName}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>Service Level:</span>
                      <span className="font-bold text-sky-700 uppercase">
                        {deliveryType === "asap" ? "Urgent Same-Day" : deliveryType === "student" ? "Student Move" : "Scheduled"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>Approx Road Distance:</span>
                      <span className="font-bold text-slate-900">
                        {pickupLocation && deliveryLocation ? `${pricingBreakdown.miles} miles` : "Enter route"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>Base Tariff Rate:</span>
                      <span className="font-bold text-slate-900">£{pricingBreakdown.mileageRate.toFixed(2)} / mi</span>
                    </div>

                    {isAccountHolder && (
                      <div className="flex items-center justify-between text-emerald-600 font-bold">
                        <span>Corporate Account Discount:</span>
                        <span>-£{pricingBreakdown.accountDiscount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Corporate Account Toggle */}
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={isAccountHolder}
                      onChange={(e) => setIsAccountHolder(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">Existing Business Account Holder</span>
                      <span className="text-slate-500">Apply preferred tariff & 30-day invoice terms</span>
                    </div>
                  </label>

                  {/* Price Breakdown */}
                  <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Net Subtotal:</span>
                      <span className="font-bold text-slate-900">£{pricingBreakdown.netTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>VAT (20%):</span>
                      <span className="font-bold text-slate-900">£{pricingBreakdown.vat.toFixed(2)}</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-slate-200 pt-3">
                      <div>
                        <span className="text-sm font-black text-slate-900 block">Total Payable:</span>
                        <span className="text-[10px] text-slate-500 font-medium">Fixed price • No hidden surcharges</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-[#0284C7]">
                          £{pricingBreakdown.grossTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-sm font-extrabold shadow-lg shadow-sky-600/30 transition-all transform active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Validating & Submitting...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm Quote & Dispatch</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  {/* Urgent Assistance Box */}
                  <div className="rounded-2xl bg-sky-50/80 border border-sky-100 p-4 text-center space-y-1 text-xs">
                    <div className="font-bold text-sky-950 flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                      Need Urgent Collection in 60 Mins?
                    </div>
                    <p className="text-sky-800">
                      Speak directly with our 24/7 Coventry control room:
                    </p>
                    <a
                      href="tel:02475122465"
                      className="inline-block font-extrabold text-[#0284C7] text-sm hover:underline mt-1"
                    >
                      024 7512 2465
                    </a>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-slate-900 text-white rounded-3xl p-5 text-xs space-y-3">
                <div className="font-bold uppercase tracking-wider text-sky-400 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  The Radical Difference
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Single driver start to finish — never co-loaded or subcontracted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Driver name & direct mobile number provided before collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Comprehensive Goods in Transit & Public Liability insurance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}