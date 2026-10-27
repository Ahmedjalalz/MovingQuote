import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck2,
  Home,
  Trash2,
  Truck,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Mail,
  Package,
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
import { FrontlineLocationField } from "./FrontlineLocationField";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitQuoteEnquiry } from "@/lib/email";

export const FRONTLINE_REMOVAL_SERVICES = [
  "Full House Removal",
  "Flat & Apartment Move",
  "Student Accommodation Move",
  "Office & Commercial Relocation",
  "Professional Packing & Box Supply",
  "Furniture Dismantling & Assembly",
  "Single Large Item / Sofa Move",
  "Long Distance / UK Nationwide Move",
] as const;

export const FRONTLINE_WASTE_SERVICES = [
  "Full House Clearance",
  "Garage, Loft & Shed Clearance",
  "Garden Waste & Green Rubbish",
  "End of Tenancy Property Clearance",
  "Commercial & Office Waste Clearance",
  "Builders / Trade Rubbish Clearance",
  "Bulky Furniture & Appliance Disposal",
] as const;

export const FRONTLINE_DELIVERY_SERVICES = [
  "Same-Day Urgent Courier",
  "Next-Day Scheduled Delivery",
  "Pallet & Freight Transport",
  "Single Bulky Item Delivery",
  "eBay & Marketplace Collection",
  "Store & Depot Pickup (IKEA, B&Q, etc.)",
  "Multi-Drop Business Distribution",
] as const;

export const FRONTLINE_REMOVAL_SIZES = [
  "1 - 2 Bedroom Flat or House",
  "3 - 4 Bedroom Family Home",
  "5+ Bedroom Large Residence",
  "Student / Single Room",
  "Small Commercial Office (1-5 desks)",
  "Medium / Large Business",
  "Single Specialty Item",
] as const;

export const FRONTLINE_WASTE_SIZES = [
  "Single Bulky Item (Sofa, Mattress, Appliance)",
  "Small Van Load (Quarter Van Load)",
  "Half Van Load (approx. 500-750 kg)",
  "Full Luton Van Load (approx. 1000-1200 kg)",
  "Multiple Van Loads / Complete Clearance",
] as const;

export const FRONTLINE_FLEET_VEHICLES = [
  "Small Van (Parcels, Small Boxes, Single Items)",
  "Short Wheel Base - SWB (Medium Furniture, Boxes)",
  "Long Wheel Base - LWB (High Volume Cargo, 1-Bed Flat)",
  "Extra Long Wheel Base - XLWB (Full Van Load, Bulky Loads)",
  "Luton Van with Tail Lift (500kg Lift, House Moves, Heavy Freight)",
  "HGV / 7.5T Vehicle (by prior arrangement)",
] as const;

type Mode = "removals" | "waste" | "delivery";

type Errors = Partial<
  Record<
    "service" | "moveSize" | "pickup" | "dropoff" | "date" | "phone" | "email" | "notes",
    string | undefined
  >
>;

const phonePattern = /^(?:\+44\s?|0)(?:[1-9]\d{2,4}\s?\d{3,4}\s?\d{3,4}|[1-9]\d{8,10})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface FrontlineQuoteWizardProps {
  className?: string;
}

export function FrontlineQuoteWizard({ className }: FrontlineQuoteWizardProps) {
  const [mode, setMode] = useState<Mode>("removals");

  const getServiceList = (currentMode: Mode) => {
    switch (currentMode) {
      case "removals":
        return FRONTLINE_REMOVAL_SERVICES;
      case "waste":
        return FRONTLINE_WASTE_SERVICES;
      case "delivery":
        return FRONTLINE_DELIVERY_SERVICES;
    }
  };

  const getSizeList = (currentMode: Mode) => {
    switch (currentMode) {
      case "removals":
        return FRONTLINE_REMOVAL_SIZES;
      case "waste":
        return FRONTLINE_WASTE_SIZES;
      case "delivery":
        return FRONTLINE_FLEET_VEHICLES;
    }
  };

  const getSizeLabel = (currentMode: Mode) => {
    switch (currentMode) {
      case "removals":
        return "Move Size / Property Type";
      case "waste":
        return "Clearance Volume / Load Size";
      case "delivery":
        return "Vehicle Size / Delivery Type";
    }
  };

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Full House Removal",
  ]);
  const [moveSize, setMoveSize] = useState<string>("3 - 4 Bedroom Family Home");
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(undefined);
  const [dateFlexible, setDateFlexible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<"phone" | "email" | "whatsapp">("phone");
  const [notes, setNotes] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === "removals") {
      setSelectedServices(["Full House Removal"]);
      setMoveSize("3 - 4 Bedroom Family Home");
    } else if (newMode === "waste") {
      setSelectedServices(["Full House Clearance"]);
      setMoveSize("Half Van Load (approx. 500-750 kg)");
      if (!dropoff) {
        setDropoff("Licensed Waste Transfer Facility");
      }
    } else if (newMode === "delivery") {
      setSelectedServices(["Same-Day Urgent Courier"]);
      setMoveSize("Luton Van with Tail Lift (500kg Lift, House Moves, Heavy Freight)");
      if (dropoff === "Licensed Waste Transfer Facility") {
        setDropoff("");
      }
    }
    setErrors({});
  };

  const toggleService = (srv: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(srv)) {
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== srv);
      } else {
        return [...prev, srv];
      }
    });
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (selectedServices.length === 0) {
      newErrors.service = "Please select at least one service.";
    }

    if (!pickup.trim()) {
      newErrors.pickup = "Please enter your collection / pick-up address or postcode.";
    }

    if (mode !== "waste" && !dropoff.trim()) {
      newErrors.dropoff = "Please enter your destination / delivery address or postcode.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required so we can confirm quote details.";
    } else if (!phonePattern.test(phone.trim().replace(/[\s()-]/g, ""))) {
      newErrors.phone = "Please enter a valid UK phone number (e.g., 01543 630 122 or 07761 098 483).";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required to receive your formal quote.";
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedDate = preferredDate
        ? format(preferredDate, "EEEE, d MMMM yyyy") + (dateFlexible ? " (Flexible ±3 days)" : "")
        : dateFlexible
        ? "Date is flexible"
        : "As soon as possible";

      const res = await submitQuoteEnquiry({
        data: {
          service: selectedServices,
          moveSize: `${mode.toUpperCase()}: ${moveSize}`,
          pickup,
          dropoff: mode === "waste" && !dropoff.trim() ? "Licensed Disposal / Recycling Facility" : dropoff,
          preferredDate: formattedDate,
          name: name.trim() || "Customer",
          phone: phone.trim(),
          email: email.trim(),
          isWinsQuote: false,
          isWinzQuote: false,
          notes: notes.trim(),
          preferredContact,
        },
      });

      if (res.success) {
        setSubmitted(true);
        toast.success("Quote Request Sent! We'll prepare your fixed price quote shortly.");
      } else {
        toast.error(res.error || "Failed to submit quote enquiry. Please call us on 01543 630 122.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please call 01543 630 122.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn("rounded-3xl border border-amber-200 bg-white p-6 sm:p-8 md:p-10 shadow-xl", className)}>
        <div className="text-center space-y-4 max-w-lg mx-auto py-6">
          <div className="size-16 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-600">
            <FileCheck2 className="size-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quote Request Received!
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Thank you, <span className="font-semibold text-slate-900">{name || "Customer"}</span>. Your enquiry for{" "}
            <span className="font-semibold text-amber-600">{selectedServices[0]}</span> has been dispatched to our West Midlands operations team.
          </p>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs sm:text-sm text-slate-700 text-left space-y-2">
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">Pick-up Area:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">{pickup}</span>
            </div>
            {dropoff && mode !== "waste" && (
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Delivery Area:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[200px]">{dropoff}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">Preferred Contact:</span>
              <span className="font-semibold text-slate-900 capitalize">{preferredContact} ({phone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Fixed-Price Quotation:</span>
              <span className="font-bold text-amber-600">100% Free &amp; Guaranteed</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500 leading-relaxed">
            Need urgent same-day transport or immediate clearance? Call our Brownhills depot directly on{" "}
            <a href="tel:01543630122" className="font-bold text-amber-600 hover:underline">
              01543 630 122
            </a>{" "}
            or WhatsApp{" "}
            <a href="tel:07761098483" className="font-bold text-amber-600 hover:underline">
              07761 098 483
            </a>.
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setPickup("");
                setDropoff("");
                setNotes("");
              }}
              className="rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              Submit Another Quote Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 md:p-8 shadow-xl", className)}>
      {/* Service Mode Selector Tabs */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-bold text-slate-900 tracking-tight uppercase">
          Select Service Category
        </label>
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => handleModeChange("removals")}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              mode === "removals"
                ? "bg-slate-900 text-amber-400 shadow-md scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Home className="size-4 shrink-0" />
            <span>Removals</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("waste")}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              mode === "waste"
                ? "bg-slate-900 text-amber-400 shadow-md scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Trash2 className="size-4 shrink-0" />
            <span>Waste Clearance</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("delivery")}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              mode === "delivery"
                ? "bg-slate-900 text-amber-400 shadow-md scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            )}
          >
            <Truck className="size-4 shrink-0" />
            <span>Delivery &amp; Courier</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Specific Services Checkbox Chips */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-900 tracking-tight">
              Select Specific Requirements (Choose all that apply)
            </label>
            <span className="text-[0.68rem] text-slate-500 font-normal">Multiple selectable</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {getServiceList(mode).map((srv) => {
              const isSelected = selectedServices.includes(srv);
              return (
                <button
                  key={srv}
                  type="button"
                  onClick={() => toggleService(srv)}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl border p-3 text-left text-xs transition-all",
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 font-bold text-slate-900 shadow-2xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span className="truncate">{srv}</span>
                  <div
                    className={cn(
                      "size-4 shrink-0 rounded flex items-center justify-center border transition-colors",
                      isSelected
                        ? "bg-amber-500 border-amber-500 text-slate-950"
                        : "border-slate-300 bg-white"
                    )}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.service && <p className="text-xs text-red-600 font-medium">{errors.service}</p>}
        </div>

        {/* Step 2: Scale / Property Size / Fleet Vehicle */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-900 tracking-tight">
            {getSizeLabel(mode)}
          </label>
          <Select value={moveSize} onValueChange={(val) => setMoveSize(val)}>
            <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white py-3 px-3.5 text-sm text-slate-900 shadow-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
              <SelectValue placeholder="Select size / vehicle" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {getSizeList(mode).map((size) => (
                <SelectItem key={size} value={size} className="text-xs sm:text-sm text-slate-800">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 3: Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FrontlineLocationField
            label="Pick-Up / Collection Address"
            placeholder="e.g. WS8 6JP, Brownhills, Walsall, Birmingham..."
            value={pickup}
            onChange={(val) => {
              setPickup(val);
              if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
            }}
            error={errors.pickup}
            helperText="Enter full address, street, or UK postcode"
          />

          {mode === "waste" ? (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-900 tracking-tight">
                Disposal / Drop-Off Facility
              </label>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-3.5 text-sm text-slate-600 flex items-center justify-between">
                <span className="text-xs font-medium">Licensed Waste Transfer &amp; Recycling Facility</span>
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[0.7rem] text-slate-500">
                100% compliant transfer with official Environment Agency documentation.
              </p>
            </div>
          ) : (
            <FrontlineLocationField
              label="Destination / Delivery Address"
              placeholder="e.g. B1 1AA, Birmingham, Lichfield, London..."
              value={dropoff}
              onChange={(val) => {
                setDropoff(val);
                if (errors.dropoff) setErrors((prev) => ({ ...prev, dropoff: undefined }));
              }}
              error={errors.dropoff}
              helperText="Delivery location or UK destination"
            />
          )}
        </div>

        {/* Step 4: Preferred Date Picker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900 tracking-tight">
              Preferred Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full rounded-xl border py-3 px-3.5 text-left text-sm shadow-xs flex items-center justify-between transition-colors",
                    preferredDate
                      ? "border-slate-300 text-slate-900 bg-white"
                      : "border-slate-300 text-slate-400 bg-white hover:border-slate-400"
                  )}
                >
                  <span className="flex items-center gap-2 truncate text-xs sm:text-sm">
                    <CalendarDays className="size-4 text-amber-500 shrink-0" />
                    <span>
                      {preferredDate ? format(preferredDate, "EEE, d MMM yyyy") : "Select preferred date"}
                    </span>
                  </span>
                  <ChevronDown className="size-4 text-slate-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-slate-200" align="start">
                <Calendar
                  mode="single"
                  selected={preferredDate}
                  onSelect={setPreferredDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2 pt-1 md:pt-6">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={dateFlexible}
                onChange={(e) => setDateFlexible(e.target.checked)}
                className="size-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500/20"
              />
              <span>Date is flexible (± 3 days for best price / availability)</span>
            </label>
            <p className="text-[0.7rem] text-slate-500 leading-normal">
              Same-day service available across the West Midlands subject to vehicle schedule.
            </p>
          </div>
        </div>

        {/* Step 5: Contact Details */}
        <div className="border-t border-slate-100 pt-5 space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Where should we send your quote?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-800">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Davies"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-900 shadow-2xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-800">
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="e.g. 01543 630 122 or 07..."
                className={cn(
                  "w-full rounded-xl border bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-900 shadow-2xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500",
                  errors.phone ? "border-red-400 focus:border-red-500" : "border-slate-300"
                )}
              />
              {errors.phone && <p className="text-[0.7rem] text-red-600">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-800">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="e.g. john@example.co.uk"
                className={cn(
                  "w-full rounded-xl border bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-900 shadow-2xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500",
                  errors.email ? "border-red-400 focus:border-red-500" : "border-slate-300"
                )}
              />
              {errors.email && <p className="text-[0.7rem] text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-1.5 pt-1">
            <span className="block text-xs font-semibold text-slate-800">Preferred reply method:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "phone", label: "Phone Call", icon: Phone },
                { id: "whatsapp", label: "WhatsApp Message", icon: MessageSquare },
                { id: "email", label: "Email Quotation", icon: Mail },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPreferredContact(id as "phone" | "email" | "whatsapp")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                    preferredContact === id
                      ? "border-amber-500 bg-amber-50 text-amber-950 font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon className="size-3.5 text-amber-500" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 6: Job Notes / Inventory / Special Access */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-900 tracking-tight">
            Inventory / Special Instructions / Access Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us about stairs, parking restrictions, heavy or fragile items (e.g. piano, American fridge, large safe), or describe waste to be cleared..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-900 shadow-2xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.99] py-4 px-6 text-sm sm:text-base font-extrabold text-slate-950 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Preparing Your Quotation...</span>
              </>
            ) : (
              <>
                <span>Get My Free Fixed-Price Quote</span>
                <ArrowRight className="size-5" />
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[0.7rem] text-slate-500">
            100% Free &amp; No Obligation • Reviewed by our Brownhills logistics team • Zero spam guaranteed
          </p>
        </div>
      </form>
    </div>
  );
}
