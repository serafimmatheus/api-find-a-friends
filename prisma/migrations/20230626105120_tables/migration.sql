/*
  Warnings:

  - A unique constraint covering the columns `[ornanizacao]` on the table `organizacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ornanizacao` to the `organizacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizacao" ADD COLUMN     "ornanizacao" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizacao_ornanizacao_key" ON "organizacao"("ornanizacao");
