export type Rates = Record<string, number>;

export type currencyDataProps = {
  labels: string[];
  values: number[];
};

export type currenciesProps = {
  name: string;
  code: string;
}[];