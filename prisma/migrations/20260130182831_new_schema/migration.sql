/*
  Warnings:

  - Added the required column `ipAddress` to the `TermsAcceptance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privacyVersion` to the `TermsAcceptance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `TermsAcceptance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TermsAcceptance" ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "privacyVersion" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT NOT NULL;
