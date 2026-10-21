import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  tone?: "dark" | "light";
};

/**
 * Paul Movers Mark — renders the official brand badge.
 */
export function LogoMark({ className, tone = "dark" }: LogoMarkProps) {
  return (
    <picture className={cn("inline-flex shrink-0 items-center", className)}>
      <source srcSet="/logo.webp" type="image/webp" />
      <img
        src="/logo.png"
        alt="Paul Movers"
        width={1019}
        height={520}
        className={cn(
          "size-full object-contain",
          tone === "light" && "filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]",
        )}
        loading="eager"
        decoding="async"
      />
    </picture>
  );
}

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  subline?: string;
  showSubline?: boolean;
  size?: "sm" | "md" | "lg";
};

export function Logo({
  className,
  tone = "dark",
  subline,
  showSubline = false,
  size = "md",
}: LogoProps) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <picture className="flex shrink-0 items-center">
        <source srcSet="/logo.webp" type="image/webp" />
        <img
          src="/logo.png"
          alt="Paul Movers"
          width={997}
          height={493}
          decoding="async"
          className={cn(
            "w-auto object-contain transition-all duration-300 group-hover:scale-[1.02]",
            size === "sm" && "h-8 md:h-9",
            size === "md" && "h-9 sm:h-10 md:h-11",
            size === "lg" && "h-12 sm:h-14 md:h-16",
            tone === "light" && "filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
          )}
        />
      </picture>
      {showSubline && subline ? (
        <span
          className={cn(
            "hidden sm:block text-[0.625rem] font-semibold tracking-[0.2em] uppercase border-l pl-3 select-none",
            tone === "light"
              ? "border-ink-foreground/25 text-ink-foreground/75"
              : "border-border text-muted-foreground",
          )}
        >
          {subline}
        </span>
      ) : null}
    </span>
  );
}
