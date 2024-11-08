import jwt, { JwtPayload } from 'jsonwebtoken';
import { sign } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

export const generateAccessToken = async (userId: number): Promise<string> => {
    
    const payload = {
        sub: userId,
        role: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
      const token = await sign(payload, JWT_SECRET);
      return token;
};

export const generateRefreshToken = async (userId: number): Promise<string>  => {
    
    const payload = {
        sub: userId,
        role: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      };
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
      const token = await sign(payload, JWT_SECRET);
      return token;
};

interface DecodedToken extends JwtPayload {
    userId: number;
}

export const verifyAccessToken = (token: string): DecodedToken | null => {
    try {
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        return decoded;
    } catch (error) {
        return null;
    }
};
