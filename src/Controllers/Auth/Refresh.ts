import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { prisma } from "../../Utils/prisma";

const JWT_SECRET = "u7DbW4Z%&dk4F*TrD9zYbTpq39$P2P^5MnL#tA7yVs$8Bf!ZqX"
const JWT_REFRESH_SECRET = "t4Gp#LxK8qMvH$Wp6X%t&Jx8F*RbNz5^PaB&3AqS9PqR7Xw!Vy"

const refreshTokenApp = new Hono()
    .basePath("/auth")
    .post("/refresh-token", async (c) => {
        try {

            const authHeader = c.req.header("Authorization");

            if (!authHeader) {
                return c.json({ error: "Authorization header missing" }, 401);
            }

            const refreshToken = authHeader.replace("Bearer ", "");
            console.log("Received Refresh Token:", refreshToken);

            if (!refreshToken) {
                return c.json({ error: "Refresh token is required" }, 401);
            }

            if (!JWT_REFRESH_SECRET) {
                return c.json({ error: "Missing JWT_REFRESH_SECRET environment variable" }, 500);
            }
            let payload;
            try {
                payload = await verify(refreshToken, JWT_REFRESH_SECRET);
                console.log("Token payload:", payload);
            } catch (err) {
                console.error("Token verification error:", err);
                if (err.name === 'JwtTokenSignatureMismatched') {
                    return c.json({ error: "Token signature mismatch, please re-authenticate" , refreshToken: refreshToken}, 401);
                }
                if (err.name === 'JwtTokenExpired') {
                    return c.json({ error: "Refresh token expired, please re-authenticate" , refreshToken: refreshToken}, 401);
                }
                return c.json({ error: "Invalid or expired refresh token" , refreshToken: refreshToken  }, 401);
            }

            const storedRefreshToken = await prisma.refreshToken.findUnique({
                where: { token: refreshToken },
                include: { user: true }
            });

            console.log("Stored Refresh Token:", storedRefreshToken);

            if (!storedRefreshToken) {
                return c.json({ error: "Invalid refresh token" }, 401);
            }

            if (storedRefreshToken.user_id !== payload.sub) {
                return c.json({ error: "Refresh token does not match user" }, 401);
            }

            const newPayload = {
                sub: storedRefreshToken.user_id,
                role: storedRefreshToken.user.type,
                exp: Math.floor(Date.now() / 1000) + 60,
            };

            if (!JWT_SECRET) {
                return c.json({ error: "Missing JWT_SECRET environment variable" }, 500);
            }

            const newAccessToken = await sign(newPayload, JWT_SECRET);

            const newRefreshPayload = {
                sub: storedRefreshToken.user_id,
                role: storedRefreshToken.user.type,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            };

            const newRefreshToken = await sign(newRefreshPayload, JWT_REFRESH_SECRET);

            await prisma.refreshToken.update({
                where: { id: storedRefreshToken.id },
                data: { token: newRefreshToken },
            });

            return c.json({ 
                message: "Token refresh successful",
                token: newAccessToken, 
                refreshToken: newRefreshToken 
            }, 200);
        }
        catch (err) {
            console.error(err);
            return c.json({ error: "Internal server error" }, 500);
        }
    });

export { refreshTokenApp };
