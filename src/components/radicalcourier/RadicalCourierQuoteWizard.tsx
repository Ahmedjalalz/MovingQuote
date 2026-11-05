import { useState, useMemo } from "react";
import {
  Truck,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Zap,
  GraduationCap,
  ArrowRight,
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
    idealFor: "Envelopes, urgent documents, cartons & 1 small pallet",
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
    idealFor: "Up to 2 pallets, automotive parts & machinery spares",
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
    idealFor: "3 standard pallets, commercial freight & bulky items",
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
    idealFor: "Up to 4 pallets, 4m lengths/pipes & high-cube cargo",
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
    idealFor: "Up to 6 pallets, heavy pallet truck freight & student moves",
  },
];

export type DeliveryType = "asap" | "planned" | "student";

function estimateUkDistance(from: string, to: string): number {
  if (!from || !to) return 35;
  const f = from.toLowerCase();
  const t = to.toLowerCase();

  if (
    (f.includes("coventry") && t.includes("coventry")) ||
    (f.includes("cv") && t.includes("cv"))
  ) {
    return 12;
  }

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

  // Delivery Urgency
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(initialDeliveryType);
  const [scheduledDateTime, setScheduledDateTime] = useState<string>("");

  // Route Details
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupBuilding, setPickupBuilding] = useState("");
  const [pickupContactName, setPickupContactName] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryBuilding, setDeliveryBuilding] = useState("");
  const [deliveryContactName, setDeliveryContactName] = useState("");
  const [deliveryContactPhone, setDeliveryContactPhone] = useState("");

  // Cargo Information
  const [palletCount, setPalletCount] = useState("0");
  const [cargoWeightKg, setCargoWeightKg] = useState("");
  const [cargoDescription, setCargoDescription] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isAccountHolder, setIsAccountHolder] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pricing Calculation
  const pricingBreakdown = useMemo(() => {
    const miles = estimateUkDistance(pickupLocation, deliveryLocation);
    const mileageCost = miles * selectedVan.baseRatePerMile;
    const baseVehiclePrice = Math.max(selectedVan.minCharge, mileageCost);

    let multiplier = 1.0;
    if (deliveryType === "asap") multiplier = 1.15; // 15% urgent priority dispatch
    if (deliveryType === "student") multiplier = 0.95; // 5% student concession

    const subtotal = baseVehiclePrice * multiplier;
    const accountDiscount = isAccountHolder ? subtotal * 0.1 : 0;
    const netTotal = subtotal - accountDiscount;
    const vat = netTotal * 0.2;
    const grossTotal = netTotal + vat;

    return {
      miles,
      mileageRate: selectedVan.baseRatePerMile,
      baseVehiclePrice,
      accountDiscount,
      netTotal,
      vat,
      grossTotal,
    };
  }, [pickupLocation, deliveryLocation, selectedVan, deliveryType, isAccountHolder]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!pickupLocation.trim()) errs.pickupLocation = "Pickup town or postcode required";
    if (!pickupContactName.trim()) errs.pickupContactName = "Contact name required";
    if (!pickupContactPhone.trim()) errs.pickupContactPhone = "Contact phone required";

    if (!deliveryLocation.trim()) errs.deliveryLocation = "Delivery town or postcode required";
    if (!deliveryContactName.trim()) errs.deliveryContactName = "Recipient name required";
    if (!deliveryContactPhone.trim()) errs.deliveryContactPhone = "Recipient phone required";

    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      errs.clientEmail = "Valid email required for quote confirmation";
    }

    if (deliveryType === "planned" && !scheduledDateTime) {
      errs.scheduledDateTime = "Please select a date and time";
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
    }, 500);
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      {bookingConfirmed ? (
        /* Confirmation Receipt */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">
              Quotation Confirmed
            </h2>
            <p className="text-sm text-slate-600">
              Reference number: <strong className="text-[#0284C7] font-mono text-base">{bookingReference}</strong>
            </p>
          </div>

          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/80 rounded-xl p-6 text-left text-sm space-y-3">
            <div className="flex justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-slate-500">Vehicle</span>
              <strong className="text-slate-900">{selectedVan.name}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-slate-500">Service</span>
              <strong className="text-slate-900 uppercase text-xs tracking-wider">
                {deliveryType === "asap" ? "Urgent Same-Day" : deliveryType === "student" ? "Student Move" : "Scheduled"}
              </strong>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-slate-500">Route</span>
              <span className="text-slate-800 font-medium truncate max-w-[220px]">
                {pickupLocation} → {deliveryLocation}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-slate-900">Estimated Total:</span>
              <span className="text-2xl font-black text-[#0284C7]">
                £{pricingBreakdown.grossTotal.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-slate-500 text-right">
              Includes 20% VAT (approx {pricingBreakdown.miles} road miles)
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:02475122465"
              className="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dispatch: 024 7512 2465</span>
            </a>

            <button
              onClick={() => {
                setBookingConfirmed(false);
                setBookingReference("");
              }}
              className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
            >
              New Calculation
            </button>
          </div>
        </div>
      ) : (
        /* Quotation Form */
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Courier Quotation Calculator
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Instant fixed pricing based on official vehicle mileage rates. No account required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Columns: Form Steps */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Vehicle Size Selection */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">1. Select Vehicle Size</h2>
                  <span className="text-xs text-slate-500">Pick by weight &amp; pallets</span>
                </div>

                <div className="space-y-2.5">
                  {RADICAL_VANS.map((van) => {
                    const isSelected = selectedVanId === van.id;
                    return (
                      <div
                        key={van.id}
                        onClick={() => setSelectedVanId(van.id)}
                        className={cn(
                          "cursor-pointer rounded-xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm",
                          isSelected
                            ? "border-[#0284C7] bg-sky-50/40 ring-1 ring-[#0284C7]"
                            : "border-slate-200/80 hover:border-slate-300"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="vehicle"
                            checked={isSelected}
                            onChange={() => setSelectedVanId(van.id)}
                            className="w-4 h-4 text-[#0284C7]"
                          />
                          <div>
                            <span className="font-bold text-slate-900">{van.name}</span>
                            <span className="text-slate-500 block text-xs mt-0.5">{van.idealFor}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-medium text-slate-600 shrink-0 self-end sm:self-center">
                          <span className="font-mono">{van.length} × {van.width}</span>
                          <span className="font-semibold text-slate-800">{van.payload}</span>
                          <span className="text-[#0284C7] font-semibold bg-sky-100/70 px-2.5 py-1 rounded-md">
                            {van.pallets} Pallet{van.pallets > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Delivery Urgency */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  2. Delivery Type
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    onClick={() => setDeliveryType("asap")}
                    className={cn(
                      "cursor-pointer rounded-xl border p-4 transition-all text-sm space-y-1.5",
                      deliveryType === "asap"
                        ? "border-[#0284C7] bg-sky-50/40 ring-1 ring-[#0284C7]"
                        : "border-slate-200/80 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>ASAP Same-Day</span>
                    </div>
                    <span className="text-xs text-slate-500 block">
                      Collected within 60 mins
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryType("planned")}
                    className={cn(
                      "cursor-pointer rounded-xl border p-4 transition-all text-sm space-y-1.5",
                      deliveryType === "planned"
                        ? "border-[#0284C7] bg-sky-50/40 ring-1 ring-[#0284C7]"
                        : "border-slate-200/80 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <span>Specific Date/Time</span>
                    </div>
                    <span className="text-xs text-slate-500 block">
                      Scheduled collection window
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryType("student")}
                    className={cn(
                      "cursor-pointer rounded-xl border p-4 transition-all text-sm space-y-1.5",
                      deliveryType === "student"
                        ? "border-[#0284C7] bg-sky-50/40 ring-1 ring-[#0284C7]"
                        : "border-slate-200/80 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>Student Move</span>
                    </div>
                    <span className="text-xs text-slate-500 block">
                      Move person + belongings
                    </span>
                  </label>
                </div>

                {deliveryType === "planned" && (
                  <div className="pt-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Collection Date &amp; Time
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="w-full sm:w-72 rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    />
                    {errors.scheduledDateTime && (
                      <p className="text-red-500 mt-1 text-xs">{errors.scheduledDateTime}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Route Details */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  3. Collection &amp; Delivery Locations
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Collection */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Collection (Point A)
                    </div>
                    <RadicalLocationField
                      label="Town or Postcode"
                      placeholder="e.g. Coventry CV1"
                      value={pickupLocation}
                      onChange={setPickupLocation}
                      error={errors.pickupLocation}
                      required
                    />
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Building / Address</label>
                      <input
                        type="text"
                        placeholder="e.g. Unit 4, Industrial Park"
                        value={pickupBuilding}
                        onChange={(e) => setPickupBuilding(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Contact Name *</label>
                      <input
                        type="text"
                        placeholder="Contact at collection"
                        value={pickupContactName}
                        onChange={(e) => setPickupContactName(e.target.value)}
                        className={cn("w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden", errors.pickupContactName && "border-red-500")}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Contact Phone *</label>
                      <input
                        type="tel"
                        placeholder="Mobile for driver"
                        value={pickupContactPhone}
                        onChange={(e) => setPickupContactPhone(e.target.value)}
                        className={cn("w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden", errors.pickupContactPhone && "border-red-500")}
                      />
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Delivery (Point B)
                    </div>
                    <RadicalLocationField
                      label="Town or Postcode"
                      placeholder="e.g. London, Birmingham"
                      value={deliveryLocation}
                      onChange={setDeliveryLocation}
                      error={errors.deliveryLocation}
                      required
                    />
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Building / Address</label>
                      <input
                        type="text"
                        placeholder="e.g. Reception, High Street"
                        value={deliveryBuilding}
                        onChange={(e) => setDeliveryBuilding(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Recipient Name *</label>
                      <input
                        type="text"
                        placeholder="Person receiving goods"
                        value={deliveryContactName}
                        onChange={(e) => setDeliveryContactName(e.target.value)}
                        className={cn("w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden", errors.deliveryContactName && "border-red-500")}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Recipient Phone *</label>
                      <input
                        type="tel"
                        placeholder="Delivery notification phone"
                        value={deliveryContactPhone}
                        onChange={(e) => setDeliveryContactPhone(e.target.value)}
                        className={cn("w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden", errors.deliveryContactPhone && "border-red-500")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Cargo Details */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  4. Cargo Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Pallet Count</label>
                    <select
                      value={palletCount}
                      onChange={(e) => setPalletCount(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
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
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Approx Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50, 200, 600"
                      value={cargoWeightKg}
                      onChange={(e) => setCargoWeightKg(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Package Description or Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 boxes machine parts, delivery to rear loading bay"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Confirmation Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.co.uk"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className={cn("w-full rounded-lg border border-slate-300 py-2.5 px-3.5 text-sm text-slate-900 focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] outline-hidden", errors.clientEmail && "border-red-500")}
                  />
                  {errors.clientEmail && (
                    <p className="text-red-500 mt-1 text-xs">{errors.clientEmail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Receipt Sidebar */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-base text-slate-900">Quotation Summary</h3>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <strong className="text-slate-900">{selectedVan.shortName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Service:</span>
                    <strong className="text-slate-900 uppercase text-xs tracking-wider">
                      {deliveryType === "asap" ? "Urgent Same-Day" : deliveryType === "student" ? "Student Move" : "Scheduled"}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Est. Distance:</span>
                    <strong className="text-slate-900">
                      {pickupLocation && deliveryLocation ? `${pricingBreakdown.miles} miles` : "—"}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Tariff Rate:</span>
                    <span className="font-mono text-slate-900">£{pricingBreakdown.mileageRate.toFixed(2)} / mi</span>
                  </div>

                  {isAccountHolder && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Account Discount:</span>
                      <span>-£{pricingBreakdown.accountDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAccountHolder}
                    onChange={(e) => setIsAccountHolder(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0284C7]"
                  />
                  <span className="text-xs text-slate-700">
                    Apply 30-day corporate account rate
                  </span>
                </label>

                <div className="border-t border-slate-200/80 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Net Amount:</span>
                    <span className="font-mono font-bold text-slate-900">£{pricingBreakdown.netTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>VAT (20%):</span>
                    <span className="font-mono font-bold text-slate-900">£{pricingBreakdown.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-slate-200/80 pt-3">
                    <span className="font-bold text-slate-900">Total Payable:</span>
                    <span className="text-2xl font-black text-[#0284C7]">
                      £{pricingBreakdown.grossTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-bold transition-colors"
                >
                  {isSubmitting ? "Generating..." : "Confirm & Dispatch"}
                </button>
              </div>

              {/* Direct Telephone Hotline */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 text-center space-y-1">
                <span className="text-slate-400 block text-xs">Direct 24/7 Dispatch Hotline:</span>
                <a
                  href="tel:02475122465"
                  className="text-lg font-bold text-white hover:text-sky-300 block"
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
