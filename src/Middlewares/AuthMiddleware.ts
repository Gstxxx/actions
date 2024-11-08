import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { User } from "@prisma/client";
import { prisma } from "../Utils/prisma";
import { verify, sign } from "hono/jwt";

function getAuthToken(c: Context) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return { error: "Authorization header missing", status: 401 };
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return { error: "Token is required", status: 401 };
  }

  return { token };
}

export const userMiddleware = createMiddleware<{
    Variables: {
      user: User;
    };
  }>(async (c, next) => {
    const token = getAuthToken(c);
    if (!token.token) {
      return c.json({ error: "Authorization header missing" }, 401);
    }
    try {
    if(!process.env.JWT_SECRET){
      return c.json({ error: "Missing JWT_SECRET environment variable" }, 500);
    }
      const payload = await verify(token.token, process.env.JWT_SECRET);
      if (!payload.sub) {
        return c.json({ error: "Payload invalid" }, 404);
      }
      const userID = payload.sub as number;
  
      const user = await prisma.user.findUnique({ where: { id: userID } });
      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }
      if (user.deleted_at !== null) {
        return c.json({ error: "User has been deleted" }, 404);
      }
      c.set("user", user);
      await next();
    } catch (err) {
      console.log("Error: %s", err)
      const token = getAuthToken(c);
      console.log("Token: %s", token.token)
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  });

export const adminMiddleware = createMiddleware<{
  Variables: {
    user: User;
  };
}>(async (c, next) => {
  const user = c.get("user");
  if (user.type !== "Admin") {
    return c.json(
      { error: "Access denied. Only admins can access this route." },
      403,
    );
  }
  await next();
});