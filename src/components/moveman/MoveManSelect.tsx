import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const MoveManSelect = SelectPrimitive.Root;
export const MoveManSelectGroup = SelectPrimitive.Group;
export const MoveManSelectValue = SelectPrimitive.Value;

export const MoveManSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean }
>(({ className, children, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex w-full min-h-[50px] sm:min-h-[52px] items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 outline-none transition-all duration-200",
      "hover:border-slate-400 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 shadow-2xs",
      error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-[#8DC63F] group-data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
MoveManSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const MoveManSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-slate-400 hover:text-[#8DC63F]", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
MoveManSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

export const MoveManSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-slate-400 hover:text-[#8DC63F]", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
MoveManSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export const MoveManSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-72 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 text-slate-900 shadow-2xl ring-1 ring-slate-900/5",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1.5 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1.5",
        className
      )}
      position={position}
      {...props}
    >
      <MoveManSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1 space-y-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <MoveManSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
MoveManSelectContent.displayName = SelectPrimitive.Content.displayName;

export const MoveManSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-xl py-2.5 pl-3.5 pr-9 text-xs sm:text-sm font-medium outline-none transition-all duration-150",
      "text-slate-700 hover:bg-[#8DC63F]/15 hover:text-slate-950 focus:bg-[#8DC63F]/15 focus:text-slate-950",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-3 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[#8DC63F] stroke-[2.5]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
MoveManSelectItem.displayName = SelectPrimitive.Item.displayName;
