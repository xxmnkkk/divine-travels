"use client";

import { forwardRef, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  id: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly SelectOption[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

/** A controlled listbox with managed focus, keyboard navigation and typeahead. */
export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(function CustomSelect(
  { id, name, value, onChange, onBlur, options, placeholder, required, disabled, ...aria },
  ref,
) {
  const openRef = useRef(false);

  return <Select.Root
    name={name}
    value={value}
    onValueChange={onChange}
    required={required}
    disabled={disabled}
    onOpenChange={open => {
      openRef.current = open;
      if (!open) onBlur?.();
    }}
  >
    <Select.Trigger
      ref={ref}
      id={id}
      {...aria}
      onBlur={() => { if (!openRef.current) onBlur?.(); }}
      className="group flex min-h-[50px] w-full min-w-0 items-center justify-between gap-4 rounded-xl border border-beige bg-ivory px-4 py-3.5 text-left text-sm text-ink shadow-sm outline-none transition-colors hover:border-taupe focus-visible:border-sea-deep focus-visible:ring-2 focus-visible:ring-sea-deep/20 data-[state=open]:border-sea-deep data-[placeholder]:text-ink-soft disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#9C4E3A]"
    >
      <span className="truncate"><Select.Value placeholder={placeholder}/></span>
      <Select.Icon asChild><ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-ink-soft transition-transform group-data-[state=open]:rotate-180"/></Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        position="popper"
        sideOffset={8}
        collisionPadding={16}
        data-lenis-prevent
        className="z-[80] max-h-[min(320px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-beige bg-ivory p-1.5 text-ink shadow-card"
      >
        <Select.ScrollUpButton className="flex h-7 items-center justify-center bg-ivory text-ink-soft"><ChevronUp size={15} aria-hidden="true"/></Select.ScrollUpButton>
        <Select.Viewport className="p-0.5">
          {options.map(option => <Select.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            textValue={option.label}
            className="relative flex min-h-11 cursor-pointer select-none items-center rounded-xl py-3 pl-3.5 pr-10 text-sm leading-relaxed outline-none data-[state=checked]:bg-sand/65 data-[state=checked]:font-medium data-[highlighted]:bg-sand data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <Select.ItemText>{option.label}</Select.ItemText>
            <Select.ItemIndicator className="absolute right-3.5 inline-flex text-sea-ink"><Check size={15} strokeWidth={1.6} aria-hidden="true"/></Select.ItemIndicator>
          </Select.Item>)}
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-7 items-center justify-center bg-ivory text-ink-soft"><ChevronDown size={15} aria-hidden="true"/></Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>;
});
