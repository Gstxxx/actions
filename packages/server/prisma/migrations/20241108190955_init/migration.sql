-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Quote" ("id", "logoUrl", "longName", "price", "shortName", "ticker", "walletId") SELECT "id", "logoUrl", "longName", "price", "shortName", "ticker", "walletId" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE UNIQUE INDEX "Quote_ticker_key" ON "Quote"("ticker");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
