import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import { CurrencySelect } from "./components/currencySelet";
import { CurrencyChart, type ApiResponse } from "./components/graphic";
import { useEffect, useState } from "react";

interface Convert {
  base: string;
  amount: number;
  result: Record<string, number>;
  ms: number;
}

const apiKey = import.meta.env.VITE_FASTFOREX_API_KEY;

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [selected1, setSelected1] = useState("USD");
  const [selected2, setSelected2] = useState("AOA");
  const [currencyData, setCurrencyData] = useState<ApiResponse | null>(null);
  const [lastChanged, setLastChanged] = useState<"input1" | "input2">("input1");
  const [currencies, setCurrencies] = useState<
    { name: string; code: string }[]
  >([]);

  // teste
  

  const select1 = (e: string) => {
    setSelected1(e);
  };
  const select2 = (e: string) => {
    setSelected2(e);
  };

  function formatCurrencySpacing(value: string): string {
    const number = Number(value.replace(/\s/g, ""));

    if (isNaN(number)) return "";

    return new Intl.NumberFormat("fr-FR", {
      useGrouping: true,
      maximumFractionDigits: 0,
    }).format(number);
  }


useEffect(() => {
  async function getCurrencyTimeSeries(form: string, to: string) {
    const response = await fetch(
      `https://api.fastforex.io/time-series?from=${form}&to=${to}&interval=P1D`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data: ApiResponse = await response.json();

    return data;
  }

  getCurrencyTimeSeries(selected1, selected2)
    .then(setCurrencyData)
    .catch(console.error);
}, [selected1, selected2]);

  useEffect(() => {
     async function getCurrency() {
       const response = await fetch(`https://api.fastforex.io/currencies`, {
         headers: {
           "X-API-Key": apiKey,
         },
       });

       if (!response.ok) {
         throw new Error("Erro na requisição");
       }
       const data: { currencies: Record<string, string>; ms: number } =
         await response.json();

       return data;
     }
    
    async function handleCreateListCurrency() {
      const data = await getCurrency();
      const currency = Object.entries(data.currencies).map(([code, name]) => ({
        code,
        name,
      }));
      console.log(currency);
      return currency;
    }
    handleCreateListCurrency().then(setCurrencies);
  }, []);

  useEffect(() => {
   async function handlerConvertCurrencies(
     form: string,
     to: string,
     amount: string,
   ) {
     
     const response = await fetch(
       `https://api.fastforex.io/convert?from=${form}&to=${to}&amount=${amount}`,
       {
         headers: {
           "X-API-Key": apiKey,
         },
       },
     );

     if (!response.ok) {
       throw new Error("Erro na requisição");
     }
     const data: Convert = await response.json();
     const converted = data.result[to].toString();
     console.log(converted);
     return converted;
   }
   if (!input1 && !input2) return;

   if (lastChanged === "input1") {
     handlerConvertCurrencies(selected1, selected2, input1)
       .then(setInput2)
       .catch(console.error);
   }

   if (lastChanged === "input2") {
     handlerConvertCurrencies(selected2, selected1, input2)
       .then(setInput1)
       .catch(console.error);
   }
 }, [
   input1,
   input2,
   selected1,
   selected2,
   lastChanged,
 ]);

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
