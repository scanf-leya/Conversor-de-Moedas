import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import { CurrencySelect } from "./components/currencySelet";
import { CurrencyChart } from "./components/graphic";
import { ConvertCurrencies } from "./hook";

function App() {
  const {
    input1,
    input2,
    selected1,
    selected2,
    currencies,
    currencyData,
    formatCurrencySpacing,
    setLastChanged,
    select1,
    select2,
    setInput1,
    setInput2,
  } = ConvertCurrencies();

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full py-16 px-20 rounded-2xl shadow-2xl shadow-text-primay/15 gap-10">
        <div className="flex flex-col gap-6">
          <h3 className="text-xl text-text-primary font-semibold">
            Conversor de Moedas
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex bg-surface-primary rounded-lg border border-graphic focus-within:outline-highlight focus-within:outline-2">
              <input
                type="text"
                value={formatCurrencySpacing(input1)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\s/g, "");

                  setLastChanged("input1");
                  setInput1(raw);
                }}
                placeholder="$0.00"
                className="text-lg flex-1 p-1.5 outline-none"
              />
              <CurrencySelect
                selected={selected1}
                select={select1}
                currencies={currencies}
              />
            </div>
            <ArrowsLeftRightIcon size={24} />
            <div className="flex bg-surface-primary rounded-lg border border-graphic focus-within:outline-highlight focus-within:outline-2">
              <input
                type="text"
                value={formatCurrencySpacing(input2)}
                onChange={(e) => {
                  setLastChanged("input2");
                  setInput2(e.target.value);
                }}
                placeholder="$0.00"
                className="text-lg flex-1 p-1.5 outline-none"
              />
              <CurrencySelect
                selected={selected2}
                select={select2}
                currencies={currencies}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex-col">
          <h3 className="text-xl font-semibold">Taxa de Câmbio</h3>
          {currencyData && <CurrencyChart apiData={currencyData} />}
        </div>
      </div>
    </>
  );
}

export default App;
