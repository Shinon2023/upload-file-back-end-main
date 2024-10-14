/*
  Warnings:

  - You are about to drop the column `SubmitDate` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `fileName1` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `fileName2` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `fileName3` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `fileName4` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `fileName5` on the `Form` table. All the data in the column will be lost.
  - Added the required column `Prefix` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "SubmitDate",
DROP COLUMN "fileName1",
DROP COLUMN "fileName2",
DROP COLUMN "fileName3",
DROP COLUMN "fileName4",
DROP COLUMN "fileName5",
ADD COLUMN     "submitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "Prefix" TEXT NOT NULL,
ADD COLUMN     "Role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "UploadFile" (
    "id" UUID NOT NULL,
    "fileName" TEXT NOT NULL,
    "formId" UUID NOT NULL,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "fileName" TEXT NOT NULL,
    "uploadFileId" UUID NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UploadFile" ADD CONSTRAINT "UploadFile_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadFileId_fkey" FOREIGN KEY ("uploadFileId") REFERENCES "UploadFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
