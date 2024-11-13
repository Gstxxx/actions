-- AlterTable
ALTER TABLE "User" ADD COLUMN "deleted_at" DATETIME;
ALTER TABLE "User" ADD COLUMN "last_ip" TEXT;
ALTER TABLE "User" ADD COLUMN "last_login" DATETIME;
