import { Wallet } from './Wallet';

export interface Quote {
    id: number;
    amount: number;
    ticker: string;
    price: number;
    shortName: string;
    longName: string;
    logoUrl: string;
    currency: string;
    regularMarketChange?: number | null;
    regularMarketChangePercent?: number | null;
    regularMarketTime?: Date;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketVolume?: number;
    regularMarketPreviousClose?: number;
    regularMarketOpen?: number;
    fiftyTwoWeekLow?: number;
    fiftyTwoWeekHigh?: number;
    priceEarnings?: number;
    earningsPerShare?: number | null;
    wallet?: Wallet;
    walletId?: number | null;
}