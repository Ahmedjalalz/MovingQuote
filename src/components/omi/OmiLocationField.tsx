import { useState, useRef, useEffect } from "react";
import { MapPin, Building, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OmiLocationFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: "collection" | "delivery";
}

const COMMON_LONDON_LOCATIONS = [
  { postcode: "NW10 6LA", name: "Park Royal / Acton (OMI Depot)", area: "North West London" },
  { postcode: "EC2A 2BB", name: "City of London / Liverpool St", area: "Central London" },
  { postcode: "E14 5AB", name: "Canary Wharf / Docklands", area: "East London" },
  { postcode: "W1D 3QU", name: "Soho / West End", area: "Central London" },
  { postcode: "WC2N 5DU", name: "Charing Cross / Covent Garden", area: "West Central" },
  { postcode: "SE1 9SG", name: "London Bridge / Southwark", area: "South London" },
  { postcode: "SW1A 1AA", name: "Westminster / Victoria", area: "Central London" },
  { postcode: "CR0 2EF", name: "Croydon Business Hub", area: "Greater London" },
  { postcode: "RG1 1DA", name: "Reading Tech Hub", area: "Berkshire / South East" },
  { postcode: "GU1 4RR", name: "Guildford Commercial", area: "Surrey / South East" },
  { postcode: "CM1 1HT", name: "Chelmsford Commercial", area: "Essex / South East" },
  { postcode: "ME14 1XQ", name: "Maidstone Corporate Hub", area: "Kent / South East" },
];

export function OmiLocationField({
  id,
  label,
  placeholder = "e.g. EC2A 2BB or London office address",
  value,
  onChange,
  error,
  required = false,
  type = "collection",
}: OmiLocationFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = value.trim()
    ? COMMON_LONDON_LOCATIONS.filter(
        (loc) =>
          loc.postcode.toLowerCase().includes(value.toLowerCase()) ||
          loc.name.toLowerCase().includes(value.toLowerCase()) ||
          loc.area.toLowerCase().includes(value.toLowerCase())
      )
    : COMMON_LONDON_LOCATIONS.slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex h-5 items-center justify-between mb-2">
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wide text-slate-700">
          {label} {required && <span className="text-[#F57619] font-bold">*</span>}
        </label>
        <span className="text-[11px] font-semibold text-slate-500">
          {type === "collection" ? "Pickup Premises" : "New Workplace"}
        </span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <MapPin className="size-4 text-slate-400" />
        </div>

        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full h-11 rounded-xl border pl-10 pr-9 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400",
            error
              ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              : "border-slate-300 bg-slate-50/80 hover:border-slate-400 focus:bg-white focus:border-[#101B3B] focus:ring-2 focus:ring-[#101B3B]/10"
          )}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen(!open)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          <div className="px-2.5 py-1 text-[11px] font-semibold tracking-wider text-slate-600 uppercase border-b border-slate-100 mb-1">
            Common London &amp; South East Locations
          </div>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.postcode + item.name}
                type="button"
                onClick={() => {
                  onChange(`${item.postcode} (${item.name})`);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Building className="size-3.5 text-slate-400 group-hover:text-[#F57619]" />
                  <div>
                    <span className="font-semibold text-slate-900">{item.postcode}</span>
                    <span className="text-slate-600 ml-1.5">— {item.name}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-600 font-medium">{item.area}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-slate-600 italic">
              Custom address: "{value}" (select to keep or continue typing)
            </div>
          )}
        </div>
      )}
    </div>
  );
}
