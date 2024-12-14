import { User } from './User';
import { Quote } from './Quote';

export interface Wallet {
    id: number;
    userId: number;
    user: User;
    quotes: Quote[];
}