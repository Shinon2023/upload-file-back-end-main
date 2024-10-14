/*
  Warnings:

  - Added the required column `endDate` to the `SubmitDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubmitDate" ADD COLUMN     "endDate" TIMESTAMP(0) NOT NULL;
