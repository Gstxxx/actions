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

            const wallet = await prisma.wallet.create({
                data: {}
            });

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    walletId: wallet.id,
                    last_login: new Date(),
                    create_date: new Date(),
                    modify_date: new Date()
                },
                include: {
                    Wallet: true
                }
            });

            await prisma.wallet.update({
                where: { id: wallet.id },
                data: { userId: user.id }
            });

            const { password: _, ...userWithoutPassword } = user;
            return c.json({ message: "User and Wallet Created", user: userWithoutPassword }, 200);
        }
        catch (error) {
            console.error("Error Details:", error);
            if (error.code === 'P2002') {
                return c.json({ message: "Email already exists" }, 400);
            }
            return c.json({ message: "Error while creating user and wallet", error }, 500);
        }
    });

export { registerApp };
