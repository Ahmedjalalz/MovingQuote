import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type RadicalLocationFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  helperText?: string;
  rightAction?: ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export function RadicalLocationField({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  rightAction,
  readOnly = false,
  disabled = false,
  className,
  required = false,
}: RadicalLocationFieldProps) {
  const inputId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<UkPlaceSuggestion[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value.trim()), 180);
    return () => window.clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const onClickAway = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const enabled = open && debounced.length >= 2 && !readOnly && !disabled;

  useEffect(() => {
    if (!enabled) {
      setSuggestions([]);
      setIsFetching(false);
      return;
    }

    let active = true;
    setIsFetching(true);

    searchUkPlacesClient(debounced)
      .then((results) => {
        if (!active) return;
        setSuggestions(results);
        setSelectedIndex(-1);
      })
      .catch(() => {
        if (!active) return;
        setSuggestions([]);
      })
      .finally(() => {
        if (active) setIsFetching(false);
      });

    return () => {
      active = false;
    };
  }, [debounced, enabled]);

  const handleSelect = (item: UkPlaceSuggestion) => {
    onChange(`${item.primary}, ${item.secondary}`);
    setOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev + 1 >= suggestions.length ? 0 : prev + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      const chosen = suggestions[selectedIndex];
      if (chosen) handleSelect(chosen);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        {rightAction}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <Search className="h-4 w-4 text-[#0284C7]/70" />
        </div>

        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (!readOnly && !disabled && value.length >= 2) {
              setOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete="off"
          className={cn(
            "w-full rounded-xl border bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400 shadow-xs",
            "focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 focus:outline-hidden",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-200 hover:border-slate-300",
            disabled && "cursor-not-allowed bg-slate-100 opacity-60"
          )}
        />

        {value && !readOnly && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}

      {/* Autocomplete Dropdown */}
      {open && (suggestions.length > 0 || isFetching) && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl">
          {isFetching && suggestions.length === 0 ? (
            <div className="flex items-center gap-2 px-4 py-3 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-[#0284C7]" />
              Searching UK towns, cities & postcodes...
            </div>
          ) : (
            suggestions.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className={cn(
                  "flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left text-xs transition-colors",
                  selectedIndex === idx ? "bg-sky-50 text-sky-950" : "hover:bg-slate-50 text-slate-800"
                )}
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0284C7]" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 truncate">{item.primary}</div>
                  <div className="text-slate-500 truncate">{item.secondary}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}