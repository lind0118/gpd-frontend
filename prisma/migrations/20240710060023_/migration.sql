/*
  Warnings:

  - Made the column `abbreviation` on table `EducationalPrograms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `EducationalPrograms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `areaId` on table `EducationalPrograms` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EducationalPrograms" DROP CONSTRAINT "EducationalPrograms_areaId_fkey";

-- AlterTable
ALTER TABLE "EducationalPrograms" ALTER COLUMN "abbreviation" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "areaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "EducationalPrograms" ADD CONSTRAINT "EducationalPrograms_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
