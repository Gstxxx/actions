import { prisma } from '../../Utils/prisma'
import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { requestQuoteSchema } from '../../Schemas/QuotesSchema'
import {  userMiddleware } from '../../Middlewares/AuthMiddleware';

const controller = new Hono()
    .basePath("/quote")
    .use(userMiddleware)
    .post("/create", zValidator("json", requestQuoteSchema), async (c) => {
        try {
            const { ticker,amount } = c.req.valid("json");

            const token = process.env.BR_API_TOKEN;
            const apiUrl = process.env.API_URL;
            const response = await fetch(`${apiUrl}/quote/${ticker}?token=${token}`);
            const data = await response.json();

            if (data.error) {
                return c.json({ message: `Quote not found: ${data.message}` }, 404);
            }

            const quoteData = data.results[0];


            const user = await prisma.user.findUnique({
                where: {
                    id: c.get("user").id
                },
                include: {
                    Wallet: {
                        include: {
                            quotes: true
                        }
                    }
                }
            });

            if (!user?.Wallet) {
                return c.json({ message: "User wallet not found" }, 404);
            }

            const existingQuoteInWallet = user.Wallet.quotes.find(q => q.ticker === quoteData.symbol);

            if (existingQuoteInWallet) {
                return c.json({ message: "Quote already exists in your wallet", quote: existingQuoteInWallet }, 200);
            }

            let quote = await prisma.quote.findFirst({
                where: {
                    ticker: quoteData.symbol
                }
            });

            if (!quote) {
                quote = await prisma.quote.create({
                    data: {
                        quoteAmount: amount,
                        ticker: quoteData.symbol,
                        price: quoteData.regularMarketPrice,
                        shortName: quoteData.shortName,
                        longName: quoteData.longName,
                        logoUrl: quoteData.logourl,
                        currency: quoteData.currency,
                        regularMarketChange: quoteData.regularMarketChange,
                        regularMarketChangePercent: quoteData.regularMarketChangePercent,
                        regularMarketTime: new Date(quoteData.regularMarketTime),
                        regularMarketDayHigh: quoteData.regularMarketDayHigh,
                        regularMarketDayLow: quoteData.regularMarketDayLow,
                        regularMarketVolume: quoteData.regularMarketVolume,
                        regularMarketPreviousClose: quoteData.regularMarketPreviousClose,
                        regularMarketOpen: quoteData.regularMarketOpen,
                        fiftyTwoWeekLow: quoteData.fiftyTwoWeekLow,
                        fiftyTwoWeekHigh: quoteData.fiftyTwoWeekHigh,
                        priceEarnings: quoteData.priceEarnings,
                        earningsPerShare: quoteData.earningsPerShare
                    }
                });
            }

            await prisma.wallet.update({
                where: {
                    id: user.Wallet.id
                },
                data: {
                    quotes: {
                        connect: { id: quote.id }
                    }
                }
            });

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    modify_date: new Date()
                }
            });
            return c.json({ message: "Success", quote }, 200);
        }
        catch (error) {
            console.error("Error Details:", error);
            return c.json({ message: "Error while creating user and wallet", error }, 500);
        }
    });

export { controller };
