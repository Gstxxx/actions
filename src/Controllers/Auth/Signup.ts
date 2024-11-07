import { prisma } from '../../Utils/prisma'
import { Hono } from "hono";
import * as bcrypt from 'bcrypt';
import { zValidator } from '@hono/zod-validator'
import { userSchema } from '../../Schemas/AuthSchema'

const registerApp = new Hono()
    .basePath("/auth")
    .post("/signup", zValidator("json", userSchema), async (c) => {
        try {
            const { name, email, password } = c.req.valid("json");

            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    Wallet: {
                        create: {
                            quotesAmount: 0
                        }
                    }
                }
            });

            return c.json({ message: "User and Wallet Created" }, 200);
        }
        catch (error) {
            console.error(error);
            return c.json({ message: "Error while creating user and wallet" }, 500);
        }
    });

export { registerApp };
