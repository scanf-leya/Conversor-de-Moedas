export type Rates = Record<string, number>;

export type ApiResponse = {
  start: string;
  end: string;
  interval: string;
  base: string;
  results: Record<string, Rates>;
  ms: number;
};

export interface Convert {
  base: string;
  amount: number;
  result: Record<string, number>;
  ms: number;
}