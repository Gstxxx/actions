/*
  Warnings:

  - You are about to drop the column `quotesAmount` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `quoteAmount` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quoteAmount" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "shortName" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "regularMarketChange" REAL,
    "regularMarketChangePercent" REAL,
    "regularMarketTime" DATETIME,
    "regularMarketDayHigh" REAL,
    "regularMarketDayLow" REAL,
    "regularMarketVolume" INTEGER,
    "regularMarketPreviousClose" REAL,
    "regularMarketOpen" REAL,
    "fiftyTwoWeekLow" REAL,
    "fiftyTwoWeekHigh" REAL,
    "priceEarnings" REAL,
    "earningsPerShare" REAL,
    "walletId" INTEGER,
    CONSTRAINT "Quote_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Quote" ("currency", "earningsPerShare", "fiftyTwoWeekHigh", "fiftyTwoWeekLow", "id", "logoUrl", "longName", "price", "priceEarnings", "regularMarketChange", "regularMarketChangePercent", "regularMarketDayHigh", "regularMarketDayLow", "regularMarketOpen", "regularMarketPreviousClose", "regularMarketTime", "regularMarketVolume", "shortName", "ticker", "walletId") SELECT "currency", "earningsPerShare", "fiftyTwoWeekHigh", "fiftyTwoWeekLow", "id", "logoUrl", "longName", "price", "priceEarnings", "regularMarketChange", "regularMarketChangePercent", "regularMarketDayHigh", "regularMarketDayLow", "regularMarketOpen", "regularMarketPreviousClose", "regularMarketTime", "regularMarketVolume", "shortName", "ticker", "walletId" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE UNIQUE INDEX "Quote_ticker_key" ON "Quote"("ticker");
CREATE TABLE "new_Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER
);
INSERT INTO "new_Wallet" ("id", "userId") SELECT "id", "userId" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
