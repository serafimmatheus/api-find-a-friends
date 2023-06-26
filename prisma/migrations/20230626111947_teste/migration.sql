-- AlterTable
ALTER TABLE "organizacao" ADD COLUMN     "cidade" TEXT NOT NULL DEFAULT 'undefined',
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'undefined';
