/*
  Warnings:

  - You are about to drop the column `description` on the `CourseCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ClassContributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `CourseContributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserModuleSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CourseCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "CourseCategory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CourseCategory" ("courseId", "id", "name") SELECT "courseId", "id", "name" FROM "CourseCategory";
DROP TABLE "CourseCategory";
ALTER TABLE "new_CourseCategory" RENAME TO "CourseCategory";
CREATE UNIQUE INDEX "CourseCategory_id_key" ON "CourseCategory"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_id_key" ON "Assignment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Class_id_key" ON "Class"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClassContributor_id_key" ON "ClassContributor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseContributor_id_key" ON "CourseContributor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Module_id_key" ON "Module"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserModuleSubmission_id_key" ON "UserModuleSubmission"("id");
