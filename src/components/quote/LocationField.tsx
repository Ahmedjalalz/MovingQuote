import { useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin, Search } from "lucide-react";
import { searchNzPlacesClient, type PlaceSuggestion } from "@/lib/places";
import { cn } from "@/lib/utils";

type LocationFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
};

export function LocationField({ label, placeholder, value, onChange, error }: LocationFieldProps) {
  const inputId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
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
    searchNzPlacesClient(debounced)
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
        className="text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground/95 uppercase"
      >
        {label}
      </label>
      <div className="relative mt-2.5">
        <MapPin
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/75"
          strokeWidth={1.6}
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
            "w-full rounded-2xl border bg-background py-4 pr-10 pl-11 text-sm outline-none transition-all duration-300 placeholder:text-foreground/65 focus:border-accent focus:ring-4 focus:ring-accent/12",
            error ? "border-destructive" : "border-input",
          )}
        />
        {isFetching && (
          <Loader2
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 animate-spin text-accent"
          />
        )}
      </div>

      {showPanel && (
        <div
          role="listbox"
          aria-label="Address suggestions"
          className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-2xl border border-border bg-card p-1.5 shadow-lift animate-in fade-in zoom-in-95 duration-150"
        >
          {isFetching && suggestions.length === 0 ? (
            <div className="flex items-center gap-2.5 px-3 py-3 text-xs text-foreground/80">
              <Loader2 className="size-3.5 animate-spin text-accent shrink-0" />
              <span>Searching Auckland &amp; New Zealand addresses…</span>
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
                    isSelected ? "bg-accent/10 text-foreground" : "text-foreground/90 hover:bg-secondary",
                  )}
                >
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-accent" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{item.primary}</p>
                    {item.secondary && (
                      <p className="truncate text-[0.6875rem] text-foreground/75 font-normal">
                        {item.secondary}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-foreground/80">
              <Search className="size-3.5 text-foreground/60 shrink-0" />
              <span>Use &quot;{debounced}&quot; (you can enter any address)</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
