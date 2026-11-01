import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type Roads2RoadsLocationFieldProps = {
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
};

export function Roads2RoadsLocationField({
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
}: Roads2RoadsLocationFieldProps) {
  const inputId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<UkPlaceSuggestion[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value.trim()), 200);
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
      .then((res) => {
        if (active) {
          setSuggestions(res);
          setSelectedIndex(-1);
        }
      })
      .catch(() => {
        if (active) setSuggestions([]);
      })
      .finally(() => {
        if (active) setIsFetching(false);
      });

    return () => {
      active = false;
    };
  }, [debounced, enabled]);

  const selectSuggestion = (suggestion: UkPlaceSuggestion) => {
    const formatted = suggestion.secondary
      ? `${suggestion.primary}, ${suggestion.secondary}`
      : suggestion.primary;
    onChange(formatted);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && suggestions[selectedIndex]) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs sm:text-sm font-bold tracking-tight text-slate-800"
        >
          {label}
        </label>
        {rightAction}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <MapPin className="size-4 text-[#25AAE1]" />
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
            if (value.trim().length >= 2) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete="off"
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 pl-10 pr-9 text-xs sm:text-sm text-slate-900 shadow-xs transition-all placeholder:text-slate-400 hover:border-[#25AAE1]/60 focus:border-[#25AAE1] focus:outline-hidden focus:ring-4 focus:ring-[#25AAE1]/15",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            readOnly && "bg-slate-50 cursor-not-allowed text-slate-600"
          )}
        />

        {value && !readOnly && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-sky-50 hover:text-[#25AAE1] transition-colors"
            aria-label="Clear location input"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {error ? (
        <p className="text-[0.72rem] sm:text-xs font-medium text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-[0.7rem] text-slate-500">{helperText}</p>
      ) : null}

      {/* Autocomplete Dropdown */}
      {open && (isFetching || suggestions.length > 0) && (
        <div className="absolute z-50 mt-1.5 max-h-64 w-full overflow-auto rounded-2xl border border-sky-100 bg-white p-1.5 shadow-2xl ring-1 ring-slate-900/5">
          {isFetching && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-slate-500">
              <Loader2 className="size-3.5 animate-spin text-[#25AAE1]" />
              <span>Searching UK postcodes &amp; addresses...</span>
            </div>
          )}

          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={cn(
                "flex w-full items-start gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors",
                selectedIndex === index ? "bg-sky-50 text-[#006494] font-medium" : "hover:bg-slate-50 text-slate-700"
              )}
            >
              <Search className="mt-0.5 size-3.5 shrink-0 text-[#25AAE1]" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900">{suggestion.primary}</span>
                {suggestion.secondary && (
                  <span className="text-[0.6875rem] text-slate-500">{suggestion.secondary}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
