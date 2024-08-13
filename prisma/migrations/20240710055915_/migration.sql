/*
  Warnings:

  - Made the column `comment` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `partialtemplateId` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `PartialTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `PartialTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `PartialTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `PartialTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `PartialTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `period` on table `PartialTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weeklyHours` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalHours` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monthPeriod` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subjectName` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_partialTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "PartialTemplate" DROP CONSTRAINT "PartialTemplate_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_educationalProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_revisedById_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "partialtemplateId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PartialTemplate" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "period" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "weeklyHours" SET NOT NULL,
ALTER COLUMN "totalHours" SET NOT NULL,
ALTER COLUMN "monthPeriod" SET NOT NULL,
ALTER COLUMN "subjectName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PartialTemplate" ADD CONSTRAINT "PartialTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_partialTemplateId_fkey" FOREIGN KEY ("partialTemplateId") REFERENCES "PartialTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Users"("nt") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_revisedById_fkey" FOREIGN KEY ("revisedById") REFERENCES "Users"("nt") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_educationalProgramId_fkey" FOREIGN KEY ("educationalProgramId") REFERENCES "EducationalPrograms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
