import { useEffect, useState } from "react";
import type { currencyDataProps, currenciesProps } from "./types";

const api = import.meta.env.VITE_API_CONVERT;

function ConvertCurrencies() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [selected1, setSelected1] = useState("USD");
  const [selected2, setSelected2] = useState("AOA");
  const [currencyData, setCurrencyData] = useState<currencyDataProps | null>(
    null
  );
  const [lastChanged, setLastChanged] = useState<"input1" | "input2">("input1");
  const [currencies, setCurrencies] = useState<currenciesProps>([]);

  const select1 = (e: string) => {
    setSelected1(e);
  };
  const select2 = (e: string) => {
    setSelected2(e);
  };

 function formatCurrencySpacing(value: string): string {
  //  const number = Number(value.replace(/\s/g, ""));

  //  if (isNaN(number)) return "";

  //  return new Intl.NumberFormat("fr-FR", {
  //    useGrouping: true, // separa milhares com espaço
  //    minimumFractionDigits: 2, // sempre 2 casas decimais
  //    maximumFractionDigits: 2, // limita a 2 casas decimais
   //  }).format(number);
   return value
 }

  useEffect(() => {
    async function getCurrencyTimeSeries(form: string, to: string) {
      const response = await fetch(`${api}/taxes?from=${form}&to=${to}`);
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const data = await response.json();
      return data;
    }

    getCurrencyTimeSeries(selected1, selected2)
      .then(setCurrencyData)
      .catch(console.error);
  }, [selected1, selected2]);

  useEffect(() => {
    async function handleCreateListCurrency() {
      const response = await fetch(`${api}/`);
      const data: currenciesProps = await response.json();
      return data;
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
        `${api}/convert?from=${form}&to=${to}&amount=${amount}`,
      );
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const { value } = await response.json();
      return value;
    }
    if (input1 === "" && input2 === "") return;

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
  }, [input1, input2, selected1, selected2, lastChanged]);

  return {
    input1,
    input2,
    selected1,
    selected2,
    currencyData,
    currencies,
    setLastChanged,
    select1,
    select2,
    setInput1,
    setInput2,
    formatCurrencySpacing,
  };
}

export { ConvertCurrencies };
