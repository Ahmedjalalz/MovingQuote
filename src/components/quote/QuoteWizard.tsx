import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Loader2,
  PackageOpen,
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
import { LocationField } from "./LocationField";
import { WinzBadge } from "@/components/site/WinsBadge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export const MOVING_SERVICES = [
  "House Moving",
  "Packing & Unpacking",
  "Furniture Disassembly & Assembly",
] as const;

export const JUNK_SERVICES = [
  "Junk Removals",
  "Property Clearance",
  "Unwanted Items Removals",
] as const;

export const MOVE_SIZES = [
  "Single Item",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "4 Bedroom",
  "Office",
  "Custom",
] as const;

type Errors = Partial<
  Record<
    "service" | "moveSize" | "pickup" | "dropoff" | "date" | "phone" | "email" | "notes",
    string | undefined
  >
>;

const phonePattern = /^[0-9+()\s-]{7,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface QuoteWizardProps {
  mode?: "moving" | "junk";
  className?: string;
  heading?: string;
  subheading?: string;
  defaultService?: string | string[];
  defaultServices?: string[];
  onModeChange?: (mode: "moving" | "junk") => void;
  showModeSwitcher?: boolean;
}

export function QuoteWizard({
  mode = "moving",
  className,
  heading,
  subheading,
  defaultService,
  defaultServices,
  onModeChange,
  showModeSwitcher = false,
}: QuoteWizardProps) {
  const isMovingMode = mode === "moving";
  const availableServices = isMovingMode ? MOVING_SERVICES : JUNK_SERVICES;

  const defaultInitial = defaultServices
    ? defaultServices
    : Array.isArray(defaultService)
      ? defaultService
      : defaultService
        ? [defaultService]
        : [isMovingMode ? "House Moving" : "Junk Removals"];

  const [selectedServices, setSelectedServices] = useState<string[]>(defaultInitial);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moveSize, setMoveSize] = useState<string>("2 Bedroom");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "email">("phone");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (defaultServices) {
      setSelectedServices(defaultServices);
    } else if (defaultService) {
      setSelectedServices(Array.isArray(defaultService) ? defaultService : [defaultService]);
    } else {
      setSelectedServices([isMovingMode ? "House Moving" : "Junk Removals"]);
    }
    setErrors({});
  }, [mode, defaultService, defaultServices, isMovingMode]);

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
      next.service = "Please select at least one service.";
    }
    if (isMovingMode && !moveSize.trim()) {
      next.moveSize = "Please select your move size.";
    }
    if (!pickup.trim()) {
      next.pickup = isMovingMode
        ? "Enter your pick-up address."
        : "Enter property / collection address.";
    }
    if (isMovingMode && !dropoff.trim()) {
      next.dropoff = "Enter your drop-off address.";
    }
    if (!phonePattern.test(phone.trim())) {
      next.phone = "Enter a valid contact phone number.";
    }
    if (!emailPattern.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!notes.trim()) {
      next.notes = isMovingMode
        ? "Please provide details of your house or office move."
        : "Please provide details of the junk or property clearance.";
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
      moveSize: isMovingMode ? moveSize.trim() : "Junk / Removal",
      pickup: pickup.trim(),
      dropoff: isMovingMode ? dropoff.trim() : "",
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
        toast.success("Free quote request received successfully!");
        setDone(true);
        setSubmitting(false);
        return;
      }

      toast.error(result.error || "Could not send free quote request. Please call 021 100 9045.");
    } catch (err) {
      console.warn("Quote submission failed:", err);
      toast.error("Could not send free quote request. Please check your connection or call us directly on 021 100 9045.");
    } finally {
      setSubmitting(false);
    }
  }

  const defaultHeading = isMovingMode ? "Get a Free Moving Quote" : "Get a Free Junk Removal Quote";
  const defaultSubheading = isMovingMode
    ? "Select your moving service, move size and locations. We'll review your details and prepare an accurate, fixed-price quote with zero obligation."
    : "Tell us about your property clearance or junk removal in Auckland for an accurate, fixed-price quote.";

  if (done) {
    return (
      <div
        className={cn(
          "rounded-[2rem] border border-border bg-card p-4 sm:p-6 md:p-12 shadow-soft animate-in fade-in zoom-in-95 duration-500",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-accent/15">
            <Check className="size-6 text-accent" />
          </span>
        </div>
        <h2 className="display-md mt-6 text-xl sm:text-2xl md:text-3xl">Thanks — we&apos;ve received your request!</h2>
        <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-foreground/80">
          A member of the Paul Movers team will review your enquiry and get in touch with you
          shortly with a clear, fixed-price quote and availability.
        </p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {[
            { term: "Services Requested", value: selectedServices.join(", ") },
            ...(isMovingMode ? [{ term: "Move Size", value: moveSize }] : []),
            {
              term: isMovingMode ? "Pick-up Address" : "Property / Collection Address",
              value: pickup,
            },
            ...(isMovingMode && dropoff ? [{ term: "Drop-off Address", value: dropoff }] : []),
            {
              term: "Preferred Date",
              value: date ? format(date, "EEEE, d MMMM yyyy") : "Flexible / Not set",
            },
            {
              term: "Preferred Contact Method",
              value: preferredContact === "email" ? "Email" : "Phone Call / Text",
            },
            { term: "Phone", value: phone },
            { term: "Email", value: email },
            ...(name ? [{ term: "Name", value: name }] : []),
          ].map((row) => (
            <div key={row.term} className="bg-card p-4">
              <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/90 uppercase">
                {row.term}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground break-words">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setSelectedServices(defaultInitial);
              setPickup("");
              setDropoff("");
              setDate(undefined);
              setNotes("");
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent cursor-pointer"
          >
            Submit Another Request
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Back to Top
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-[2rem] border border-border bg-card p-4 sm:p-6 md:p-10 shadow-soft transition-all duration-300",
        className,
      )}
    >
      {showModeSwitcher && onModeChange && (
        <div className="mb-6 flex rounded-2xl bg-secondary/60 p-1.5 border border-border">
          <button
            type="button"
            onClick={() => onModeChange("moving")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
              isMovingMode
                ? "bg-background text-foreground shadow-xs border border-border"
                : "text-foreground/85 hover:text-foreground",
            )}
          >
            <Truck className="size-4 text-accent" />
            <span>Moving Services</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange("junk")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
              !isMovingMode
                ? "bg-background text-foreground shadow-xs border border-border"
                : "text-foreground/85 hover:text-foreground",
            )}
          >
            <Trash2 className="size-4 text-accent" />
            <span>Junk &amp; Property Removals</span>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 pb-6 border-b border-border sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow text-xs">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {isMovingMode ? "Moving Quotation" : "Junk Removal Quotation"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            {heading || defaultHeading}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-foreground/95 font-medium max-w-lg leading-relaxed">
            {subheading || defaultSubheading}
          </p>
        </div>

        <div className="shrink-0 pt-1">
          <WinzBadge variant="card" />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <div className={cn("grid gap-6", isMovingMode ? "sm:grid-cols-2" : "grid-cols-1")}>
          <div>
            <div className="flex items-center justify-between">
              <label
                id="quote-service-label"
                className="block text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase"
              >
                {isMovingMode ? "Select Moving Service(s) *" : "Select Junk Removal Service(s) *"}
              </label>
              {selectedServices.length > 0 ? (
                <span className="text-[0.6875rem] font-medium text-accent">
                  {selectedServices.length} selected
                </span>
              ) : (
                <span className="text-[0.6875rem] font-medium text-accent">
                  Select one or more options
                </span>
              )}
            </div>

            <div className="relative mt-2.5">
              <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-labelledby="quote-service-label"
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border bg-background px-4 py-4 text-left text-sm font-medium outline-none transition-all duration-300 hover:border-foreground/40 focus:border-accent focus:ring-4 focus:ring-accent/12 cursor-pointer",
                      errors.service ? "border-destructive" : "border-input",
                    )}
                  >
                    <div className="flex flex-1 items-center gap-2 overflow-hidden pr-2">
                      {selectedServices.length === 0 ? (
                        <span className="text-foreground/70 font-normal">
                          Select services (you can select multiple)...
                        </span>
                      ) : selectedServices.length === 1 ? (
                        <span className="truncate text-foreground font-medium">
                          {selectedServices[0]}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="truncate text-foreground font-medium">
                            {selectedServices[0]}
                          </span>
                          <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                            +{selectedServices.length - 1} more
                          </span>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-foreground/75 transition-transform duration-200",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  sideOffset={6}
                  className="w-[calc(100vw-2.5rem)] sm:w-[380px] max-w-[420px] p-0 rounded-2xl border border-border bg-card shadow-lift overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border bg-secondary/40 flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      {isMovingMode ? "Moving Services" : "Junk Removals Services"} (
                      {selectedServices.length} chosen)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={selectAllServices}
                        className="text-[0.6875rem] font-medium text-accent hover:underline cursor-pointer"
                      >
                        {availableServices.every((item) => selectedServices.includes(item))
                          ? "Deselect all"
                          : "Select all"}
                      </button>
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedServices([])}
                          className="text-[0.6875rem] font-semibold text-foreground/90 hover:text-destructive transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="px-3 py-1.5 border-b border-border/60 bg-secondary/20">
                    <p className="text-[0.6875rem] font-medium text-foreground/90">
                      💡 You can select as many options as you want
                    </p>
                  </div>

                  <div className="p-2.5 space-y-1">
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
                              ? "bg-accent/10 text-foreground font-medium"
                              : "text-foreground/90 hover:bg-secondary/70 hover:text-foreground",
                          )}
                        >
                          <div
                            className={cn(
                              "grid size-4 shrink-0 place-content-center rounded border transition-colors",
                              isChecked
                                ? "border-accent bg-accent text-accent-foreground"
                                : "border-muted-foreground/50 bg-background",
                            )}
                          >
                            {isChecked && <Check className="size-3 stroke-[3]" />}
                          </div>
                          <span className="flex-1 text-sm">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 border-t border-border bg-secondary/30 flex items-center justify-between">
                    <span className="text-[0.6875rem] text-foreground/90 px-1">
                      {selectedServices.length === 0
                        ? "Select at least 1 service"
                        : `${selectedServices.length} selected`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(false)}
                      className="rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-accent cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {errors.service && (
              <p className="mt-1.5 text-xs font-medium text-destructive">{errors.service}</p>
            )}
          </div>

          {isMovingMode && (
            <div>
              <label
                id="quote-size-label"
                className="block text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase"
              >
                Select Move / Job Size <span className="text-accent">*</span>
              </label>
              <div className="relative mt-2.5">
                <Select
                  value={moveSize}
                  onValueChange={(val) => {
                    setMoveSize(val);
                    if (errors.moveSize) setErrors((prev) => ({ ...prev, moveSize: undefined }));
                  }}
                >
                  <SelectTrigger
                    aria-labelledby="quote-size-label"
                    className={cn(
                      errors.moveSize ? "border-destructive" : "border-input",
                    )}
                  >
                    <SelectValue placeholder="Select move size" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOVE_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.moveSize && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.moveSize}</p>
              )}
            </div>
          )}
        </div>

        {isMovingMode ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <LocationField
              label="Pick-up Location *"
              placeholder="e.g. 12 Ponsonby Road, Ponsonby, Auckland"
              value={pickup}
              onChange={(val) => {
                setPickup(val);
                if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
              }}
              error={errors.pickup}
            />

            <LocationField
              label="Drop-off Location *"
              placeholder="e.g. 45 Remuera Road, Remuera, Auckland"
              value={dropoff}
              onChange={(val) => {
                setDropoff(val);
                if (errors.dropoff) setErrors((prev) => ({ ...prev, dropoff: undefined }));
              }}
              error={errors.dropoff}
            />
          </div>
        ) : (
          <LocationField
            label="Property / Collection Address *"
            placeholder="e.g. 12 Ponsonby Road, Ponsonby, Auckland"
            value={pickup}
            onChange={(val) => {
              setPickup(val);
              if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
            }}
            error={errors.pickup}
          />
        )}

        <div>
          <label
            id="quote-contact-preference-label"
            className="block text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase"
          >
            How do you prefer us to contact you? <span className="text-accent">*</span>
          </label>
          <div className="relative mt-2.5">
            <Select
              value={preferredContact}
              onValueChange={(val) => setPreferredContact(val as "phone" | "email")}
            >
              <SelectTrigger aria-labelledby="quote-contact-preference-label">
                <SelectValue placeholder="Select contact preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone / Call / Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <span className="block text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase">
              Preferred Date
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "mt-2.5 flex w-full items-center justify-between rounded-2xl border bg-background px-4 py-4 text-left text-sm outline-none transition-all duration-300 hover:border-foreground/40 focus:border-accent focus:ring-4 focus:ring-accent/12 cursor-pointer",
                    date ? "text-foreground font-medium" : "text-foreground/70",
                  )}
                >
                  <span className="truncate">
                    {date ? format(date, "d MMM yyyy") : "Select date"}
                  </span>
                  <CalendarDays className="size-4 shrink-0 text-accent" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-2 rounded-2xl border border-border bg-popover shadow-lift max-w-[calc(100vw-2rem)] overflow-hidden"
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
              <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase">
                Phone Number <span className="text-accent">*</span>
              </span>
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="021 100 9045"
                className={cn(
                  "mt-2.5 w-full rounded-2xl border bg-background px-4 py-3.5 sm:py-4 text-base sm:text-sm outline-none transition-all duration-300 placeholder:text-foreground/65 focus:border-accent focus:ring-4 focus:ring-accent/12",
                  errors.phone ? "border-destructive" : "border-input",
                )}
              />
            </label>
            {errors.phone && (
              <p className="mt-1.5 text-xs font-medium text-destructive">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block">
              <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase">
                Email Address <span className="text-accent">*</span>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.co.nz"
                className={cn(
                  "mt-2.5 w-full rounded-2xl border bg-background px-4 py-3.5 sm:py-4 text-base sm:text-sm outline-none transition-all duration-300 placeholder:text-foreground/65 focus:border-accent focus:ring-4 focus:ring-accent/12",
                  errors.email ? "border-destructive" : "border-input",
                )}
              />
            </label>
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block">
            <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase">
              {isMovingMode ? "Move & Property Details / Notes" : "Junk & Property Details / Notes"}{" "}
              <span className="text-accent">*</span>
            </span>
            <div className="mt-2 space-y-2.5">
              <p className="text-xs sm:text-sm leading-relaxed text-foreground font-medium">
                {isMovingMode
                  ? "Please provide details of your house or office move in the box below, including the items to be moved, property access, stairs or steps, floor level, lift availability, parking conditions, and any other information that may help us prepare an accurate fixed-price quote."
                  : "Please provide details of the junk, unwanted furniture or property clearance items in the box below, including item types, property access, stairs/driveway, and any heavy items to help us prepare an accurate fixed-price quote."}
              </p>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  if (errors.notes) setErrors((prev) => ({ ...prev, notes: undefined }));
                }}
                placeholder={
                  isMovingMode
                    ? "Type additional move details here..."
                    : "Type additional junk or clearance details here..."
                }
                className={cn(
                  "w-full resize-none rounded-2xl border bg-background px-4 py-3.5 text-base sm:text-sm leading-relaxed outline-none transition-all duration-300 placeholder:text-foreground/65 focus:border-accent focus:ring-4 focus:ring-accent/12",
                  errors.notes ? "border-destructive" : "border-input",
                )}
              />
              {errors.notes && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.notes}</p>
              )}
            </div>
          </label>
        </div>

        <div className="pt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={submitting}
            className="group w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 sm:px-8 text-sm font-bold text-accent-foreground shadow-md transition-all duration-300 hover:gap-3.5 hover:bg-accent/90 hover:shadow-lg disabled:opacity-70 cursor-pointer"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin shrink-0" />
            ) : (
              <PackageOpen className="size-4 shrink-0" />
            )}
            <span>
              {submitting
                ? "Sending Quote Request…"
                : isMovingMode
                  ? "Get a Free Moving Quote"
                  : "Get a Free Junk Quote"}
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs font-semibold text-foreground">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Check className="size-3.5 text-accent shrink-0" strokeWidth={2.5} />
              <span>Fixed Price</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Check className="size-3.5 text-accent shrink-0" strokeWidth={2.5} />
              <span>No Obligation</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="size-3.5 text-accent shrink-0" strokeWidth={2.5} />
              <span>Fast Auckland Response</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
