import { useEffect, useRef, useState } from "react";
import type { currencyDataProps } from "@/hook/types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
);

import type { ChartOptions } from "chart.js";




export function CurrencyChart({ apiData }: { apiData: currencyDataProps }) {
  const { labels, values } = apiData;

  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<any>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const grad = ctx.createLinearGradient(0, 0, 0, 220);
    grad.addColorStop(0, "rgba(124,58,237,0.35)");
    grad.addColorStop(1, "rgba(124,58,237,0)");
    setGradient(grad);
  }, []);

  const data = {
    labels: labels ?? [],
    datasets: [
      {
        data: values ?? [],
        borderColor: "#7C3AED",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
        backgroundColor: gradient,
      },
    ],
  };

 const options: ChartOptions<"line"> = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
     legend: { display: false },
     tooltip: {
       backgroundColor: "#ffffff",
       titleColor: "#0F172A",
       bodyColor: "#0F172A",
       displayColors: false,
       callbacks: {
         label: (ctx) => {
           const value = ctx.raw;
           if (typeof value === "number") {
             return value.toFixed(4).replace(".", ",");
           }
           return String(value);
         },
       },
     },
   },
   scales: {
     x: {
       grid: { display: false },
     },
     y: {
       ticks: {
         callback: (value) => {
           if (typeof value === "number") {
             return value.toFixed(2).replace(".", ",");
           }
           return value;
         },
       },
     },
   },
 };

  return (
    <div className="h-90 w-full pt-5">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
