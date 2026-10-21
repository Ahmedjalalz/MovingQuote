import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "rise" | "image";
};

let sharedObserver: IntersectionObserver | null = null;
const observerMap = new WeakMap<Element, () => void>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = observerMap.get(entry.target);
            if (cb) {
              cb();
              observerMap.delete(entry.target);
            }
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
  }
  return sharedObserver;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      setVisible(true);
      return;
    }

    observerMap.set(node, () => setVisible(true));
    observer.observe(node);

    return () => {
      observerMap.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(variant === "image" ? "image-reveal" : "reveal", className)}
    >
      {children}
    </Tag>
  );
}
