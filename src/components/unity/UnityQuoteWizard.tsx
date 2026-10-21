import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck2,
  Leaf,
  Loader2,
  PackageOpen,
  Recycle,
  Sparkles,
  Trash2,
  Truck,
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
import { UnityLocationField } from "./UnityLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export const UNITY_DOMESTIC_SERVICES = [
  "House Clearance",
  "Flat Clearance",
  "Loft & Attic Clearance",
  "Garage & Shed Clearance",
  "Probate & Bereavement Clearance",
  "End of Tenancy Clearance",
  "Hoarder & Extreme Clearance",
  "White Goods & Appliance Removal",
  "Furniture Disposal (Sofa, Bed, Mattress)",
  "Garden Waste Removal",
] as const;

export const UNITY_COMMERCIAL_SERVICES = [
  "Office Clearance & IT Disposal",
  "Retail & Shop Strip-Out",
  "Warehouse & Factory Clearance",
  "Builders & Renovation Waste (Skip Alternative)",
  "Restaurant & Hospitality Clearance",
  "Secure Document Disposal",
] as const;

export const UNITY_LOAD_SIZES = [
  "Single Item (e.g. Sofa, Fridge)",
  "A Few Bulky Items",
  "1/4 Van Load (~30-40 bin bags)",
  "1/2 Van Load (~60-70 bin bags)",
  "3/4 Van Load (~90-100 bin bags)",
  "Full Van Load (Standard Tipper/Luton)",
  "Multiple Van Loads (Full Property)",
  "Custom Commercial Clearance",
] as const;

type Errors = Partial<
  Record<
    "service" | "moveSize" | "pickup" | "date" | "phone" | "email" | "notes",
    string | undefined
  >
>;

const phonePattern = /^[0-9+()\s-]{7,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface UnityQuoteWizardProps {
  className?: string;
}

export function UnityQuoteWizard({ className }: UnityQuoteWizardProps) {
  const [mode, setMode] = useState<"domestic" | "commercial">("domestic");
  const isDomestic = mode === "domestic";
  const availableServices = isDomestic ? UNITY_DOMESTIC_SERVICES : UNITY_COMMERCIAL_SERVICES;

  const [selectedServices, setSelectedServices] = useState<string[]>([
    isDomestic ? "House Clearance" : "Office Clearance & IT Disposal",
  ]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [loadSize, setLoadSize] = useState<string>("1/2 Van Load (~60-70 bin bags)");
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "whatsapp" | "email">("phone");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSelectedServices([isDomestic ? "House Clearance" : "Office Clearance & IT Disposal"]);
    setErrors({});
  }, [mode, isDomestic]);

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

  function validate(): boolean {
    const next: Errors = {};

    if (selectedServices.length === 0) {
      next.service = "Please select at least one clearance service.";
    }
    if (!pickup.trim()) {
      next.pickup = "Enter your collection address or postcode.";
    }
    if (!phonePattern.test(phone.trim())) {
      next.phone = "Enter a valid UK contact phone number.";
    }
    if (!emailPattern.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!notes.trim()) {
      next.notes = "Please provide brief details of the waste items and property access.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      service: selectedServices.join(", "),
      moveSize: loadSize,
      pickup: pickup.trim(),
      dropoff: "",
      preferredDate: date ? format(date, "yyyy-MM-dd") : "",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      preferredContact,
      notes: notes.trim(),
    };

    try {
      const result = await submitQuoteEnquiry({ data: payload });

      if (result.success) {
        toast.success("Quote request received! Unity Waste will contact you shortly.");
        setDone(true);
        setSubmitting(false);
        return;
      }

      toast.error(result.error || "Could not send quote request. Please call 01244 566348.");
    } catch (err) {
      console.warn("Quote submission failed:", err);
      toast.error("Could not send quote request. Please call 01244 566348.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-500",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-[#b96be8]/15">
            <Check className="size-6 text-[#b96be8]" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#b96be8]">
            Request Received
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-5">
          Thank you — we&apos;ve received your clearance enquiry!
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-gray-600 text-xs sm:text-sm md:text-base">
          A member of the Unity Waste Removal team will review your details and get back to you
          promptly with a competitive, fixed-price quote.
        </p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
          {[
            { term: "Clearance Type", value: isDomestic ? "Domestic Clearance" : "Commercial & Trade" },
            { term: "Services Selected", value: selectedServices.join(", ") },
            { term: "Estimated Load Size", value: loadSize },
            { term: "Collection Address", value: pickup },
            {
              term: "Preferred Date",
              value: date ? format(date, "EEEE, d MMMM yyyy") : "Flexible / ASAP",
            },
            {
              term: "Preferred Contact",
              value:
                preferredContact === "whatsapp"
                  ? "WhatsApp Message"
                  : preferredContact === "email"
                    ? "Email"
                    : "Phone Call",
            },
            { term: "Phone Number", value: phone },
            { term: "Email Address", value: email },
            ...(name ? [{ term: "Contact Name", value: name }] : []),
          ].map((row) => (
            <div key={row.term} className="bg-white p-4">
              <dt className="text-[0.6875rem] font-bold tracking-[0.16em] text-gray-500 uppercase">
                {row.term}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900 break-words">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setSelectedServices([isDomestic ? "House Clearance" : "Office Clearance & IT Disposal"]);
              setPickup("");
              setDate(undefined);
              setNotes("");
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#b96be8] px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#a249d9] shadow-md cursor-pointer"
          >
            Submit Another Clearance Request
          </button>
          <a
            href="tel:+441244566348"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-6 py-3.5 text-sm font-bold text-gray-800 transition-colors hover:bg-gray-100"
          >
            Call Us: 01244 566348
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 md:p-10 shadow-2xl transition-all duration-300",
        className,
      )}
    >
      {/* Mode Switcher */}
      <div className="mb-6 flex rounded-2xl bg-gray-100 p-1.5 border border-gray-200">
        <button
          type="button"
          onClick={() => setMode("domestic")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
            isDomestic
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900",
          )}
        >
          <Trash2 className="size-4 text-[#b96be8]" />
          <span>Domestic Clearances</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("commercial")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
            !isDomestic
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900",
          )}
        >
          <Truck className="size-4 text-[#b96be8]" />
          <span>Commercial &amp; Trade</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3 pb-6 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#b96be8] border border-purple-100 uppercase tracking-wider">
            <Leaf className="size-3.5 text-[#10b981]" />
            <span>Environment Agency Licensed Carrier</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mt-2">
            {isDomestic ? "Domestic Clearance Quote" : "Commercial Waste Quote"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 font-medium max-w-lg leading-relaxed">
            {isDomestic
              ? "Fast, fixed-price property clearances across Ellesmere Port, Chester, Wirral, and Cheshire."
              : "Fully licensed commercial clearances, trade waste, office relocations, and builders debris."}
          </p>
        </div>

        <div className="shrink-0 pt-1 flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm">
            <Recycle className="size-4 text-emerald-600" />
            <span className="leading-tight">Green Apple<br />Award Winner</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Services Popover */}
          <div>
            <div className="flex items-center justify-between">
              <label
                id="unity-service-label"
                className="block text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase"
              >
                Clearance Service(s) *
              </label>
              {selectedServices.length > 0 ? (
                <span className="text-[0.6875rem] font-semibold text-[#b96be8]">
                  {selectedServices.length} selected
                </span>
              ) : (
                <span className="text-[0.6875rem] font-medium text-gray-500">
                  Select 1 or more
                </span>
              )}
            </div>

            <div className="relative mt-2.5">
              <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-labelledby="unity-service-label"
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-4 text-left text-sm font-medium outline-none transition-all duration-300 hover:border-gray-400 focus:border-[#b96be8] focus:ring-4 focus:ring-[#b96be8]/15 cursor-pointer",
                      errors.service ? "border-red-500" : "border-gray-200",
                    )}
                  >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden pr-2">
                      {selectedServices.length === 0 ? (
                        <span className="text-gray-400 font-normal">
                          Select clearance services...
                        </span>
                      ) : selectedServices.length === 1 ? (
                        <span className="truncate text-gray-900 font-semibold">
                          {selectedServices[0]}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="truncate text-gray-900 font-semibold">
                            {selectedServices[0]}
                          </span>
                          <span className="shrink-0 rounded-full bg-[#b96be8]/15 px-2 py-0.5 text-xs font-bold text-[#b96be8]">
                            +{selectedServices.length - 1} more
                          </span>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-gray-500 transition-transform duration-200",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  sideOffset={6}
                  className="w-[calc(100vw-2.5rem)] sm:w-[380px] max-w-[420px] p-0 rounded-2xl border border-gray-100 bg-white shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-gray-100 bg-purple-50/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">
                      {isDomestic ? "Domestic Services" : "Commercial Services"} ({selectedServices.length} selected)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllServices}
                        className="text-[0.6875rem] font-bold text-[#b96be8] hover:underline cursor-pointer"
                      >
                        {availableServices.every((item) => selectedServices.includes(item))
                          ? "Deselect all"
                          : "Select all"}
                      </button>
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedServices([])}
                          className="text-[0.6875rem] font-semibold text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1 max-h-64 overflow-y-auto">
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
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-all duration-150 cursor-pointer select-none",
                            isChecked
                              ? "bg-[#b96be8]/10 text-gray-900 font-semibold"
                              : "text-gray-700 hover:bg-gray-50",
                          )}
                        >
                          <div
                            className={cn(
                              "grid size-4 shrink-0 place-content-center rounded border transition-colors",
                              isChecked
                                ? "border-[#b96be8] bg-[#b96be8] text-white"
                                : "border-gray-300 bg-white",
                            )}
                          >
                            {isChecked && <Check className="size-3 stroke-[3]" />}
                          </div>
                          <span className="flex-1 text-sm">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <span className="text-[0.6875rem] text-gray-600 px-1 font-medium">
                      {selectedServices.length === 0
                        ? "Pick at least 1 service"
                        : `${selectedServices.length} selected`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(false)}
                      className="rounded-xl bg-[#b96be8] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#a249d9] cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {errors.service && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.service}</p>
            )}
          </div>

          {/* Load / Van Size Select */}
          <div>
            <label
              id="unity-size-label"
              className="block text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase"
            >
              Estimated Load / Van Size <span className="text-[#b96be8]">*</span>
            </label>
            <div className="relative mt-2.5">
              <Select value={loadSize} onValueChange={setLoadSize}>
                <SelectTrigger
                  aria-labelledby="unity-size-label"
                  className="rounded-2xl border-gray-200 bg-white py-4 text-sm font-semibold text-gray-900 focus:border-[#b96be8] focus:ring-[#b96be8]/15"
                >
                  <SelectValue placeholder="Select load size" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-gray-100 bg-white shadow-2xl p-1.5">
                  {UNITY_LOAD_SIZES.map((size) => (
                    <SelectItem key={size} value={size} className="rounded-xl py-2.5 font-medium">
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Collection Address */}
        <div>
          <UnityLocationField
            label="Collection Address / Postcode *"
            placeholder="e.g. 56 Oliver Ln, Great Sutton, Ellesmere Port or CH66 3NU"
            value={pickup}
            onChange={(val) => {
              setPickup(val);
              if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
            }}
            error={errors.pickup}
          />
        </div>

        {/* Contact Preference */}
        <div>
          <label
            id="unity-contact-pref-label"
            className="block text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase"
          >
            How do you prefer us to reply? <span className="text-[#b96be8]">*</span>
          </label>
          <div className="relative mt-2.5">
            <Select
              value={preferredContact}
              onValueChange={(val) => setPreferredContact(val as "phone" | "whatsapp" | "email")}
            >
              <SelectTrigger
                aria-labelledby="unity-contact-pref-label"
                className="rounded-2xl border-gray-200 bg-white py-4 text-sm font-semibold text-gray-900 focus:border-[#b96be8] focus:ring-[#b96be8]/15"
              >
                <SelectValue placeholder="Preferred contact method" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100 bg-white shadow-2xl p-1.5">
                <SelectItem value="phone" className="rounded-xl py-2.5">Phone Call</SelectItem>
                <SelectItem value="whatsapp" className="rounded-xl py-2.5">WhatsApp Message</SelectItem>
                <SelectItem value="email" className="rounded-xl py-2.5">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferred Date & Contacts */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <span className="block text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase">
              Preferred Date
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "mt-2.5 flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-4 text-left text-sm outline-none transition-all duration-300 hover:border-gray-400 focus:border-[#b96be8] focus:ring-4 focus:ring-[#b96be8]/15 cursor-pointer",
                    date ? "text-gray-900 font-semibold" : "text-gray-500",
                    "border-gray-200",
                  )}
                >
                  <span className="truncate">
                    {date ? format(date, "d MMM yyyy") : "Select date"}
                  </span>
                  <CalendarDays className="size-4 shrink-0 text-[#b96be8]" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-2 rounded-2xl border border-gray-100 bg-white shadow-2xl max-w-[calc(100vw-2rem)] overflow-hidden"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={{ before: new Date() }}
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block">
              <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase">
                Phone Number <span className="text-[#b96be8]">*</span>
              </span>
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="01244 566348 / 07940 771690"
                className={cn(
                  "mt-2.5 w-full rounded-2xl border bg-white px-4 py-3.5 sm:py-4 text-base sm:text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#b96be8] focus:ring-4 focus:ring-[#b96be8]/15",
                  errors.phone ? "border-red-500" : "border-gray-200",
                )}
              />
            </label>
            {errors.phone && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block">
              <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase">
                Email Address <span className="text-[#b96be8]">*</span>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.co.uk"
                className={cn(
                  "mt-2.5 w-full rounded-2xl border bg-white px-4 py-3.5 sm:py-4 text-base sm:text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#b96be8] focus:ring-4 focus:ring-[#b96be8]/15",
                  errors.email ? "border-red-500" : "border-gray-200",
                )}
              />
            </label>
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Waste Items / Notes */}
        <div>
          <label className="block">
            <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase">
              Waste Items Description &amp; Property Access <span className="text-[#b96be8]">*</span>
            </span>
            <div className="mt-2 space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Please describe the items to be cleared, property access (ground floor, flat with stairs, driveway access), and if any heavy materials (soil, bricks, plasterboard, tiles) are involved.
              </p>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  if (errors.notes) setErrors((prev) => ({ ...prev, notes: undefined }));
                }}
                placeholder="e.g. 1 x 3-seater sofa, old washing machine, ~15 bags of garage clutter. Good driveway parking right outside..."
                className={cn(
                  "w-full resize-none rounded-2xl border bg-white px-4 py-3.5 text-base sm:text-sm leading-relaxed outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#b96be8] focus:ring-4 focus:ring-[#b96be8]/15",
                  errors.notes ? "border-red-500" : "border-gray-200",
                )}
              />
              {errors.notes && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{errors.notes}</p>
              )}
            </div>
          </label>
        </div>

        {/* Submit row */}
        <div className="pt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={submitting}
            className="group w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#b96be8] px-6 py-4 sm:px-8 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:gap-3.5 hover:bg-[#a249d9] hover:shadow-xl hover:shadow-purple-500/35 disabled:opacity-70 cursor-pointer"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin shrink-0" />
            ) : (
              <PackageOpen className="size-4 shrink-0" />
            )}
            <span>
              {submitting ? "Sending Quote Request…" : "Get a Free Waste Removal Quote"}
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs font-bold text-gray-700">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Check className="size-4 text-[#10b981] shrink-0" strokeWidth={3} />
              <span>Fixed Price Guarantee</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <FileCheck2 className="size-4 text-[#b96be8] shrink-0" />
              <span>Waste Transfer Note</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="size-4 text-[#10b981] shrink-0" />
              <span>Zero-to-Landfill Goal</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
