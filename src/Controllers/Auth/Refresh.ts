import { Hono } from "hono";
import { verifyAccessToken, generateAccessToken, generateRefreshToken } from '../../Utils/jwt';
import { serialize } from 'cookie';

const refreshTokenApp = new Hono()
    .basePath("/auth")
    .post("/refresh-token", async (c) => {
        const refreshToken = c.req.header("x-refresh-token");

        if (!refreshToken) {
            return c.json({ message: "Refresh token is required" }, 400);
        }

        const decoded = verifyAccessToken(refreshToken);

        if (!decoded) {
            return c.json({ message: "Invalid or expired refresh token" }, 401);
        }

        const { userId } = decoded;

        const newAccessToken = generateAccessToken(userId);

        const newRefreshToken = generateRefreshToken(userId);

        const cookie = serialize("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        c.header("Set-Cookie", cookie);

        return c.json({ message: "Token refreshed", accessToken: newAccessToken, refreshToken: newRefreshToken }, 200);
    });

export { refreshTokenApp };

// front code
//const refreshToken = async () => {
//    try {
//        const response = await axios.post('/auth/refresh-token', null, {
//            headers: {
//                'x-refresh-token': localStorage.getItem('refresh_token') || '',
//            },
//        });

//        if (response.status === 200) {
//            const { accessToken, refreshToken } = response.data;
//            localStorage.setItem('access_token', accessToken);
//            localStorage.setItem('refresh_token', refreshToken);
//        }
//    } catch (error) {
//        console.error("Refresh token failed:", error);
//   }
//};

