import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type BudgetSkipsLocationFieldProps = {
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

export function BudgetSkipsLocationField({
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
}: BudgetSkipsLocationFieldProps) {
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
    <div ref={wrapperRef} className={cn("relative space-y-1.5 w-full", className)}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={inputId} className="block text-xs font-bold text-zinc-900 tracking-tight">
          {label}
        </label>
        {rightAction}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">
          <MapPin className="size-4 shrink-0" />
        </div>

        <input
          id={inputId}
          type="text"
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (value.trim().length >= 2) {
              setOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border bg-white h-12 pl-10 pr-9 text-sm font-medium text-zinc-900 shadow-2xs transition-all",
            "placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#ec6c05] focus:border-[#ec6c05]",
            error
              ? "border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-400"
              : "border-zinc-200 hover:border-zinc-300",
            disabled && "cursor-not-allowed opacity-60 bg-zinc-100"
          )}
          aria-invalid={Boolean(error)}
          aria-expanded={open && suggestions.length > 0}
          autoComplete="off"
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 gap-1">
          {isFetching && <Loader2 className="size-3.5 animate-spin text-[#ec6c05]" />}
          {value && !disabled && !readOnly && !isFetching && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setSuggestions([]);
              }}
              className="text-zinc-400 hover:text-zinc-600 transition-colors p-0.5"
              aria-label="Clear location"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-zinc-200 bg-white p-1 text-sm shadow-xl ring-1 ring-black/5"
        >
          {suggestions.map((suggestion, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li
                key={suggestion.id}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => selectSuggestion(suggestion)}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors",
                  isSelected ? "bg-orange-50 text-[#ec6c05]" : "text-zinc-800 hover:bg-zinc-50"
                )}
              >
                <Search className={cn("mt-0.5 size-3.5 shrink-0", isSelected ? "text-[#ec6c05]" : "text-zinc-400")} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-xs text-zinc-900">{suggestion.primary}</div>
                  {suggestion.secondary && (
                    <div className="truncate text-[0.6875rem] text-zinc-500">{suggestion.secondary}</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {error ? (
        <p className="text-[0.6875rem] font-medium text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="text-[0.6875rem] text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
}
