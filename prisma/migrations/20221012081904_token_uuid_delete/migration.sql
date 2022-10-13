/*
  Warnings:

  - You are about to drop the column `uuid` on the `Token` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Token_uuid_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "uuid";
