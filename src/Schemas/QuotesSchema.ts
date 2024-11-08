import { z } from 'zod'

export const quoteSchema = z.object({
    ticker: z.string(),
    price: z.number(),
    shortName: z.string(),
    longName: z.string(),
    logoUrl: z.string()
})

export const requestQuoteSchema = z.object({
    ticker: z.string()
})
