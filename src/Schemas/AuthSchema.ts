import { z } from 'zod'

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const walletSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const quoteSchema = z.object({
    ticker: z.string(),
    price: z.number(),
    shortName: z.string(),
    longName: z.string(),
    logoUrl: z.string()
})