import { Logo } from "./Logo";
import { WinzBadge } from "./WinsBadge";

const SERVICES = [
  "House Moving",
  "Packing & Unpacking",
  "Furniture Disassembly & Assembly",
  "Junk Removals",
  "Property Clearance",
  "Unwanted Items Removals",
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <Logo tone="light" size="lg" />

            <p className="mt-5 text-sm leading-relaxed text-ink-foreground/80">
              Professional house moving, apartment moving, townhouse moving, office moving, and junk
              removals for homes and businesses across Auckland. Careful handling, from the first
              box to the final delivery.
            </p>

            <div className="mt-6">
              <WinzBadge variant="pill" />
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-foreground/60 uppercase">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#quote-section"
                  className="text-sm text-ink-foreground/85 transition-colors hover:text-accent font-medium"
                >
                  Get a Free Quote
                </a>
              </li>
              <li>
                <a
                  href="#assurances-section"
                  className="text-sm text-ink-foreground/85 transition-colors hover:text-accent font-medium"
                >
                  Assurances &amp; Guarantees
                </a>
              </li>
              <li>
                <a
                  href="tel:+64211009045"
                  className="text-sm text-ink-foreground/85 transition-colors hover:text-accent font-medium"
                >
                  Direct Call: 021 100 9045
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-foreground/60 uppercase">
              Our Services
            </h2>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((label) => (
                <li key={label}>
                  <a
                    href="#quote-section"
                    className="text-sm text-ink-foreground/85 transition-colors hover:text-accent font-medium"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-foreground/60 uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+64211009045"
                  className="text-ink-foreground/85 transition-colors hover:text-accent font-medium"
                >
                  021 100 9045
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@paulmovers.co.nz"
                  className="text-ink-foreground/85 transition-colors hover:text-accent font-medium"
                >
                  info@paulmovers.co.nz
                </a>
              </li>
              <li className="text-ink-foreground/75 font-medium">
                8 Disley Road, Wattle Downs, Auckland
              </li>
              <li className="pt-2 text-xs text-ink-foreground/50">
                Auckland &amp; North Island Moving Specialists
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Paul Movers Auckland. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Work and Income Registered Supplier</span>
            <span className="size-1 rounded-full bg-accent" />
            <span>Fixed-Price Moving Guarantee</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
