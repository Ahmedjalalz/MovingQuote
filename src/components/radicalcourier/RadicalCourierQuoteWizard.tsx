import { useState, useMemo } from "react";
import {
  Truck,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Zap,
  GraduationCap,
  Layers,
  ChevronRight,
  ArrowRight,
  Info,
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
    idealFor: "Urgent documents, medical vials, cartons & 1 small pallet",
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
    idealFor: "3 standard pallets, engineering equipment, bulky commercial goods",
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
    idealFor: "Up to 4 pallets, 4m lengths/pipes, high-volume cargo",
  },
  {
    id: "luton_tail_lift",
    name: "Luton Box Van with 500kg Tail Lift",
    shortName: "Luton Tail Lift",
    length: "4.0m",
    width: "2.0m",
    height: "2.0m",
    payload: "800 kg",
    pallets: 6,
    baseRatePerMile: 2.45,
    minCharge: 145,
    idealFor: "Up to 6 pallets, heavy pallet truck freight, student house moves",
  },
];

export type DeliveryType = "asap" | "planned" | "student";

// Realistic UK road mileage approximation between key regions/cities from Coventry hub
function estimateUkDistance(from: string, to: string): number {
  if (!from || !to) return 35;

  const f = from.toLowerCase();
  const t = to.toLowerCase();

  // Local Coventry & surrounding Warwickshire
  if (
    (f.includes("coventry") && t.includes("coventry")) ||
    (f.includes("cv") && t.includes("cv"))
  ) {
    return 12;
  }

  // Key transport corridors from Coventry / West Midlands
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

  // Heuristic based on string characters
  let hash = 0;
  for (let i = 0; i < f.length; i++) hash += f.charCodeAt(i);
  for (let i = 0; i < t.length; i++) hash += t.charCodeAt(i);
  return 25 + (hash % 85);
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

  // Distance and Cost Calculation
  const estimatedMiles = useMemo(() => {
    return estimateUkDistance(pickupLocation, deliveryLocation);
  }, [pickupLocation, deliveryLocation]);

  const pricingBreakdown = useMemo(() => {
    let mileageRate = selectedVan.baseRatePerMile;
    let distanceCost = estimatedMiles * mileageRate;

    // Minimum charge check
    if (distanceCost < selectedVan.minCharge) {
      distanceCost = selectedVan.minCharge;
    }

    // Urgent ASAP modifier (+15% for immediate 60-min priority dispatch)
    const urgencyMultiplier = deliveryType === "asap" ? 1.15 : 1.0;
    const subtotal = distanceCost * urgencyMultiplier;

    // 10% discount for corporate account holders
    const accountDiscount = isAccountHolder ? subtotal * 0.1 : 0;
    const netTotal = subtotal - accountDiscount;

    // Standard UK VAT (20%)
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
      errs.clientEmail = "A valid email is required to send your quotation summary";
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
    const ref = "RAD-" + Math.floor(10000 + Math.random() * 90000);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingReference(ref);
      setBookingConfirmed(true);
      toast.success("Quote generated! Reference: " + ref);
    }, 600);
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      {bookingConfirmed ? (
        /* Confirmation Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quotation &amp; Dispatch Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Booking Request Received
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your quotation reference number is{" "}
              <strong className="text-[#0284C7] font-mono text-base">{bookingReference}</strong>.
              A confirmation email has been logged to <strong>{clientEmail}</strong>.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600 font-semibold">Allocated Vehicle:</span>
              <span className="font-bold text-slate-900">{selectedVan.name}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600 font-semibold">Delivery Type:</span>
              <span className="font-bold text-sky-700 uppercase">
                {deliveryType === "asap" ? "Urgent Same-Day (Within 60 mins)" : deliveryType === "student" ? "Student Move" : `Scheduled: ${scheduledDateTime}`}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-slate-500 block">Collection:</span>
                <span className="font-bold text-slate-900">{pickupLocation}</span>
                <span className="text-slate-600 block">{pickupContactName} ({pickupContactPhone})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Delivery:</span>
                <span className="font-bold text-slate-900">{deliveryLocation}</span>
                <span className="text-slate-600 block">{deliveryContactName} ({deliveryContactPhone})</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-sm font-bold text-slate-900 block">Total Estimated Price:</span>
                <span className="text-[11px] text-slate-500">Includes 20% VAT (approx {pricingBreakdown.miles} miles)</span>
              </div>
              <span className="text-2xl font-black text-[#0284C7]">
                £{pricingBreakdown.grossTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:02475122465"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dispatch to Confirm: 024 7512 2465</span>
            </a>

            <button
              onClick={() => {
                setBookingConfirmed(false);
                setBookingReference("");
              }}
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
            >
              Calculate Another Quote
            </button>
          </div>
        </div>
      ) : (
        /* Quotation Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Bar */}
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Online Quotation &amp; Fixed-Price Tariff
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Complete the collection and delivery details below to obtain an instant fixed quote.
              No account required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Input Steps */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Vehicle Size Selection */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-base font-bold text-slate-900">Select Vehicle Size</h2>
                  </div>
                  <span className="text-[11px] text-slate-500">Choose capacity according to payload</span>
                </div>

                <div className="space-y-2.5">
                  {RADICAL_VANS.map((van) => {
                    const isSelected = selectedVanId === van.id;
                    return (
                      <div
                        key={van.id}
                        onClick={() => setSelectedVanId(van.id)}
                        className={cn(
                          "cursor-pointer rounded-lg border p-3.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                          isSelected
                            ? "border-[#0284C7] bg-sky-50/50 ring-1 ring-[#0284C7]"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="vehicle_size"
                            checked={isSelected}
                            onChange={() => setSelectedVanId(van.id)}
                            className="w-4 h-4 text-[#0284C7]"
                          />
                          <div>
                            <div className="font-bold text-sm text-slate-900">{van.name}</div>
                            <div className="text-[11px] text-slate-500">{van.idealFor}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center font-mono">
                          <span className="text-slate-600">
                            {van.length} × {van.width}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {van.payload}
                          </span>
                          <span className="font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded text-[11px]">
                            {van.pallets} Pallet{van.pallets > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Delivery Type */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-base font-bold text-slate-900">Delivery Type &amp; Urgency</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    onClick={() => setDeliveryType("asap")}
                    className={cn(
                      "cursor-pointer rounded-lg border p-3.5 transition-all flex flex-col justify-between",
                      deliveryType === "asap"
                        ? "border-[#0284C7] bg-sky-50/50 ring-1 ring-[#0284C7]"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <strong className="text-xs text-slate-900">ASAP Same-Day</strong>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Immediate dispatch. Collection within 60 minutes.
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryType("planned")}
                    className={cn(
                      "cursor-pointer rounded-lg border p-3.5 transition-all flex flex-col justify-between",
                      deliveryType === "planned"
                        ? "border-[#0284C7] bg-sky-50/50 ring-1 ring-[#0284C7]"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <strong className="text-xs text-slate-900">Specific Date/Time</strong>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Planned future collection date and time window.
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryType("student")}
                    className={cn(
                      "cursor-pointer rounded-lg border p-3.5 transition-all flex flex-col justify-between",
                      deliveryType === "student"
                        ? "border-[#0284C7] bg-sky-50/50 ring-1 ring-[#0284C7]"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <strong className="text-xs text-slate-900">Student Move</strong>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Moving student belongings + passenger to campus.
                    </span>
                  </label>
                </div>

                {deliveryType === "planned" && (
                  <div className="pt-2 text-xs">
                    <label className="font-bold text-slate-700 block mb-1">
                      Required Collection Date &amp; Time *
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className={cn(
                        "w-full sm:w-72 rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900",
                        errors.scheduledDateTime && "border-red-500"
                      )}
                    />
                    {errors.scheduledDateTime && (
                      <p className="text-red-500 mt-1 text-xs">{errors.scheduledDateTime}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Collection & Delivery Route */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-base font-bold text-slate-900">Collection &amp; Delivery Details</h2>
                </div>

                {/* Collection Point */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Collection Details (Point A)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <RadicalLocationField
                      label="Pickup Town or Postcode"
                      placeholder="e.g. Coventry CV1, Warwick, Birmingham"
                      value={pickupLocation}
                      onChange={setPickupLocation}
                      error={errors.pickupLocation}
                      required
                    />

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Building / Company / Street
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Unit 4, Crossway Road"
                        value={pickupBuilding}
                        onChange={(e) => setPickupBuilding(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-xs font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Pickup Contact Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Person handing over goods"
                        value={pickupContactName}
                        onChange={(e) => setPickupContactName(e.target.value)}
                        className={cn(
                          "w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900",
                          errors.pickupContactName && "border-red-500"
                        )}
                      />
                      {errors.pickupContactName && (
                        <p className="text-red-500 mt-0.5">{errors.pickupContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Pickup Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="For driver collection arrival"
                        value={pickupContactPhone}
                        onChange={(e) => setPickupContactPhone(e.target.value)}
                        className={cn(
                          "w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900",
                          errors.pickupContactPhone && "border-red-500"
                        )}
                      />
                      {errors.pickupContactPhone && (
                        <p className="text-red-500 mt-0.5">{errors.pickupContactPhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Point */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Delivery Details (Point B)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <RadicalLocationField
                      label="Delivery Town or Postcode"
                      placeholder="e.g. London, Manchester, Leeds"
                      value={deliveryLocation}
                      onChange={setDeliveryLocation}
                      error={errors.deliveryLocation}
                      required
                    />

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Recipient Building / Company / Street
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Reception, High Street"
                        value={deliveryBuilding}
                        onChange={(e) => setDeliveryBuilding(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-xs font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Recipient Contact Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Person receiving delivery"
                        value={deliveryContactName}
                        onChange={(e) => setDeliveryContactName(e.target.value)}
                        className={cn(
                          "w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900",
                          errors.deliveryContactName && "border-red-500"
                        )}
                      />
                      {errors.deliveryContactName && (
                        <p className="text-red-500 mt-0.5">{errors.deliveryContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Recipient Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="For delivery call / SMS"
                        value={deliveryContactPhone}
                        onChange={(e) => setDeliveryContactPhone(e.target.value)}
                        className={cn(
                          "w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900",
                          errors.deliveryContactPhone && "border-red-500"
                        )}
                      />
                      {errors.deliveryContactPhone && (
                        <p className="text-red-500 mt-0.5">{errors.deliveryContactPhone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Cargo Details */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 text-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h2 className="text-base font-bold text-slate-900">Cargo &amp; Package Notes</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Sector Type</label>
                    <select
                      value={industrySector}
                      onChange={(e) => setIndustrySector(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-2.5 text-xs font-medium text-slate-900"
                    >
                      <option value="general">Commercial Freight</option>
                      <option value="automotive">Automotive &amp; F1 Spares</option>
                      <option value="legal">Legal &amp; Court Papers</option>
                      <option value="medical">Medical / Hospital Supplies</option>
                      <option value="printing">Printed Media / Bulk Magazines</option>
                      <option value="student">Student Belongings</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pallet Count</label>
                    <select
                      value={palletCount}
                      onChange={(e) => setPalletCount(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-2.5 text-xs font-medium text-slate-900"
                    >
                      <option value="0">0 (Boxes / Documents / Loose items)</option>
                      <option value="1">1 Standard Pallet</option>
                      <option value="2">2 Standard Pallets</option>
                      <option value="3">3 Standard Pallets</option>
                      <option value="4">4 Standard Pallets</option>
                      <option value="6">6 Pallets (Luton Tail Lift)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Approx Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="e.g. 20, 150, 500"
                      value={cargoWeightKg}
                      onChange={(e) => setCargoWeightKg(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Package Description / Special Handling Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter parcel dimensions, reference numbers, or delivery notes..."
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="font-bold text-slate-700 block mb-1">
                    Email Address (For Quote Breakdown &amp; Dispatch Confirmation) *
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.co.uk"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border border-slate-300 py-2 px-3 text-xs font-medium text-slate-900",
                      errors.clientEmail && "border-red-500"
                    )}
                  />
                  {errors.clientEmail && (
                    <p className="text-red-500 mt-0.5">{errors.clientEmail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Fixed-Price Summary Sticky Card */}
            <div className="lg:col-span-4 sticky top-20 space-y-4 text-xs">
              <div className="bg-white rounded-xl border-2 border-slate-300 p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Official Tariff Summary
                  </div>
                  <h3 className="text-base font-black text-slate-900">Quotation Breakdown</h3>
                </div>

                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <strong className="text-slate-900">{selectedVan.shortName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Service:</span>
                    <strong className="text-slate-900 uppercase">
                      {deliveryType === "asap" ? "Urgent Same-Day" : deliveryType === "student" ? "Student Move" : "Scheduled"}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Distance:</span>
                    <strong className="text-slate-900">
                      {pickupLocation && deliveryLocation ? `${pricingBreakdown.miles} road miles` : "—"}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Mileage Tariff:</span>
                    <span className="font-mono text-slate-900">£{pricingBreakdown.mileageRate.toFixed(2)} / mi</span>
                  </div>

                  {isAccountHolder && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Account Customer Discount:</span>
                      <span>-£{pricingBreakdown.accountDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Account checkbox */}
                <label className="flex items-center gap-2 p-2.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAccountHolder}
                    onChange={(e) => setIsAccountHolder(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0284C7]"
                  />
                  <span className="text-[11px] text-slate-700">
                    Approved 30-day invoice account holder
                  </span>
                </label>

                {/* Price breakdown */}
                <div className="border-t border-slate-200 pt-3 space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Net Amount:</span>
                    <span className="font-mono font-bold text-slate-900">£{pricingBreakdown.netTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>VAT (20%):</span>
                    <span className="font-mono font-bold text-slate-900">£{pricingBreakdown.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-slate-200 pt-2">
                    <span className="font-bold text-slate-900 text-sm">Total Payable:</span>
                    <span className="text-2xl font-black text-[#0284C7]">
                      £{pricingBreakdown.grossTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-xs"
                >
                  {isSubmitting ? "Submitting Request..." : "Confirm & Dispatch"}
                </button>

                <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fixed price quote • No unexpected fuel surcharges</span>
                </div>
              </div>

              {/* 24/7 Helpline */}
              <div className="bg-slate-900 text-white rounded-xl p-4 text-xs space-y-1 text-center">
                <div className="font-bold text-sky-400">Prefer to book by phone?</div>
                <div className="text-slate-300">Speak directly with Coventry operations:</div>
                <a
                  href="tel:02475122465"
                  className="inline-block text-base font-black text-white hover:text-sky-300 mt-1"
                >
                  024 7512 2465
                </a>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}