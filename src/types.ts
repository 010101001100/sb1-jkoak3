export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  country: string;
  category: string;
  symbol?: string;
  date: string;
}

export type NewsCategory = 'Stocks' | 'Bonds' | 'Commodities' | 'Forex' | 'Crypto';