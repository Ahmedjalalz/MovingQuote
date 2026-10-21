import { ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface WinzBadgeProps {
  className?: string;
  variant?: "hero" | "card" | "pill" | "inline";
}

export type WinsBadgeProps = WinzBadgeProps;

export function WinzBadge({ className, variant = "hero" }: WinzBadgeProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "group relative inline-flex items-center gap-2 cursor-pointer select-none text-left transition-all duration-300",
              variant === "hero" &&
                "rounded-full border border-accent/40 bg-accent/12 px-3.5 py-1.5 text-xs font-semibold text-ink-foreground backdrop-blur-md hover:border-accent hover:bg-accent/20",
              variant === "pill" &&
                "rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-foreground hover:border-accent hover:bg-secondary",
              variant === "card" &&
                "rounded-2xl border border-border/80 bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-sm hover:border-accent/60",
              variant === "inline" &&
                "inline-flex items-center gap-1.5 font-semibold text-accent hover:underline",
              className,
            )}
            aria-label="WINZ Quotes - Work and Income Registered Supplier"
          >
            <ShieldCheck className="size-4 shrink-0 text-accent" strokeWidth={2} />
            <span className="font-display tracking-tight">WINZ Quotes</span>
            <span className="hidden sm:inline-block size-1 rounded-full bg-accent/60" />
            <span className="hidden sm:inline-block text-[0.6875rem] font-medium text-muted-foreground group-hover:text-foreground">
              Work &amp; Income
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="max-w-xs rounded-xl bg-ink px-4 py-2.5 text-xs font-medium text-ink-foreground shadow-lift border border-ink-foreground/15"
        >
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-accent">Work and Income Registered Supplier</span>
          </div>
          <p className="mt-1 text-[0.6875rem] text-ink-foreground/80 leading-relaxed">
            We provide official quotes for WINZ / Work and Income assistance with fast turnaround.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const WinsBadge = WinzBadge;
