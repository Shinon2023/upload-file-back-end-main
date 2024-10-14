-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Faculty" TEXT NOT NULL,
    "Course" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT,
    "Password" TEXT NOT NULL,
    "Bio" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Course" (
    "CourseID" SERIAL NOT NULL,
    "CourseName" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("CourseID")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "FacultyID" SERIAL NOT NULL,
    "FacultyName" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("FacultyID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");
