import { useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin, Search } from "lucide-react";
import { searchUkPlacesClient, type UkPlaceSuggestion } from "@/lib/places-uk";
import { cn } from "@/lib/utils";

type UnityLocationFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
};

export function UnityLocationField({ label, placeholder, value, onChange, error }: UnityLocationFieldProps) {
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

  const enabled = open && debounced.length >= 2;

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
    } else if (e.key === "Enter" && selectedIndex >= 0 && suggestions[selectedIndex]) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]!);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label
        htmlFor={inputId}
        className="text-[0.6875rem] font-bold tracking-[0.16em] text-gray-800 uppercase"
      >
        {label}
      </label>
      <div className="relative mt-2.5">
        <MapPin
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#b96be8]"
          strokeWidth={2}
        />
        <input
          id={inputId}
          value={value}
          autoComplete="off"
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          className={cn(
            "w-full rounded-2xl border bg-white py-4 pr-10 pl-11 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#b96be8] focus:ring-4 focus:ring-[#b96be8]/15",
            error ? "border-red-500" : "border-gray-200",
          )}
        />
        {isFetching && (
          <Loader2
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 animate-spin text-[#b96be8]"
          />
        )}
      </div>

      {showPanel && (
        <div
          role="listbox"
          aria-label="Address suggestions"
          className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          {isFetching && suggestions.length === 0 ? (
            <div className="flex items-center gap-2.5 px-3 py-3 text-xs text-gray-600">
              <Loader2 className="size-3.5 animate-spin text-[#b96be8] shrink-0" />
              <span>Searching UK addresses &amp; postcodes…</span>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition-colors cursor-pointer",
                    isSelected ? "bg-[#b96be8]/10 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#b96be8]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">{item.primary}</p>
                    {item.secondary && (
                      <p className="truncate text-[0.6875rem] text-gray-500 font-normal">
                        {item.secondary}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-gray-500">
              <Search className="size-3.5 text-gray-400 shrink-0" />
              <span>Use &quot;{debounced}&quot; (you can enter any UK address or postcode)</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
