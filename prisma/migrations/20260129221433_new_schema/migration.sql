/*
  Warnings:

  - You are about to drop the column `referenceId` on the `Bonus` table. All the data in the column will be lost.
  - The `state` column on the `Bonus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `referralId` on the `Commission` table. All the data in the column will be lost.
  - The `state` column on the `Commission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CASH', 'WALLET');

-- CreateEnum
CREATE TYPE "PaymentState" AS ENUM ('PENDING', 'GRANTED', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('COMMISSION_CREATED', 'COMMISSION_PAID', 'BONUS_GRANTED', 'PAYMENT_FAILED', 'SYSTEM', 'REFFERAL_STATUS');

-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('SAVINGS', 'CHECKING');

-- DropForeignKey
ALTER TABLE "Commission" DROP CONSTRAINT "Commission_referralId_fkey";

-- AlterTable
ALTER TABLE "Bonus" DROP COLUMN "referenceId",
ADD COLUMN     "bankAccountId" INTEGER,
ADD COLUMN     "paymentId" INTEGER,
ADD COLUMN     "reference" TEXT,
DROP COLUMN "state",
ADD COLUMN     "state" "PaymentState" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Commission" DROP COLUMN "referralId",
ADD COLUMN     "bankAccountId" INTEGER,
ADD COLUMN     "paymentId" INTEGER,
ADD COLUMN     "reference" TEXT,
DROP COLUMN "state",
ADD COLUMN     "state" "PaymentState" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "BonusState";

-- DropEnum
DROP TYPE "CommissionState";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "referralId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountType" "BankAccountType" NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "holderName" TEXT,
    "holderDocument" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "referralId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermsAcceptance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "termsVersion" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TermsAcceptance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "referralId" INTEGER NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "status" "PaymentState" NOT NULL DEFAULT 'PENDING',
    "method" "PaymentMethod" NOT NULL,
    "reference" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BankAccount_referralId_idx" ON "BankAccount"("referralId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_referralId_main_key" ON "BankAccount"("referralId", "main");

-- CreateIndex
CREATE UNIQUE INDEX "TermsAcceptance_userId_key" ON "TermsAcceptance"("userId");

-- CreateIndex
CREATE INDEX "TermsAcceptance_userId_idx" ON "TermsAcceptance"("userId");

-- CreateIndex
CREATE INDEX "Payment_referralId_idx" ON "Payment"("referralId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Bonus_state_idx" ON "Bonus"("state");

-- CreateIndex
CREATE INDEX "Bonus_paidAt_idx" ON "Bonus"("paidAt");

-- CreateIndex
CREATE INDEX "Commission_state_idx" ON "Commission"("state");

-- CreateIndex
CREATE INDEX "Commission_paidAt_idx" ON "Commission"("paidAt");

-- CreateIndex
CREATE INDEX "Commission_beneficiaryId_idx" ON "Commission"("beneficiaryId");

-- CreateIndex
CREATE INDEX "Referral_state_idx" ON "Referral"("state");

-- CreateIndex
CREATE INDEX "User_state_idx" ON "User"("state");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermsAcceptance" ADD CONSTRAINT "TermsAcceptance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
