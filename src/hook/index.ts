import { useEffect, useState } from "react";
import type { ApiResponse, Convert } from "./types";

const apiKey = import.meta.env.VITE_FASTFOREX_API_KEY;

function ConvertCurrencies() {
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

function GaphicHook(apiData: ApiResponse) {
  const currency = Object.keys(apiData.results)[0];
  const parsedData = Object.entries(apiData.results[currency]).map(
    ([date, value]) => ({
      labels: date,
      value,
    }),
  );
  const { labels, value } = parsedData.reduce(
    (acc, curr) => {
      acc.labels.push(curr.labels);
      acc.value.push(curr.value);
      return acc;
    },
    { labels: [] as string[], value: [] as number[] },
  );
  return { labels, value };
}

export { GaphicHook, ConvertCurrencies };
