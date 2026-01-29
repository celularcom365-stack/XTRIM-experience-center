/*
  Warnings:

  - The values [PENDING,ACTIVE] on the enum `ReferralState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReferralState_new" AS ENUM ('ENTERED', 'VERIFYING', 'APPROVED', 'INSTALLED', 'REJECTED');
ALTER TABLE "public"."Referral" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Referral" ALTER COLUMN "state" TYPE "ReferralState_new" USING ("state"::text::"ReferralState_new");
ALTER TYPE "ReferralState" RENAME TO "ReferralState_old";
ALTER TYPE "ReferralState_new" RENAME TO "ReferralState";
DROP TYPE "public"."ReferralState_old";
ALTER TABLE "Referral" ALTER COLUMN "state" SET DEFAULT 'ENTERED';
COMMIT;

-- AlterTable
ALTER TABLE "Referral" ALTER COLUMN "state" SET DEFAULT 'ENTERED';
