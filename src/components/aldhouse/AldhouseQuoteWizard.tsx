import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck2,
  Home,
  Building2,
  Warehouse,
  Music,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Mail,
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
import { AldhouseLocationField } from "./AldhouseLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export const ALDHOUSE_DOMESTIC_SERVICES = [
  "Full House Removal",
  "Flat & Apartment Move",
  "Cambridge University & College Move",
  "Full Packing & Unpacking Service",
  "Fragile Items Packing",
  "Upright or Grand Piano Moving",
  "Furniture Dismantling & Assembly",
  "Packing Boxes & Supplies",
  "Overseas / Long Distance Move",
] as const;

export const ALDHOUSE_COMMERCIAL_SERVICES = [
  "Office Relocation & IT Transfer",
  "University Department Move",
  "Laboratory & Clinic Relocation",
  "Internal Office Reconfiguration",
  "Commercial Archive & File Storage",
] as const;

export const ALDHOUSE_STORAGE_SERVICES = [
  "Short-Term Household Storage",
  "Long-Term Containerised Storage",
  "Student Summer Holiday Storage",
  "Commercial Stock & Equipment",
  "Storage Collection & Redelivery",
] as const;

export const ALDHOUSE_PIANO_SERVICES = [
  "Upright Piano Specialist Moving",
  "Grand & Baby Grand Piano Move",
  "Antique & Fine Art Relocation",
  "Difficult Access & Hoisting",
] as const;

export const ALDHOUSE_MOVE_SIZES = [
  "Student / 1 Room / College Accommodation",
  "1 - 2 Bedroom Flat or House",
  "3 - 4 Bedroom Family Home",
  "5+ Bedroom Large Residence",
  "Small Commercial Office (1-5 desks)",
  "Medium / Large Business (6-20+ desks)",
  "Storage Only (Waterbeach Container)",
  "Single Specialty Item (e.g. Piano, Antique)",
] as const;

type Mode = "domestic" | "commercial" | "storage" | "piano";

type Errors = Partial<
  Record<
    "service" | "moveSize" | "pickup" | "dropoff" | "date" | "phone" | "email" | "notes",
    string | undefined
  >
>;

const phonePattern = /^[0-9+()\s-]{7,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface AldhouseQuoteWizardProps {
  className?: string;
}

export function AldhouseQuoteWizard({ className }: AldhouseQuoteWizardProps) {
  const [mode, setMode] = useState<Mode>("domestic");

  const getServiceList = (currentMode: Mode) => {
    switch (currentMode) {
      case "domestic":
        return ALDHOUSE_DOMESTIC_SERVICES;
      case "commercial":
        return ALDHOUSE_COMMERCIAL_SERVICES;
      case "storage":
        return ALDHOUSE_STORAGE_SERVICES;
      case "piano":
        return ALDHOUSE_PIANO_SERVICES;
    }
  };

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Full House Removal",
  ]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moveSize, setMoveSize] = useState<string>("3 - 4 Bedroom Family Home");
  const [pickup, setPickup] = useState("");
  const [isIntoStorage, setIsIntoStorage] = useState(false);
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [dateFlexibility, setDateFlexibility] = useState<string>("flexible_few_days");
  const [needPacking, setNeedPacking] = useState(false);
  const [needBoxes, setNeedBoxes] = useState(false);
  const [hasPiano, setHasPiano] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "whatsapp" | "email">("phone");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const availableServices = getServiceList(mode);

  const handleModeSelect = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === "domestic") {
      setSelectedServices(["Full House Removal"]);
      setMoveSize("3 - 4 Bedroom Family Home");
      setIsIntoStorage(false);
    } else if (newMode === "commercial") {
      setSelectedServices(["Office Relocation & IT Transfer"]);
      setMoveSize("Small Commercial Office (1-5 desks)");
      setIsIntoStorage(false);
    } else if (newMode === "storage") {
      setSelectedServices(["Short-Term Household Storage"]);
      setMoveSize("Storage Only (Waterbeach Container)");
      setIsIntoStorage(true);
      setDropoff("Aldhouse & Smith Storage, Unit 1 Convent Drive, Waterbeach CB25 9QT");
    } else if (newMode === "piano") {
      setSelectedServices(["Upright Piano Specialist Moving"]);
      setMoveSize("Single Specialty Item (e.g. Piano, Antique)");
      setHasPiano(true);
      setIsIntoStorage(false);
    }
    if (errors.service) {
      setErrors((errs) => ({ ...errs, service: undefined }));
    }
  };

  const toggleService = (svc: string) => {
    setSelectedServices((prev) => {
      const next = prev.includes(svc) ? prev.filter((item) => item !== svc) : [...prev, svc];
      if (errors.service && next.length > 0) {
        setErrors((errs) => ({ ...errs, service: undefined }));
      }
      return next;
    });
  };

  const selectAllServices = () => {
    const allSelected = availableServices.every((item) => selectedServices.includes(item));
    if (allSelected) {
      setSelectedServices([]);
    } else {
      setSelectedServices([...availableServices]);
      if (errors.service) {
        setErrors((errs) => ({ ...errs, service: undefined }));
      }
    }
  };

  const validate = (): boolean => {
    const nextErrors: Errors = {};

    if (selectedServices.length === 0) {
      nextErrors.service = "Please select at least one service.";
    }

    if (!pickup.trim()) {
      nextErrors.pickup = "Please enter collection address or postcode.";
    } else if (pickup.trim().length < 3) {
      nextErrors.pickup = "Please enter a valid UK location or postcode.";
    }

    if (!isIntoStorage && !dropoff.trim()) {
      nextErrors.dropoff = "Please enter delivery destination address or postcode.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number (e.g. 01223 861761).";
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const finalDropoff = isIntoStorage
        ? "Aldhouse & Smith Storage Facility, Waterbeach CB25 9QT"
        : dropoff;

      const additionalNotes = [
        `Company: Aldhouse & Smith Cambridge Quote Enquiry`,
        `Category: ${mode.toUpperCase()}`,
        `Selected Services: ${selectedServices.join(", ")}`,
        `Move Size: ${moveSize}`,
        `Date Flexibility: ${dateFlexibility}`,
        needPacking ? `Needs Packing Service: Yes` : null,
        needBoxes ? `Needs Boxes / Materials: Yes` : null,
        hasPiano ? `Includes Piano / Specialist Item: Yes` : null,
        notes ? `Customer Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await submitQuoteEnquiry({
        data: {
          service: selectedServices,
          moveSize,
          pickup,
          dropoff: finalDropoff,
          preferredDate: date ? format(date, "PPP") : "Flexible / To be confirmed",
          name: name.trim() || "Customer",
          phone: phone.trim(),
          email: email.trim(),
          isWinsQuote: false,
          isWinzQuote: false,
          notes: additionalNotes,
          preferredContact,
        },
      });

      if (res.success) {
        setDone(true);
        toast.success("Enquiry received! An Aldhouse & Smith specialist will contact you promptly.");
      } else {
        toast.error(res.error || "Submission failed. Please call 01223 861761 directly.");
      }
    } catch {
      toast.error("Could not send enquiry. Please call us on 01223 861761.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className={cn("rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 md:p-12 shadow-xl", className)}>
        <div className="mx-auto max-w-lg text-center space-y-6">
          <div className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl bg-[#eefafc] text-[#368b9a] ring-8 ring-[#9bdce6]/25">
            <FileCheck2 className="size-8" />
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#368b9a]">
              Aldhouse &amp; Smith Ltd • Cambridge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c2229] tracking-tight">
              Quote Request Received
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{name || "Customer"}</strong>. Our Cambridge removals team will review your requirements and provide an accurate, fixed-price quotation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#eefafc]/40 p-5 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500 font-medium">Services:</span>
              <span className="font-semibold text-slate-900 text-right">{selectedServices.slice(0, 2).join(", ")}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500 font-medium">Pick-Up:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">{pickup}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2.5">
              <span className="text-slate-500 font-medium">Destination:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                {isIntoStorage ? "Aldhouse & Smith Storage (Waterbeach)" : dropoff}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Telephone:</span>
              <span className="font-semibold text-slate-900">{phone}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs text-slate-500">
              Need immediate advice or want to arrange an in-person home survey?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+441223861761"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c2229] px-6 py-3 text-xs font-bold text-[#9bdce6] shadow-sm hover:bg-[#132f38] transition-all"
              >
                <Phone className="size-3.5 text-[#9bdce6]" />
                <span>Call 01223 861761</span>
              </a>
              <a
                href="https://web.facebook.com/aldhouseandsmith"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <span>View Facebook Page ↗</span>
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setDone(false);
              setPickup("");
              setDropoff("");
              setNotes("");
            }}
            className="text-xs font-medium text-[#368b9a] hover:underline pt-2 inline-block cursor-pointer"
          >
            ← Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 md:p-10 shadow-xl",
        className
      )}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Header with Spacious Vertical Rhythm */}
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#368b9a]">
            <Sparkles className="size-3.5 text-[#368b9a]" />
            <span>Cambridge Removals &amp; Storage • Free Quotation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c2229] tracking-tight">
            Request a Free Fixed-Price Quote
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
            Complete your move details below for an accurate, fixed quotation from our Cambridge team. Zero obligation.
          </p>
        </div>

        {/* Section 1: Category Selector (Spacious Cards, Not Crammed) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0c2229]">
              Step 1 • Service Category
            </span>
            <span className="text-[0.6875rem] text-slate-500 font-normal">Choose moving type</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "domestic" as Mode, label: "Domestic", icon: Home, desc: "Houses & Flats" },
              { id: "commercial" as Mode, label: "Commercial", icon: Building2, desc: "Offices & Labs" },
              { id: "storage" as Mode, label: "Storage", icon: Warehouse, desc: "Safe Waterbeach" },
              { id: "piano" as Mode, label: "Piano & Antiques", icon: Music, desc: "Specialist Care" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeSelect(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer min-h-[92px]",
                    isSelected
                      ? "border-[#0c2229] bg-[#0c2229] text-white shadow-md scale-[1.01]"
                      : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-[#eefafc] hover:border-[#9bdce6]"
                  )}
                >
                  <Icon className={cn("size-5 mb-1.5 shrink-0", isSelected ? "text-[#9bdce6]" : "text-[#368b9a]")} />
                  <span className="text-xs sm:text-sm font-bold leading-snug">{item.label}</span>
                  <span className={cn("text-[0.6875rem] leading-tight mt-1", isSelected ? "text-slate-300" : "text-slate-500")}>
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Required Services Popover (Matching Base Project Exactly) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between min-h-[1.75rem] mb-1">
            <label
              id="quote-service-label"
              className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]"
            >
              Step 2 • Required Services *
            </label>
            {selectedServices.length > 0 ? (
              <span className="text-[0.6875rem] font-semibold text-[#368b9a]">
                {selectedServices.length} selected
              </span>
            ) : (
              <span className="text-[0.6875rem] font-medium text-slate-500">
                Select one or more options
              </span>
            )}
          </div>

          <div className="relative">
            <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-labelledby="quote-service-label"
                  className={cn(
                    "flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm font-medium outline-none transition-all duration-200 hover:border-[#368b9a] focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35 cursor-pointer shadow-2xs",
                    errors.service ? "border-red-500" : "border-slate-200",
                  )}
                >
                  <div className="flex flex-1 items-center gap-2.5 overflow-hidden pr-2">
                    {selectedServices.length === 0 ? (
                      <span className="text-slate-400 font-normal">
                        Select services (you can select multiple)...
                      </span>
                    ) : selectedServices.length === 1 ? (
                      <span className="truncate text-slate-900 font-semibold">
                        {selectedServices[0]}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 truncate">
                        <span className="truncate text-slate-900 font-semibold">
                          {selectedServices[0]}
                        </span>
                        <span className="shrink-0 rounded-full bg-[#9bdce6]/35 border border-[#9bdce6] px-2.5 py-0.5 text-xs font-bold text-[#0c2229]">
                          +{selectedServices.length - 1} more
                        </span>
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-slate-500 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                sideOffset={6}
                className="w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[460px] p-0 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50"
              >
                {/* Popover Header */}
                <div className="p-4 border-b border-slate-100 bg-[#eefafc]/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0c2229]">
                    {mode === "domestic"
                      ? "Domestic Removals"
                      : mode === "commercial"
                        ? "Commercial Relocations"
                        : mode === "storage"
                          ? "Storage Solutions"
                          : "Piano & Fine Art"}{" "}
                    ({selectedServices.length} chosen)
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={selectAllServices}
                      className="text-[0.6875rem] font-bold text-[#368b9a] hover:underline cursor-pointer"
                    >
                      {availableServices.every((item) => selectedServices.includes(item))
                        ? "Deselect all"
                        : "Select all"}
                    </button>
                    {selectedServices.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedServices([])}
                        className="text-[0.6875rem] font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Helpful Tip */}
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/80">
                  <p className="text-[0.6875rem] font-medium text-slate-600">
                    💡 You can select as many options as you need
                  </p>
                </div>

                {/* Service Items List with Ample Row Spacing */}
                <div className="p-3 space-y-1.5 max-h-64 overflow-y-auto">
                  {availableServices.map((item) => {
                    const isChecked = selectedServices.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleService(item)}
                        role="checkbox"
                        aria-checked={isChecked}
                        className={cn(
                          "flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-150 cursor-pointer select-none",
                          isChecked
                            ? "bg-[#eefafc] text-[#0c2229] font-semibold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                        )}
                      >
                        <div
                          className={cn(
                            "grid size-4 shrink-0 place-content-center rounded border transition-colors",
                            isChecked
                              ? "border-[#368b9a] bg-[#368b9a] text-white"
                              : "border-slate-300 bg-white",
                          )}
                        >
                          {isChecked && <Check className="size-3 stroke-[3]" />}
                        </div>
                        <span className="flex-1 text-xs sm:text-sm">{item}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Popover Footer */}
                <div className="p-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
                  <span className="text-[0.6875rem] text-slate-600 px-1 font-medium">
                    {selectedServices.length === 0
                      ? "Select at least 1 service"
                      : `${selectedServices.length} selected`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServicesOpen(false)}
                    className="rounded-xl bg-[#0c2229] px-4.5 py-2 text-xs font-bold text-[#9bdce6] transition-colors hover:bg-[#132f38] cursor-pointer shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {errors.service && <p className="text-xs font-medium text-red-600 mt-1.5">{errors.service}</p>}
        </div>

        {/* Section 3: Size of Move */}
        <div className="space-y-2">
          <div className="flex items-center justify-between min-h-[1.75rem] mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
              Step 3 • Approximate Move Size
            </label>
            <span className="text-[0.6875rem] text-slate-500 font-normal">For accurate vehicle allocation</span>
          </div>

          <Select value={moveSize} onValueChange={setMoveSize}>
            <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 text-sm font-normal text-slate-900 shadow-2xs focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35">
              <SelectValue placeholder="Select move size" />
            </SelectTrigger>
            <SelectContent>
              {ALDHOUSE_MOVE_SIZES.map((sz) => (
                <SelectItem key={sz} value={sz} className="text-sm py-2">
                  {sz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Section 4: Locations with Generous Gap */}
        <div className="space-y-3">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
            Step 4 • Locations &amp; Access
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Pick-Up */}
            <AldhouseLocationField
              label="Collection / Pick-Up *"
              placeholder="e.g. Cambridge, CB1 or Waterbeach"
              value={pickup}
              onChange={(val) => {
                setPickup(val);
                if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
              }}
              error={errors.pickup}
              helperText="UK address or postcode"
            />

            {/* Delivery / Destination */}
            <AldhouseLocationField
              label={isIntoStorage ? "Delivery Destination" : "Delivery Destination *"}
              placeholder="e.g. London, Oxford, or UK address"
              value={isIntoStorage ? "Aldhouse & Smith Storage, Unit 1 Convent Dr, Waterbeach CB25 9QT" : dropoff}
              readOnly={isIntoStorage}
              onChange={(val) => {
                if (!isIntoStorage) {
                  setDropoff(val);
                  if (errors.dropoff) setErrors((prev) => ({ ...prev, dropoff: undefined }));
                }
              }}
              error={!isIntoStorage ? errors.dropoff : undefined}
              rightAction={
                <button
                  type="button"
                  onClick={() => {
                    const next = !isIntoStorage;
                    setIsIntoStorage(next);
                    if (next) {
                      setDropoff("Aldhouse & Smith Storage, Unit 1 Convent Drive, Waterbeach CB25 9QT");
                      if (errors.dropoff) setErrors((prev) => ({ ...prev, dropoff: undefined }));
                    } else {
                      setDropoff("");
                    }
                  }}
                  className={cn(
                    "text-[0.6875rem] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer border",
                    isIntoStorage
                      ? "bg-[#9bdce6] text-[#0c2229] border-[#9bdce6]"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-[#eefafc] hover:text-[#368b9a]"
                  )}
                >
                  {isIntoStorage ? "✓ Waterbeach Storage" : "+ Going into Storage?"}
                </button>
              }
            />
          </div>
        </div>

        {/* Section 5: Date & Flexibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
          {/* Preferred Date */}
          <div className="space-y-2">
            <div className="flex items-center justify-between min-h-[1.75rem] mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
                Step 5 • Moving Date
              </label>
              <span className="text-[0.6875rem] text-slate-500 font-normal">Approximate</span>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-12 w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-normal text-slate-900 shadow-2xs hover:border-slate-300 transition-colors focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35",
                    !date && "text-slate-400"
                  )}
                >
                  <span className="truncate">
                    {date ? format(date, "EEEE, d MMMM yyyy") : "Select preferred date"}
                  </span>
                  <CalendarDays className="size-4 text-[#368b9a] shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Date Flexibility */}
          <div className="space-y-2">
            <div className="flex items-center justify-between min-h-[1.75rem] mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
                Date Flexibility
              </label>
              <span className="text-[0.6875rem] text-slate-500 font-normal">Can move shift?</span>
            </div>

            <Select value={dateFlexibility} onValueChange={setDateFlexibility}>
              <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 text-sm font-normal text-slate-900 shadow-2xs focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35">
                <SelectValue placeholder="Flexibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact" className="text-sm py-2">Exact date required</SelectItem>
                <SelectItem value="flexible_few_days" className="text-sm py-2">Flexible within ±2 days</SelectItem>
                <SelectItem value="flexible_week" className="text-sm py-2">Flexible within 1-2 weeks</SelectItem>
                <SelectItem value="planning" className="text-sm py-2">Just planning / Rough timeframe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Section 6: Additional Add-ons */}
        <div className="space-y-2.5">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
            Step 6 • Optional Additions
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className={cn(
              "flex items-center gap-3.5 rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer transition-all min-h-[52px]",
              needPacking ? "border-[#0c2229] bg-[#eefafc] text-[#0c2229] shadow-2xs" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}>
              <input
                type="checkbox"
                checked={needPacking}
                onChange={(e) => setNeedPacking(e.target.checked)}
                className="size-4.5 rounded border-slate-300 text-[#0c2229] focus:ring-[#9bdce6]"
              />
              <span className="truncate">Packing Service</span>
            </label>

            <label className={cn(
              "flex items-center gap-3.5 rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer transition-all min-h-[52px]",
              needBoxes ? "border-[#0c2229] bg-[#eefafc] text-[#0c2229] shadow-2xs" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}>
              <input
                type="checkbox"
                checked={needBoxes}
                onChange={(e) => setNeedBoxes(e.target.checked)}
                className="size-4.5 rounded border-slate-300 text-[#0c2229] focus:ring-[#9bdce6]"
              />
              <span className="truncate">Boxes &amp; Supplies</span>
            </label>

            <label className={cn(
              "flex items-center gap-3.5 rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer transition-all min-h-[52px]",
              hasPiano ? "border-[#0c2229] bg-[#eefafc] text-[#0c2229] shadow-2xs" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}>
              <input
                type="checkbox"
                checked={hasPiano}
                onChange={(e) => setHasPiano(e.target.checked)}
                className="size-4.5 rounded border-slate-300 text-[#0c2229] focus:ring-[#9bdce6]"
              />
              <span className="truncate">Piano / Antique</span>
            </label>
          </div>
        </div>

        {/* Section 7: Contact Details */}
        <div className="space-y-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
              Step 7 • Your Contact Information
            </span>
            <span className="text-[0.6875rem] text-slate-500 font-normal">Strictly for your quote</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35"
              />
            </div>

            <div className="space-y-1">
              <input
                type="tel"
                placeholder="Phone (e.g. 01223 861761) *"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={cn(
                  "h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35",
                  errors.phone ? "border-red-500" : "border-slate-200"
                )}
              />
              {errors.phone && <p className="text-xs font-medium text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={cn(
                  "h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35",
                  errors.email ? "border-red-500" : "border-slate-200"
                )}
              />
              {errors.email && <p className="text-xs font-medium text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Preferred Communication Segmented Toggle */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
            <span className="text-xs font-semibold text-slate-700 mr-1.5">Preferred reply channel:</span>
            {(
              [
                { id: "phone" as const, label: "Phone Call", icon: Phone },
                { id: "whatsapp" as const, label: "WhatsApp", icon: MessageSquare },
                { id: "email" as const, label: "Email", icon: Mail },
              ] as const
            ).map((ch) => {
              const active = preferredContact === ch.id;
              const Icon = ch.icon;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setPreferredContact(ch.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                    active
                      ? "border-[#0c2229] bg-[#0c2229] text-[#9bdce6] shadow-2xs"
                      : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-[#eefafc] hover:border-slate-300"
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
            Special Notes / Access Information (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about parking permits, flight of stairs, specific upright/grand piano make, or estimated storage duration..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#368b9a] focus:ring-3 focus:ring-[#9bdce6]/35 resize-y leading-relaxed"
          />
        </div>

        {/* Submit Button with Spacious Margins */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#0c2229] py-4.5 px-7 text-base font-extrabold text-[#9bdce6] shadow-lg shadow-[#0c2229]/20 hover:bg-[#132f38] hover:text-white active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 border border-[#9bdce6]/35 tracking-wide"
          >
            {submitting ? (
              <>
                <Loader2 className="size-5 animate-spin text-[#9bdce6]" />
                <span>Preparing Your Free Quote...</span>
              </>
            ) : (
              <>
                <span>Request Free Fixed-Price Quote</span>
                <ArrowRight className="size-5 text-[#9bdce6]" />
              </>
            )}
          </button>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-xs text-slate-500 font-medium text-center">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#368b9a]" />
              <span>100% Free &amp; Zero Obligation</span>
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-[#368b9a]" />
              <span>Guaranteed Fixed Pricing</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#368b9a]" />
              <span>Fully Insured Removals &amp; Storage</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
