/*
  Warnings:

  - You are about to drop the column `patrition` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "patrition",
ADD COLUMN     "patronymic" TEXT;
