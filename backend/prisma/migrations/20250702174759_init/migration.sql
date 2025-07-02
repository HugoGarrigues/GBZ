/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Muscle` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Muscle` table. All the data in the column will be lost.
  - You are about to drop the `FollowedProgram` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FollowedProgram" DROP CONSTRAINT "FollowedProgram_programId_fkey";

-- DropForeignKey
ALTER TABLE "FollowedProgram" DROP CONSTRAINT "FollowedProgram_userId_fkey";

-- DropForeignKey
ALTER TABLE "Muscle" DROP CONSTRAINT "Muscle_createdById_fkey";

-- AlterTable
ALTER TABLE "Muscle" DROP COLUMN "createdAt",
DROP COLUMN "createdById";

-- DropTable
DROP TABLE "FollowedProgram";

-- CreateIndex
CREATE UNIQUE INDEX "Session_name_key" ON "Session"("name");
