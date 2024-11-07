import { Wallet } from './Wallet';

export interface Quote {
    id: number;
    ticker: string;
    price: number;
    shortName: string;
    longName: string;
    logoUrl: string;
    walletId: number | null;
    wallet?: Wallet;
}