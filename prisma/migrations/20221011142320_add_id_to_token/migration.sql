-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");
