-- CreateTable
CREATE TABLE "SubmitDate" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "SubmitDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" UUID NOT NULL,
    "level" INTEGER NOT NULL,
    "fileName1" TEXT NOT NULL,
    "fileName2" TEXT NOT NULL,
    "fileName3" TEXT NOT NULL,
    "fileName4" TEXT NOT NULL,
    "fileName5" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
