/*
  Warnings:

  - Added the required column `modify_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'Customer',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "walletId" INTEGER,
    "deleted_at" DATETIME,
    "last_login" DATETIME,
    "last_ip" TEXT,
    "create_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modify_date" DATETIME NOT NULL,
    CONSTRAINT "User_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("deleted_at", "email", "id", "last_ip", "last_login", "name", "password", "walletId") SELECT "deleted_at", "email", "id", "last_ip", "last_login", "name", "password", "walletId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_walletId_key" ON "User"("walletId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
