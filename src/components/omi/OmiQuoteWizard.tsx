import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Loader2,
  Building2,
  Recycle,
  Warehouse,
  Package,
  Phone,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  CalendarCheck,
  Building,
  Truck,
  Trash2,
  User,
  Mail,
  MapPin,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  OmiSelect,
  OmiSelectContent,
  OmiSelectItem,
  OmiSelectTrigger,
  OmiSelectValue,
} from "./OmiSelect";
import { OmiLocationField } from "./OmiLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export type OmiMode = "relocation" | "clearance" | "storage" | "crates";

export interface OmiQuotePrefill {
  serviceMode?: OmiMode;
  fromPostcode?: string;
  toPostcode?: string;
  phone?: string;
  email?: string;
  moveDate?: Date;
}

export interface OmiQuoteWizardProps {
  initialMode?: OmiMode;
  prefill?: OmiQuotePrefill;
  className?: string;
  onNavigateHome?: () => void;
}

export const RELOCATION_SERVICES = [
  "Full Commercial Office Relocation",
  "Desktop IT Disconnect & Reconnect",
  "Phased Weekend / Out-of-Hours Move (Zero Downtime)",
  "Plastic Lidded Crate Hire (LC3 & IT6)",
  "CAD Space Planning & Workstation Labeling",
  "Furniture Disassembly & Reassembly",
  "Confidential Archive & File Relocation",
] as const;

export const CLEARANCE_SERVICES = [
  "Office Furniture Clearance & Re-homing",
  "WEEE Certified IT & Electronics Recycling",
  "Zero-to-Landfill Sustainable Disposal",
  "Commercial Dilapidations Strip-Out",
  "Confidential Document Destruction & Shredding",
] as const;

export const STORAGE_SERVICES = [
  "Park Royal NW10 Secure Container Storage",
  "Short-Term Commercial Move Staging",
  "Long-Term Business Archive & Pallet Storage",
  "LC3 Standard Crate Hire & Direct Delivery",
  "IT6 Anti-Static Computer Crates",
] as const;

export const MOVE_SIZES = [
  "1 – 10 Workstations (Small Office)",
  "11 – 30 Workstations (Medium Office)",
  "31 – 75 Workstations (Corporate Floor)",
  "76 – 150 Workstations (Multi-Department)",
  "150+ Workstations (Full Headquarters)",
  "Clearance / Storage Only (No desk moving)",
] as const;

export const ACCESS_OPTIONS = [
  "Goods Lift Available",
  "Passenger Lift Only",
  "Ground Floor (Direct Access)",
  "Stairs Only (1st Floor)",
  "Stairs Only (2nd Floor+)",
  "Dedicated Loading Bay",
  "Red Route / Restricted Parking",
];

const phonePattern = /^[0-9+()\s-]{7,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<
  Record<
    | "service"
    | "moveSize"
    | "pickup"
    | "dropoff"
    | "phone"
    | "email"
    | "companyName"
    | "contactName"
    | "notes",
    string | undefined
  >
>;

export function OmiQuoteWizard({
  initialMode = "relocation",
  prefill,
  className,
  onNavigateHome,
}: OmiQuoteWizardProps) {
  const [activeCategory, setActiveCategory] = useState<"moving" | "clearance" | "storage">(
    initialMode === "clearance"
      ? "clearance"
      : initialMode === "storage" || initialMode === "crates"
      ? "storage"
      : "moving"
  );

  const getAvailableServices = () => {
    if (activeCategory === "clearance") return CLEARANCE_SERVICES;
    if (activeCategory === "storage") return STORAGE_SERVICES;
    return RELOCATION_SERVICES;
  };

  const availableServices = getAvailableServices();

  const [selectedServices, setSelectedServices] = useState<string[]>([
    activeCategory === "clearance"
      ? "Office Furniture Clearance & Re-homing"
      : activeCategory === "storage"
      ? "Park Royal NW10 Secure Container Storage"
      : "Full Commercial Office Relocation",
  ]);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [moveSize, setMoveSize] = useState<string>("11 – 30 Workstations (Medium Office)");
  const [pickup, setPickup] = useState(prefill?.fromPostcode || "");
  const [dropoff, setDropoff] = useState(prefill?.toPostcode || "");
  const [pickupAccess, setPickupAccess] = useState("Goods Lift Available");
  const [deliveryAccess, setDeliveryAccess] = useState("Goods Lift Available");
  const [date, setDate] = useState<Date | undefined>(prefill?.moveDate);
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(prefill?.phone || "");
  const [email, setEmail] = useState(prefill?.email || "");
  const [preferredContact, setPreferredContact] = useState<"phone" | "email" | "whatsapp">("phone");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");

  useEffect(() => {
    if (prefill) {
      if (prefill.fromPostcode) setPickup(prefill.fromPostcode);
      if (prefill.toPostcode) setDropoff(prefill.toPostcode);
      if (prefill.phone) setPhone(prefill.phone);
      if (prefill.email) setEmail(prefill.email);
      if (prefill.moveDate) setDate(prefill.moveDate);
      if (prefill.serviceMode) {
        if (prefill.serviceMode === "clearance") {
          setActiveCategory("clearance");
          setSelectedServices(["Office Furniture Clearance & Re-homing"]);
        } else if (prefill.serviceMode === "storage" || prefill.serviceMode === "crates") {
          setActiveCategory("storage");
          setSelectedServices(["Park Royal NW10 Secure Container Storage"]);
        } else {
          setActiveCategory("moving");
          setSelectedServices(["Full Commercial Office Relocation"]);
        }
      }
    }
  }, [prefill]);

  const handleCategoryChange = (cat: "moving" | "clearance" | "storage") => {
    setActiveCategory(cat);
    if (cat === "clearance") {
      setSelectedServices(["Office Furniture Clearance & Re-homing"]);
      setMoveSize("Clearance / Storage Only (No desk moving)");
    } else if (cat === "storage") {
      setSelectedServices(["Park Royal NW10 Secure Container Storage"]);
      setMoveSize("Clearance / Storage Only (No desk moving)");
    } else {
      setSelectedServices(["Full Commercial Office Relocation"]);
      setMoveSize("11 – 30 Workstations (Medium Office)");
    }
    setErrors({});
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

  function validate(): boolean {
    const next: Errors = {};

    if (selectedServices.length === 0) {
      next.service = "Please select at least one commercial service.";
    }
    if (!pickup.trim()) {
      next.pickup = "Enter your collection or current office address.";
    }
    if (activeCategory === "moving" && !dropoff.trim()) {
      next.dropoff = "Enter your destination or new office address.";
    }
    if (!companyName.trim()) {
      next.companyName = "Enter your company or organisation name.";
    }
    if (!name.trim()) {
      next.contactName = "Enter your contact name & title.";
    }
    if (!phonePattern.test(phone.trim())) {
      next.phone = "Enter a valid direct contact telephone number.";
    }
    if (!emailPattern.test(email.trim())) {
      next.email = "Enter a valid business email address.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required commercial move details.");
      return;
    }
    setSubmitting(true);

    const ref = `OMI-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(ref);

    const payload = {
      service: `[Office Moving International] ${selectedServices.join(", ")}`,
      moveSize: moveSize.trim(),
      pickup: `${pickup.trim()} (Access: ${pickupAccess})`,
      dropoff: activeCategory === "clearance" ? "OMI Eco-Recycling Depot NW10" : `${dropoff.trim()} (Access: ${deliveryAccess})`,
      preferredDate: date ? format(date, "yyyy-MM-dd") : "Flexible / To be confirmed",
      name: `${name.trim()} (${companyName.trim()})`,
      phone: phone.trim(),
      email: email.trim(),
      preferredContact,
      notes: [
        `Company: ${companyName.trim()}`,
        `Preferred Reply: ${preferredContact === "whatsapp" ? "WhatsApp" : preferredContact === "email" ? "Email" : "Phone Call"}`,
        `Access Details: Collection [${pickupAccess}] → Delivery [${deliveryAccess}]`,
        notes ? `Client Notes: ${notes.trim()}` : "",
        `Reference: ${ref}`,
      ]
        .filter(Boolean)
        .join("\n"),
    };

    try {
      const result = await submitQuoteEnquiry({ data: payload });
      if (result.success) {
        toast.success("Commercial quote request received! Reference: " + ref);
        setDone(true);
      } else {
        toast.success("Quote request logged! Reference: " + ref);
        setDone(true);
      }
    } catch {
      toast.success("Quote request received! Our London team will contact you shortly.");
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-400 text-slate-900",
          className
        )}
      >
        <div className="flex items-center gap-3.5 pb-5 border-b border-slate-200">
          <span className="grid size-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 shrink-0">
            <Check className="size-6 stroke-[3]" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#F57619]" />
              <span className="text-xs font-bold text-[#101B3B] uppercase tracking-wide">
                Specification Confirmed • Ref: {quoteReference}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
              Thank You — Commercial Enquiry Received
            </h2>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl">
          A Senior Move Director from Office Moving International will review your relocation requirements for <strong className="text-slate-900">{companyName}</strong> and contact you to schedule your free London on-site survey and provide your itemised proposal.
        </p>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 text-xs">
          {[
            { term: "Services Requested", value: selectedServices.join(", ") },
            { term: "Workstation / Job Scale", value: moveSize },
            { term: "Collection Address", value: `${pickup} (${pickupAccess})` },
            ...(activeCategory !== "clearance" ? [{ term: "Destination Address", value: `${dropoff} (${deliveryAccess})` }] : []),
            { term: "Target Date", value: date ? format(date, "EEEE, d MMMM yyyy") : "Flexible / To be confirmed" },
            { term: "Company / Client", value: `${companyName} — ${name}` },
            { term: "Phone Number", value: phone },
            { term: "Business Email", value: email },
            { term: "Preferred Reply Method", value: preferredContact === "whatsapp" ? "WhatsApp" : preferredContact === "email" ? "Business Email" : "Direct Phone Call" },
            ...(notes ? [{ term: "Specific Notes", value: notes }] : []),
          ].map((row) => (
            <div key={row.term} className="bg-white p-3.5">
              <dt className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {row.term}
              </dt>
              <dd className="mt-1 font-semibold text-slate-900 break-words">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setSelectedServices(["Full Commercial Office Relocation"]);
              setPickup("");
              setDropoff("");
              setDate(undefined);
              setNotes("");
            }}
            className="inline-flex items-center justify-center rounded-xl bg-[#F57619] px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#d86c1e] shadow-md shadow-orange-500/20 cursor-pointer active:scale-[0.99]"
          >
            Submit Another Request
          </button>
          <a
            href="tel:02031883001"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-colors"
          >
            <Phone className="size-3.5 text-[#F57619]" />
            <span>Call Move Controller: 020 3188 3001</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 text-slate-900", className)}>
      {/* Mode Switcher Tabs */}
      <div className="mb-7 grid grid-cols-3 gap-2 rounded-xl bg-slate-100/90 p-1.5 border border-slate-200/90">
        <button
          type="button"
          onClick={() => handleCategoryChange("moving")}
          className={cn(
            "min-h-[46px] flex items-center justify-center gap-2 rounded-lg px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all text-center cursor-pointer",
            activeCategory === "moving"
              ? "bg-[#101B3B] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          )}
        >
          <Building2 className={cn("size-4 shrink-0", activeCategory === "moving" ? "text-[#F57619]" : "text-slate-400")} />
          <span className="leading-tight">Office Relocation</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryChange("clearance")}
          className={cn(
            "min-h-[46px] flex items-center justify-center gap-2 rounded-lg px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all text-center cursor-pointer",
            activeCategory === "clearance"
              ? "bg-[#101B3B] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          )}
        >
          <Recycle className={cn("size-4 shrink-0", activeCategory === "clearance" ? "text-emerald-400" : "text-slate-400")} />
          <span className="leading-tight">Clearance &amp; WEEE</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryChange("storage")}
          className={cn(
            "min-h-[46px] flex items-center justify-center gap-2 rounded-lg px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all text-center cursor-pointer",
            activeCategory === "storage"
              ? "bg-[#101B3B] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
          )}
        >
          <Package className={cn("size-4 shrink-0", activeCategory === "storage" ? "text-[#F57619]" : "text-slate-400")} />
          <span className="leading-tight">Crates &amp; Storage</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-2 pb-5 border-b border-slate-200 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#F57619]" />
            <h2 className="text-xl sm:text-2xl font-black text-[#101B3B] tracking-tight">
              {activeCategory === "moving"
                ? "Commercial Relocation Proposal"
                : activeCategory === "clearance"
                ? "Office Clearance & Recycling Quotation"
                : "Storage & Crate Hire Booking"}
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium max-w-lg leading-relaxed">
            Select your commercial services, job scale, and premises details. We will prepare an accurate, fixed-price quote with zero obligation.
          </p>
        </div>

        <div className="shrink-0 pt-1">
          <span className="text-[11px] font-bold text-[#F57619] bg-[#F57619]/10 px-3 py-1.5 rounded-md border border-[#F57619]/30 uppercase tracking-wide inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            <span>Free London Survey</span>
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Row 1: Services Multiselect + Workstation Scale Select */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Services Popover Dropdown */}
          <div>
            <div className="flex h-5 items-center justify-between mb-2">
              <label
                id="quote-service-label"
                className="text-xs font-bold tracking-wide text-slate-700 uppercase"
              >
                Select Commercial Service(s) <span className="text-[#F57619] font-bold">*</span>
              </label>
              {selectedServices.length > 0 ? (
                <span className="text-xs font-bold text-[#F57619]">
                  {selectedServices.length} selected
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-400">
                  Select 1 or more options
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
                      "flex h-11 w-full items-center justify-between rounded-xl border px-3.5 text-left text-sm font-medium outline-none transition-all cursor-pointer shadow-2xs",
                      errors.service
                        ? "border-rose-400 bg-rose-50/30"
                        : "border-slate-300 bg-slate-50/80 hover:bg-slate-50 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
                    )}
                  >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden pr-2">
                      {selectedServices.length === 0 ? (
                        <span className="text-slate-400 font-normal">
                          Select services (multi-select available)...
                        </span>
                      ) : selectedServices.length === 1 ? (
                        <span className="truncate text-slate-900 font-semibold">
                          {selectedServices[0]}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="truncate text-slate-900 font-semibold">
                            {selectedServices[0]}
                          </span>
                          <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-[#F57619]">
                            +{selectedServices.length - 1} more
                          </span>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-slate-400 transition-transform duration-200",
                        servicesOpen && "rotate-180 text-[#F57619]"
                      )}
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  sideOffset={6}
                  className="w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[440px] p-0 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50 text-slate-900"
                >
                  <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#101B3B]">
                      Available Services ({selectedServices.length} chosen)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllServices}
                        className="text-[11px] font-bold text-[#F57619] hover:underline cursor-pointer"
                      >
                        {availableServices.every((item) => selectedServices.includes(item))
                          ? "Deselect all"
                          : "Select all"}
                      </button>
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedServices([])}
                          className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="px-3 py-1.5 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-[11px] text-slate-500">
                      💡 Select all services you would like included in your itemised proposal
                    </p>
                  </div>

                  <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                    {availableServices.map((item) => {
                      const isChecked = selectedServices.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleService(item)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer select-none",
                            isChecked
                              ? "bg-orange-50/80 text-slate-900 font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <div
                            className={cn(
                              "grid size-4 shrink-0 place-content-center rounded border transition-colors",
                              isChecked
                                ? "border-[#F57619] bg-[#F57619] text-white"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {isChecked && <Check className="size-3 stroke-[3]" />}
                          </div>
                          <span className="flex-1 leading-snug">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {selectedServices.length === 0
                        ? "Select at least 1 service"
                        : `${selectedServices.length} selected`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(false)}
                      className="rounded-lg bg-[#101B3B] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1E2E5D] transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {errors.service && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.service}</p>
            )}
          </div>

          {/* Workstation / Job Scale Select */}
          <div>
            <div className="flex h-5 items-center mb-2">
              <label
                id="quote-size-label"
                className="text-xs font-bold tracking-wide text-slate-700 uppercase"
              >
                Select Workplace / Move Size <span className="text-[#F57619] font-bold">*</span>
              </label>
            </div>
            <div className="relative">
              <OmiSelect value={moveSize} onValueChange={(val) => setMoveSize(val)}>
                <OmiSelectTrigger className="h-11">
                  <OmiSelectValue placeholder="Select move size" />
                </OmiSelectTrigger>
                <OmiSelectContent>
                  {MOVE_SIZES.map((size) => (
                    <OmiSelectItem key={size} value={size}>
                      {size}
                    </OmiSelectItem>
                  ))}
                </OmiSelectContent>
              </OmiSelect>
            </div>
          </div>
        </div>

        {/* Row 2: Location Fields & Lift Access */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Pickup Address & Floor Access */}
          <div className="space-y-4">
            <OmiLocationField
              id="pickup-address"
              label={
                activeCategory === "moving"
                  ? "Collection / Current Office Address"
                  : "Collection / Site Address"
              }
              placeholder="e.g. EC2A 2BB or London street"
              value={pickup}
              onChange={(val) => {
                setPickup(val);
                if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
              }}
              error={errors.pickup}
              required
              type="collection"
            />
            <div>
              <div className="flex h-5 items-center mb-2">
                <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                  Collection Floor / Lift Access
                </label>
              </div>
              <OmiSelect value={pickupAccess} onValueChange={setPickupAccess}>
                <OmiSelectTrigger className="h-11 text-sm font-medium">
                  <OmiSelectValue placeholder="Select access" />
                </OmiSelectTrigger>
                <OmiSelectContent>
                  {ACCESS_OPTIONS.map((opt) => (
                    <OmiSelectItem key={opt} value={opt}>
                      {opt}
                    </OmiSelectItem>
                  ))}
                </OmiSelectContent>
              </OmiSelect>
            </div>
          </div>

          {/* Delivery Address & Floor Access or Clearance Notice */}
          {activeCategory !== "clearance" ? (
            <div className="space-y-4">
              <OmiLocationField
                id="dropoff-address"
                label="Destination / New Office Address"
                placeholder="e.g. E14 5AB or Canary Wharf"
                value={dropoff}
                onChange={(val) => {
                  setDropoff(val);
                  if (errors.dropoff) setErrors((prev) => ({ ...prev, dropoff: undefined }));
                }}
                error={errors.dropoff}
                required
                type="delivery"
              />
              <div>
                <div className="flex h-5 items-center mb-2">
                  <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                    Destination Floor / Lift Access
                  </label>
                </div>
                <OmiSelect value={deliveryAccess} onValueChange={setDeliveryAccess}>
                  <OmiSelectTrigger className="h-11 text-sm font-medium">
                    <OmiSelectValue placeholder="Select access" />
                  </OmiSelectTrigger>
                  <OmiSelectContent>
                    {ACCESS_OPTIONS.map((opt) => (
                      <OmiSelectItem key={opt} value={opt}>
                        {opt}
                      </OmiSelectItem>
                    ))}
                  </OmiSelectContent>
                </OmiSelect>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[178px] rounded-xl border border-slate-200 bg-slate-50/80 p-5 flex flex-col justify-center">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Recycle className="size-4 text-emerald-600" />
                <span>Destination: OMI Licensed Recycling Depot</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Surplus furniture, confidential paper registries, and WEEE materials are transported directly to our certified zero-to-landfill recycling facilities in Park Royal NW10.
              </p>
            </div>
          )}
        </div>

        {/* Row 3: Company & Contact Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="flex h-5 items-center mb-2">
              <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                Company / Organisation Name <span className="text-[#F57619] font-bold">*</span>
              </label>
            </div>
            <div className="relative">
              <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }));
                }}
                placeholder="e.g. Acme Media Ltd or NHS Trust"
                className={cn(
                  "w-full h-11 pl-10 pr-3.5 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all outline-none",
                  errors.companyName
                    ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/80 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
                )}
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.companyName}</p>
            )}
          </div>

          <div>
            <div className="flex h-5 items-center mb-2">
              <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                Your Name &amp; Title <span className="text-[#F57619] font-bold">*</span>
              </label>
            </div>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.contactName) setErrors((prev) => ({ ...prev, contactName: undefined }));
                }}
                placeholder="e.g. James Smith (Facilities Director)"
                className={cn(
                  "w-full h-11 pl-10 pr-3.5 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all outline-none",
                  errors.contactName
                    ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/80 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
                )}
              />
            </div>
            {errors.contactName && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.contactName}</p>
            )}
          </div>
        </div>

        {/* Row 4: 3-Column Layout (Date, Phone, Email) */}
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Target Date with Popover Calendar */}
          <div>
            <div className="flex h-5 items-center mb-2">
              <span className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                Target Move Date
              </span>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-xl border px-3.5 text-left text-sm font-medium outline-none transition-all hover:border-slate-400 cursor-pointer shadow-2xs",
                    date ? "text-slate-900 font-semibold" : "text-slate-400",
                    "border-slate-300 bg-slate-50/80 hover:bg-slate-50 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
                  )}
                >
                  <span className="truncate">
                    {date ? format(date, "EEEE, d MMM yyyy") : "Select date (or flexible)"}
                  </span>
                  <CalendarDays className="size-4 shrink-0 text-[#F57619]" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-2 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl z-50"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={{ before: new Date() }}
                  className="rounded-lg text-slate-900"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Direct Phone */}
          <div>
            <div className="flex h-5 items-center mb-2">
              <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                Direct Phone Number <span className="text-[#F57619] font-bold">*</span>
              </label>
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="020 3188 3001 or mobile"
                className={cn(
                  "w-full h-11 pl-10 pr-3.5 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all outline-none",
                  errors.phone
                    ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/80 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
                )}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <div className="flex h-5 items-center mb-2">
              <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
                Business Email <span className="text-[#F57619] font-bold">*</span>
              </label>
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@company.co.uk"
                className={cn(
                  "w-full h-11 pl-10 pr-3.5 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all outline-none",
                  errors.email
                    ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-300 bg-slate-50/80 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
                )}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Row 5: Preferred Reply Method (Sleek pill control matching reference) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          <span className="text-sm font-medium text-slate-600 shrink-0">
            Preferred reply method:
          </span>
          <div className="inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200/80 w-fit">
            {(
              [
                { id: "phone", label: "Phone Call" },
                { id: "email", label: "Email" },
                { id: "whatsapp", label: "WhatsApp" },
              ] as const
            ).map((method) => {
              const active = preferredContact === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPreferredContact(method.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer select-none",
                    active
                      ? "bg-white text-slate-900 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {method.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 6: Project Notes */}
        <div>
          <div className="flex h-5 items-center mb-2">
            <label className="text-xs font-bold tracking-wide text-slate-700 uppercase">
              Project Brief, Lift Access or Special Requirements <span className="text-slate-400 font-normal lowercase">(Optional)</span>
            </label>
          </div>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Loading bay booking required 48hrs prior; 40 IT crates needed 1 week before move; fragile boardroom table."
            className="w-full rounded-xl border border-slate-300 bg-slate-50/80 p-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10 shadow-2xs transition-all"
          />
        </div>

        {/* Submit Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-700">100% Free &amp; Fixed-Price Guarantee • No Obligation</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#F57619] hover:bg-[#d86c1e] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer active:scale-[0.99]"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4.5 animate-spin" />
                <span>Preparing Relocation Specification...</span>
              </>
            ) : (
              <>
                <span>Request Free Commercial Quote</span>
                <ArrowRight className="size-4.5 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
