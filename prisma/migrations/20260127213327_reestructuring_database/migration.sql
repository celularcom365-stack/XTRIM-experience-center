/*
  Warnings:

  - You are about to drop the column `userId` on the `Commission` table. All the data in the column will be lost.
  - Added the required column `beneficiaryId` to the `Commission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BonusType" AS ENUM ('WELCOME', 'ANNIVERSARY', 'REWARD');

-- CreateEnum
CREATE TYPE "BonusState" AS ENUM ('PENDING', 'GRANTED', 'PAID', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Commission" DROP CONSTRAINT "Commission_userId_fkey";

-- AlterTable
ALTER TABLE "Commission" DROP COLUMN "userId",
ADD COLUMN     "beneficiaryId" INTEGER NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Bonus" (
    "id" SERIAL NOT NULL,
    "beneficiaryId" INTEGER NOT NULL,
    "type" "BonusType" NOT NULL,
    "referenceId" INTEGER,
    "amount" DECIMAL(65,30) NOT NULL,
    "state" "BonusState" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bonus_beneficiaryId_idx" ON "Bonus"("beneficiaryId");

-- CreateIndex
CREATE INDEX "Bonus_type_idx" ON "Bonus"("type");

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
