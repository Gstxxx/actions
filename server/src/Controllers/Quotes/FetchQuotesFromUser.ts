import { prisma } from '../../Utils/prisma'
import { Hono } from "hono";
import { userMiddleware } from '../../Middlewares/AuthMiddleware';

const controller = new Hono()
    .basePath("/quote")
    .use(userMiddleware)
    .get("/list", async (c) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: c.get("user").id
                },
                include: {
                    Wallet: {
                        include: {
                            quotes: {
                                include: {
                                    priceHistory: {
                                        orderBy: {
                                            date: 'desc'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (!user?.Wallet) {
                return c.json({ message: "User wallet not found" }, 200);
            }

            return c.json({
                message: "Success",
                quotes: user.Wallet.quotes
            }, 200);
        }
        catch (error) {
            console.error("Error Details:", error);
            return c.json({ message: "Error while fetching quotes", error }, 500);
        }
    });

export { controller };
