import { Wallet } from './Wallet';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    walletId: number;
    wallet: Wallet;
}