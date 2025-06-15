
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";

type DateRange = { from: Date | null; to: Date | null };
type AmountRange = { min: string; max: string };

export type InvoiceSearchState = {
  query: string;
  date: DateRange;
  amount: AmountRange;
};

type InvoiceSearchBarProps = {
  value: InvoiceSearchState;
  onChange: (val: InvoiceSearchState) => void;
};

export default function InvoiceSearchBar({ value, onChange }: InvoiceSearchBarProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  // Date range
  const handleSetDate = (date: Date | undefined) => {
    if (!date) return;
    if (!value.date.from || (value.date.from && value.date.to)) {
      onChange({ ...value, date: { from: date, to: null } });
    } else {
      const [from, to] =
        date < value.date.from
          ? [date, value.date.from]
          : [value.date.from, date];
      onChange({ ...value, date: { from, to } });
      setShowCalendar(false);
    }
  };

  // Amount range
  const setAmount = (update: Partial<AmountRange>) => {
    onChange({
      ...value,
      amount: { ...value.amount, ...update },
    });
  };

  const clearAll = () =>
    onChange({ query: "", date: { from: null, to: null }, amount: { min: "", max: "" } });

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-4 py-2 px-2 bg-white/80 rounded-lg shadow-sm mb-3 md:mb-5 border border-zinc-200">
      <div className="flex-1 flex items-center space-x-2">
        <Input
          placeholder="Search invoices (any field)…"
          className="w-full"
          value={value.query}
          onChange={e => onChange({ ...value, query: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs w-[150px] justify-start">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {value.date.from
                ? value.date.to
                  ? `${format(value.date.from, "MMM d")} – ${format(value.date.to, "MMM d")}`
                  : format(value.date.from, "MMM d, yyyy")
                : "Date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0 z-30">
            <Calendar
              mode="range"
              selected={{
                from: value.date.from ?? undefined,
                to: value.date.to ?? undefined,
              }}
              onSelect={range =>
                onChange({
                  ...value,
                  date: {
                    from: range?.from ?? null,
                    to: range?.to ?? null,
                  },
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          type="number"
          placeholder="Min $"
          min={0}
          step={0.01}
          value={value.amount.min}
          onChange={e => setAmount({ min: e.target.value })}
          className="w-16"
        />
        <span className="text-xs">–</span>
        <Input
          type="number"
          placeholder="Max $"
          min={0}
          step={0.01}
          value={value.amount.max}
          onChange={e => setAmount({ max: e.target.value })}
          className="w-16"
        />
        {(value.query || value.date.from || value.date.to || value.amount.min || value.amount.max) && (
          <Button size="icon" variant="ghost" type="button" onClick={clearAll} className="ml-2" aria-label="Clear filters">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
