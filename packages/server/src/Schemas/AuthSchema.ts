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
