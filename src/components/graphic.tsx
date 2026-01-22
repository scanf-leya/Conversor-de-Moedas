// export function Graphic() {

//     const config = {
//         type: 'line',
//         data: {
//             datasets: [{
//                 data:[]
//             }]
//         },
//        options: {},
//        plugins:{}
//     }

//     return <div>Graphic Component</div>;
// }
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

export type Rates = Record<string, number>;

export type ApiResponse = {
  start: string;
  end: string;
  interval: string;
  base: string;
  results: Record<string, Rates>;
  ms: number;
};

export function CurrencyChart({ apiData }: { apiData: ApiResponse }) {
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
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: "#7C3AED",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(124,58,237,0.35)");
          gradient.addColorStop(1, "rgba(124,58,237,0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
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
          label: (ctx: any) => ctx.raw.toFixed(4).replace(".", ","),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: {
          callback: (value: number) => value.toFixed(2).replace(".", ","),
        },
      },
    },
  };

  return (
    <div className="h-101.5 w-full pt-5">
      <Line data={data} options={options} />
    </div>
  );
}
