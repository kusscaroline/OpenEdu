/*
  Warnings:

  - Added the required column `name` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Module" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assignmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    CONSTRAINT "Module_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Module" ("assignmentId", "data", "id", "type") SELECT "assignmentId", "data", "id", "type" FROM "Module";
DROP TABLE "Module";
ALTER TABLE "new_Module" RENAME TO "Module";
CREATE UNIQUE INDEX "Module_id_key" ON "Module"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
