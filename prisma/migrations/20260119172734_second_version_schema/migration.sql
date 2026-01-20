/*
  Warnings:

  - You are about to drop the column `referrerId` on the `Referral` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_referrerId_fkey";

-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "referrerId";
