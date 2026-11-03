import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Loader2, MapPin, X } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type MoveManLocationFieldProps = {
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

export function MoveManLocationField({
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
}: MoveManLocationFieldProps) {
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
        if (isCurrent) {
          setSuggestions([]);
          setIsFetching(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [enabled, debounced]);

  const handleSelect = (item: UkPlaceSuggestion) => {
    const formatted = item.secondary ? `${item.primary}, ${item.secondary}` : item.primary;
    onChange(formatted);
    setOpen(false);
    setSelectedIndex(-1);
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
      const chosen = suggestions[selectedIndex];
      if (chosen) handleSelect(chosen);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={inputId}
          className="text-xs sm:text-[0.8125rem] font-bold tracking-wider text-slate-800 uppercase"
        >
          {label}
        </label>
        {rightAction}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-slate-400">
          {isFetching ? (
            <Loader2 className="size-4.5 animate-spin text-[#8DC63F]" />
          ) : (
            <MapPin className="size-4.5 text-slate-400" />
          )}
        </div>

        <input
          id={inputId}
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete="off"
          onFocus={() => {
            if (!readOnly && !disabled) setOpen(true);
          }}
          onChange={(e) => {
            onChange(e.target.value);
            if (!open) setOpen(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full min-h-[50px] sm:min-h-[52px] rounded-2xl border bg-white py-3 pl-11 pr-10 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 shadow-2xs",
            "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-200",
            disabled && "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        />

        {value && !readOnly && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setSuggestions([]);
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Clear location input"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {open && suggestions.length > 0 && !disabled && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-slate-900/5">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Suggested UK Locations &amp; Postcodes
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              className={cn(
                "w-full px-3.5 py-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors cursor-pointer text-sm",
                idx === selectedIndex
                  ? "bg-[#8DC63F]/15 text-slate-950 font-semibold"
                  : "hover:bg-slate-50 text-slate-800"
              )}
            >
              <MapPin className="size-4 text-[#8DC63F] shrink-0 mt-0.5" />
              <div className="flex-1 truncate">
                <span className="font-semibold text-slate-900">{item.primary}</span>
                {item.secondary && (
                  <span className="ml-1.5 text-xs text-slate-500 font-normal">({item.secondary})</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {error ? (
        <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
