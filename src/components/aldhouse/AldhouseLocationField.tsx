import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type AldhouseLocationFieldProps = {
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

export function AldhouseLocationField({
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
}: AldhouseLocationFieldProps) {
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

    let isCurrent = true;
    setIsFetching(true);
    searchUkPlacesClient(debounced)
      .then((res) => {
        if (isCurrent) {
          setSuggestions(res);
          setIsFetching(false);
        }
      })
      .catch(() => {
        if (isCurrent) setIsFetching(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [debounced, enabled]);

  const showPanel = enabled && (isFetching || suggestions.length > 0 || debounced.length >= 3);

  const handleSelect = (suggestion: { primary: string; secondary?: string }) => {
    const formatted = suggestion.secondary
      ? `${suggestion.primary}, ${suggestion.secondary}`
      : suggestion.primary;
    onChange(formatted);
    setOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showPanel || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative w-full flex flex-col justify-between", className)}>
      {/* Label Row with fixed min-height for uniform alignment */}
      <div className="flex items-center justify-between min-h-[1.5rem] mb-1.5">
        <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-[#0c2229]">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {rightAction}
          {helperText && !rightAction && (
            <span className="text-[0.6875rem] text-slate-500 font-normal">{helperText}</span>
          )}
        </div>
      </div>

      {/* Input Row */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <MapPin className="size-4 text-[#368b9a]" />
        </div>

        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-autocomplete="list"
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (!readOnly && value.trim().length >= 2) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-xl border bg-white pl-10 pr-9 text-xs sm:text-sm text-slate-900 transition-all shadow-2xs font-normal",
            readOnly ? "bg-slate-50 text-slate-700 cursor-not-allowed border-slate-200" : "border-slate-200 hover:border-slate-300",
            "placeholder:text-slate-400 focus:border-[#368b9a] focus:outline-none focus:ring-2 focus:ring-[#9bdce6]/40",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
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
            title="Clear"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {error && <p className="text-[0.6875rem] font-medium text-red-600 mt-1">{error}</p>}

      {showPanel && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 py-4 text-xs font-medium text-slate-500">
              <Loader2 className="size-4 animate-spin text-[#368b9a]" />
              <span>Searching UK addresses &amp; postcodes...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {suggestions.map((item, idx) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors cursor-pointer",
                      selectedIndex === idx
                        ? "bg-[#0c2229] text-white"
                        : "hover:bg-[#eefafc] text-slate-800"
                    )}
                  >
                    <Search
                      className={cn(
                        "mt-0.5 size-3.5 shrink-0",
                        selectedIndex === idx ? "text-[#9bdce6]" : "text-[#368b9a]"
                      )}
                    />
                    <div className="flex-1 truncate">
                      <span className="font-semibold block truncate">{item.primary}</span>
                      <span
                        className={cn(
                          "block truncate text-[0.6875rem]",
                          selectedIndex === idx ? "text-slate-200" : "text-slate-500"
                        )}
                      >
                        {item.secondary}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-3 px-3 text-center text-xs text-slate-500">
              <span>Press enter or continue typing your full address / postcode</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
