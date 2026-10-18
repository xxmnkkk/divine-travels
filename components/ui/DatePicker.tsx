"use client";

import { forwardRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DayPicker, type ClassNames, type Labels } from "react-day-picker";
import { datePickerContent as copy } from "@/content/controls";
import { formatDisplayDate, parseLocalDate, serializeLocalDate } from "@/lib/calendar";

export interface DatePickerProps {
  id: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  required?: boolean;
  min?: string;
  placeholder?: string;
}

const monthFormatter = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" });
const weekdayFormatter = new Intl.DateTimeFormat("en-IN", { weekday: "short" });
const fullWeekdayFormatter = new Intl.DateTimeFormat("en-IN", { weekday: "long" });
const accessibleDateFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
});

const calendarClasses: Partial<ClassNames> = {
  root: "relative w-full text-sm text-ink",
  months: "relative",
  month: "relative w-full",
  month_caption: "flex h-9 items-center pr-24",
  caption_label: "text-sm font-medium text-ink",
  nav: "absolute right-0 top-0 flex h-9 items-center gap-1",
  button_previous: "flex h-9 w-9 items-center justify-center rounded-full border border-beige text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-35",
  button_next: "flex h-9 w-9 items-center justify-center rounded-full border border-beige text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-35",
  chevron: "h-4 w-4 fill-current",
  month_grid: "w-full table-fixed border-separate border-spacing-y-1",
  weekday: "h-8 w-1/7 p-0 text-center text-[11px] font-medium text-ink-soft",
  day: "w-1/7 p-0 text-center",
  day_button: "mx-auto flex aspect-square w-full max-w-9 items-center justify-center rounded-full text-xs text-ink outline-none transition-colors hover:bg-sand focus-visible:ring-2 focus-visible:ring-sea-deep focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed",
  selected: "[&>button]:bg-ink [&>button]:text-ivory [&>button]:shadow-[inset_0_0_0_1px_var(--gold)] [&>button:hover]:bg-ink",
  today: "[&>button]:font-semibold [&>button]:underline [&>button]:decoration-gold [&>button]:decoration-2 [&>button]:underline-offset-4",
  outside: "[&>button]:text-ink-soft",
  disabled: "[&>button]:text-ink-soft/35 [&>button]:line-through [&>button]:decoration-beige [&>button:hover]:bg-transparent",
  hidden: "invisible",
};

const calendarLabels: Partial<Labels> = {
  labelNav: () => copy.navigationLabel,
  labelPrevious: () => copy.previousMonth,
  labelNext: () => copy.nextMonth,
  labelGrid: (date) => monthFormatter.format(date),
  labelWeekday: (date) => fullWeekdayFormatter.format(date),
  labelDayButton: (date, modifiers) => [
    accessibleDateFormatter.format(date),
    modifiers.today ? copy.today : undefined,
    modifiers.selected ? copy.selected : undefined,
  ].filter(Boolean).join(", "),
};

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  required,
  min,
  placeholder = copy.placeholder,
}, ref) {
  const [open, setOpen] = useState(false);
  const selected = parseLocalDate(value);
  const minimum = min ? parseLocalDate(min) : undefined;
  const initialMonth = selected && (!minimum || selected >= minimum) ? selected : minimum;

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) onBlur?.();
  }

  function selectDate(date: Date | undefined) {
    onChange(date ? serializeLocalDate(date) : "");
    changeOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={changeOpen}>
      {name && <input type="hidden" name={name} value={value} />}
      <Popover.Trigger asChild>
        <button
          ref={ref}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? `${id}-calendar` : undefined}
          aria-required={required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onBlur={() => { if (!open) onBlur?.(); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              changeOpen(true);
            }
          }}
          className="group flex min-h-[50px] w-full min-w-0 items-center gap-3 rounded-xl border border-beige bg-ivory px-4 py-3.5 text-left text-sm text-ink shadow-sm outline-none transition-colors hover:border-taupe focus-visible:border-sea-deep focus-visible:ring-2 focus-visible:ring-sea-deep/20 aria-[invalid=true]:border-[#9C4E3A] data-[state=open]:border-sea-deep data-[state=open]:ring-2 data-[state=open]:ring-sea-deep/20"
        >
          <CalendarDays size={17} strokeWidth={1.5} className="shrink-0 text-sea-ink" aria-hidden="true" />
          <span className={`min-w-0 flex-1 truncate ${selected ? "text-ink" : "text-ink-soft"}`}>{selected ? formatDisplayDate(selected) : placeholder}</span>
          <ChevronDown size={15} strokeWidth={1.5} className="shrink-0 text-ink-soft transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          id={`${id}-calendar`}
          aria-label={label ? `${label}: ${copy.calendarLabel}` : copy.calendarLabel}
          align="start"
          sideOffset={8}
          collisionPadding={16}
          onOpenAutoFocus={(event) => event.preventDefault()}
          data-lenis-prevent
          className="z-[110] max-h-[var(--radix-popover-content-available-height)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-2xl border border-beige bg-ivory p-4 shadow-[0_16px_48px_-12px_rgba(43,42,40,0.25)] outline-none"
        >
          <DayPicker
            mode="single"
            required
            autoFocus
            selected={selected}
            onSelect={selectDate}
            defaultMonth={initialMonth}
            disabled={minimum ? { before: minimum } : undefined}
            startMonth={minimum}
            navLayout="after"
            showOutsideDays
            classNames={calendarClasses}
            labels={calendarLabels}
            formatters={{
              formatCaption: (date) => monthFormatter.format(date),
              formatWeekdayName: (date) => weekdayFormatter.format(date),
            }}
          />
          <p className="mt-2 text-[10px] leading-relaxed text-ink-soft">{copy.keyboardHint}</p>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-beige pt-3">
            <button type="button" disabled={!selected} onClick={() => selectDate(undefined)} className="min-h-9 rounded-lg px-2 text-xs text-sea-ink underline decoration-beige underline-offset-4 hover:decoration-sea-deep disabled:cursor-not-allowed disabled:text-ink-soft/50 disabled:no-underline">{copy.clear}</button>
            <Popover.Close asChild>
              <button type="button" className="min-h-9 rounded-full border border-beige px-4 text-xs text-ink transition-colors hover:bg-sand">{copy.close}</button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});
