/*
  Warnings:

  - You are about to drop the column `ornanizacao` on the `organizacao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizacao]` on the table `organizacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizacao` to the `organizacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "organizacao_ornanizacao_key";

-- AlterTable
ALTER TABLE "organizacao" DROP COLUMN "ornanizacao",
ADD COLUMN     "organizacao" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizacao_organizacao_key" ON "organizacao"("organizacao");
