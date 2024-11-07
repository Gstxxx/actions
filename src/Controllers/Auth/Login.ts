import { prisma } from '../../Utils/prisma'
import { Hono } from "hono";
import * as bcrypt from 'bcrypt';
import { zValidator } from '@hono/zod-validator'
import { loginSchema } from '../../Schemas/AuthSchema'
import { generateAccessToken, generateRefreshToken } from '../../Utils/jwt'
import { serialize } from 'cookie';


const loginApp = new Hono()
    .basePath("/auth")
    .post("/login", zValidator("json", loginSchema), async (c) => {
        try {
            const { email, password } = c.req.valid("json");

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return c.json({ message: "Invalid email or password" }, 401);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return c.json({ message: "Invalid email or password" }, 401);
            }

            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken(user.id);

            const cookie = serialize("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
            });

            c.header("Set-Cookie", cookie);
            return c.json({ message: "Login successful", token: accessToken }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: "Error during login" }, 500);
        }
    });

export { loginApp };
