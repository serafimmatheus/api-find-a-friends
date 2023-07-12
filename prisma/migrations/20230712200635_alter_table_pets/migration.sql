/*
  Warnings:

  - Added the required column `coverImage` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "imagesUrl" TEXT[];
