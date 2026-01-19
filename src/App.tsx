import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import { CurrencySelect } from "./components/currencySelet";
import { Graphic } from "./components/graphic";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-200 py-16 px-20 rounded-2xl shadow-2xl shadow-text-primay/15 gap-10">
        <div className="flex flex-col gap-6">
          <h3 className="text-xl text-text-primary font-semibold">
            Conversor de Moedas
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex bg-surface-primary rounded-lg border border-graphic focus-within:outline-highlight focus-within:outline-2">
              <input
                type="text"
                placeholder="$0.00"
                className="text-lg flex-1 p-1.5 outline-none"
              />
              <CurrencySelect />
            </div>
            <ArrowsLeftRightIcon size={24} />
            <div className="flex bg-surface-primary rounded-lg border border-graphic focus-within:outline-highlight focus-within:outline-2">
              <input
                type="text"
                placeholder="$0.00"
                className="text-lg flex-1 p-1.5 outline-none"
              />
              <CurrencySelect />
            </div>
          </div>
        </div>
        <div className="border">
          <h3 className="text-xl font-semibold">Taxa de Câmbio</h3>
          <Graphic/>
        </div>
      </div>
    </>
  );
}

export default App;
