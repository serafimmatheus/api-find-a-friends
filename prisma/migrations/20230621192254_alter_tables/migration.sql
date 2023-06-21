-- DropForeignKey
ALTER TABLE "organizacao" DROP CONSTRAINT "organizacao_petsId_fkey";

-- AlterTable
ALTER TABLE "organizacao" ALTER COLUMN "petsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "organizacao" ADD CONSTRAINT "organizacao_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
