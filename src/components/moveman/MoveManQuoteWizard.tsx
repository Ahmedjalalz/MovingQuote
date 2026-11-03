import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Building2,
  Cpu,
  Package,
  Recycle,
  Loader2,
  Phone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Warehouse,
  X,
  Sparkles,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  MoveManSelect,
  MoveManSelectContent,
  MoveManSelectItem,
  MoveManSelectTrigger,
  MoveManSelectValue,
} from "./MoveManSelect";
import { MoveManLocationField } from "./MoveManLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export type MoveManMode = "commercial" | "it_management" | "storage_crates" | "machinery_clearance";

export const MOVEMAN_MODES: Array<{
  id: MoveManMode;
  label: string;
  badge: string;
  icon: typeof Building2;
}> = [
  {
    id: "commercial",
    label: "Business Moving",
    badge: "Office & Campuses",
    icon: Building2,
  },
  {
    id: "it_management",
    label: "Move Management & IT",
    badge: "CAD & Server Racks",
    icon: Cpu,
  },
  {
    id: "storage_crates",
    label: "Packing & Storage",
    badge: "Crates & Warehousing",
    icon: Package,
  },
  {
    id: "machinery_clearance",
    label: "Clearance & Recycling",
    badge: "WEEE & Machinery",
    icon: Recycle,
  },
];

export const SERVICE_OPTIONS: Record<MoveManMode, string[]> = {
  commercial: [
    "Full Office Relocation (Desks, Seating & Tech)",
    "Internal Department Reconfiguration & Restructure",
    "Multi-Phase Staged Corporate Relocation",
    "University / College Campus Relocation",
    "School & Educational Facility Move",
    "Healthcare / Clinic Relocation",
    "Out-of-Hours / Weekend Relocation",
  ],
  it_management: [
    "Dedicated Move Project Manager on Site",
    "Space & Floor Planning (AutoCAD Layouts)",
    "Desktop PC & Dual-Monitor Disconnect / Reconnect",
    "Server Rack & Data Centre Equipment Transport",
    "Data Cable Management & Patching",
    "IT Hardware Asset Audit & Logging",
    "Employee Move Orientation & Helpdesk Support",
  ],
  storage_crates: [
    "Heavy-Duty Lidded Plastic Crate Hire (Standard & IT)",
    "Crate Delivery & Collection Nationwide",
    "Professional Crate Packing & Labeling Service",
    "Short-Term Transition Warehouse Storage",
    "Long-Term Commercial Container Storage",
    "Confidential Document & Archive Storage",
  ],
  machinery_clearance: [
    "Heavy Industrial Machinery Moving",
    "Laboratory & Sensitive Apparatus Relocation",
    "Factory / Workshop Plant Transition",
    "WEEE Compliant Electronics Disposal",
    "Redundant Office Furniture Clearance",
    "Reusable Office Furniture Buyback / Resale",
    "Zero-to-Landfill Environmental Audit Certificate",
  ],
};

export const SCALE_OPTIONS = [
  "Small Office / Team (1 - 10 Workstations)",
  "Medium Business (11 - 35 Workstations)",
  "Large Corporate Department (36 - 80 Workstations)",
  "Corporate HQ / Multi-Floor (81 - 200+ Workstations)",
  "Educational Campus / Multi-Site College",
  "Server Room / IT Data Infrastructure Only",
  "Specialist Plant / Heavy Machinery Only",
  "Commercial Warehouse / Distribution Unit",
  "Office Clearance & Asset Recycling Only",
] as const;

export const ACCESS_COMBINED_OPTIONS = [
  "Ground Floor — Dedicated Loading Bay / Easy Access",
  "Goods / Service Lift Available (Any Floor)",
  "Passenger Lift Only (Dimensions Limited)",
  "1st - 2nd Floor (Stairs Only, No Lift)",
  "3rd+ Floor High-Rise (Stairs Only, Difficult Access)",
  "Basement / Lower Ground Level",
  "Entire Multi-Floor Building Access",
  "Street Parking / Red Route Permit Required",
] as const;

type DestinationType = "address" | "storage" | "clearance";

type FormErrors = Partial<
  Record<
    | "services"
    | "scale"
    | "pickup"
    | "dropoff"
    | "date"
    | "companyName"
    | "contactName"
    | "phone"
    | "email"
    | "notes",
    string
  >
>;

const phonePattern = /^[0-9+()\s-]{7,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function MoveManQuoteWizard({ className }: { className?: string }) {
  const [activeMode, setActiveMode] = useState<MoveManMode>("commercial");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    SERVICE_OPTIONS.commercial[0] || "",
  ]);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [scale, setScale] = useState<string>("Medium Business (11 - 35 Workstations)");
  const [pickup, setPickup] = useState("");
  const [pickupAccess, setPickupAccess] = useState<string>(
    "Ground Floor — Dedicated Loading Bay / Easy Access"
  );

  const [destinationType, setDestinationType] = useState<DestinationType>("address");
  const [dropoff, setDropoff] = useState("");
  const [dropoffAccess, setDropoffAccess] = useState<string>(
    "Goods / Service Lift Available (Any Floor)"
  );

  const [moveDate, setMoveDate] = useState<Date | undefined>(undefined);
  const [isFlexibleDate, setIsFlexibleDate] = useState(false);
  const [isOutOfHours, setIsOutOfHours] = useState(false);

  // Contact details
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "email">("phone");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableServices = SERVICE_OPTIONS[activeMode];

  const handleModeChange = (modeId: MoveManMode) => {
    setActiveMode(modeId);
    setSelectedServices([SERVICE_OPTIONS[modeId][0] || ""]);
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const toggleService = (srv: string) => {
    setSelectedServices((prev) => {
      const next = prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv];
      if (errors.services && next.length > 0) {
        setErrors((errs) => ({ ...errs, services: undefined }));
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
      if (errors.services) {
        setErrors((errs) => ({ ...errs, services: undefined }));
      }
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (selectedServices.length === 0) {
      errs.services = "Please select at least one service.";
    }

    if (!pickup.trim()) {
      errs.pickup = "Collection address or UK postcode is required.";
    }

    if (destinationType === "address" && !dropoff.trim()) {
      errs.dropoff = "Destination address or UK postcode is required.";
    }

    if (!companyName.trim()) {
      errs.companyName = "Company or organisation name is required.";
    }

    if (!contactName.trim()) {
      errs.contactName = "Contact person name is required.";
    }

    if (!phone.trim()) {
      errs.phone = "Contact telephone number is required.";
    } else if (!phonePattern.test(phone.trim())) {
      errs.phone = "Please enter a valid UK telephone number.";
    }

    if (!email.trim()) {
      errs.email = "Business email address is required.";
    } else if (!emailPattern.test(email.trim())) {
      errs.email = "Please enter a valid business email.";
    }

    if (!notes.trim()) {
      errs.notes = "Please provide brief details of your move or project scope.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in the required fields marked in red.");
      return;
    }

    setIsSubmitting(true);

    const formattedDate = isFlexibleDate
      ? "Flexible / Phased Schedule"
      : moveDate
      ? format(moveDate, "dd/MM/yyyy")
      : "Not specified";

    const destinationSummary =
      destinationType === "storage"
        ? "Move into MoveMan Secure Storage Facility"
        : destinationType === "clearance"
        ? "Zero-to-Landfill Clearance / Recycling (No Delivery)"
        : dropoff;

    const payload = {
      service: selectedServices.join(" | "),
      moveSize: scale || "Commercial Relocation Project",
      pickup: `${pickup} (Access: ${pickupAccess})`,
      dropoff: `${destinationSummary} (Access: ${dropoffAccess})`,
      preferredDate: `${formattedDate}${isOutOfHours ? " [Out-of-Hours / Weekend Required]" : ""}`,
      name: `${contactName} (${jobTitle || "Business Client"}) - ${companyName}`,
      phone: phone.trim(),
      email: email.trim(),
      // Absolutely NO WINZ (UK Commercial Move)
      isWinsQuote: false,
      isWinzQuote: false,
      preferredContact,
      notes: `[MoveMan Commercial Relocation] ${notes.trim()}`,
    };

    try {
      const res = await submitQuoteEnquiry({ data: payload });
      if (res.success) {
        setIsSuccess(true);
        toast.success("Quote request submitted! Our Senior Move Manager will respond promptly.");
      } else {
        toast.error(res.error || "Submission failed. Please call our team on 0800 246 5642.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please call 0800 246 5642.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 md:p-12 shadow-xl ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-500",
          className
        )}
      >
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex size-20 items-center justify-center rounded-full bg-[#8DC63F]/20 text-[#8DC63F] border-2 border-[#8DC63F]">
            <CheckCircle2 className="size-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7cb334] bg-[#8DC63F]/15 px-3.5 py-1 rounded-full border border-[#8DC63F]/30">
              Commercial Quote Received
            </span>
            <h2 className="font-['Barlow',sans-serif] text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thank You, {contactName || "Valued Client"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Your relocation enquiry for <strong>{companyName}</strong> has been assigned to a Senior Move Manager at Move Management Asset Removals Ltd.
            </p>
          </div>

          <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 text-left">
            {[
              { term: "Relocation Category", value: MOVEMAN_MODES.find((m) => m.id === activeMode)?.label },
              { term: "Selected Services", value: selectedServices.join(", ") },
              { term: "Project Scale", value: scale },
              { term: "Collection Location", value: pickup },
              {
                term: "Destination",
                value:
                  destinationType === "address"
                    ? dropoff
                    : destinationType === "storage"
                    ? "MoveMan Warehouse Storage"
                    : "Asset Clearance / Recycling",
              },
              {
                term: "Preferred Date",
                value: isFlexibleDate ? "Flexible / Phased Schedule" : moveDate ? format(moveDate, "dd MMMM yyyy") : "Flexible",
              },
              { term: "Company / Client", value: `${companyName} (${contactName})` },
              { term: "Contact Phone", value: phone },
            ].map((row) => (
              <div key={row.term} className="bg-white p-4">
                <dt className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  {row.term}
                </dt>
                <dd className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 break-words">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:08002465642"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#151515] px-6 py-3.5 text-sm font-bold text-white hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <Phone className="size-4 text-[#8DC63F]" />
              <span>Call Move Team: 0800 246 5642</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setNotes("");
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Submit Another Enquiry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 md:p-11 shadow-xl ring-1 ring-slate-900/5",
        className
      )}
    >
      {/* 1. Header with Eyebrow, Title and Subtitle */}
      <div className="space-y-2 pb-6 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <span className="size-2 rounded-full bg-[#8DC63F] animate-pulse" />
          <span>Move Management Asset Removals Ltd &bull; UK Nationwide</span>
        </div>
        <h2 className="font-['Barlow',sans-serif] text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Get a Fast Fixed-Price Commercial Quote
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
          Direct commercial relocation planning, removals &amp; project management across the UK. Zero operational downtime.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-7">
        {/* Step 1: Relocation Category Selector (Spacious & Crisp, based on the project's mode design) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
              1. Select Relocation Category
            </label>
            <span className="text-xs font-semibold text-slate-500">
              Click to switch service stream
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {MOVEMAN_MODES.map((item) => {
              const Icon = item.icon;
              const isSelected = activeMode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl text-center transition-all duration-200 cursor-pointer min-h-[82px] sm:min-h-[88px] group select-none",
                    isSelected
                      ? "border-2 border-[#8DC63F] bg-[#8DC63F]/12 text-slate-950 ring-2 ring-[#8DC63F]/20 shadow-2xs scale-[1.01]"
                      : "border border-slate-200/90 bg-white hover:border-[#8DC63F]/60 hover:bg-slate-50/70 text-slate-700 shadow-2xs"
                  )}
                >
                  <span
                    className={cn(
                      "size-8.5 rounded-xl flex items-center justify-center mb-1.5 transition-colors",
                      isSelected
                        ? "bg-[#8DC63F] text-slate-950 shadow-xs"
                        : "bg-slate-100 text-slate-600 group-hover:bg-[#8DC63F]/20 group-hover:text-slate-950"
                    )}
                  >
                    <Icon className="size-4.5 stroke-[2.2]" />
                  </span>

                  <span className="text-xs sm:text-[0.8125rem] font-bold text-slate-900 leading-tight block">
                    {item.label}
                  </span>

                  <span
                    className={cn(
                      "text-[0.625rem] sm:text-[0.6875rem] font-medium mt-0.5 block",
                      isSelected ? "text-[#5e8b23] font-semibold" : "text-slate-500"
                    )}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Specific Services & Project Scale (Spacious 2-column layout) */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Specific Services Popover (Multi-select from base project) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                id="moveman-services-label"
                className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase"
              >
                Specific Services Needed <span className="text-red-500">*</span>
              </label>
              {selectedServices.length > 0 ? (
                <span className="text-xs font-bold text-[#6fa32d]">
                  {selectedServices.length} selected
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500">
                  Select one or more
                </span>
              )}
            </div>

            <div className="relative">
              <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-labelledby="moveman-services-label"
                    className={cn(
                      "flex w-full min-h-[50px] sm:min-h-[52px] items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left text-sm font-medium outline-none transition-all duration-200 hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20 cursor-pointer shadow-2xs",
                      errors.services ? "border-red-400 focus:border-red-500" : "border-slate-200"
                    )}
                  >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden pr-2">
                      {selectedServices.length === 0 ? (
                        <span className="text-slate-400 font-normal">
                          Select services (choose one or more)...
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
                          <span className="shrink-0 rounded-full bg-[#8DC63F]/20 border border-[#8DC63F]/30 px-2 py-0.5 text-xs font-bold text-slate-950">
                            +{selectedServices.length - 1} more
                          </span>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-slate-400 transition-transform duration-200",
                        servicesOpen && "rotate-180 text-[#8DC63F]"
                      )}
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  sideOffset={6}
                  className="w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[460px] p-0 rounded-2xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden z-50 ring-1 ring-slate-900/5"
                >
                  <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {MOVEMAN_MODES.find((m) => m.id === activeMode)?.label} ({selectedServices.length} chosen)
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={selectAllServices}
                        className="text-xs font-bold text-[#5e8b23] hover:underline cursor-pointer"
                      >
                        {availableServices.every((item) => selectedServices.includes(item))
                          ? "Deselect all"
                          : "Select all"}
                      </button>
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedServices([])}
                          className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="px-3.5 py-1.5 border-b border-slate-100 bg-[#8DC63F]/10">
                    <p className="text-[0.6875rem] font-medium text-slate-800">
                      💡 Check all the service elements your project requires
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
                          role="checkbox"
                          aria-checked={isChecked}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150 cursor-pointer select-none",
                            isChecked
                              ? "bg-[#8DC63F]/15 text-slate-950 font-semibold"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                          )}
                        >
                          <div
                            className={cn(
                              "grid size-4 shrink-0 place-content-center rounded border transition-colors",
                              isChecked
                                ? "border-[#8DC63F] bg-[#8DC63F] text-slate-950"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {isChecked && <Check className="size-3 stroke-[3]" />}
                          </div>
                          <span className="flex-1 text-xs sm:text-sm font-medium">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium px-1">
                      {selectedServices.length === 0
                        ? "Select at least 1 service"
                        : `${selectedServices.length} selected`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(false)}
                      className="rounded-xl bg-[#8DC63F] hover:bg-[#7cb334] px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors cursor-pointer shadow-xs"
                    >
                      Done
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Selected Badges / Chips */}
              {selectedServices.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {selectedServices.map((srv) => (
                    <span
                      key={srv}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200/90 pl-3 pr-2 py-1 text-xs font-medium text-slate-800"
                    >
                      <span className="truncate max-w-[220px]">{srv}</span>
                      <button
                        type="button"
                        onClick={() => toggleService(srv)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Remove service"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.services && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.services}</p>
              )}
            </div>
          </div>

          {/* Move Scale Dropdown */}
          <div className="space-y-2">
            <label
              id="moveman-scale-label"
              className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase"
            >
              Approximate Project Scale <span className="text-red-500">*</span>
            </label>
            <MoveManSelect value={scale} onValueChange={setScale}>
              <MoveManSelectTrigger aria-labelledby="moveman-scale-label">
                <MoveManSelectValue placeholder="Select project scale..." />
              </MoveManSelectTrigger>
              <MoveManSelectContent>
                {SCALE_OPTIONS.map((opt) => (
                  <MoveManSelectItem key={opt} value={opt}>
                    {opt}
                  </MoveManSelectItem>
                ))}
              </MoveManSelectContent>
            </MoveManSelect>
          </div>
        </div>

        {/* Step 3: Locations & Delivery (Spacious 2-column layout) */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <span className="text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
              Relocation Locations &bull; UK Nationwide
            </span>

            {/* Clean Segmented Delivery Option Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setDestinationType("address")}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  destinationType === "address"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                New Premises
              </button>
              <button
                type="button"
                onClick={() => setDestinationType("storage")}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  destinationType === "storage"
                    ? "bg-[#8DC63F] text-slate-950 shadow-2xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                MoveMan Storage
              </button>
              <button
                type="button"
                onClick={() => setDestinationType("clearance")}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  destinationType === "clearance"
                    ? "bg-[#8DC63F] text-slate-950 shadow-2xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Recycling Only
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 pt-1">
            <MoveManLocationField
              label="Collection Address / UK Postcode *"
              placeholder="e.g. Innovation Way, Stoke-on-Trent ST6 4BF or Manchester M1"
              value={pickup}
              onChange={(val) => {
                setPickup(val);
                if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
              }}
              error={errors.pickup}
            />

            {destinationType === "address" ? (
              <MoveManLocationField
                label="Destination Address / UK Postcode *"
                placeholder="e.g. 100 Pall Mall, London SW1Y 5NQ or Birmingham B1"
                value={dropoff}
                onChange={(val) => {
                  setDropoff(val);
                  if (errors.dropoff) setErrors((prev) => ({ ...prev, dropoff: undefined }));
                }}
                error={errors.dropoff}
              />
            ) : destinationType === "storage" ? (
              <div>
                <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase mb-2">
                  Destination Facility
                </label>
                <div className="min-h-[50px] sm:min-h-[52px] rounded-2xl border border-[#8DC63F]/40 bg-[#8DC63F]/10 px-4 py-3 flex items-center gap-3">
                  <Warehouse className="size-5 text-slate-900 shrink-0" />
                  <p className="text-xs sm:text-[0.8125rem] text-slate-800 font-medium leading-snug">
                    Move into MoveMan secure, CCTV-monitored warehouse storage (Short or Long-Term).
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase mb-2">
                  Clearance Destination
                </label>
                <div className="min-h-[50px] sm:min-h-[52px] rounded-2xl border border-[#8DC63F]/40 bg-[#8DC63F]/10 px-4 py-3 flex items-center gap-3">
                  <Recycle className="size-5 text-slate-900 shrink-0" />
                  <p className="text-xs sm:text-[0.8125rem] text-slate-800 font-medium leading-snug">
                    WEEE Certified electronics recycling &amp; zero-to-landfill furniture clearance (No delivery required).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 4: Building Access & Logistics (Spacious 2-column layout - NO congested 4-column squishing!) */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
              Collection Building &amp; Floor Access
            </label>
            <MoveManSelect value={pickupAccess} onValueChange={setPickupAccess}>
              <MoveManSelectTrigger>
                <MoveManSelectValue placeholder="Select collection access..." />
              </MoveManSelectTrigger>
              <MoveManSelectContent>
                {ACCESS_COMBINED_OPTIONS.map((item) => (
                  <MoveManSelectItem key={item} value={item}>
                    {item}
                  </MoveManSelectItem>
                ))}
              </MoveManSelectContent>
            </MoveManSelect>
          </div>

          <div className="space-y-2">
            <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
              Destination Building &amp; Floor Access
            </label>
            <MoveManSelect
              value={dropoffAccess}
              onValueChange={setDropoffAccess}
              disabled={destinationType !== "address"}
            >
              <MoveManSelectTrigger>
                <MoveManSelectValue placeholder="Select destination access..." />
              </MoveManSelectTrigger>
              <MoveManSelectContent>
                {ACCESS_COMBINED_OPTIONS.map((item) => (
                  <MoveManSelectItem key={item} value={item}>
                    {item}
                  </MoveManSelectItem>
                ))}
              </MoveManSelectContent>
            </MoveManSelect>
          </div>
        </div>

        {/* Step 5: Schedule & Preferred Contact (Spacious 2-column layout) */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Target Move Date */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
              Target Move Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  disabled={isFlexibleDate}
                  className={cn(
                    "flex w-full min-h-[50px] sm:min-h-[52px] items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left text-sm font-medium outline-none transition-all duration-200 hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20 cursor-pointer shadow-2xs",
                    isFlexibleDate
                      ? "opacity-60 bg-slate-100 cursor-not-allowed border-slate-200"
                      : "border-slate-200"
                  )}
                >
                  <span className={moveDate ? "text-slate-900 font-semibold" : "text-slate-400"}>
                    {moveDate ? format(moveDate, "EEEE, d MMMM yyyy") : "Select target date..."}
                  </span>
                  <CalendarDays className="size-4.5 shrink-0 text-[#8DC63F]" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-2 rounded-2xl border border-slate-200/90 bg-white shadow-2xl max-w-[calc(100vw-2rem)] overflow-hidden ring-1 ring-slate-900/5"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={moveDate}
                  onSelect={(d) => {
                    setMoveDate(d);
                    setIsFlexibleDate(false);
                  }}
                  disabled={{ before: new Date() }}
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-600">
              <label className="flex items-center gap-1.5 cursor-pointer font-medium hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isFlexibleDate}
                  onChange={(e) => {
                    setIsFlexibleDate(e.target.checked);
                    if (e.target.checked) setMoveDate(undefined);
                  }}
                  className="size-3.5 rounded-sm border-slate-300 text-[#8DC63F] accent-[#8DC63F]"
                />
                <span>Flexible / Phased Dates</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer font-medium hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={isOutOfHours}
                  onChange={(e) => setIsOutOfHours(e.target.checked)}
                  className="size-3.5 rounded-sm border-slate-300 text-[#8DC63F] accent-[#8DC63F]"
                />
                <span>Weekend / Night Relocation</span>
              </label>
            </div>
          </div>

          {/* Contact Preference */}
          <div className="space-y-2">
            <label
              id="moveman-pref-label"
              className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase"
            >
              Preferred Contact Channel <span className="text-red-500">*</span>
            </label>
            <MoveManSelect
              value={preferredContact}
              onValueChange={(val) => setPreferredContact(val as "phone" | "email")}
            >
              <MoveManSelectTrigger aria-labelledby="moveman-pref-label">
                <MoveManSelectValue placeholder="Select preference..." />
              </MoveManSelectTrigger>
              <MoveManSelectContent>
                <MoveManSelectItem value="phone">
                  Phone Call &bull; Quick project discussion
                </MoveManSelectItem>
                <MoveManSelectItem value="email">
                  Email &bull; Itemised commercial proposal
                </MoveManSelectItem>
              </MoveManSelectContent>
            </MoveManSelect>

            <p className="text-[11px] text-slate-500 pt-1">
              We respond within the same business day to all commercial quote requests.
            </p>
          </div>
        </div>

        {/* Step 6: Company & Contact Information (Spacious 2-column layout) */}
        <div className="border-t border-slate-100 pt-6 space-y-5">
          <span className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
            Organisation &amp; Contact Details
          </span>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase mb-2">
                Company / Organisation Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }));
                }}
                placeholder="e.g. Bet365, NHS Trust, University..."
                className={cn(
                  "w-full min-h-[50px] sm:min-h-[52px] rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 shadow-2xs",
                  "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20",
                  errors.companyName ? "border-red-400 focus:border-red-500" : "border-slate-200"
                )}
              />
              {errors.companyName && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase mb-2">
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => {
                  setContactName(e.target.value);
                  if (errors.contactName) setErrors((prev) => ({ ...prev, contactName: undefined }));
                }}
                placeholder="e.g. Mike Dawson"
                className={cn(
                  "w-full min-h-[50px] sm:min-h-[52px] rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 shadow-2xs",
                  "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20",
                  errors.contactName ? "border-red-400 focus:border-red-500" : "border-slate-200"
                )}
              />
              {errors.contactName && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.contactName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase mb-2">
                Telephone / Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="e.g. 0800 246 5642 or 07918 716165"
                className={cn(
                  "w-full min-h-[50px] sm:min-h-[52px] rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 shadow-2xs",
                  "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20",
                  errors.phone ? "border-red-400 focus:border-red-500" : "border-slate-200"
                )}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase mb-2">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@company.co.uk"
                className={cn(
                  "w-full min-h-[50px] sm:min-h-[52px] rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 shadow-2xs",
                  "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20",
                  errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200"
                )}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Step 7: Notes & Project Scope */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase">
            Project Scope &amp; Relocation Notes <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Please outline any specialist equipment (e.g. server racks, sensitive IT, heavy machinery), floor levels, loading bays, or phased moving dates.
          </p>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (errors.notes) setErrors((prev) => ({ ...prev, notes: undefined }));
            }}
            placeholder="Tell us about your team size, key dates, access restrictions, or crate hire requirements..."
            className={cn(
              "w-full rounded-2xl border bg-white p-4 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 shadow-2xs",
              "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20",
              errors.notes ? "border-red-400 focus:border-red-500" : "border-slate-200"
            )}
          />
          {errors.notes && (
            <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.notes}</p>
          )}
        </div>

        {/* Step 8: Large Premium CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[54px] sm:min-h-[58px] inline-flex items-center justify-center gap-3 rounded-2xl bg-[#8DC63F] hover:bg-[#7cb334] text-slate-950 font-extrabold uppercase tracking-wider text-base sm:text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Preparing Fixed Proposal...</span>
              </>
            ) : (
              <>
                <span>Request Free Commercial Proposal</span>
                <ArrowRight className="size-5" />
              </>
            )}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-[#8DC63F]" />
              <span>100% Free &bull; Zero Obligation</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-[#8DC63F]" />
              <span>Same Business Day Response</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-[#8DC63F]" />
              <span>Zero Downtime Guaranteed</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
