/*
  Warnings:

  - You are about to drop the column `petsId` on the `organizacao` table. All the data in the column will be lost.
  - Added the required column `organizacaoId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organizacao" DROP CONSTRAINT "organizacao_petsId_fkey";

-- AlterTable
ALTER TABLE "organizacao" DROP COLUMN "petsId";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organizacaoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
