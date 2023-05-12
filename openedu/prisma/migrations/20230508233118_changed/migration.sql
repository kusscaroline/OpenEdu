/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserModuleSubmission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Module` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "firstName", "id", "lastName", "password") SELECT "email", "firstName", "id", "lastName", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserModuleSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    CONSTRAINT "UserModuleSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserModuleSubmission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserModuleSubmission" ("data", "id", "moduleId", "userId") SELECT "data", "id", "moduleId", "userId" FROM "UserModuleSubmission";
DROP TABLE "UserModuleSubmission";
ALTER TABLE "new_UserModuleSubmission" RENAME TO "UserModuleSubmission";
CREATE TABLE "new__ClassToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClassToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ClassToUser" ("A", "B") SELECT "A", "B" FROM "_ClassToUser";
DROP TABLE "_ClassToUser";
ALTER TABLE "new__ClassToUser" RENAME TO "_ClassToUser";
CREATE UNIQUE INDEX "_ClassToUser_AB_unique" ON "_ClassToUser"("A", "B");
CREATE INDEX "_ClassToUser_B_index" ON "_ClassToUser"("B");
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("courseId", "id", "type") SELECT "courseId", "id", "type" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Class" ("id") SELECT "id" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Course" ("id") SELECT "id" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE TABLE "new_Module" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assignmentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    CONSTRAINT "Module_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Module" ("assignmentId", "data", "id", "type") SELECT "assignmentId", "data", "id", "type" FROM "Module";
DROP TABLE "Module";
ALTER TABLE "new_Module" RENAME TO "Module";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
