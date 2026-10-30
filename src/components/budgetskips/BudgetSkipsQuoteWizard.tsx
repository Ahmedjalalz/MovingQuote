import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Trash2,
  Truck,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Package,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BudgetSkipsLocationField } from "./BudgetSkipsLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export type Mode = "domestic" | "builders" | "manandvan" | "commercial";

export const DOMESTIC_SKIP_SIZES = [
  "4 Yard Mini Skip (~30 bags) — Garden waste, bathroom refits & small DIY",
  "5 Yard Midi Skip (~40 bags) — Kitchen refits & household clearouts",
  "6 Yard Small Builders Skip (~55 bags) — General renovations & DIY waste",
  "8 Yard Large Builders Skip (~75 bags) — ★ Most Popular (House renovations)",
  "10 Yard Maxi Skip (~95 bags) — House clearances & light bulky waste",
  "12 Yard Maxi Skip (~115 bags) — House clearances & shop refits",
  "14 Yard Maxi Skip (~135 bags) — Large domestic cleanouts & bulky waste",
  "16 Yard Maxi Skip (~150 bags) — Major domestic & commercial clearances",
] as const;

export const BUILDERS_SKIP_SIZES = [
  "6 Yard Small Builders Skip (~55 bags) — Soil, brick, concrete & hardcore OK",
  "8 Yard Large Builders Skip (~75 bags) — ★ Most Popular (Heavy trade & soil)",
  "12 Yard Trade Maxi Skip — Timber, fit-outs & commercial refurbishments",
  "20 Yard Roll-On Roll-Off (RoRo) — Major site excavation & inert demolition",
  "40 Yard Roll-On Roll-Off (RoRo) — Bulk industrial packaging & warehouse waste",
] as const;

export const MAN_AND_VAN_SIZES = [
  "Single Bulky Item — Sofa, mattress, washing machine, or fridge",
  "Quarter Van Load (~10-15 bags / 300kg) — Small garden or room cleanout",
  "Half Van Load (~25-35 bags / 600kg) — Shed, garage, or partial clearance",
  "Full Luton Van Load (~60-70 bags / 1,100kg) — Complete flat or room clearout",
  "Multiple Van Loads — Comprehensive probate / estate clearance",
] as const;

export const COMMERCIAL_SIZES = [
  "8 Yard Builders Skip (Trade Account) — Mixed builders waste",
  "12 - 16 Yard Maxi Skips — High-volume commercial & shopfitting waste",
  "20 Yard Roll-On Roll-Off (RoRo) — Heavy construction & inert waste",
  "40 Yard Roll-On Roll-Off (RoRo) — Light industrial packaging & bulk waste",
] as const;

export const PLACEMENT_OPTIONS = [
  "Private Driveway / Off-Road (No council permit required)",
  "Public Highway / Road / Pavement (Council permit arranged by Budget Skips)",
  "Wait & Load (Loaded within 30 mins while driver waits — No permit needed)",
  "Unsure / Need Advice from Coordinator",
] as const;

export const WASTE_OPTIONS = [
  "General Household Junk & Furniture",
  "Garden & Green Waste (branches, turf, soil)",
  "Soil, Bricks, Concrete & Hardcore",
  "Wood, Timber, Pallets & Joinery",
  "Commercial Packaging & Cardboard",
  "House Clearance, Carpets & Mattresses",
  "Metal, Iron & Radiators",
] as const;

type Errors = Partial<
  Record<
    "size" | "waste" | "placement" | "pickup" | "date" | "phone" | "email" | "name" | "notes",
    string | undefined
  >
>;

const phonePattern = /^(?:\+44\s?|0)(?:[1-9]\d{2,4}\s?\d{3,4}\s?\d{3,4}|[1-9]\d{8,10})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface BudgetSkipsQuoteWizardProps {
  className?: string;
}

export function BudgetSkipsQuoteWizard({ className }: BudgetSkipsQuoteWizardProps) {
  const [mode, setMode] = useState<Mode>("domestic");
  const [selectedSize, setSelectedSize] = useState<string>(
    "8 Yard Large Builders Skip (~75 bags) — ★ Most Popular (House renovations)"
  );
  const [selectedPlacement, setSelectedPlacement] = useState<string>(
    "Private Driveway / Off-Road (No council permit required)"
  );
  const [selectedWaste, setSelectedWaste] = useState<string[]>([
    "General Household Junk & Furniture",
  ]);
  const [wasteOpen, setWasteOpen] = useState(false);
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [dateFlexible, setDateFlexible] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "whatsapp" | "email">("phone");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const getSizesForMode = (currentMode: Mode) => {
    switch (currentMode) {
      case "domestic":
        return DOMESTIC_SKIP_SIZES;
      case "builders":
        return BUILDERS_SKIP_SIZES;
      case "manandvan":
        return MAN_AND_VAN_SIZES;
      case "commercial":
        return COMMERCIAL_SIZES;
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === "domestic") {
      setSelectedSize("8 Yard Large Builders Skip (~75 bags) — ★ Most Popular (House renovations)");
      setSelectedPlacement("Private Driveway / Off-Road (No council permit required)");
    } else if (newMode === "builders") {
      setSelectedSize("8 Yard Large Builders Skip (~75 bags) — ★ Most Popular (Heavy trade & soil)");
      setSelectedPlacement("Private Driveway / Off-Road (No council permit required)");
    } else if (newMode === "manandvan") {
      setSelectedSize("Half Van Load (~25-35 bags / 600kg) — Shed, garage, or partial clearance");
      setSelectedPlacement("Wait & Load (Loaded within 30 mins while driver waits — No permit needed)");
    } else if (newMode === "commercial") {
      setSelectedSize("20 Yard Roll-On Roll-Off (RoRo) — Heavy construction & inert waste");
      setSelectedPlacement("Private Driveway / Off-Road (No council permit required)");
    }
  };

  const toggleWasteItem = (item: string) => {
    setSelectedWaste((prev) => {
      const next = prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item];
      if (errors.waste && next.length > 0) {
        setErrors((errs) => ({ ...errs, waste: undefined }));
      }
      return next;
    });
  };

  const selectAllWaste = () => {
    if (WASTE_OPTIONS.every((item) => selectedWaste.includes(item))) {
      setSelectedWaste([]);
    } else {
      setSelectedWaste([...WASTE_OPTIONS]);
      if (errors.waste) setErrors((errs) => ({ ...errs, waste: undefined }));
    }
  };

  function validate(): boolean {
    const next: Errors = {};

    if (!selectedSize.trim()) {
      next.size = "Please select your required skip size.";
    }
    if (selectedWaste.length === 0) {
      next.waste = "Please select at least one waste material type.";
    }
    if (!pickup.trim()) {
      next.pickup = "Enter your Coventry / Warwickshire delivery address or postcode.";
    }
    if (!phonePattern.test(phone.trim().replace(/\s+/g, ""))) {
      next.phone = "Enter a valid UK phone number (e.g. 024 7636 3002 or 07...).";
    }
    if (!emailPattern.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required details to get your quote.");
      return;
    }

    setSubmitting(true);

    const formattedDate = date
      ? format(date, "EEEE, d MMMM yyyy") + (dateFlexible ? " (Flexible)" : "")
      : dateFlexible
      ? "Flexible Date / ASAP"
      : "As soon as possible";

    const payload = {
      service: `Budget Skips [${mode.toUpperCase()}]: ${selectedSize} | Placement: ${selectedPlacement} | Waste: ${selectedWaste.join(
        ", "
      )}`,
      moveSize: selectedSize,
      pickup: pickup.trim(),
      dropoff: "Bayton Road Recycling Station, Coventry",
      preferredDate: formattedDate,
      name: name.trim() || "Customer",
      phone: phone.trim(),
      email: email.trim(),
      preferredContact,
      notes: `Placement: ${selectedPlacement} | Materials: ${selectedWaste.join(
        ", "
      )} | Notes: ${notes.trim() || "None"}`,
      isWinsQuote: false,
      isWinzQuote: false,
    };

    try {
      const result = await submitQuoteEnquiry({ data: payload });

      if (result.success) {
        toast.success("Skip quote request received! We will be in touch shortly.");
        setDone(true);
        setSubmitting(false);
        return;
      }

      toast.error(result.error || "Could not send quote request. Please call 02476 363 002.");
    } catch (err) {
      toast.error("Could not send quote request. Please call us directly on 02476 363 002.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-zinc-200 bg-white p-6 sm:p-9 md:p-12 shadow-xl animate-in fade-in zoom-in-95 duration-500",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-orange-100 text-[#ec6c05]">
            <Check className="size-6 text-[#ec6c05]" />
          </span>
        </div>
        <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
          Thank you — we've received your skip request!
        </h2>
        <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-600">
          Our Coventry dispatch team at Bayton Road is reviewing your requirements and will contact
          you shortly with an exact, fixed-price quote and delivery schedule.
        </p>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
          {[
            { term: "Selected Skip / Service", value: selectedSize },
            { term: "Placement on Site", value: selectedPlacement },
            { term: "Materials Included", value: selectedWaste.join(", ") },
            { term: "Delivery Address", value: pickup },
            {
              term: "Preferred Delivery Date",
              value: date ? format(date, "EEEE, d MMMM yyyy") : "Flexible / ASAP",
            },
            {
              term: "Contact Method",
              value:
                preferredContact === "email"
                  ? "Email"
                  : preferredContact === "whatsapp"
                  ? "WhatsApp"
                  : "Phone Call",
            },
            { term: "Phone Number", value: phone },
            { term: "Email Address", value: email },
            ...(name ? [{ term: "Name", value: name }] : []),
            ...(notes ? [{ term: "Access Notes", value: notes }] : []),
          ].map((row) => (
            <div key={row.term} className="bg-white p-3.5">
              <dt className="text-[0.6875rem] font-bold tracking-wider text-zinc-500 uppercase">
                {row.term}
              </dt>
              <dd className="mt-1 text-xs sm:text-sm font-semibold text-zinc-900 break-words">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="tel:02476363002"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ec6c05] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#d85e00] transition-colors"
          >
            <Phone className="size-4" />
            <span>Call Depot: 02476 363 002</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setPickup("");
              setNotes("");
            }}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const availableSizes = getSizesForMode(mode);

  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-xl",
        className
      )}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-7">
        {/* Header */}
        <div className="border-b border-zinc-100 pb-5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ec6c05]">
            <Sparkles className="size-3.5 text-[#ec6c05]" />
            <span>Coventry &amp; Warwickshire Skip Hire • Instant Quotation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Request a Free Fixed-Price Quote
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-xl">
            Complete your skip and location details below for an accurate fixed quotation from our
            Coventry dispatch team. Zero obligation.
          </p>
        </div>

        {/* Section 1: Service Category Selector (Spacious Cards, Not Crammed) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Step 1 • Service Category
            </span>
            <span className="text-[0.6875rem] text-zinc-500 font-normal">Choose solution</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { id: "domestic" as Mode, label: "Domestic Skip", icon: Trash2, desc: "Houses & DIY" },
              { id: "builders" as Mode, label: "Builders & Heavy", icon: Truck, desc: "Soil & Rubble" },
              { id: "manandvan" as Mode, label: "Man With A Van", icon: Package, desc: "We Do Lifting" },
              { id: "commercial" as Mode, label: "Commercial RoRo", icon: Clock, desc: "20-40yd Bulk" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer min-h-[85px]",
                    isSelected
                      ? "border-[#ec6c05] bg-orange-50/70 text-[#ec6c05] shadow-xs ring-2 ring-[#ec6c05]/20 font-bold"
                      : "border-zinc-200 bg-zinc-50/60 text-zinc-700 hover:bg-white hover:border-zinc-300"
                  )}
                >
                  <Icon className={cn("size-5 mb-1 shrink-0", isSelected ? "text-[#ec6c05]" : "text-zinc-500")} />
                  <span className="text-xs sm:text-sm font-bold leading-tight text-zinc-900">
                    {item.label}
                  </span>
                  <span className="text-[0.6875rem] text-zinc-500 leading-tight mt-0.5">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Skip Size Selector (Clean Standard Select) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
              Step 2 • {mode === "manandvan" ? "Load / Collection Size *" : "Skip Size *"}
            </label>
            <span className="text-[0.6875rem] text-zinc-500">
              Need sizing advice? Call{" "}
              <a href="tel:02476363002" className="text-[#ec6c05] font-bold hover:underline">
                02476 363 002
              </a>
            </span>
          </div>

          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="h-12 w-full rounded-xl border-zinc-200 bg-white px-4 text-xs sm:text-sm font-medium text-zinc-900 shadow-2xs focus:border-[#ec6c05] focus:ring-2 focus:ring-[#ec6c05]/20">
              <SelectValue placeholder="Select skip size" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {availableSizes.map((sz) => (
                <SelectItem key={sz} value={sz} className="text-xs sm:text-sm py-2.5">
                  {sz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.size && <p className="text-xs font-medium text-rose-600 mt-1">{errors.size}</p>}
        </div>

        {/* Section 3: Waste Materials Popover (Matching QuoteWizard Pattern) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-1">
            <label
              id="waste-materials-label"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-900"
            >
              Step 3 • Waste Materials Included *
            </label>
            {selectedWaste.length > 0 ? (
              <span className="text-[0.6875rem] font-bold text-[#ec6c05]">
                {selectedWaste.length} materials selected
              </span>
            ) : (
              <span className="text-[0.6875rem] font-medium text-zinc-500">
                Select one or more
              </span>
            )}
          </div>

          <div className="relative">
            <Popover open={wasteOpen} onOpenChange={setWasteOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-labelledby="waste-materials-label"
                  className={cn(
                    "flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-xs sm:text-sm font-medium outline-none transition-all duration-200 hover:border-[#ec6c05] focus:border-[#ec6c05] focus:ring-2 focus:ring-[#ec6c05]/20 cursor-pointer shadow-2xs",
                    errors.waste ? "border-rose-500 bg-rose-50/20" : "border-zinc-200"
                  )}
                >
                  <div className="flex flex-1 items-center gap-2 overflow-hidden pr-2">
                    {selectedWaste.length === 0 ? (
                      <span className="text-zinc-400 font-normal">
                        Select waste types (you can select multiple)...
                      </span>
                    ) : selectedWaste.length === 1 ? (
                      <span className="truncate text-zinc-900 font-semibold">
                        {selectedWaste[0]}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 truncate">
                        <span className="truncate text-zinc-900 font-semibold">
                          {selectedWaste[0]}
                        </span>
                        <span className="shrink-0 rounded-full bg-orange-100 border border-orange-200 px-2 py-0.5 text-xs font-bold text-[#ec6c05]">
                          +{selectedWaste.length - 1} more
                        </span>
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-zinc-400 transition-transform duration-200",
                      wasteOpen && "rotate-180"
                    )}
                  />
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                sideOffset={6}
                className="w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[460px] p-0 rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden z-50"
              >
                <div className="p-3.5 border-b border-zinc-100 bg-orange-50/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">
                    Waste Types ({selectedWaste.length} selected)
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={selectAllWaste}
                      className="text-[0.6875rem] font-bold text-[#ec6c05] hover:underline cursor-pointer"
                    >
                      {WASTE_OPTIONS.every((item) => selectedWaste.includes(item))
                        ? "Deselect all"
                        : "Select all"}
                    </button>
                    {selectedWaste.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedWaste([])}
                        className="text-[0.6875rem] font-semibold text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-2.5 space-y-1 max-h-60 overflow-y-auto">
                  {WASTE_OPTIONS.map((item) => {
                    const isChecked = selectedWaste.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleWasteItem(item)}
                        role="checkbox"
                        aria-checked={isChecked}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none",
                          isChecked
                            ? "bg-orange-50 text-zinc-900 font-semibold"
                            : "text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        <div
                          className={cn(
                            "grid size-4 shrink-0 place-content-center rounded border transition-colors",
                            isChecked
                              ? "border-[#ec6c05] bg-[#ec6c05] text-white"
                              : "border-zinc-300 bg-white"
                          )}
                        >
                          {isChecked && <Check className="size-3 stroke-[3]" />}
                        </div>
                        <span className="flex-1">{item}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 border-t border-zinc-100 bg-zinc-50/60 flex items-center justify-between">
                  <span className="text-[0.6875rem] text-zinc-500">
                    {selectedWaste.length === 0
                      ? "Select at least 1 type"
                      : `${selectedWaste.length} types chosen`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWasteOpen(false)}
                    className="rounded-xl bg-[#ec6c05] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#d85e00] cursor-pointer shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {errors.waste && <p className="text-xs font-medium text-rose-600 mt-1">{errors.waste}</p>}
        </div>

        {/* Section 4: Skip Placement & Road Permits */}
        {mode !== "manandvan" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
                Step 4 • Skip Placement &amp; Road Permit
              </label>
              <span className="text-[0.6875rem] text-zinc-500">Permits arranged by us</span>
            </div>

            <Select value={selectedPlacement} onValueChange={setSelectedPlacement}>
              <SelectTrigger className="h-12 w-full rounded-xl border-zinc-200 bg-white px-4 text-xs sm:text-sm font-medium text-zinc-900 shadow-2xs focus:border-[#ec6c05] focus:ring-2 focus:ring-[#ec6c05]/20">
                <SelectValue placeholder="Select skip placement" />
              </SelectTrigger>
              <SelectContent>
                {PLACEMENT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs sm:text-sm py-2.5">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Section 5: Location & Preferred Date */}
        <div className="space-y-1.5">
          <span className="block text-xs font-bold uppercase tracking-wider text-zinc-900 mb-1">
            Step 5 • Delivery Location &amp; Date
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <BudgetSkipsLocationField
              label="Delivery Address / Postcode *"
              placeholder="e.g. CV6 Radford, CV1 City Centre, CV7..."
              value={pickup}
              onChange={(val) => {
                setPickup(val);
                if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
              }}
              error={errors.pickup}
              helperText="Coverage: Coventry, Bedworth, Nuneaton, Kenilworth &amp; Warwickshire"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-zinc-900 tracking-tight">
                  Preferred Delivery Date
                </label>
                <span className="text-[0.6875rem] text-zinc-500">Same-day / next-day available</span>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex h-12 w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 text-left text-sm font-medium outline-none transition-all duration-200 hover:border-[#ec6c05] focus:border-[#ec6c05] focus:ring-2 focus:ring-[#ec6c05]/20 cursor-pointer shadow-2xs",
                      !date && "text-zinc-400"
                    )}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <CalendarDays className="size-4 text-[#ec6c05] shrink-0" />
                      {date ? format(date, "EEEE, d MMMM yyyy") : "Select preferred delivery date"}
                    </span>
                    <ChevronDown className="size-4 text-zinc-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-white shadow-xl" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <label className="flex items-center gap-2 cursor-pointer text-[0.6875rem] text-zinc-500 font-medium pt-0.5">
                <input
                  type="checkbox"
                  checked={dateFlexible}
                  onChange={(e) => setDateFlexible(e.target.checked)}
                  className="rounded text-[#ec6c05] focus:ring-[#ec6c05]"
                />
                <span>Delivery date is flexible / ASAP delivery is fine</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 6: Contact Information */}
        <div className="space-y-1.5 pt-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-zinc-900 mb-1">
            Step 6 • Contact Details for Quote Confirmation
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[0.6875rem] font-semibold text-zinc-600 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full rounded-xl border border-zinc-200 bg-white h-12 px-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#ec6c05] focus:border-[#ec6c05]"
              />
            </div>

            <div>
              <label className="block text-[0.6875rem] font-semibold text-zinc-600 mb-1">
                UK Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="024 7636 3002"
                className={cn(
                  "w-full rounded-xl border bg-white h-12 px-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#ec6c05] focus:border-[#ec6c05]",
                  errors.phone ? "border-rose-400 bg-rose-50/20" : "border-zinc-200"
                )}
              />
              {errors.phone && <p className="text-[0.625rem] text-rose-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[0.6875rem] font-semibold text-zinc-600 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="john@example.co.uk"
                className={cn(
                  "w-full rounded-xl border bg-white h-12 px-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#ec6c05] focus:border-[#ec6c05]",
                  errors.email ? "border-rose-400 bg-rose-50/20" : "border-zinc-200"
                )}
              />
              {errors.email && <p className="text-[0.625rem] text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Section 7: Access Details & Contact Preferences */}
        <div className="space-y-2">
          <label className="block text-[0.6875rem] font-semibold text-zinc-600">
            Access Details &amp; Specific Placement Instructions (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Narrow entrance gate (approx. 2.9m wide), drop skip on left side of driveway, man with van access info..."
            className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs sm:text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#ec6c05] focus:border-[#ec6c05] resize-none"
          />

          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <span className="text-[0.6875rem] font-medium text-zinc-600">Preferred reply:</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="contact_pref"
                  checked={preferredContact === "phone"}
                  onChange={() => setPreferredContact("phone")}
                  className="text-[#ec6c05] focus:ring-[#ec6c05]"
                />
                <span>Phone Call</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="contact_pref"
                  checked={preferredContact === "whatsapp"}
                  onChange={() => setPreferredContact("whatsapp")}
                  className="text-[#ec6c05] focus:ring-[#ec6c05]"
                />
                <span>WhatsApp</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-zinc-800">
                <input
                  type="radio"
                  name="contact_pref"
                  checked={preferredContact === "email"}
                  onChange={() => setPreferredContact("email")}
                  className="text-[#ec6c05] focus:ring-[#ec6c05]"
                />
                <span>Email</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-14 rounded-2xl bg-[#ec6c05] hover:bg-[#d85e00] font-extrabold text-sm sm:text-base text-white shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
          >
            {submitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Checking Coventry Availability &amp; Calculating...</span>
              </>
            ) : (
              <>
                <span>Get My Guaranteed Fixed-Price Quote</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
          <div className="mt-2 text-center text-[0.6875rem] text-zinc-500 flex items-center justify-center gap-3">
            <span>✓ 100% Free &amp; Zero Obligation</span>
            <span>•</span>
            <span>✓ Like-for-Like Price Match</span>
            <span>•</span>
            <span>✓ No Payment Required Now</span>
          </div>
        </div>
      </form>
    </div>
  );
}
