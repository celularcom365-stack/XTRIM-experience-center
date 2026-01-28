/*
  Warnings:

  - You are about to drop the column `address` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "address",
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;
