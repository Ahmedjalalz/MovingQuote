import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Loader2,
  ShieldCheck,
  Sparkles,
  Truck,
  Caravan,
  Box,
  Anchor,
  Wrench,
  CheckCircle2,
  Phone,
  Mail,
  CalendarCheck,
  Lock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export type StorageCategory =
  | "caravan"
  | "motorhome"
  | "container"
  | "boat"
  | "trailer"
  | "servicing_only";

interface StorageCategoryOption {
  id: StorageCategory;
  title: string;
  badge?: string;
  rateDesc: string;
  basePrice: number;
  icon: typeof Caravan;
  desc: string;
}

const STORAGE_CATEGORIES: StorageCategoryOption[] = [
  {
    id: "caravan",
    title: "Touring Caravan",
    badge: "Popular",
    rateDesc: "£50 / mo",
    basePrice: 50,
    icon: Caravan,
    desc: "Single or twin-axle touring caravans (3m × 8m+ pitch)",
  },
  {
    id: "motorhome",
    title: "Motorhome / RV",
    badge: "Up to 45ft",
    rateDesc: "£55 / mo",
    basePrice: 55,
    icon: Truck,
    desc: "Coachbuilt, A-class, campervans & large motorhomes",
  },
  {
    id: "container",
    title: "Shipping Container",
    badge: "20ft Steel",
    rateDesc: "£65 / mo",
    basePrice: 65,
    icon: Box,
    desc: "Lockable clean dry steel storage container",
  },
  {
    id: "boat",
    title: "Boat / Marine Craft",
    rateDesc: "£50 / mo",
    basePrice: 50,
    icon: Anchor,
    desc: "Speedboats, RIBs & jet skis on trailers",
  },
  {
    id: "trailer",
    title: "Commercial Trailer",
    rateDesc: "£50 / mo",
    basePrice: 50,
    icon: Truck,
    desc: "Plant, flatbeds, horseboxes & trade machinery",
  },
  {
    id: "servicing_only",
    title: "NCC Service / Valet",
    badge: "Approved",
    rateDesc: "Fixed Rate",
    basePrice: 0,
    icon: Wrench,
    desc: "Habitation check, chassis service or full valet clean",
  },
];

const PITCH_SURFACES = [
  { id: "hardstanding", name: "Hardstanding (Tarmac / Stone)", desc: "All-weather, clean, demarcated pitch" },
  { id: "indoor", name: "Indoor Barn Storage", desc: "Enclosed secure bay (subject to availability)" },
  { id: "grass", name: "Seasonal Grass Pitch", desc: "Summer season outdoor grass parking" },
];

const STORAGE_DURATIONS = [
  { id: "ongoing", name: "Annual / Ongoing (12+ Months)", desc: "Best value, standing order after 3 months" },
  { id: "6months", name: "6 Months", desc: "Semi-annual storage" },
  { id: "3months", name: "3 Months (Standard Initial Term)", desc: "Standard minimum initial hire period" },
  { id: "temporary", name: "Short Term / Holiday Hold", desc: "Subject to seasonal availability" },
];

const VEHICLE_LENGTHS = [
  "Up to 6.0 metres (~20 ft)",
  "6.1m to 7.0 metres (~23 ft)",
  "7.1m to 8.0 metres (~26 ft)",
  "8.1m to 9.0 metres (~30 ft)",
  "Over 9.0 metres / RV up to 45 ft",
];

export interface RavensOakQuoteWizardProps {
  className?: string;
  initialCategory?: StorageCategory;
  onSuccess?: () => void;
}

export function RavensOakQuoteWizard({
  className,
  initialCategory = "caravan",
  onSuccess,
}: RavensOakQuoteWizardProps) {
  const [category, setCategory] = useState<StorageCategory>(initialCategory);
  const [pitchSurface, setPitchSurface] = useState<string>("hardstanding");
  const [vehicleLength, setVehicleLength] = useState<string>("6.1m to 7.0 metres (~23 ft)");
  const [axles, setAxles] = useState<"single" | "twin">("single");
  const [makeModel, setMakeModel] = useState("");
  const [regOrCris, setRegOrCris] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [duration, setDuration] = useState<string>("ongoing");

  // Add-ons
  const [addOnWash, setAddOnWash] = useState(false);
  const [addOnPolish, setAddOnPolish] = useState(false);
  const [addOnService, setAddOnService] = useState(false);
  const [addOnCalorGas, setAddOnCalorGas] = useState(false);

  // Customer Contact
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "email" | "whatsapp">("phone");
  const [notes, setNotes] = useState("");
  const [agreedToIdPolicy, setAgreedToIdPolicy] = useState(false);

  // Form State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");

  const selectedCategoryObj = STORAGE_CATEGORIES.find((c) => c.id === category) || STORAGE_CATEGORIES[0];
  const monthlyBase = selectedCategoryObj.basePrice;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      newErrors.phone = "Please enter a valid UK telephone number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!startDate && category !== "servicing_only") {
      newErrors.startDate = "Please select your required start date";
    }

    if (!agreedToIdPolicy) {
      newErrors.agreedToIdPolicy =
        "Please acknowledge the site appointment and ID protocol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please complete the required fields highlighted below.");
      return;
    }

    setSubmitting(true);

    try {
      const payloadServices: string[] = [
        `Ravens Oak: ${selectedCategoryObj.title} (${selectedCategoryObj.rateDesc})`,
      ];
      if (addOnWash) payloadServices.push("Auto-Glym Valet Wash (£30)");
      if (addOnPolish) payloadServices.push("Auto-Glym Resin Wax Polish");
      if (addOnService) payloadServices.push(`NCC Servicing (${axles === "twin" ? "Twin Axle" : "Single Axle"})`);
      if (addOnCalorGas) payloadServices.push("Calor Gas Refill Required");

      const compiledNotes = [
        `Category: ${selectedCategoryObj.title}`,
        `Pitch: ${pitchSurface}`,
        `Length: ${vehicleLength}`,
        `Axles: ${axles}`,
        `Make/Model: ${makeModel || "Not specified"}`,
        `Reg/CRIS: ${regOrCris || "Not provided"}`,
        `Duration: ${duration}`,
        `Postcode: ${postcode}`,
        notes ? `Customer Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      const result = await submitQuoteEnquiry({
        data: {
          service: payloadServices,
          moveSize: `${vehicleLength} (${axles} axle)`,
          pickup: postcode ? `Rushden / Customer: ${postcode}` : "Rushden Site (NN10 0SQ)",
          dropoff: "Ravens Oak Storage, 315 Bedford Rd, Rushden NN10 0SQ",
          preferredDate: startDate ? format(startDate, "PPP") : "Flexible",
          name: fullName,
          phone,
          email,
          preferredContact,
          notes: compiledNotes,
          isWinzQuote: false,
        },
      });

      if (result.success) {
        const randomRef = `RO-${Math.floor(10000 + Math.random() * 90000)}`;
        setQuoteReference(randomRef);
        setSubmitted(true);
        toast.success("Quote enquiry sent! The Ravens Oak team will contact you shortly.");
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || "Failed to submit request. Please call us directly on 01933 712782.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please call 01933 712782.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setMakeModel("");
    setRegOrCris("");
    setNotes("");
    setErrors({});
  };

  // SUCCESS CONFIRMATION VIEW
  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-emerald-200 bg-white p-6 sm:p-10 shadow-sm text-slate-800 animate-in fade-in zoom-in-95 duration-300",
          className
        )}
      >
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="size-14 rounded-full bg-emerald-100 text-[#006837] flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#006837] border border-emerald-200">
            <span>Enquiry Reference:</span>
            <span className="font-mono">{quoteReference}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#006837] tracking-tight">
            Quote Enquiry Received!
          </h3>

          <p className="text-sm leading-relaxed text-slate-600">
            Thank you, <strong className="text-slate-900">{fullName}</strong>. We've logged your
            pitch enquiry for <strong className="text-[#006837]">{selectedCategoryObj.title}</strong>.
            Our family team will review availability and be in touch promptly.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-sm space-y-3">
          <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider">
            <ShieldCheck className="size-4 text-[#509D25]" />
            <span>Enquiry Summary</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div>
              <span className="text-slate-500">Storage Option:</span>
              <p className="font-bold text-slate-900 mt-0.5">{selectedCategoryObj.title}</p>
            </div>
            <div>
              <span className="text-slate-500">Estimated Rate:</span>
              <p className="font-bold text-[#006837] mt-0.5">
                {monthlyBase > 0 ? `£${monthlyBase} / month` : "Quote on Inspection"}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Target Move-in Date:</span>
              <p className="font-bold text-slate-900 mt-0.5">
                {startDate ? format(startDate, "PPP") : "Immediate / Flexible"}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Pitch Surface:</span>
              <p className="font-bold text-slate-900 mt-0.5 capitalize">{pitchSurface}</p>
            </div>
            {makeModel && (
              <div>
                <span className="text-slate-500">Vehicle:</span>
                <p className="font-bold text-slate-900 mt-0.5">{makeModel}</p>
              </div>
            )}
            <div>
              <span className="text-slate-500">Contact Telephone:</span>
              <p className="font-bold text-slate-900 mt-0.5">{phone}</p>
            </div>
          </div>
        </div>

        {/* Next Steps Advisory */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-slate-700 space-y-1.5">
          <p className="font-bold text-[#006837] flex items-center gap-1.5">
            <Lock className="size-3.5 text-[#509D25]" />
            <span>Site Visit Appointment Protocol</span>
          </p>
          <p className="leading-relaxed text-[11px] text-slate-600">
            We will contact you via <strong>{preferredContact}</strong> within 24 hours to confirm
            pitch bay allocation. Please bring a <strong>current driving licence</strong> and a{" "}
            <strong>matching utility bill</strong> when visiting for your appointment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:01933712782"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#006837] hover:bg-[#14532D] text-white text-sm font-bold shadow-xs transition-colors"
          >
            <Phone className="size-4 text-[#8CC63F]" />
            <span>Call Site Office: 01933 712 782</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="size-4 text-slate-600" />
            <span>Submit Another Enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE INTERACTIVE FORM
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 md:p-10 shadow-xs text-slate-900 space-y-8",
        className
      )}
    >
      {/* Step 1: Storage Category Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 flex items-center gap-2">
            <span className="size-5 rounded-full bg-[#006837] text-white flex items-center justify-center text-[11px] font-bold">
              1
            </span>
            <span>Select Storage Type</span>
          </label>
          <span className="text-xs text-slate-400 font-medium">3m × 8m+ standard pitches</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {STORAGE_CATEGORIES.map((item) => {
            const Icon = item.icon;
            const isSelected = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "border-[#006837] bg-emerald-50/60 shadow-xs ring-2 ring-[#006837]/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`size-8 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "bg-[#006837] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#006837] text-white"
                          : "bg-emerald-100 text-[#006837]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs font-bold text-[#006837]">{item.rateDesc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Storage Specifications & Pitch Surface */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 flex items-center gap-2">
          <span className="size-5 rounded-full bg-[#006837] text-white flex items-center justify-center text-[11px] font-bold">
            2
          </span>
          <span>Pitch &amp; Vehicle Specifications</span>
        </label>

        {category !== "servicing_only" && category !== "container" && (
          <div className="space-y-1.5">
            <span className="block text-xs font-medium text-slate-500">Surface Preference</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PITCH_SURFACES.map((surf) => (
                <button
                  key={surf.id}
                  type="button"
                  onClick={() => setPitchSurface(surf.id)}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    pitchSurface === surf.id
                      ? "border-[#006837] bg-emerald-50/70 text-[#006837] font-bold"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>{surf.name}</span>
                    {pitchSurface === surf.id && <Check className="size-3 text-[#006837]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">{surf.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Approximate Vehicle Length
            </label>
            <select
              value={vehicleLength}
              onChange={(e) => setVehicleLength(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10 cursor-pointer"
            >
              {VEHICLE_LENGTHS.map((len) => (
                <option key={len} value={len}>
                  {len}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Chassis / Axle Setup
            </label>
            <div className="grid grid-cols-2 gap-2 h-11">
              <button
                type="button"
                onClick={() => setAxles("single")}
                className={`rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                  axles === "single"
                    ? "border-[#006837] bg-emerald-50 text-[#006837]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Single Axle
              </button>
              <button
                type="button"
                onClick={() => setAxles("twin")}
                className={`rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                  axles === "twin"
                    ? "border-[#006837] bg-emerald-50 text-[#006837]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Twin Axle
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Make &amp; Model <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Swift Challenger, Bailey Unicorn"
              value={makeModel}
              onChange={(e) => setMakeModel(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              CRIS No. / Reg <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="CRIS or vehicle registration"
              value={regOrCris}
              onChange={(e) => setRegOrCris(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Date & Storage Duration */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 flex items-center gap-2">
          <span className="size-5 rounded-full bg-[#006837] text-white flex items-center justify-center text-[11px] font-bold">
            3
          </span>
          <span>Dates &amp; Duration</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Target Move-in / Start Date <span className="text-red-500">*</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full h-11 px-3.5 rounded-xl border text-left text-xs flex items-center justify-between transition-colors cursor-pointer",
                    startDate
                      ? "border-slate-300 text-slate-900 bg-white"
                      : "border-slate-200 text-slate-400 bg-white hover:bg-slate-50",
                    errors.startDate && "border-red-400 bg-red-50/50"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-[#006837]" />
                    {startDate ? format(startDate, "PPP") : "Select a start date"}
                  </span>
                  <ChevronDown className="size-4 text-slate-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Expected Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10 cursor-pointer"
            >
              {STORAGE_DURATIONS.map((dur) => (
                <option key={dur.id} value={dur.id}>
                  {dur.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step 4: Optional Add-ons */}
      <div className="space-y-3 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 flex items-center gap-2">
            <span className="size-5 rounded-full bg-[#006837] text-white flex items-center justify-center text-[11px] font-bold">
              4
            </span>
            <span>Optional On-Site Services</span>
          </label>
          <span className="text-[11px] text-slate-400">Optional</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <label className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/40 flex items-start gap-3 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOnWash}
              onChange={(e) => setAddOnWash(e.target.checked)}
              className="size-4 mt-0.5 rounded border-slate-300 text-[#006837] focus:ring-[#006837]"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900">Auto-Glym Valet Wash (+£30)</span>
              <p className="text-[11px] text-slate-500">Bodywork shampoo, roof wash &amp; tyre dressing</p>
            </div>
          </label>

          <label className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/40 flex items-start gap-3 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOnPolish}
              onChange={(e) => setAddOnPolish(e.target.checked)}
              className="size-4 mt-0.5 rounded border-slate-300 text-[#006837] focus:ring-[#006837]"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900">Super Resin Polish &amp; Wax</span>
              <p className="text-[11px] text-slate-500">Protective UV resin wax polish (£2 / linear ft)</p>
            </div>
          </label>

          <label className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/40 flex items-start gap-3 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOnService}
              onChange={(e) => setAddOnService(e.target.checked)}
              className="size-4 mt-0.5 rounded border-slate-300 text-[#006837] focus:ring-[#006837]"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900">NCC Annual Habitation Service</span>
              <p className="text-[11px] text-slate-500">Approved engineer check on-site (£230–£250 + VAT)</p>
            </div>
          </label>

          <label className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/40 flex items-start gap-3 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOnCalorGas}
              onChange={(e) => setAddOnCalorGas(e.target.checked)}
              className="size-4 mt-0.5 rounded border-slate-300 text-[#006837] focus:ring-[#006837]"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900">Calor Gas Cylinder Exchange</span>
              <p className="text-[11px] text-slate-500">Official stockist: Propane or Butane refills</p>
            </div>
          </label>
        </div>
      </div>

      {/* Step 5: Contact Details & ID Protocol */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 flex items-center gap-2">
          <span className="size-5 rounded-full bg-[#006837] text-white flex items-center justify-center text-[11px] font-bold">
            5
          </span>
          <span>Contact &amp; Verification Details</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. John Henderson"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              className={cn(
                "w-full h-11 px-3.5 rounded-xl border bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10",
                errors.fullName ? "border-red-400 bg-red-50/40" : "border-slate-200"
              )}
            />
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Contact Phone / Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 07921 784736"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              className={cn(
                "w-full h-11 px-3.5 rounded-xl border bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10",
                errors.phone ? "border-red-400 bg-red-50/40" : "border-slate-200"
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.co.uk"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={cn(
                "w-full h-11 px-3.5 rounded-xl border bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10",
                errors.email ? "border-red-400 bg-red-50/40" : "border-slate-200"
              )}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Home Postcode / Town
            </label>
            <input
              type="text"
              placeholder="e.g. NN10, Bedford, Northampton"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["phone", "email", "whatsapp"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPreferredContact(method)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  preferredContact === method
                    ? "border-[#006837] bg-emerald-50 text-[#006837] font-bold"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {method === "phone" ? "Phone Call" : method === "email" ? "Email" : "WhatsApp"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Questions or Special Requirements <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Practice paddock booking, dual axle van, battery booster bay requirements..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#006837] focus:ring-2 focus:ring-emerald-500/10"
          />
        </div>

        {/* Security Policy Checkbox */}
        <div
          className={cn(
            "p-3.5 rounded-xl border transition-colors",
            errors.agreedToIdPolicy
              ? "border-red-400 bg-red-50/50"
              : "border-emerald-200 bg-emerald-50/40"
          )}
        >
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToIdPolicy}
              onChange={(e) => {
                setAgreedToIdPolicy(e.target.checked);
                if (errors.agreedToIdPolicy) {
                  setErrors((prev) => ({ ...prev, agreedToIdPolicy: "" }));
                }
              }}
              className="size-4 mt-0.5 rounded border-slate-300 text-[#006837] focus:ring-[#006837]"
            />
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900">Security Appointment Protocol:</span>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                I understand site visits are strictly by appointment only and new customers must
                produce a current driving licence and matching utility bill upon initial viewing.
              </p>
            </div>
          </label>
          {errors.agreedToIdPolicy && (
            <p className="mt-2 text-[11px] text-red-600 font-bold">{errors.agreedToIdPolicy}</p>
          )}
        </div>
      </div>

      {/* Clean Estimate Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#006837] font-semibold uppercase tracking-wider">
              Selected Facility
            </span>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">{selectedCategoryObj.title}</h4>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500">Estimated Rate</span>
            <p className="text-lg sm:text-xl font-black text-[#006837]">
              {monthlyBase > 0 ? `£${monthlyBase}` : "Free Estimate"}{" "}
              <span className="text-xs font-normal text-slate-500">/ mo</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-200/60 text-[11px] text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px]">Access:</span>
            <span className="font-bold text-slate-800">24/7 Swipe Gate</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Card Deposit:</span>
            <span className="font-bold text-slate-800">£40 (Refundable)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Pitch Size:</span>
            <span className="font-bold text-slate-800">3m × 8m+ Bay</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Payment:</span>
            <span className="font-bold text-slate-800">Standing Order</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-2 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-13 sm:h-14 px-6 rounded-full bg-[#006837] hover:bg-[#14532D] text-white font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin text-[#8CC63F]" />
              <span>Checking Availability...</span>
            </>
          ) : (
            <>
              <CalendarCheck className="size-4 text-[#8CC63F]" />
              <span>Request Free Pitch Quote</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-400">
          100% Free &amp; Zero Obligation • We review every request personally
        </p>
      </div>
    </form>
  );
}
