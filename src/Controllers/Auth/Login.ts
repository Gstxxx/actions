import { prisma } from '../../Utils/prisma'
import { Hono } from "hono";
import * as bcrypt from 'bcrypt';
import { zValidator } from '@hono/zod-validator'
import { loginSchema } from '../../Schemas/AuthSchema'
import { getConnInfo } from "@hono/node-server/conninfo";
import { sign } from "hono/jwt";



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

            await prisma.refreshToken.deleteMany({
                where: { user_id: user.id }
            });

            const payload = {
                sub: user.id,
                role: user.type,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
              };
              if (!process.env.JWT_SECRET) {
                return c.json(
                  { error: "Missing process.env.JWT_SECRET environment variable" },
                  500,
                );
              }
              const token = await sign(payload, process.env.JWT_SECRET);
        
              const payloadRefresh = {
                sub: user.id,
                role: user.type,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
              };
              if (!process.env.JWT_REFRESH_SECRET) {
                return c.json(
                  { error: "Missing process.env.JWT_REFRESH_SECRET environment variable" },
                  500,
                );
              }
              const tokenRefresh = await sign(payloadRefresh, process.env.JWT_REFRESH_SECRET);
        
              await prisma.refreshToken.create({
                data: {
                  token: tokenRefresh,
                  user_id: user.id,
                },
              });
        
              const { password: _, ...userWithoutPassword } = user;
        
              const info = getConnInfo(c);
        
              await prisma.user.update({
                where: { email: user.email },
                data: { last_login: new Date(), last_ip: info.remote.address },
              });
        
            return c.json({ message: "Login successful", token, refreshToken:tokenRefresh, user: userWithoutPassword }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: "Error during login" }, 500);
        }
    });

export { loginApp };
