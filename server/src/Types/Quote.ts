import { Wallet } from './Wallet';

export interface QuoteHistory {
    id: number;
    price: number;
    amount: number;
    date: Date;
    quoteId: number;
    quote?: Quote;
}

export interface Quote {
    id: number;
    quoteAmount: number;
    ticker: string;
    price: number;
    shortName: string;
    longName: string;
    logoUrl: string;
    currency: string;
    regularMarketChange: number | null;
    regularMarketChangePercent: number | null;
    regularMarketTime: Date | null;
    regularMarketDayHigh: number | null;
    regularMarketDayLow: number | null;
    regularMarketVolume: number | null;
    regularMarketPreviousClose: number | null;
    regularMarketOpen: number | null;
    fiftyTwoWeekLow: number | null;
    fiftyTwoWeekHigh: number | null;
    priceEarnings: number | null;
    earningsPerShare: number | null;
    wallet?: Wallet;
    walletId: number | null;
    priceHistory?: QuoteHistory[];
}