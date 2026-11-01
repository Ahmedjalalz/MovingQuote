import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Roads2RoadsSelect = SelectPrimitive.Root;
export const Roads2RoadsSelectGroup = SelectPrimitive.Group;
export const Roads2RoadsSelectValue = SelectPrimitive.Value;

export const Roads2RoadsSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-xs sm:text-sm font-medium text-slate-800 shadow-xs outline-hidden transition-all duration-200 hover:border-[#25AAE1]/70 focus:border-[#25AAE1] focus:ring-4 focus:ring-[#25AAE1]/15 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-[#25AAE1] group-data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Roads2RoadsSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const Roads2RoadsSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-slate-400 hover:text-[#25AAE1]", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
Roads2RoadsSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

export const Roads2RoadsSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1 text-slate-400 hover:text-[#25AAE1]", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
Roads2RoadsSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export const Roads2RoadsSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-72 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-2xl border border-sky-100 bg-white p-1.5 text-slate-900 shadow-2xl ring-1 ring-slate-900/5",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1.5 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1.5",
        className
      )}
      position={position}
      {...props}
    >
      <Roads2RoadsSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1 space-y-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <Roads2RoadsSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Roads2RoadsSelectContent.displayName = SelectPrimitive.Content.displayName;

export const Roads2RoadsSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-xl py-2.5 pl-3 pr-9 text-xs sm:text-sm font-medium outline-hidden transition-all duration-150",
      "text-slate-700 hover:bg-sky-50 hover:text-slate-900",
      "focus:bg-sky-50 focus:text-[#006494]",
      "data-[state=checked]:bg-sky-50/90 data-[state=checked]:text-[#006494] data-[state=checked]:font-semibold",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-3 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4 text-[#25AAE1] stroke-[2.5]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
Roads2RoadsSelectItem.displayName = SelectPrimitive.Item.displayName;
