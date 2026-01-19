import { useState } from "react";

import { Flag } from "./flag";
import { CaretDownIcon } from "@phosphor-icons/react";

export function CurrencySelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("USD");

  return (
    <div className="relative flex-1 self-center border-l">
      <button
        className="flex w-full items-center justify-between rounded-r-lg focus:bg-surface-secondary text-sm p-1.5"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Flag code={selected} />
          <span>{selected}</span>
        </div>
        <CaretDownIcon size={15} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-3 w-26 rounded-lg border border-graphic bg-surface-primary shadow-lg z-10">
          {["USD", "EUR", "BRL"].map((currency) => (
            <button
              className="flex w-24 items-center justify-between rounded-r-lg text-sm p-1.5 hover:bg-surface-secondary"
              onClick={() => setSelected(currency)}
            >
              <div className="flex items-center gap-2">
                <Flag code={currency} />
                <span>{currency}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
