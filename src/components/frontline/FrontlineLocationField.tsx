import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type FrontlineLocationFieldProps = {
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

export function FrontlineLocationField({
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
}: FrontlineLocationFieldProps) {
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
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-900 tracking-tight">
          {label}
        </label>
        {rightAction}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <MapPin className="size-4 text-[#20c200]" />
        </div>

        <input
          id={inputId}
          type="text"
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (value.trim().length >= 2) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full rounded-xl border bg-white py-3 pl-10 pr-10 text-sm text-slate-900 shadow-xs transition-colors",
            "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20c200]/25 focus:border-[#20c200]",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 hover:border-slate-400",
            disabled && "bg-slate-50 text-slate-400 cursor-not-allowed"
          )}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
          {isFetching ? (
            <Loader2 className="size-4 animate-spin text-[#20c200]" />
          ) : value && !readOnly && !disabled ? (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setSuggestions([]);
              }}
              className="rounded p-1 text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear location"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {helperText && !error && (
        <p className="text-[0.7rem] text-slate-500 font-normal">{helperText}</p>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* Autocomplete Dropdown */}
      {open && (suggestions.length > 0 || isFetching) && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {isFetching && suggestions.length === 0 ? (
            <div className="flex items-center gap-2 p-3 text-xs text-slate-500">
              <Loader2 className="size-3.5 animate-spin text-[#20c200]" />
              <span>Searching UK addresses &amp; postcodes...</span>
            </div>
          ) : (
            <ul className="space-y-0.5">
              {suggestions.map((item, idx) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectSuggestion(item)}
                    className={cn(
                      "w-full text-left rounded-lg px-3 py-2 text-xs flex items-start gap-2.5 transition-colors",
                      selectedIndex === idx
                        ? "bg-[#ecf5eb] text-[#147a00] font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    <Search className="size-3.5 text-[#20c200] shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-semibold text-slate-900 block truncate">
                        {item.primary}
                      </span>
                      {item.secondary && (
                        <span className="text-[0.7rem] text-slate-500 block truncate">
                          {item.secondary}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
