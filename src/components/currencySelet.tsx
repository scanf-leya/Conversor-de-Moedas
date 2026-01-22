import { useState } from "react";

import { Flag } from "./flag";
import { CaretDownIcon } from "@phosphor-icons/react";

export function CurrencySelect({
  selected,
  select,
  currencies,
}: {
  selected: string;
  select: (e: string) => void;
  currencies: { name: string; code: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1 self-center border-l">
      <button
        className="flex w-full items-center justify-between rounded-r-lg focus:bg-surface-secondary text-sm p-1.5"
        onClick={() => setOpen(!open)}
      >
        <div className="flex  items-center gap-2">
          <Flag code={selected} />
          <span>{selected}</span>
        </div>
        <CaretDownIcon size={15} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-3 w-max p-1 h-26.5  scrollbar rounded-lg border border-graphic bg-surface-primary shadow-lg z-10">
          {currencies.map((currency) => (
            <button
              className="flex w-full items-center justify-between rounded-r-lg text-sm p-1.5 hover:bg-surface-secondary"
              onClick={() => {
                select(currency.code);
                setOpen(!open);
              }}
            >
              <div className="flex items-center gap-2">
                <Flag code={currency.code} />
                <span>{currency.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
