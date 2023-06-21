/*
  Warnings:

  - Added the required column `nome` to the `organizacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizacao" ADD COLUMN     "nome" TEXT NOT NULL;
