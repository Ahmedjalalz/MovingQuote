import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  Clock,
  Loader2,
  Mail,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Building2,
  Layers,
  ChevronDown,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Roads2RoadsSelect,
  Roads2RoadsSelectContent,
  Roads2RoadsSelectItem,
  Roads2RoadsSelectTrigger,
  Roads2RoadsSelectValue,
} from "./Roads2RoadsSelect";
import { Roads2RoadsLocationField } from "./Roads2RoadsLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export type CourierMode = "sameday" | "pallets" | "dedicated" | "scheduled";

export const COURIER_MODES: Array<{
  id: CourierMode;
  label: string;
  badge?: string;
  icon: typeof Truck;
  description: string;
}> = [
  {
    id: "sameday",
    label: "Same-Day Urgent",
    badge: "Within 60 Mins",
    icon: Zap,
    description: "Time-critical packets, legal files, keys & urgent parts.",
  },
  {
    id: "pallets",
    label: "Pallets & Freight",
    badge: "Up to 1,200kg",
    icon: Package,
    description: "Standard/Euro pallets transported safely with tail lift.",
  },
  {
    id: "dedicated",
    label: "Dedicated Van",
    badge: "Direct Route",
    icon: Truck,
    description: "Exclusive vehicle & driver. Zero co-loading or hub delays.",
  },
  {
    id: "scheduled",
    label: "Route & Multi-Drop",
    badge: "B2B Logistics",
    icon: Layers,
    description: "Regular business contracts, timed deliveries & multi-stops.",
  },
];

export const CONSIGNMENT_TYPES: Record<CourierMode, string[]> = {
  sameday: [
    "Urgent Legal Documents / Passport / Keys",
    "Small Parcel / Medical Sample (Up to 10 kg)",
    "Medium Box / Computer / Tech Equipment (10 - 25 kg)",
    "Multiple Boxes / Urgent Parts (25 - 80 kg)",
    "Fragile / High-Value Sensitive Goods",
    "Single Bulky Item / Unboxed Machinery",
    "Emergency Production Line Spare Parts",
  ],
  pallets: [
    "Single Standard UK Pallet (120x100cm, up to 500kg)",
    "Single Euro Pallet (120x80cm, up to 500kg)",
    "Two Pallets (Up to 1,000kg total)",
    "Three to Four Pallets (Full Luton Load, up to 1,200kg)",
    "Oversized / Non-Standard Industrial Pallet",
    "Heavy Machinery / Crated Freight",
  ],
  dedicated: [
    "Small Van Full Load (Small packages & cartons, up to 500kg)",
    "Short Wheel Base (SWB) Dedicated Van (Up to 900kg)",
    "Long Wheel Base (LWB) Transit Van (Up to 1,200kg)",
    "Luton Box Van with 500kg Hydraulic Tail Lift (Full Load)",
    "Exhibition / Event Equipment Setup & Transport",
  ],
  scheduled: [
    "Daily / Weekly Scheduled Inter-Branch Shuttle",
    "Multi-Drop Route (London & Home Counties)",
    "Multi-Drop Route (UK Nationwide)",
    "Timed Retail / Hospital / Depot Delivery Window",
    "Regular B2B Business Courier Account",
  ],
};

export const FLEET_VEHICLES = [
  "Small Courier Van (Parcels, packets & small cartons up to 500kg)",
  "Short Wheel Base (SWB) Panel Van (Up to 900kg payload)",
  "Long Wheel Base (LWB) Transit Van (Up to 1,200kg payload / 3 pallets)",
  "Luton Box Van with 500kg Tail Lift (Heavy pallets & bulky cargo)",
  "Best Vehicle Recommended by Roads2Roads Coordinator",
] as const;

export const TIMEFRAMES = [
  "⚡ Urgent Collection ASAP (Driver dispatched within 60 mins)",
  "Today — Specified Morning / Afternoon Window",
  "Tonight / Overnight Direct Delivery",
  "Scheduled on Specific Future Date",
] as const;

type Errors = Partial<
  Record<
    "consignment" | "pickup" | "dropoff" | "date" | "phone" | "email" | "name" | "notes",
    string | undefined
  >
>;

const phonePattern = /^(?:\+44\s?|0)(?:[1-9]\d{2,4}\s?\d{3,4}\s?\d{3,4}|[1-9]\d{8,10})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface Roads2RoadsQuoteWizardProps {
  className?: string;
}

export function Roads2RoadsQuoteWizard({ className }: Roads2RoadsQuoteWizardProps) {
  const [mode, setMode] = useState<CourierMode>("sameday");
  const [selectedConsignment, setSelectedConsignment] = useState<string>(
    CONSIGNMENT_TYPES.sameday[0]
  );
  const [selectedVehicle, setSelectedVehicle] = useState<string>(
    "Best Vehicle Recommended by Roads2Roads Coordinator"
  );
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [timeframe, setTimeframe] = useState<string>(TIMEFRAMES[0]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "email" | "whatsapp">(
    "phone"
  );

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleModeChange = (newMode: CourierMode) => {
    setMode(newMode);
    setSelectedConsignment(CONSIGNMENT_TYPES[newMode][0]);
    if (newMode === "pallets") {
      setSelectedVehicle("Luton Box Van with 500kg Tail Lift (Heavy pallets & bulky cargo)");
    }
  };

  const validate = (): boolean => {
    const err: Errors = {};

    if (!selectedConsignment) {
      err.consignment = "Please select what you need transported.";
    }

    if (!pickup.trim() || pickup.trim().length < 3) {
      err.pickup = "Collection address or UK postcode is required.";
    }

    if (!dropoff.trim() || dropoff.trim().length < 3) {
      err.dropoff = "Delivery destination address or UK postcode is required.";
    }

    if (!phone.trim()) {
      err.phone = "Contact phone number is required for urgent coordination.";
    } else if (!phonePattern.test(phone.trim().replace(/\s+/g, ""))) {
      err.phone = "Please enter a valid UK phone number (e.g. 020 3476 9656 or 0758 423 9227).";
    }

    if (!email.trim()) {
      err.email = "Valid email address is required for sending your quote.";
    } else if (!emailPattern.test(email.trim())) {
      err.email = "Please enter a valid email address.";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    setSubmitting(true);

    const formattedDate = date
      ? format(date, "EEEE, d MMMM yyyy")
      : timeframe.includes("ASAP")
      ? "ASAP / Today Within 60 Mins"
      : timeframe;

    const payload = {
      service: `Roads2Roads Courier [${mode.toUpperCase()}]: ${selectedConsignment} | Vehicle: ${selectedVehicle} | Urgency: ${timeframe}`,
      moveSize: `${selectedConsignment} (${selectedVehicle})`,
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
      preferredDate: formattedDate,
      name: name.trim() ? (company.trim() ? `${name.trim()} (${company.trim()})` : name.trim()) : "Valued Customer",
      phone: phone.trim(),
      email: email.trim(),
      preferredContact,
      notes: `Company: ${company.trim() || "N/A"} | Urgency: ${timeframe} | Vehicle: ${selectedVehicle} | Details: ${notes.trim() || "None"}`,
      isWinsQuote: false,
      isWinzQuote: false,
    };

    try {
      const result = await submitQuoteEnquiry({ data: payload });

      if (result.success) {
        toast.success("Quote request dispatched! Our London coordinator will reply shortly.");
        setDone(true);
      } else {
        toast.error(result.error || "Could not send quote request. Please call 0203 476 9656.");
      }
    } catch {
      toast.error("Could not send quote request. Please call us directly on 0203 476 9656.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-sky-100 bg-white p-6 sm:p-9 md:p-12 shadow-xl animate-in fade-in zoom-in-95 duration-500",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-emerald-100 text-[#449D44]">
            <Check className="size-6 text-[#449D44] stroke-[2.5]" />
          </span>
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#25AAE1]">
              Roads2Roads 24/7 Dispatch
            </span>
            <p className="text-xs text-slate-500">Enquiry Received Successfully</p>
          </div>
        </div>

        <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Thank you — we've received your courier enquiry!
        </h2>
        <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600">
          Our London logistics coordinators are reviewing your requirements to provide the fastest route and most cost-effective fixed rate.
        </p>

        {/* Immediate Callout */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900 block text-sm">Need immediate vehicle collection?</span>
            Call our urgent desk directly for vehicle dispatch within 60 minutes.
          </div>
          <a
            href="tel:02034769656"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[#25AAE1] hover:bg-[#1b93c5] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Phone className="size-3.5" />
            <span>0203 476 9656</span>
          </a>
        </div>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {[
            { term: "Service & Mode", value: `${mode.toUpperCase()} — ${selectedConsignment}` },
            { term: "Vehicle Required", value: selectedVehicle },
            { term: "Collection Point", value: pickup },
            { term: "Delivery Destination", value: dropoff },
            { term: "Timing / Urgency", value: date ? format(date, "EEEE, d MMMM yyyy") : timeframe },
            {
              term: "Contact Method",
              value:
                preferredContact === "email"
                  ? "Email"
                  : preferredContact === "whatsapp"
                  ? "WhatsApp"
                  : "Phone Call",
            },
            { term: "Contact Phone", value: phone },
            { term: "Email Address", value: email },
            ...(name ? [{ term: "Sender Name", value: name }] : []),
            ...(company ? [{ term: "Company", value: company }] : []),
            ...(notes ? [{ term: "Special Instructions", value: notes }] : []),
          ].map((row) => (
            <div key={row.term} className="bg-white p-3.5">
              <dt className="text-[0.6875rem] font-bold tracking-wider text-slate-500 uppercase">
                {row.term}
              </dt>
              <dd className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 break-words">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setPickup("");
              setDropoff("");
              setNotes("");
            }}
            className="text-xs font-bold text-[#25AAE1] hover:text-[#1b93c5] hover:underline transition-colors"
          >
            ← Submit Another Courier Quote
          </button>
          <div className="text-xs text-slate-400">
            Roads2Roads Couriers Ltd &bull; 45 Fitzroy St, London W1T 6EB
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 md:p-10 shadow-lg ring-1 ring-slate-900/5",
        className
      )}
    >
      {/* Header of Wizard */}
      <div className="space-y-1.5 pb-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200/70 px-3 py-1 text-[0.6875rem] font-bold text-[#007cb0] uppercase tracking-wide">
          <Zap className="size-3 text-[#25AAE1] fill-current" />
          <span>Same-Day Courier &bull; Packets to Pallets</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Get a Fast Fixed-Price Quote
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
          Direct point-to-point delivery across London and UK nationwide. No middle sorting hubs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-7">
        {/* Step 1: Mode Switcher */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            1. Select Courier Service Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {COURIER_MODES.map((item) => {
              const Icon = item.icon;
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id)}
                  className={cn(
                    "flex flex-col items-start p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group",
                    active
                      ? "border-[#25AAE1] bg-sky-50/70 text-slate-900 ring-2 ring-[#25AAE1]/30 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={cn(
                        "size-8 rounded-xl flex items-center justify-center transition-colors",
                        active ? "bg-[#25AAE1] text-white" : "bg-slate-100 text-slate-500 group-hover:text-[#25AAE1]"
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[0.625rem] font-bold px-2 py-0.5 rounded-md border",
                          active
                            ? "bg-white border-[#25AAE1]/30 text-[#007cb0]"
                            : "bg-white border-slate-200 text-slate-500"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold leading-tight block text-slate-900">
                    {item.label}
                  </span>
                  <span className="text-[0.6875rem] text-slate-500 mt-1 leading-snug line-clamp-2">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: What are you sending? */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              Consignment Description <span className="text-red-500">*</span>
            </label>
            <Roads2RoadsSelect
              value={selectedConsignment}
              onValueChange={(val) => {
                setSelectedConsignment(val);
                if (errors.consignment) {
                  setErrors((prev) => ({ ...prev, consignment: undefined }));
                }
              }}
            >
              <Roads2RoadsSelectTrigger className="h-12">
                <Roads2RoadsSelectValue placeholder="Select consignment item" />
              </Roads2RoadsSelectTrigger>
              <Roads2RoadsSelectContent>
                {CONSIGNMENT_TYPES[mode].map((type) => (
                  <Roads2RoadsSelectItem key={type} value={type}>
                    {type}
                  </Roads2RoadsSelectItem>
                ))}
              </Roads2RoadsSelectContent>
            </Roads2RoadsSelect>
            {errors.consignment && (
              <p className="text-xs text-red-500">{errors.consignment}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              Preferred Vehicle Type
            </label>
            <Roads2RoadsSelect
              value={selectedVehicle}
              onValueChange={setSelectedVehicle}
            >
              <Roads2RoadsSelectTrigger className="h-12">
                <Roads2RoadsSelectValue placeholder="Select vehicle" />
              </Roads2RoadsSelectTrigger>
              <Roads2RoadsSelectContent>
                {FLEET_VEHICLES.map((veh) => (
                  <Roads2RoadsSelectItem key={veh} value={veh}>
                    {veh}
                  </Roads2RoadsSelectItem>
                ))}
              </Roads2RoadsSelectContent>
            </Roads2RoadsSelect>
          </div>
        </div>

        {/* Step 3: Collection & Delivery Addresses */}
        <div className="grid gap-5 sm:grid-cols-2 pt-1">
          <Roads2RoadsLocationField
            label="Collection Address / UK Postcode"
            placeholder="e.g. 45 Fitzroy St, London W1T 6EB or EC2"
            value={pickup}
            onChange={(val) => {
              setPickup(val);
              if (errors.pickup) {
                setErrors((prev) => ({ ...prev, pickup: undefined }));
              }
            }}
            error={errors.pickup}
            helperText="Collection address where driver picks up goods."
          />

          <Roads2RoadsLocationField
            label="Delivery Destination / Postcode"
            placeholder="e.g. Birmingham City Centre, B1 or Manchester"
            value={dropoff}
            onChange={(val) => {
              setDropoff(val);
              if (errors.dropoff) {
                setErrors((prev) => ({ ...prev, dropoff: undefined }));
              }
            }}
            error={errors.dropoff}
            helperText="Direct point-to-point destination address."
          />
        </div>

        {/* Step 4: Urgency & Timing */}
        <div className="grid gap-5 sm:grid-cols-2 pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              Collection Timeline / Urgency
            </label>
            <Roads2RoadsSelect
              value={timeframe}
              onValueChange={(val) => setTimeframe(val)}
            >
              <Roads2RoadsSelectTrigger className="h-12">
                <Roads2RoadsSelectValue placeholder="Select urgency" />
              </Roads2RoadsSelectTrigger>
              <Roads2RoadsSelectContent>
                {TIMEFRAMES.map((tf) => (
                  <Roads2RoadsSelectItem key={tf} value={tf}>
                    {tf}
                  </Roads2RoadsSelectItem>
                ))}
              </Roads2RoadsSelectContent>
            </Roads2RoadsSelect>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              Specific Date (If Scheduled)
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-xs sm:text-sm font-medium text-slate-800 shadow-xs outline-hidden transition-all duration-200 hover:border-[#25AAE1]/70 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15",
                    !date && "text-slate-400 font-normal"
                  )}
                >
                  <span className="truncate">
                    {date ? format(date, "EEE, d MMMM yyyy") : "Select future date (if scheduled)"}
                  </span>
                  <CalendarDays className="size-4 text-slate-400 shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3 rounded-2xl border border-sky-100 bg-white shadow-2xl ring-1 ring-slate-900/5" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  classNames={{
                    today: "border-2 border-[#25AAE1] text-[#007cb0] font-bold rounded-xl",
                    day: "rounded-xl text-xs sm:text-sm hover:bg-sky-50 hover:text-[#007cb0] transition-colors",
                    selected: "bg-[#25AAE1] text-white hover:bg-[#1b93c5] hover:text-white font-bold rounded-xl",
                    range_start: "bg-[#25AAE1] text-white",
                    range_end: "bg-[#25AAE1] text-white",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Step 5: Contact Details */}
        <div className="border-t border-slate-100 pt-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              5. Contact &amp; Dispatch Confirmation
            </span>
            <span className="text-[0.6875rem] text-slate-400 font-medium">100% Free &bull; No obligation</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 px-3.5 py-3 text-xs sm:text-sm shadow-xs transition-all hover:border-[#25AAE1]/60 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15 outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Company Name (Optional)
              </label>
              <div className="relative">
                <Building2 className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Acme Logistics Ltd"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-200 pl-10 pr-3.5 py-3 text-xs sm:text-sm shadow-xs transition-all hover:border-[#25AAE1]/60 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15 outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 020 3476 9656 or 0758 423 9227"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={cn(
                  "w-full h-12 rounded-xl border border-slate-200 px-3.5 py-3 text-xs sm:text-sm shadow-xs transition-all hover:border-[#25AAE1]/60 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15 outline-hidden",
                  errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                )}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. yourname@example.co.uk"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={cn(
                  "w-full h-12 rounded-xl border border-slate-200 px-3.5 py-3 text-xs sm:text-sm shadow-xs transition-all hover:border-[#25AAE1]/60 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15 outline-hidden",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                )}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Consignment Notes &amp; Special Handling (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Dimensions, estimated weight, reference code, loading dock or tail lift needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-xs sm:text-sm shadow-xs transition-all hover:border-[#25AAE1]/60 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15 outline-hidden resize-none"
            />
          </div>

          {/* Preferred contact channel */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs text-slate-500 font-semibold">Preferred reply method:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPreferredContact("phone")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
                  preferredContact === "phone" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Phone Call
              </button>
              <button
                type="button"
                onClick={() => setPreferredContact("email")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
                  preferredContact === "email" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setPreferredContact("whatsapp")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors cursor-pointer",
                  preferredContact === "whatsapp" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                )}
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-[#449D44] hover:bg-[#398439] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base py-4 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Checking Route &amp; Calculating Fixed Price...</span>
              </>
            ) : (
              <>
                <span>Get Free Fixed-Price Quote</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[0.6875rem] text-slate-500">
            100% Free &bull; No obligation &bull; Directly reviewed by Roads2Roads dispatch coordinators
          </p>
        </div>
      </form>
    </div>
  );
}
